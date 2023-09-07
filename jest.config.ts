module.exports = {
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.tsx"],

  preset: "ts-jest",
  rootDir: ".",
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "identity-obj-proxy",

    // Handle CSS imports (without CSS modules)
    "^.+\\.(css|sass|scss)$": "<rootDir>/test/mocks/styleMock.js",

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    "^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i": `<rootDir>/tests/mocks/fileMock.js`,

    // Handle module aliases
    "^~/(.*)$": "<rootDir>/$1",
    d3: "<rootDir>/node_modules/d3/dist/d3.min.js",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,tsx}",
    // "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    "<rootDir>/functions",
    "<rootDir>/src/contexts/",
    "<rootDir>/src/utils/",
  ],
  testEnvironment: "jsdom",
  verbose: false,
  //resolver: "jest-node-exports-resolver",
  // transform: { "^.+\\.ts?$": "ts-jest" },
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|jpeg|ttf|woff|woff2)$":
      "<rootDir>/tests/mocks/fileTransformer.js",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(dequal)/)",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
};
export {};
