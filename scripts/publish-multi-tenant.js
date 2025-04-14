const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Path to the directory containing tenant config files
const configDir = path.join(__dirname, '../configs');

// Function to get the list of tenants
function getTenants() {
    return fs
        .readdirSync(configDir)
        .filter((file) => file.endsWith('-config.json'))
        .map((file) => file.replace('-config.json', ''));
}

// Function to run a command synchronously
function runCommand(command, env) {
    execSync(command, { stdio: 'inherit', env: { ...process.env, ...env } });
}

// Function to update the version in the manifest file
async function updateVersion() {
    const { default: inquirer } = await import('inquirer');
    const MANIFEST_FILE = path.join(__dirname, '../apps/dv-aprimo-addon/dv-manifest.json');

    if (!fs.existsSync(MANIFEST_FILE)) {
        console.error('Manifest file not found!');
        process.exit(1);
    }

    const manifestData = JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf8'));
    const currentVersion = manifestData.version;
    console.log(`Current version: ${currentVersion}`);

    if (!currentVersion) {
        console.error('Failed to read current version from manifest file!');
        process.exit(1);
    }

    const [major, minor, patch] = currentVersion.split('.').map(Number);

    const questions = [
        {
            type: 'list',
            name: 'version_increment',
            message: 'How would you like to update the version?',
            choices: ['Increment patch version', 'Increment minor version', 'Increment major version', 'None'],
        },
    ];

    const answers = await inquirer.prompt(questions);
    let newVersion;
    switch (answers.version_increment) {
        case 'Increment patch version':
            newVersion = `${major}.${minor}.${patch + 1}`;
            break;
        case 'Increment minor version':
            newVersion = `${major}.${minor + 1}.0`;
            break;
        case 'Increment major version':
            newVersion = `${major + 1}.0.0}`;
            break;
        default:
            console.log('No version update selected.');
            return;
    }

    console.log(`New version: ${newVersion}`);
    manifestData.version = newVersion;

    fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifestData, null, 2));
    console.log(`Updated version from ${currentVersion} to ${newVersion} in ${MANIFEST_FILE}`);
}

// Main function to run the script
async function main() {
    const { default: inquirer } = await import('inquirer');
    const tenants = getTenants();

    if (tenants.length === 0) {
        console.error('No tenant configuration files found.');
        process.exit(1);
    }

    const tenantAnswers = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'selectedTenants',
            message: 'Select tenants to publish:',
            choices: tenants,
        },
    ]);

    const selectedTenants = tenantAnswers.selectedTenants;

    if (selectedTenants.length === 0) {
        console.log('No tenants selected.');
        return;
    }

    const versionAnswers = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'updateVersion',
            message: 'Would you like to update the version in the manifest file?',
            default: false,
        },
    ]);

    const updateVersionFlag = versionAnswers.updateVersion;

    // Set the environment variable for the update version flag
    const env = {
        UPDATE_VERSION_FLAG: updateVersionFlag ? '--update-version' : '',
    };

    for (const tenant of selectedTenants) {
        console.log(`Publishing for tenant: ${tenant}`);

        // Set the environment variable for the tenant
        env.TENANT = tenant;

        // Run the prebuild script
        runCommand('npx nx run dv-aprimo-addon:prebuild', env);

        // Run the build script with a valid output path
        const outputPath = `dist/${tenant}`;
        runCommand(`npx nx run dv-aprimo-addon:build-angular --configuration=production --outputPath=${outputPath}`, env);

        // Determine the build directory
        const buildDir = `../../dist/${tenant}/browser`;

        // Run the publish script with the build directory
        runCommand(`dv-addon-sdk publish ${buildDir}`, env);
    }

    console.log('Publishing completed for tenants.');
}

main();
