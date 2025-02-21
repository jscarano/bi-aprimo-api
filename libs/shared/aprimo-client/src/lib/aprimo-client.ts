/**
 * @author Joe Scarano
 * @copyright Copyright 2024 by Entitech Solutions., USA. All Rights Reserved.
 * @description a client to interface with aprimo API
 * @filename aprimo-client.ts
 */

import { AprimoConfig } from '../types/aprimo-config';
import { FieldDefinition } from '../types/field-definition';
import { SearchResult } from '../types/search-result';
import { SearchExpression } from '../types/search-expression';
import { DamRecord } from '../types/dam-record';
import { PrepareUploadResponse } from '../types/prepare-upload-response';
import { UploadResponse } from '../types/upload-response';

type RecordSelectKey =
  | 'fields'
  | 'files'
  | 'preview'
  | 'thumbnail'
  | 'masterFile'
  | 'masterFileLatestVersion'
  | 'classifications'
  | 'accessLists'
  | 'permissions'
  | 'locks'
  | 'analyticsData'
  | undefined;

export class AprimoClient {
  private _AprimoConfig: AprimoConfig;
  private _AuthToken: string | null = null;

  constructor(config: AprimoConfig) {
    this._AprimoConfig = config;
  }

  /**
   * Returns a list of records
   * @returns A promise that resolves to an array of search results.
   */
  public async searchRecords(searchExpression: SearchExpression): Promise<SearchResult[] | undefined> {
    if (this._AuthToken === null) {
      await this.getAuthToken();
    }
    return new Promise<SearchResult[] | undefined>((resolve, reject) => {
      try {
        const url = `https://${this._AprimoConfig.apiPrefix}.dam.aprimo.com/api/core/search/records`;
        this.postRequest<SearchResult[]>(url, searchExpression).then((response) => {
            resolve(response);
          })
          .catch((err: unknown) => {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Returns a list of fields for a record
   * @param id The ID of the record.
   * @param selectKey The key to select from the record. Defaults to undefined.
   * @returns A promise that resolves to an array of field definitions.
   */
  public async getRecordDetails(id: string, selectKey?: RecordSelectKey): Promise<FieldDefinition[]> {
    if (this._AuthToken === null) {
      await this.getAuthToken();
    }
    return new Promise<FieldDefinition[]>((resolve, reject) => {
      try {
        let url = `https://${this._AprimoConfig.apiPrefix}.dam.aprimo.com/api/core/record/${id}`;
        if (selectKey) {
          url = `https://${this._AprimoConfig.apiPrefix}.dam.aprimo.com/api/core/record/${id}/${selectKey}`;
        }
        this.getRequest<FieldDefinition[]>(url).then((response) => {
            const fields: FieldDefinition[] = response;
            resolve(fields);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Creates a new record in the Aprimo API.
   * If the authentication token is null, it retrieves a new one.
   *
   * @param {DamRecord} record - The record to be created.
   * @returns {Promise<Buffer>} - A promise that resolves with the response buffer.
   */
  public async createRecord(record: DamRecord): Promise<Buffer | undefined> {
    if (this._AuthToken === null) {
      await this.getAuthToken();
    }

    return new Promise<Buffer | undefined>((resolve, reject) => {
      const url = `https://${this._AprimoConfig.apiPrefix}.dam.aprimo.com/api/core/records`;
      this.postBufferRequest(url, record).then((response) => {
          resolve(response);
        })
        .catch((err: unknown) => {
          reject(err);
        });
    });
  }

  /**
   * Adds a record to a collection in the Aprimo API.
   * If the authentication token is null, it retrieves a new one.
   *
   * @param {string} collectionId - The ID of the collection.
   * @param {string} recordId - The ID of the record to be added.
   * @returns {Promise<Buffer>} - A promise that resolves with the response buffer.
   */
  public async addRecordToCollection(collectionId: string, recordId: string): Promise<Buffer | undefined> {
    if (this._AuthToken === null) {
      await this.getAuthToken();
    }

    const request: any = {
      records: {
        addOrUpdate: [recordId],
      },
    };

    return new Promise<Buffer | undefined>((resolve, reject) => {
      const url = `https://${this._AprimoConfig.apiPrefix}.dam.aprimo.com/api/core/collection/${collectionId}/records`;
      this.postBufferRequest(url, request).then((response) => {
          resolve(response);
        })
        .catch((err: unknown) => {
          reject(err);
        });
    });
  }

  /**
   * Uploads a file to the Aprimo API by chunking it into 20MB segments.
   * If the authentication token is null, it retrieves a new one.
   *
   * @param {string} filename - The name of the file to be uploaded.
   * @param {Buffer} buffer - The file buffer to be uploaded.
   * @returns {Promise<UploadResponse>} - A promise that resolves with the upload response.
   */
  public async uploadFile(filename: string, buffer: Buffer): Promise<UploadResponse | undefined> {
    if (this._AuthToken === null) {
      await this.getAuthToken();
    }

    const uploadInfo = await this.prepareUpload(filename);

    if (!uploadInfo) {
      throw new Error('Failed to prepare upload');
    }

    // Chunk the file into 20MB chunks
    const chunkSize = 1024 * 1024 * 20; // 20MB chunks
    const chunks = this.getBufferChunks(buffer, chunkSize);

    for (let i = 0; i < chunks.length; i++) {
      await this.uploadFileSegment(chunks[i], i, uploadInfo);
    }

    return await this.commitUpload(filename, chunks.length, uploadInfo);
  }

  /**
   * Retrieves field definitions from the Aprimo API.
   * If the authentication token is null, it retrieves a new one.
   *
   * @returns {Promise<FieldDefinition[]>} - A promise that resolves with an array of field definitions.
   */
  public async getFieldDefinitions(): Promise<FieldDefinition[]> {
    if (this._AuthToken === null) {
      await this.getAuthToken();
    }
    return new Promise<FieldDefinition[]>((resolve, reject) => {
      try {
        const url = `https://${this._AprimoConfig.apiPrefix}.dam.aprimo.com/api/core/fielddefinitions`;
        this.getRequest<FieldDefinition[]>(url).then((response) => {
            const fields: FieldDefinition[] = response;
            resolve(fields);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Prepares the upload by making a request to the Aprimo API.
   *
   * @param {string} filename - The name of the file to be uploaded.
   * @returns {Promise<PrepareUploadResponse>} - A promise that resolves with the upload preparation response.
   * @see https://training3.dam.aprimo.com/api/core/docs#usage_uploading_gt4g
   */
  private async prepareUpload(filename: string): Promise<PrepareUploadResponse | undefined> {
    return new Promise<PrepareUploadResponse | undefined>((resolve, reject) => {
      const url = `https://${this._AprimoConfig.apiPrefix}.aprimo.com/uploads/segments`;
      this.postRequest<PrepareUploadResponse>(url, { filename }).then((response) => {
          resolve(response);
        })
        .catch((err: unknown) => {
          reject(err);
        });
    });
  }

  /**
   * Uploads a file segment to the Aprimo API.
   *
   * @param {Buffer} segment - The file segment to be uploaded.
   * @param {number} index - The index of the file segment.
   * @param {PrepareUploadResponse} uploadInfo - The upload information containing the token.
   * @returns {Promise<void>} - A promise that resolves when the file segment is uploaded.
   */
  private async uploadFileSegment(segment: Buffer, index: number, uploadInfo?: PrepareUploadResponse): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const url = `https://${this._AprimoConfig.apiPrefix}.aprimo.com/uploads/segments/${uploadInfo?.token ?? ''}?index=${index}`;
      this.postFileRequest(url, segment).then((response) => {
          resolve(response);
        })
        .catch((err: unknown) => {
          reject(err);
        });
    });
  }

  /**
   * Commits the upload by making a request to the Aprimo API.
   *
   * @param {string} filename - The name of the file being uploaded.
   * @param {number} totalSegments - The total number of file segments.
   * @param {PrepareUploadResponse} uploadInfo - The upload information containing the token.
   * @returns {Promise<UploadResponse | undefined>} - A promise that resolves with the upload response.
   */
  private async commitUpload(filename: string, totalSegments: number, uploadInfo: PrepareUploadResponse): Promise<UploadResponse | undefined> {
    return new Promise<UploadResponse | undefined>((resolve, reject) => {
      const url = `https://${this._AprimoConfig.apiPrefix}.aprimo.com/uploads/segments/${uploadInfo.token}/commit`;
      this.postRequest<UploadResponse>(url, { filename, segmentcount: totalSegments }).then((response) => {
          resolve(response);
        })
        .catch((err: unknown) => {
          reject(err);
        });
    });
  }

  private async getAuthToken(): Promise<void> {
    const { clientId, clientSecret } = this._AprimoConfig;

    return new Promise<void>((resolve, reject) => {
      const url = `https://${this._AprimoConfig.apiPrefix}.aprimo.com/login/connect/token`;
      const fields = `grant_type=client_credentials&scope=api&client_id=${clientId}&client_secret=${clientSecret}`;
      this.postFormRequest<any>(url, fields).then((response) => {
          this._AuthToken = response?.access_token;
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  private getHeaders(accept = '*/*', contentType = 'application/json'): Record<string, string> {
    return {
      Authorization: `Bearer ${this._AuthToken}`,
      'API-VERSION': this._AprimoConfig.apiVersion,
      Accept: accept,
      'Content-Type': contentType,
      'User-Agent': 'docuvera-aprimo-client',
    };
  }

  private getBufferChunks(buffer: Buffer, chunkSize: number): Buffer[] {
    const chunks: Buffer[] = [];
    for (let i = 0; i < buffer.length; i += chunkSize) {
      const chunk = buffer.slice(i, i + chunkSize);
      chunks.push(chunk);
    }
    return chunks;
  }

  private async getRequest<T>(url: string, accept = 'application/json'): Promise<T> {
    const response = await fetch(new URL(url), {
      headers: this.getHeaders(accept),
      method: 'GET',
    });

    const body = await response.text();

    if (response.ok !== true) {
      throw new Error(`${body} [${response.status}]`);
    }

    return JSON.parse(body);
  }

  private async putRequest<T>(url: string, data?: string | object): Promise<T | undefined> {
    let body = '';
    if (data && typeof data === 'object') {
      body = JSON.stringify(data);
    } else {
      body = data as string;
    }
    const response = await fetch(new URL(url), {
      body,
      headers: this.getHeaders(),
      method: 'PUT',
    });

    const responseBody = await response.text();

    if (response.ok !== true) {
      throw new Error(`${responseBody} [${response.status}]`);
    }

    return JSON.parse(responseBody);
  }

  private async postRequest<T>(url: string, data?: string | object, accept = 'application/json'): Promise<T | undefined> {
      let body = '';
      if (data && typeof data === 'object') {
        body = JSON.stringify(data);
      } else {
        body = data as string;
      }
      const response = await fetch(new URL(url), {
        body,
        headers: this.getHeaders(accept),
        method: 'POST',
      });

      const responseBody = await response.text();

      if (response.ok !== true) {
        throw new Error(`${responseBody} [${response.status}]`);
      }

      return JSON.parse(responseBody);
  }
  private async postBufferRequest(url: string, data?: string | object, accept = 'application/json'): Promise<Buffer | undefined> {
    let body = '';
    if (data && typeof data === 'object') {
      body = JSON.stringify(data);
    } else {
      body = data as string;
    }
    const response = await fetch(new URL(url), {
      body,
      headers: this.getHeaders(accept),
      method: 'POST',
    });

    const responseBody = await response.arrayBuffer();

    if (response.ok !== true) {
      throw new Error(`${responseBody} [${response.status}]`);
    }

    return Buffer.from(responseBody);
}
  private async postFormRequest<T>(url: string, data?: string | object, accept = 'application/json'): Promise<T | undefined> {
    let body = '';
    if (data && typeof data === 'object') {
      body = JSON.stringify(data);
    } else {
      body = data as string;
    }
    const response = await fetch(new URL(url), {
      body,
      headers: this.getHeaders(accept, 'application/x-www-form-urlencoded'),
      method: 'POST',
    });

    const responseBody = await response.text();

    if (response.ok !== true) {
      throw new Error(`${responseBody} [${response.status}]`);
    }

    return JSON.parse(responseBody);
  }

  private async postFileRequest(url: string, fileContents: Buffer): Promise<void> {
    const formData = new FormData();

    formData.set("file1", new Blob([fileContents]));

    const response = await fetch(new URL(url), {
        headers: this.getHeaders('application/json'),
        body: formData,
        method: 'POST',
    });
    // const result = await response.arrayBuffer()
    const responseBody = await response.text();
    return JSON.parse(responseBody);
  }
}
