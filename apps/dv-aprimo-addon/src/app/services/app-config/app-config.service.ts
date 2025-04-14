import { Injectable } from '@angular/core';
import { LogLevel } from 'angular-auth-oidc-client';
import * as config from '../../../assets/tenant-config.json';

export interface TenantConfig {
    envApiUri: string;
    tenant: string;
    clientId: string;
}

@Injectable({
    providedIn: 'root',
})
export class AppConfigService {
    private tenantConfig!: TenantConfig;

    loadConfig(): {
        envApiUri: string;
        tenant: string;
        clientId: string;
    } {
        try {
            this.tenantConfig = config as TenantConfig;
        } catch (error) {
            console.error('Failed to load tenant config', error);
            this.tenantConfig = {
                envApiUri: 'https://api.dev.docuvera-test.com',
                tenant: 'acme1dev',
                clientId: 'client-id',
            };
        }
        return (this.tenantConfig = config);
    }

    getAuthConfig() {
        return {
            authority: `${this.envApiUri}/api/auth/v1/oidc/${this.tenant}`,
            redirectUrl: `${this.envApiUri}/api/addon/v1/addons/entry/${this.tenant}/dv-example-addon`,
            clientId: this.clientId,
            scope: 'openid offline_access component:read component:write api:read api:write',
            responseType: 'code',
            silentRenew: true,
            customParamsAuthRequest: {
                resource: this.envApiUri,
            },
            customParamsCodeRequest: {
                resource: this.envApiUri,
            },
            autoUserInfo: false,
            useRefreshToken: true,
            logLevel: LogLevel.None,
            secureRoutes: [`${this.envApiUri}/api/component`],
        };
    }

    get clientId(): string {
        return this.tenantConfig.clientId;
    }

    get tenant(): string {
        return this.tenantConfig.tenant;
    }

    get envApiUri(): string {
        return this.tenantConfig.envApiUri;
    }
}