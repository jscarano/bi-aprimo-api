/**
 * @author Joe Scarano
 * @copyright Copyright 2024 by Entitech Solutions., USA. All Rights Reserved.
 * @date 2025-02-21
 * @description Test aPrimo client to access aPrimo API.
 * @filename sharepoint-client.ts
 */

 import Logger from '@asc/dv-logger';
 import Nock from 'nock';
 import { debug } from 'console';
 import * as dotenv from 'dotenv';

 import { readFileSync, writeFileSync } from 'fs';
 import { AprimoClient } from '../src/lib/aprimo-client';

 describe('aPrimo Client Tests', () => {
    dotenv.config();
     /**
      * The Jest mock of the Logger.debug function.
      *
      * @constant
      * @type {jest.Mock}
      */
     const debugLoggerMock = Logger.debug as jest.Mock;

     /**
      * The Jest mock of the Logger.error function.
      *
      * @constant
      * @type {jest.Mock}
      */
     const errorLoggerMock = Logger.error as jest.Mock;


     /**
      * The Jest mock of the Logger.info function.
      *
      * @constant
      * @type {jest.Mock}
      */
     const infoLoggerMock = Logger.info as jest.Mock;

     jest.useRealTimers();
     jest.setTimeout(120000);

     beforeEach((): void => {
         Nock.cleanAll();
         jest.resetAllMocks();
     });

    const aprimoClient: AprimoClient = new AprimoClient({
        apiPrefix: 'boehringer-sb2',
        apiVersion: '1',
        clientId: 'STNQL48V-STNQ',
        clientSecret: '!DOCUV3RAD4M2024',
    });

     test('Upload a file', async () => {
         try {
            if (process.env.LOCAL_UNIT_TEST) {
                const filename = 'TestDocument-05.docx';
                const document = readFileSync(__dirname + '/Test Document-05.docx');
                const response = await aprimoClient.uploadFile(filename, document);

                infoLoggerMock('AprimoClient.uploadFile - test', response);
            }
            // debug('AprimoClient.uploadFile - test', response);
         } catch (err) {
            debug('AprimoClient.uploadFile - error', err);
         }
     });

     test('Get aPrimo field definitions', async () => {
        try {
           if (process.env.LOCAL_UNIT_TEST) {
               const response = await aprimoClient.getFieldDefinitions();

               writeFileSync(__dirname + '/aPrimo-field-definitions.json', JSON.stringify(response));
           }
           // debug('AprimoClient.uploadFile - test', response);
        } catch (err) {
           debug('AprimoClient.uploadFile - error', err);
        }
    });
 });