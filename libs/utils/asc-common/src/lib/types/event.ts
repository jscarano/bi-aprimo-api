/**
 * @date 2020-11-11
 * @description Declaration of the interface containing the properties of a standard lambda input
 * event.
 * @filename event.ts
 */

/**
 * A declaration of the properties of events exchanged by lambda.
 *
 * @interface
 * @template T
 */
export interface LambdaEvent {
  /**
   * Keys to be included in any log entry
   *
   * @type {Array<string>|string}
   */
  logKeys?: string[] | string;

  /**
   * The type of the event.
   *
   * @type {string}
   */
  type: string;

  /**
   * The ID of the event.
   *
   * @type {string}
   */
  id: string;

  /**
   * The custom data for the event.
   *
   * @template T
   * @type {T}
   */
  data: Record<string, unknown>;

  /**
   * The metadata associated with the event.
   *
   * @type {{userId:string, tenant: string, timestamp: string, namespace: string, source: string, clientId?: string, correlationId?: string, causationId?: string}}
   */
  metadata: {
    /**
     * The ID of the originator of the event.
     *
     * @type {string}
     */
    userId: string;

    /**
     * The ID of the tenant making the request.
     *
     * @type {string}
     */
    tenant: string;

    /**
     * The timestamp when the event was created as a ISO-8601 formatted string.
     *
     * @type {string}
     */
    timestamp: string;

    /**
     * The namespace making the request.
     *
     * @type {string}
     */
    namespace: string;

    /**
     * The source of the request.
     *
     * @type {string}
     */
    source: string;

    /**
     * The ID of the Client User that created the event, if appropriate.
     *
     * @type {string}
     */
    clientId?: string;

    /**
     * An ID used to group a number of events together.
     *
     * @type {string}
     */
    correlationId?: string;

    /**
     * The ID of the originating event.
     *
     * @type {string}
     */
    causationId?: string;
  };
}

/**
 * A declaration of the properties for error details of events exchanged by lambda.
 *
 * @interface
 */
export interface ErrorDetails {
  /**
   * A message describing the error.
   *
   * @type {string}
   */
  message: string;

  /**
   * An object containing extra details of the error.
   *
   * @type {object}
   */
  details: {
    /**
     * Any relevant information about the error detail.
     *
     * @type {any}
     */
    [key: string]: string | number | boolean | ErrorDetails | object;
  };

  timestamp?: string;
  name?: string;
  locationId?: string;
}
