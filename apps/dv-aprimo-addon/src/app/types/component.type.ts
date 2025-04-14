export interface TopicComponent {
    id: string;
    locale: string;
    workspaceId: string;
    owner: string;
    metadataSettings: any;
    content: {
        html: string;
        description: string;
    };
    componentType: string;
}
