process.env.NEW_RELIC_ENABLED = "false";
process.env.NEW_RELIC_NO_CONFIG_FILE = "false";
process.env.NEW_RELIC_LOG_ENABLED = "false";

// For a detailed explanation regarding each configuration property, visit: https://jestjs.io/docs/en/configuration.html
import jestPreset from "../../../jest.preset";
const dirName = `${__dirname.split("/").pop()}`;
const coverageDirectory = `../../../coverage/${dirName}`;

/* eslint-disable */
export default {
  ...jestPreset,
  coverageThreshold: {
    global: {
      branches: 65,
      functions: 80,
      lines: 90,
      statements: 90,
    },
  },
  reporters: [
    "default",
    ["jest-junit", { outputName: `test-results/${dirName}-results.xml` }],
  ],
  coverageDirectory,
  testEnvironment: "node",
};
