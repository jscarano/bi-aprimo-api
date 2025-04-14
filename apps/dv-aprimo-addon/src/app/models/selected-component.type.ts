import { DocuveraSelectionType } from '@asc/dv-addon-sdk/connector/types';

export interface SelectedComponent {
    componentLinkId: string;
    type: DocuveraSelectionType.Component;
    componentId: string;
    editMode?: boolean;
    editable?: boolean;
    componentType: string;
    content?: string;
}
