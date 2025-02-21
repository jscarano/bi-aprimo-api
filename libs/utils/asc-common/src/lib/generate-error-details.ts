/**
 * @date 2021-02-17
 * @description A function to build an ErrorDetails object.
 * @filename generate-error-details.ts
 */
import { ServiceError } from "./service-error";
import { ErrorDetails } from "./types/event";

/**
 * Builds an ErrorDetails object from supplied parameters.
 *
 * Note: There are Jest mockImplementation of this function throughout test files in the BI DMS Connector
 * If you update the logic here make sure you also update the mockImplementations.
 *
 * @param {string} message The top level message indicating when and where an error has occurred.
 * @param {Error | ServiceError} error The actual error that occurred.
 * @param {object} additionalProperties Any additional properties that should be added to the returned ErrorDetails.
 */
export function generateErrorDetails(
  message: string,
  error: Error | ServiceError,
  additionalProperties?: object
): ErrorDetails {
  let errorDetails: ErrorDetails;
  const timestamp = new Date().toISOString();

  // If ServiceError then safe to pass on it's already formatted details.
  // Else only send through safe/known properties from generic error.
  if ((error as ServiceError).locationId) {
    const err = error as ServiceError;
    errorDetails = {
      message: err.message,
      name: err.name,
      locationId: err.locationId,
      details: err.details ?? {},
      ...additionalProperties,
      timestamp: timestamp,
    };
  } else {
    errorDetails = {
      message: message,
      name: error.name,
      details: {
        error: error.message,
      },
      ...additionalProperties,
      timestamp: timestamp,
    };
  }

  return errorDetails;
}
