import jestPreset from "../../../jest.preset";
const dirName = `${__dirname.split("/").pop()}`;
const coverageDirectory = `../../../coverage/${dirName}`;

/* eslint-disable */
export default {
  ...jestPreset,
  globals: {
    NEW_RELIC_NO_CONFIG_FILE: true,
    NEW_RELIC_ENABLED: false,
    NEW_RELIC_LOG_ENABLED: false,
  },
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  reporters: [
    "default",
    ["jest-junit", { outputName: `test-results/${dirName}-results.xml` }],
  ],
  coverageDirectory,
};
