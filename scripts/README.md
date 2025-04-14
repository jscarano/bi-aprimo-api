## Publish Multi-Tenant Script
This script automates the process of publishing for multiple tenants. It performs the following steps for each selected tenant:

1. Prompts the user to select tenants.
2. Optionally updates the version in the manifest file.
3. Runs prebuild, build, and publish scripts for each tenant.

### Usage
1. **Select Tenants**: The script will prompt you to select the tenants you want to publish for. If no tenants are selected, the script will exit.
2. **Update Version**: The script will ask if you want to update the version in the manifest file. If you choose to update, it will set an environment variable `UPDATE_VERSION_FLAG` accordingly.
3. **Publishing Process**:
    * For each selected tenant, the script will:
        * Set the environment variable for the tenant.
        * Run the prebuild script: `npx nx run co-author:prebuild`.
        * Run the build script: `npx nx run co-author:build --configuration=production --output-path=dist/{tenant}`.
        * Determine the build directory: `../../dist/{tenant}/browser`.
        * Run the publish script: `co-author-sdk publish {buildDir}`.
4. **Completion**: Once all tenants are processed, the script will log that the publishing is completed.

### Example
To run the script, use the following command:
```
npx nx run co-author:publish-multi-tenant
```

OR 

```
node publish-multi-tenant.js
```

Follow the prompts to select tenants and decide whether to update the version.

### Environment Variables
* `UPDATE_VERSION_FLAG`: Set to `--update-version` if the version update is confirmed.
* `TENANT`: Set to the current tenant being processed.

### Notes
* Ensure that the co-author-sdk and other required tools are properly installed and configured.
* The script assumes the build output path follows the pattern dist/{tenant}/browser.

## Update Config Script
This script updates the configuration for a specified tenant and optionally updates the version in the manifest file.

### Prerequisites
* Node.js installed
* `inquirer` package installed

### Usage
Set Environment Variables:
* `TENANT`: The identifier for the tenant.
* `UPDATE_VERSION`: Set to true to update the version in the manifest file.

Example
To update the configuration for tenant tenant1 and update the version:
```
npx nx run co-author:prebuild
```

OR

```
TENANT=tenant1 UPDATE_VERSION=true node update-config.js
```

OR 

```
node update-config.js tenant1 --update-version
```

### Environment Variables
* `TENANT`: The identifier for the tenant.
* `UPDATE_VERSION`: Set to true to update the version in the manifest file.

### Script Details
1. **Get Tenant Identifier and Version Update Flag**:
    * The script retrieves the tenant identifier and version update flag from environment variables or command-line arguments.
2. Paths:
    * `tenantConfigPath`: Path to the tenant-specific config file.
    * `targetConfigPath`: Path to the target config file.
    * `MANIFEST_FILE`: Path to the manifest file.
3. **Update Version Function**:
    * Prompts the user to select how to update the version (patch, minor, major).
    * Updates the version in the manifest file based on user input.
4. **Read and Write Config Files**:
    * Reads the tenant-specific config file.
    * Writes the content to the target config file.
    * If the version update flag is set, it calls the updateVersion function.

### Notes
* Ensure that the inquirer package is installed:
```
npm install inquirer
```

* The script assumes the config files and manifest file are located in specific directories relative to the script's location.