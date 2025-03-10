export interface AprimoRecord {
    tag?:             string;
    contentType:      string;
    classifications?: Classifications;
    files?:           AprimoRecordFile;
    fields?:          Fields;
}

export interface Classifications {
    addOrUpdate: ClassificationsAddOrUpdate[];
}

export interface ClassificationsAddOrUpdate {
    id:        string;
    sortIndex: number;
}

export interface Fields {
    addOrUpdate: FieldsAddOrUpdate[];
}

export interface FieldsAddOrUpdate {
    id:              string;
    localizedValues: LocalizedValue[];
}

export interface LocalizedValue {
    languageId: string;
    values?:    string[];
    value?:     string;
}

export interface AprimoRecordFile {
    master:      string;
    addOrUpdate: FileAddOrUpdate[];
}

export interface FileAddOrUpdate {
    versions?:        Versions;
    id?:              string;
}

export interface Versions {
    addOrUpdate: VersionsAddOrUpdate[];
}

export interface VersionsAddOrUpdate {
    id:                string;
    filename?:         string;
    tag?:              string;
    versionLabel?:     string;
    comment?:          string;
    additionalFiles?:  AdditionalFiles;
    previews?:         AdditionalFiles;
    publicationItems?: PublicationItem[];
    watermarktype?:    string;
    watermarkId?:      string;
}

export interface AdditionalFiles {
    addOrUpdate: AdditionalFilesAddOrUpdate[];
}

export interface AdditionalFilesAddOrUpdate {
    id:          string;
    label?:       string;
    tag?:         string;
    filename?:   string;
    pageNumber?: number;
}

export interface PublicationItem {
    pageNumber:          number;
    targetFileVersionId: string;
}
