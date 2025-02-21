export interface DamRecord {
    tag:             string;
    contentType:     string;
    classifications: Classifications;
    files:           Files;
    fields:          Fields;
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
    values:     string[];
}

export interface Files {
    master:      string;
    addOrUpdate: FilesAddOrUpdate[];
}

export interface FilesAddOrUpdate {
    versions?:      Versions;
    id?:            string;
    watermarktype?: string;
    watermarkId?:   string;
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
    label:       string;
    tag:         string;
    filename?:   string;
    pageNumber?: number;
}

export interface PublicationItem {
    pageNumber:          number;
    targetFileVersionId: string;
}
