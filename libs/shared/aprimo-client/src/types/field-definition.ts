
  export interface FieldDefinition {
    name: string;
    id: string;
    label: string;
    dataType: string;
    acceptMultipleOptions?: boolean;
    items?: Item[];
    maximumLength?: number;
    minimumLength?: number;
  }

  export interface Item {
    id: string;
    name: string;
    label: string;
  }