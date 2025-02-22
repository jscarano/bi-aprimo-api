import { AprimoClient, FieldDefinition } from "@bi/shared/aprimo-client";

export async function resolveSearchFields(client: AprimoClient, fields: { [index: string]: string }): Promise<FieldDefinition[]> {
    const fieldDefinitions = await client.getFieldDefinitions();

    const fieldNames = Object.values(fields);
    return fieldDefinitions.filter((field) => fieldNames.includes(field.name));
}