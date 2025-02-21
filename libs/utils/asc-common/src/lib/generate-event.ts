import { v4 as _uuidv4 } from "uuid";

import { LambdaEvent } from "./types/event";

/**
 * Additional metadata to overwrite or set in the output event.
 *
 * @interface
 */
export interface AdditionalMetadata {
  clientId?: string;
  correlationId?: string;
  namespace?: string;
}

export function generateOutputEvent(
  inputEvent: LambdaEvent,
  additionalData?: object,
  additionalMetadata?: AdditionalMetadata
): LambdaEvent {
  // Copy the input event and overwrite/add with changed/new properties to form an output event.
  // This preserves any unknown properties that this lambda doesn't care about for processing further down the events lifecycle.
  return Object.assign({}, inputEvent, {
    id: _uuidv4(),
    data: {
      ...inputEvent.data,
      ...additionalData,
    },
    metadata: {
      ...inputEvent.metadata,
      timestamp: new Date().toISOString(),
      namespace: additionalMetadata?.namespace ?? process.env.NAMESPACE,
      source: process.env.SOURCE,
      ...(additionalMetadata?.clientId && {
        clientId: additionalMetadata.clientId,
      }),
      ...(inputEvent.id && { causationId: inputEvent.id }),
      ...(additionalMetadata?.correlationId && {
        correlationId: additionalMetadata.correlationId,
      }),
    },
  });
}
