export interface SearchExpression {
    searchExpression: {
        supportWildcards: boolean;
        defaultLogicalOperator: 'AND' | 'OR';
        languages: string[];
        expression: string;
        parameters: string[];
        namedParameters: Record<string, string>[];
        subExpressions: any;
    };
    logRequest: boolean;
}
