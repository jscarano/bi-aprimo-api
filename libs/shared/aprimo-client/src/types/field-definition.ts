
  export interface FieldDefinition {
    name: string;
    id: string;
    rootId: string;
    label: string;
    dataType: string;
    acceptMultipleOptions?: boolean;
    items?: FieldDefinitionItem[];
    maximumLength?: number;
    minimumLength?: number;
  }

  export interface FieldDefinitionItem {
    id: string;
    name: string;
    label: string;
    labels: {
      value: string;
      languageId: string;
    }[];
  }