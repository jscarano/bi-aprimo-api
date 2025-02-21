/**
 * @author Joe Scarano
 * @copyright Copyright 2024 by Entitech Solutions., USA. All Rights Reserved.
 * @description an interface that represents the information that is required to access aprimo API
 * @filename aprimo-config.ts
 */

export interface AprimoConfig {
    apiPrefix: string;
    apiVersion: string;
    clientId: string;
    clientSecret: string;
}