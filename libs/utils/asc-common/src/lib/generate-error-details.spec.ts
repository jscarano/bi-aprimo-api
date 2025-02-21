/**
 * @date 2021-02-17
 * @description Unit tests for the generateErrorDetails function.
 * @filename generate-error-details.test.ts
 */
import { mockDate } from "./utils";
import {
  ServiceError,
  generateErrorDetails as _generateErrorDetails,
} from "../";

/**
 * The message to pass to the generateErrorDetails function.
 *
 * @constant
 * @type {string}
 */
const message = "Failed to get the Resolved Properties for the Document";

/**
 * A Service Error to pass to the generateErrorDetails function.
 *
 * @constant
 * @type {ServiceError}
 */
const serviceError = new ServiceError(
  "Could not find a Docuvera Document with that ID",
  "GET_DOCUMENT_RESPONSE",
  "UhyULrtrDFa4eXbhtzRnFU"
);

/**
 * A generic Error to pass to the generateErrorDetails function.
 *
 * @constant
 * @type {Error}
 */
const genericError = new Error('"data.documentId" must be a valid GUID');

/**
 * Additional properties to pass to the generateErrorDetails function.
 *
 * @constant
 * @type {object}
 */
const additionalProperties = {
  aString: "a value",
  anObject: {
    key1: "value1",
  },
  anArray: ["test"],
  aNumber: 13,
};

/**
 * The timeStamp generated when the service error is created.
 *
 * @constant
 * @type {string}
 */
const timeStamp = "2021-04-01T15:38:23.523Z";

describe("generateErrorDetails Test Cases", (): void => {
  let dateMock: () => void;

  afterEach((): void => {
    dateMock();
  });

  beforeEach((): void => {
    dateMock = mockDate(new Date(timeStamp));
  });

  test("should successfully generate error details with a Service Error without additional properties", () => {
    const result = _generateErrorDetails(message, serviceError);

    expect(result).toStrictEqual({
      message: serviceError.message,
      name: serviceError.name,
      locationId: serviceError.locationId,
      details: {},
      timestamp: timeStamp,
    });
  });

  test("should successfully generate error details with a Service Error without additional properties but with details", () => {
    const testError = new ServiceError(
      "Could not find a Docuvera Document with that ID",
      "GET_DOCUMENT_RESPONSE",
      "UhyULrtrDFa4eXbhtzRnFU",
      {
        statusCode: 401,
      }
    );

    const result = _generateErrorDetails(message, testError);

    expect(result).toStrictEqual({
      message: testError.message,
      name: testError.name,
      locationId: testError.locationId,
      details: testError.details,
      timestamp: timeStamp,
    });
  });

  test("should successfully generate error details with a Service Error with additional properties", () => {
    const result = _generateErrorDetails(
      message,
      serviceError,
      additionalProperties
    );

    expect(result).toStrictEqual({
      message: serviceError.message,
      name: serviceError.name,
      locationId: serviceError.locationId,
      details: {},
      timestamp: timeStamp,
      ...additionalProperties,
    });
  });

  test("should successfully generate error details with a Service Error and removes stack", () => {
    const testError = new ServiceError(
      "Could not find a Docuvera Document with that ID",
      "GET_DOCUMENT_RESPONSE",
      "UhyULrtrDFa4eXbhtzRnFU",
      {
        status: 401,
      }
    );
    testError.stack = "The stack of the error";
    const result = _generateErrorDetails(message, testError);

    delete testError.stack;
    expect(result).toStrictEqual({
      message: testError.message,
      name: testError.name,
      locationId: testError.locationId,
      details: testError.details,
      timestamp: timeStamp,
    });
  });

  test("should successfully generate error details with a generic Error without additional properties", () => {
    const result = _generateErrorDetails(message, genericError);

    expect(result).toStrictEqual({
      message: message,
      name: genericError.name,
      details: {
        error: genericError.message,
      },
      timestamp: timeStamp,
    });
  });

  test("should successfully generate error details with a generic Error with additional properties", () => {
    const result = _generateErrorDetails(
      message,
      genericError,
      additionalProperties
    );

    expect(result).toStrictEqual({
      message: message,
      name: genericError.name,
      details: {
        error: genericError.message,
      },
      ...additionalProperties,
      timestamp: timeStamp,
    });
  });
});
