/**
 * @date 2020-03-09
 * @description A standard service error.
 * @filename service-error.ts
 */

/**
 * The error thrown when an error occurs in a service.
 *
 * @extends {Error}
 */
export class ServiceError extends Error {
  private readonly _details:
    | { [index: string]: boolean | number | object | string }
    | undefined;

  private readonly _locationId: string;

  /**
   * Constructor.
   *
   * @param {string} message The message associated with the error.
   *
   * @param {string} locationId A unique location ID.
   *
   * @param {string} name The name of the error.
   *
   * @param {Object<string, *>} details Optional details associated with the
   * error.
   */
  constructor(
    message: string,
    locationId: string,
    name = "",
    details?: { [index: string]: boolean | number | object | string }
  ) {
    super(message);
    this.name = name === "" ? "ServiceError" : name;
    this._locationId = locationId;
    this._details = details;
  }

  /**
   * Returns the details associated with the error.
   *
   * @returns {Object<string, *>}
   */
  get details():
    | {
        [index: string]: boolean | number | object | string;
      }
    | undefined {
    return this._details;
  }

  /**
   * Returns the location ID.
   *
   * @returns {string}
   */
  get locationId(): string {
    return this._locationId;
  }

  /**
   * Creates a service error instance from an underlying error.
   *
   * @param {Error} error The source error.
   *
   * @param {string} locationId The origin location.
   *
   * @param {string} name The name of the error.
   *
   * @param {Object<string, *>} details Optional details associated with the
   * error.
   *
   * @returns {ServiceError} The service error instance.
   */
  static fromError(
    error: Error,
    locationId: string,
    name = "",
    details?: {
      [index: string]: boolean | number | Record<string, unknown> | string;
    }
  ): ServiceError {
    const serviceError = new ServiceError(
      error.message,
      locationId,
      name,
      details
    );

    serviceError.stack = error.stack;
    return serviceError;
  }
}
