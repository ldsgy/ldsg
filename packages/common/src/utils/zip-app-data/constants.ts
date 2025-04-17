export const ENV_FILE_INFO = {
  name: ".env",
};

export const HANDLER_PACKAGE_JSON_BASE_FILE_INFO = {
  name: "package.json",
  content: {
    name: "PACKAGE-NAME",
    version: "1.0.0",
    main: "dist/index.js",
    scripts: {
      build: "tsc",
    },
    dependencies: {},
  },
};

export const HANDLER_TSCONFIG_JSON_FILE_INFO = {
  name: "tsconfig.json",
  content: {
    compilerOptions: {
      module: "commonjs",
      declaration: true,
      removeComments: true,
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
      allowSyntheticDefaultImports: true,
      target: "ES2021",
      sourceMap: true,
      outDir: "./dist",
      baseUrl: "./",
      incremental: true,
      skipLibCheck: true,
      strictNullChecks: false,
      noImplicitAny: false,
      strictBindCallApply: false,
      forceConsistentCasingInFileNames: false,
      noFallthroughCasesInSwitch: false,
      resolveJsonModule: true,
      esModuleInterop: true,
      noEmitOnError: true,
    },
  },
};

export const HANDLER_SRC_INDEX_TS_FILE_INFO = {
  name: "index.ts",
};
