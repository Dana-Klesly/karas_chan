import type { Config } from "jest";

const config: Config = {
  verbose: true,
  testEnvironment: "node",
  modulePathIgnorePatterns: ["dist"],
};

export default config;
