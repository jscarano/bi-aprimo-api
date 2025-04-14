export interface TopicComponent {
    id: string;
    locale: string;
    workspaceId: string;
    owner: string;
    content: {
        html: string;
        description: string;
    };
    componentType: string;
}
