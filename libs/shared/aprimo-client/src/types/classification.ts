export interface Classification {
    items: ClassificationItem[];
}

export interface ClassificationItem {
    id:                            string;
    name:                          string;
    labels:                        Label[];
    isRoot:                        boolean;
    parentId:                      string;
}

export interface Label {
    value:      string;
    languageId: string;
}