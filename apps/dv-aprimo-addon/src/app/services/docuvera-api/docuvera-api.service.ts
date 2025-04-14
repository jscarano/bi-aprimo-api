import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, timeout } from 'rxjs';
import { AppConfigService } from '../app-config/app-config.service';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends BaseService {
  private readonly API_ENDPOINTS = {
      project: (id: string) => `/api/component/v2/projects/${id}`,
      properties: (id: string) => `/api/component/v2/projects/${id}/contents`,
      topics: () => `/api/component/v2/topics`
  } as const;

  constructor(
      private readonly http: HttpClient,
      private readonly config: AppConfigService
  ) {
    super();
  }

  getProjectUrl(projectId: string): string {
      return `${this.config.envApiUri}${this.API_ENDPOINTS.project(projectId)}`;
  }

  request<T>(method: 'GET' | 'POST' | 'PUT', url: string, body?: unknown): Observable<T> {
      return this.http.request<T>(method, url, { body }).pipe(
          retry(3),
          timeout(30000),
          catchError(this.handleError<T>(url))
      );
  }
}