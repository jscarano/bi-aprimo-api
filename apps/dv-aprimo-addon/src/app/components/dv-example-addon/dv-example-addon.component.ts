import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocuveraSelectionType } from '@asc/dv-addon-sdk';
import { DocuveraAddonSdkContextService } from '../../services/docuvera-context/docuvera-addon-sdk-context.service';
import { combineLatest, filter, Observable } from 'rxjs';

@Component({
  selector: 'app-dv-example-addon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dv-example-addon.component.html',
  styleUrl: './dv-example-addon.component.css',
})
export class DvExampleAddonComponent implements OnInit {
  readonly DocuveraSelectionType = DocuveraSelectionType;

  user$: Observable<any>;
  project$: Observable<any>;
  isReadOnly$: Observable<any>;
  
  selectionType$: Observable<any>;
  componentSelection$: Observable<any>;
  generatedContentSelection$: Observable<any>;
  sectionSelection$: Observable<any>;

  constructor(private contextService: DocuveraAddonSdkContextService) {
    this.user$ = this.contextService.getUser();
    this.project$ = this.contextService.getProject();
    this.isReadOnly$ = this.contextService.isProjectReadOnly();

    this.selectionType$ = this.contextService.getSelectionType();
    this.componentSelection$ = this.contextService.getComponentSelection();
    this.generatedContentSelection$ = this.contextService.getGeneratedContentSelection();
    this.sectionSelection$ = this.contextService.getSectionSelection();
  }

  ngOnInit(): void {
    this.contextService.getComponentWithProjectContext()
      .subscribe(({ component, readonly, projectId }) => {
        console.log('Component in project context:', {
          component,
          readonly,
          projectId
        });
      });

    combineLatest([
      this.contextService.getEditableComponents(),
      this.contextService.isProjectReadOnly()
    ]).pipe(
      filter(([_, readonly]) => !readonly)
    ).subscribe(([component]) => {
      console.log('Editable component in writable project:', component);
    });
  }
}
