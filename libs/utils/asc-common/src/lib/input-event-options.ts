/**
 * @date 2020-07-15
 * @description Declaration of the properties to configure an Input Lambda Event.
 * @filename input-event-options.ts
 */

/**
 * The properties to configure an Input Lambda Event.
 *
 * @deprecated [Replaced by Event which represents the Docuvera event standards.
 * Will be removed once all Lambdas in this service have moved to the new Input/Output event approach]
 * @interface
 */
export interface InputEventOptions {
  /**
   * Keys to be included in any log entry
   *
   * @type {Array<string>|string}
   */
  logKeys?: string[] | string;

  /**
   * Type of the Input Event.
   *
   * @type {string}
   */
  type: string;

  /**
   * Data payload of the Input Event.
   *
   * @type {object}
   */
  data: object;

  /**
   * Metadata of the Input Event.
   *
   * @type {string}
   */
  metadata: {
    /**
     * User ID of the event creator.
     *
     * @type {string}
     */
    userId: string;

    /**
     * The ID of the tenant.
     *
     * @type {string}
     */
    tenant: string;

    /**
     * ISO DateTime timestamp of when the event created.
     *
     * @type {string}
     */
    timestamp: string;
  };
}
