import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';


import { CompositeIconComponent } from '../icons/composite-icon/composite-icon.component';
import { EquationIconComponent } from '../icons/equation-icon/equation-icon.component';
import { FigureIconComponent } from '../icons/figure-icon/figure-icon.component';
import { H1IconComponent } from '../icons/h1-icon/h1-icon.component';
import { H2IconComponent } from '../icons/h2-icon/h2-icon.component';
import { H3IconComponent } from '../icons/h3-icon/h3-icon.component';
import { H4IconComponent } from '../icons/h4-icon/h4-icon.component';
import { H5IconComponent } from '../icons/h5-icon/h5-icon.component';
import { LofIconComponent } from '../icons/lof-icon/lof-icon.component';
import { LorIconComponent } from '../icons/lor-icon/lor-icon.component';
import { LotIconComponent } from '../icons/lot-icon/lot-icon.component';
import { TableIconComponent } from '../icons/table-icon-component/table-icon-component.component';
import { TocIconComponent } from '../icons/toc-icon/toc-icon.component';
import { TopicIconComponent } from '../icons/topic-icon-component/topic-icon-component.component';
import { UnknownIconComponent } from '../icons/unknown-icon/unknown-icon.component';
import { SanitizeHtmlPipe } from '../../../utils/pipes/sanitize-html.pipe';
import { TruncatePipe } from '../../../utils/pipes/truncate.pipe';
import { InfoMessageComponent } from "../info-message/info-message.component";

// TODO: consider moving this into module:sidebar or lose the context and make it more generic
@Component({
    selector: 'app-selected-component',
    standalone: true,
    templateUrl: './selected-component.component.html',
    styleUrl: './selected-component.component.css',
    imports: [CommonModule, SanitizeHtmlPipe, TruncatePipe, InfoMessageComponent],
})
export class SelectedComponentComponent implements OnInit {
    @ViewChild('iconContainer', { read: ViewContainerRef, static: true }) iconContainer!: ViewContainerRef;

    @Input() selectedComponent!: {
        componentType: string;
        content: string;
    };

    noComponentSelectedMessage = {
        messageMain: 'No component selected.',
        messageSuffix: 'Select a component for content transformation.',
    };

    ngOnInit(): void {
        this.loadIcon();
    }

    getIcon(): Type<Component> {
        switch (this.selectedComponent.componentType) {
            case 'topic':
                return TopicIconComponent;
            case 'doctable':
                return TableIconComponent;
            case 'h1':
                return H1IconComponent;
            case 'h2':
                return H2IconComponent;
            case 'h3':
                return H3IconComponent;
            case 'h4':
                return H4IconComponent;
            case 'h5':
                return H5IconComponent;
            case 'composite':
                return CompositeIconComponent;
            case 'equation':
                return EquationIconComponent;
            case 'figure':
                return FigureIconComponent;
            case 'lof':
                return LofIconComponent;
            case 'lor':
                return LorIconComponent;
            case 'lot':
                return LotIconComponent;
            case 'toc':
                return TocIconComponent;
            default:
                return UnknownIconComponent;
        }
    }

    loadIcon(): Type<Component>  {
        return this.getIcon();
    }
}
