/**
 * @date 2020-01-25
 * @description Unit tests for the ServiceError class.
 * @filename service-error.test.ts
 */
import { ServiceError } from "../";

describe("ServiceError Test Cases", (): void => {
  test("should successfully construct a service error instance with no name", (): void => {
    const serviceError = new ServiceError("testmessage", "locationid");

    expect(serviceError.message).toMatch("testmessage");
    expect(serviceError.locationId).toMatch("locationid");
    expect(serviceError.name).toMatch("ServiceError");
    expect(serviceError.details).toBeUndefined();
  });

  test("should successfully construct a service error instance with a name and details", (): void => {
    const serviceError = new ServiceError(
      "testmessage",
      "locationid",
      "aname",
      { alpha: "beta" }
    );

    expect(serviceError.message).toMatch("testmessage");
    expect(serviceError.locationId).toMatch("locationid");
    expect(serviceError.name).toMatch("aname");
    expect(serviceError.details).toMatchObject({ alpha: "beta" });
  });

  test("should successfully construct a service error using fromError", (): void => {
    const error = new Error("testmessage");

    try {
      throw ServiceError.fromError(error, "locationid", "aname", {
        alpha: "beta",
      });
    } catch (err) {
      const e = err as ServiceError;
      expect(e.message).toMatch("testmessage");
      expect(e.locationId).toMatch("locationid");
      expect(e.name).toMatch("aname");
      expect(e.details).toMatchObject({ alpha: "beta" });
    }
  });
});
