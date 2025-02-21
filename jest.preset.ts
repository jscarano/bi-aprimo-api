import nxPreset from "@nx/jest/preset";
import path from "path";
export default {
  ...nxPreset,
  collectCoverage: true,
  collectCoverageFrom: ["./src/**/*.ts"],
  coverageReporters: ["cobertura", "html", "text-summary", "json"],

  moduleNameMapper: {
    "@bi/utils/asc-common": `${path.resolve(__dirname)}/libs/utils/asc-common/src/index.ts`,
    "@bi/shared/aprimo-client": `${path.resolve(__dirname)}/libs/shared/aprimo-client/src/index.ts`,
  },
  testEnvironment: "node",
  transform: {
    "^.+\\.[tj]s$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.spec.json",
      },
    ],
  },
  moduleFileExtensions: ["ts", "js", "html"],
};
