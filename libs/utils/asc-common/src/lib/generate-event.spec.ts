/**
 * @date 2021-02-10
 * @description Unit tests for the generateEvent function.
 * @filename generate-event.test.ts
 */
import { v4 as _uuidv4 } from "uuid";

import { mockDate } from "./utils";
import {
  ErrorDetails,
  LambdaEvent,
  generateOutputEvent as _generateOutputEvent,
} from "../";

jest.mock("uuid");

/**
 * The namespace of the output event from generateOutputEvent.
 *
 * @constant
 * @type {string}
 */
const namespace = "DefaultNamespace";

/**
 * The input event passed into generateOutputEvent.
 *
 * @constant
 * @type {Event}
 */
const inputEvent: LambdaEvent = {
  id: "bb579e74-b16c-4762-82e7-04df177dd831",
  type: "TestEvent",
  data: {
    someProperty: "Already has data",
  },
  metadata: {
    userId: "2479e38f-c5cf-4c33-98df-98900550dabe",
    tenant: "testTenant",
    timestamp: "2021-02-10T14:26:33.801Z",
    namespace: "EsbTest",
    source: "TestServiceApi",
    correlationId: "6d5ca212-638e-4b2e-afc6-d59e7ef61537",
    causationId: "86b27389-0484-4084-947c-0630a6ed9ac1",
  },
};

/**
 * The id of the output event from generateOutputEvent.
 *
 * @constant
 * @type {string}
 */
const outputEventId = "747ec4fb-15e8-4f21-91d7-1c30249807e7";

/**
 * The source of the output event from generateOutputEvent.
 *
 * @constant
 * @type {string}
 */
const source = "ASC Test Bus";

/**
 * The timeStamp generated and added to the Entries metadata property.
 *
 * @constant
 * @type {string}
 */
const timeStamp = "2021-02-10T14:27:01.801Z";

/**
 * The Jest mock of the uuid v4 function.
 *
 * @constant
 * @type {jest.Mock}
 */
const uuidv4Mock = _uuidv4 as jest.Mock;

