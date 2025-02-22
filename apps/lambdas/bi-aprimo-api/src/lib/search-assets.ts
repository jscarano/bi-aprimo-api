import { AprimoClient, SearchExpression, SearchResult } from "@bi/shared/aprimo-client";

export async function searchAssets(client: AprimoClient, searchExpression: SearchExpression): Promise<SearchResult[] | undefined> {
    return await client.searchRecords(searchExpression);
}