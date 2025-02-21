import Logger from '@asc/dv-logger';
import { Route } from './types/route';
import * as AWSLambda from 'aws-lambda';
import getRoute from './lib/router';
import { HttpMethods } from './types/http-methods';
import { v4 } from 'uuid';

const routes: Route[] = [
  {
    methods: ['POST', 'HEAD', 'OPTIONS'],
    name: 'chat',
    patterns: ['/api/v1/chat'],
  },
  {
    methods: ['POST', 'HEAD', 'OPTIONS'],
    name: 'save',
    patterns: ['/api/v1/saveChat'],
  },
  {
    methods: ['POST', 'HEAD', 'OPTIONS'],
    name: 'chat',
    patterns: ['/prod/chat'],
  },
];

export const handler: (
  event: AWSLambda.APIGatewayProxyEventV2,
  context?: AWSLambda.Context
) => Promise<AWSLambda.APIGatewayProxyResult> = async (
  event: AWSLambda.APIGatewayProxyEventV2,
  context?: AWSLambda.Context
): Promise<AWSLambda.APIGatewayProxyResult> => {
  const ALLOW_CORS = {
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Credentials': true,
  };

  const response: AWSLambda.APIGatewayProxyResult = {
    body: '',
    headers: {
      'Content-Type': 'application/json',
      ...ALLOW_CORS,
    },
    isBase64Encoded: false,
    statusCode: 200,
  };

  try {
    const route = getRoute(event.rawPath, event.requestContext.http.method as unknown as HttpMethods, routes);

    // If I am checking for the OPTIONS method, I should return 200
    if (event.requestContext.http.method === 'OPTIONS') {
        response.statusCode = 200;
        return Promise.resolve(response);
    }

    const requestId = v4();

    switch (route) {
      case 'chat':
          // await chat(event, response, requestId);
        break;
      case 'save':
        // await saveChat(event, response, requestId);
        break;
      default:
          response.statusCode = 404;
          response.body = JSON.stringify({
              message: 'Not Found',
              requestId,
          });
    }
  } catch (error) {
    if (response.statusCode === 200) {
      response.statusCode = 500;
    }
    response.body = JSON.stringify({ error });

    Logger.error('phactMI chat API error', {
      response,
      locationId: 'GgNYjDTwRkyxZaAYQgqWkX',
      context,
    });
  }

  Logger.info('phactMI chat API Finished', {
    response,
    locationId: 'GgNYjDTSRkyxZaAYQNqWkX',
    context,
  });

  return Promise.resolve(response);
};
