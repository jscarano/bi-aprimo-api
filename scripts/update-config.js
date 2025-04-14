const fs = require('fs');
const path = require('path');

// Get tenant identifier and version update flag from environment variables or command-line arguments
const tenant = process.env.TENANT || process.argv[2];
const updateVersionFlag = process.env.UPDATE_VERSION || process.argv.includes('--update-version');

if (!tenant) {
    console.error('Tenant identifier is required.');
    process.exit(1);
}

// Path to the tenant-specific config file
const tenantConfigPath = path.join(__dirname, '../configs', `${tenant}-config.json`);

// Path to the target config file
const targetConfigPath = path.join(__dirname, '../apps/dv-aprimo-addon/src/assets', 'tenant-config.json');

// Path to the manifest file
const MANIFEST_FILE = path.join(__dirname, '../apps/dv-aprimo-addon', 'dv-manifest.json');

// Function to update the version in the manifest file
async function updateVersion() {
    const { default: inquirer } = await import('inquirer');

    if (!fs.existsSync(MANIFEST_FILE)) {
        console.error("Manifest file not found!");
        process.exit(1);
    }

    const manifestData = JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf8'));
    const currentVersion = manifestData.version;
    console.log(`Current version: ${currentVersion}`);

    if (!currentVersion) {
        console.error("Failed to read current version from manifest file!");
        process.exit(1);
    }

    const [major, minor, patch] = currentVersion.split('.').map(Number);

    const questions = [
        {
            type: 'list',
            name: 'version_increment',
            message: "How would you like to update the version?",
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
            newVersion = `${major + 1}.0.0`;
            break;
        default:
            console.log("No version update selected.");
            return;
    }

    console.log(`New version: ${newVersion}`);
    manifestData.version = newVersion;

    fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifestData, null, 2));
    console.log(`Updated version from ${currentVersion} to ${newVersion} in ${MANIFEST_FILE}`);
}

// Read tenant-specific config and write to the target config file
fs.readFile(tenantConfigPath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading config file for tenant ${tenant}:`, err);
        process.exit(1);
    }

    fs.writeFile(targetConfigPath, data, 'utf8', (err) => {
        if (err) {
            console.error(`Error writing to target config file:`, err);
            process.exit(1);
        }

        console.log(`Config file for tenant ${tenant} has been updated.`);

        // Update version if the flag is set
        if (updateVersionFlag) {
            updateVersion();
        }
    });
});