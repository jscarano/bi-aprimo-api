import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { AppConfigService } from './services/app-config/app-config.service';
import { authInterceptor, provideAuth, StsConfigLoader, StsConfigStaticLoader } from 'angular-auth-oidc-client';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { DocuveraConnector } from '@asc/dv-addon-sdk';

const authFactory = (configService: AppConfigService) => {
    const config = configService.getAuthConfig();
    return new StsConfigStaticLoader(config);
};


export const appConfig: ApplicationConfig = {
  providers: [
    {
        provide: APP_INITIALIZER,
        multi: true,
        deps: [AppConfigService],
        useFactory: (config: AppConfigService) => {
            return () => {
                return config.loadConfig();
            };
        },
    },
    provideHttpClient(withInterceptors([authInterceptor()])),
    provideAuth({
        loader: {
            provide: StsConfigLoader,
            useFactory: authFactory,
            deps: [AppConfigService],
        },
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    {
        provide: DocuveraConnector,
        useFactory: () => new DocuveraConnector(),
    },
  ],
};
