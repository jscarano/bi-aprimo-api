import { Injectable } from '@angular/core';
import { ComponentSelectionContext, DocuveraConnector, DocuveraSelectionContext, DocuveraSelectionType, GeneratedContentSelectionContext, SectionSelectionContext } from '@asc/dv-addon-sdk';
import { BehaviorSubject, combineLatest, distinctUntilChanged, filter, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocuveraAddonSdkContextService {
  private readonly context$ = new BehaviorSubject<any>(null);

  // Project and User streams
  readonly project$ = this.createDistinctStream<{
    id: string;
    snapshotId: string;
    readonly: boolean;
  }>(
    context => context?.project,
    (prev, curr) => this.isEqual(prev, curr)
  );

  readonly user$ = this.createDistinctStream<{
    id: string;
    name: string;
  }>(
    context => context?.user,
    (prev, curr) => this.isEqual(prev, curr)
  );

  // Base selection stream
  private readonly selection$ = this.createDistinctStream<DocuveraSelectionContext>(
    context => context?.selection,
    (prev, curr) => this.isEqual(prev, curr)
  );

  // Type-specific selection streams
  readonly componentSelection$ = this.selection$.pipe(
    filter((selection): selection is ComponentSelectionContext => 
      selection?.type === DocuveraSelectionType.Component
    )
  );

  readonly generatedContentSelection$ = this.selection$.pipe(
    filter((selection): selection is GeneratedContentSelectionContext => 
      selection?.type === DocuveraSelectionType.GeneratedContent
    )
  );

  readonly sectionSelection$ = this.selection$.pipe(
    filter((selection): selection is SectionSelectionContext => 
      selection?.type === DocuveraSelectionType.Section
    )
  );

  constructor(private docuvera: DocuveraConnector) {
    this.docuvera.context$.pipe(
      filter(context => !!context)
    ).subscribe(context => {
      this.context$.next(context);
    });
  }

  // Project-related methods
  getProject() {
    return this.project$;
  }

  getProjectId() {
    return this.project$.pipe(
      map(project => project?.id),
      distinctUntilChanged()
    );
  }

  isProjectReadOnly() {
    return this.project$.pipe(
      map(project => project?.readonly),
      distinctUntilChanged()
    );
  }

  // User-related methods
  getUser() {
    return this.user$;
  }

  getUserId() {
    return this.user$.pipe(
      map(user => user?.id),
      distinctUntilChanged()
    );
  }

  getUserName() {
    return this.user$.pipe(
      map(user => user?.name),
      distinctUntilChanged()
    );
  }

  // Helper methods for specific selection types
  getComponentSelection() {
    return this.componentSelection$;
  }

  getGeneratedContentSelection() {
    return this.generatedContentSelection$;
  }

  getSectionSelection() {
    return this.sectionSelection$;
  }

  // Get current selection type
  getSelectionType() {
    return this.selection$.pipe(
      map(selection => selection?.type),
      distinctUntilChanged()
    );
  }

  // Watch for specific component
  watchComponent(componentId: string) {
    return this.componentSelection$.pipe(
      filter(selection => selection.componentId === componentId)
    );
  }

  // Watch for editable components only
  getEditableComponents() {
    return this.componentSelection$.pipe(
      filter(selection => selection.editable === true)
    );
  }

  // Watch for components in edit mode
  getComponentsInEditMode() {
    return this.componentSelection$.pipe(
      filter(selection => selection.editMode === true)
    );
  }

  // Combined information methods
  getProjectAndUser() {
    return combineLatest([this.project$, this.user$]).pipe(
      map(([project, user]) => ({ project, user }))
    );
  }

  getComponentWithProjectContext() {
    return combineLatest([this.componentSelection$, this.project$]).pipe(
      map(([selection, project]) => ({
        component: selection,
        readonly: project.readonly,
        projectId: project.id
      }))
    );
  }

  private createDistinctStream<T>(
    selector: (context: any) => T,
    comparator: (prev: T, curr: T) => boolean
  ): Observable<T> {
    return this.context$.pipe(
      map(selector),
      filter((value): value is NonNullable<T> => value !== undefined),
      distinctUntilChanged(comparator)
    );
  }

  private isEqual(prev: any, curr: any): boolean {
    if (prev === curr) return true;
    if (!prev || !curr) return false;
    return JSON.stringify(prev) === JSON.stringify(curr);
  }
}
