import { Injectable, signal } from '@angular/core';
import { Project } from '../../models/project.type';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, shareReplay, tap } from 'rxjs';
import { BaseService } from '../base/base.service';
import { ApiService } from '../docuvera-api/docuvera-api.service';

@Injectable({
  providedIn: 'root'
})

export class DocuveraProjectService extends BaseService {
  private readonly projectState = signal<Project | null>(null);
  public readonly project = this.projectState.asReadonly();

  constructor(
      private readonly http: HttpClient,
      private readonly apiService: ApiService
  ) {
    super();
  }

  getProject(projectId: string): Observable<Project> {
      return this.http.get<Project>(this.apiService.getProjectUrl(projectId)).pipe(
          tap(project => this.projectState.set(project)),
          shareReplay(1),
          catchError((error, caught) => this.handleError('getProject', error)(caught))
      );
  }
}