describe("generateOutputEvent Test Cases", (): void => {
  let dateMock: () => void;

  afterEach((): void => {
    delete process.env.NAMESPACE;
    delete process.env.SOURCE;
    jest.resetAllMocks();
    dateMock();
  });

  beforeEach((): void => {
    process.env.NAMESPACE = namespace;
    process.env.SOURCE = source;
    dateMock = mockDate(new Date(timeStamp));
    uuidv4Mock.mockReturnValue(outputEventId);
  });

  test("should successfully generate an event with no additional properties, metadata, or errors", () => {
    const event = _generateOutputEvent(inputEvent);

    expect(event).toStrictEqual({
      id: outputEventId,
      type: "TestEvent",
      data: {
        someProperty: "Already has data",
      },
      metadata: {
        userId: "2479e38f-c5cf-4c33-98df-98900550dabe",
        tenant: "testTenant",
        timestamp: timeStamp,
        namespace: namespace,
        source: source,
        correlationId: "6d5ca212-638e-4b2e-afc6-d59e7ef61537",
        causationId: "bb579e74-b16c-4762-82e7-04df177dd831",
      },
    });
    return Promise.resolve();
  });

  test("should successfully generate an event with additional properties and no additional metadata or errors", () => {
    const event = _generateOutputEvent(inputEvent, {
      newProperty: "A second Property",
    });

    expect(event).toStrictEqual({
      id: outputEventId,
      type: "TestEvent",
      data: {
        someProperty: "Already has data",
        newProperty: "A second Property",
      },
      metadata: {
        userId: "2479e38f-c5cf-4c33-98df-98900550dabe",
        tenant: "testTenant",
        timestamp: timeStamp,
        namespace: namespace,
        source: source,
        correlationId: "6d5ca212-638e-4b2e-afc6-d59e7ef61537",
        causationId: "bb579e74-b16c-4762-82e7-04df177dd831",
      },
    });
    return Promise.resolve();
  });

  test("should successfully generate an event with added additionalData.errorDetails and no additional properties or metadata", () => {
    const errorDetails: ErrorDetails = {
      message: "Erroneous",
      details: {
        someKey: "some value",
      },
    };

    const event = _generateOutputEvent(
      inputEvent,
      { errorDetails: errorDetails },
      undefined
    );

    expect(event).toStrictEqual({
      id: outputEventId,
      type: "TestEvent",
      data: {
        someProperty: "Already has data",
        errorDetails: {
          message: "Erroneous",
          details: {
            someKey: "some value",
          },
        },
      },
      metadata: {
        userId: "2479e38f-c5cf-4c33-98df-98900550dabe",
        tenant: "testTenant",
        timestamp: timeStamp,
        namespace: namespace,
        source: source,
        correlationId: "6d5ca212-638e-4b2e-afc6-d59e7ef61537",
        causationId: "bb579e74-b16c-4762-82e7-04df177dd831",
      },
    });
    return Promise.resolve();
  });

  test("should successfully generate an event with overwritten metadata.clientId and no additional properties or errors", () => {
    const event = _generateOutputEvent(inputEvent, undefined, {
      clientId: "ait-test",
    });

    expect(event).toStrictEqual({
      id: outputEventId,
      type: "TestEvent",
      data: {
        someProperty: "Already has data",
      },
      metadata: {
        userId: "2479e38f-c5cf-4c33-98df-98900550dabe",
        tenant: "testTenant",
        timestamp: timeStamp,
        namespace: namespace,
        source: source,
        clientId: "ait-test",
        correlationId: "6d5ca212-638e-4b2e-afc6-d59e7ef61537",
        causationId: "bb579e74-b16c-4762-82e7-04df177dd831",
      },
    });
    return Promise.resolve();
  });

  test("should successfully generate an event with overwritten metadata.namespace and no additional properties or errors", () => {
    delete process.env.NAMESPACE;

    const event = _generateOutputEvent(inputEvent, undefined, {
      namespace: "EsbResponse",
    });

    expect(event).toStrictEqual({
      id: outputEventId,
      type: "TestEvent",
      data: {
        someProperty: "Already has data",
      },
      metadata: {
        userId: "2479e38f-c5cf-4c33-98df-98900550dabe",
        tenant: "testTenant",
        timestamp: timeStamp,
        namespace: "EsbResponse",
        source: source,
        correlationId: "6d5ca212-638e-4b2e-afc6-d59e7ef61537",
        causationId: "bb579e74-b16c-4762-82e7-04df177dd831",
      },
    });
    return Promise.resolve();
  });

  test("should successfully generate an event with overwritten metadata.correlationId and no additional properties or errors", () => {
    const event = _generateOutputEvent(inputEvent, undefined, {
      correlationId: "b8f86b25-c9f4-4ca4-b35d-c04ed2d8c000",
    });

    expect(event).toStrictEqual({
      id: outputEventId,
      type: "TestEvent",
      data: {
        someProperty: "Already has data",
      },
      metadata: {
        userId: "2479e38f-c5cf-4c33-98df-98900550dabe",
        tenant: "testTenant",
        timestamp: timeStamp,
        namespace: namespace,
        source: source,
        correlationId: "b8f86b25-c9f4-4ca4-b35d-c04ed2d8c000",
        causationId: "bb579e74-b16c-4762-82e7-04df177dd831",
      },
    });
    return Promise.resolve();
  });

  test("should successfully generate an event with the input events metadata.causationId when the input event ID is missing", () => {
    const mockError = {
      message: "Input Event is invalid",
      locationId: "BAGAplzhXlG8qtNWLS5dre",
      name: "SCHEMA_VALIDATION_ERROR",
      details: {
        details: "some details",
        message: '"id" is required',
        stack: 'ValidationError: "id" is required',
      },
    };

    const errorDetails: ErrorDetails = {
      message:
        "Failed to get the Document Repository Configurations for the Docuvera Document",
      details: mockError,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ...inputEventWithoutId } = inputEvent;
    inputEventWithoutId.id = "";
    const event = _generateOutputEvent(inputEventWithoutId, {
      errorDetails: errorDetails,
    });

    expect(event).toStrictEqual({
      id: outputEventId,
      type: "TestEvent",
      data: {
        someProperty: "Already has data",
        errorDetails: {
          message: errorDetails.message,
          details: errorDetails.details,
        },
      },
      metadata: {
        userId: "2479e38f-c5cf-4c33-98df-98900550dabe",
        tenant: "testTenant",
        timestamp: timeStamp,
        namespace: namespace,
        source: source,
        correlationId: "6d5ca212-638e-4b2e-afc6-d59e7ef61537",
        causationId: inputEventWithoutId.metadata.causationId,
      },
    });
  });
});
