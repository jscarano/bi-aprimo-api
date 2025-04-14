export interface Project {
    readonly id: string;
    readonly componentType: string;
    readonly isProtected: boolean;
    readonly locale: string;
    readonly revision: number;
    readonly workspaceId: string;
    readonly metadataSettings: MetadataSettings;
    containedComponents: ContainedComponent[];
    content: Content;
}

export interface MetadataSettings {
    template?: Record<string, MetadataSetting>;
}

export interface MetadataSetting {
    definitionLink: DefinitionLink;
    isRequired: boolean;
    applyTo: string;
    isTemplate: boolean;
    isRemovable: boolean;
    value?: string;
}

export interface DefinitionLink {
    revision: number;
}

export interface ContainedComponent {
    id: string;
    componentId: string;
    componentType: string;
    instanceId?: string;
}

export interface Content {
    readonly title: string;
    readonly isTemplate: boolean;
    readonly basedOn: string;
    sections: Section[];
    readonly metadataSettings: [];
    readonly metadataSettingsOrder: [];
}

export interface Section {
    readonly id: string;
    readonly title: string;
    readonly templateSectionId?: string;
    content: string[];
    subsections: Section[];
}

export interface Metadata {
    id: string;
    isProtected: boolean;
    locale: string;
    revision: number;
    derivedFrom: Record<string, unknown>;
    propertyMappings: Record<string, unknown>;
    isActive: boolean;
    content: MetadataContent;
}

export interface MetadataContent {
    definitionName: string;
    dataType: string;
    isPlaceholder: boolean;
    isPicklist: boolean;
    isMultiselect: boolean;
    allowedValues: AllowedValue[];
}

export interface AllowedValue {
    id: string;
    value: string;
}
