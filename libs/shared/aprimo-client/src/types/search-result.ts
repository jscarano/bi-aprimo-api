export interface SearchResult {
    id: string;
    fields: any;
    files: any;
    preview: Preview;
    thumbnail: any;
    masterFile: any;
    masterFileLatestVersion: any;
    classifications: any;
    accessLists: any;
    status: string;
    contentType: string;
    title: string;
    tag: any;
    textContent: any;
    permissions: any;
    locks: any;
    aiInfluenced: string;
    analyticsData: any;
    hasImageOverlay: boolean;
    modifiedOn: string;
    modifiedBy: any;
    createdOn: string;
    createdBy: any;
  }

  export interface Preview {
    size: number
    width: number
    height: number
    extension: string
    uri: string
  }
