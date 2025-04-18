export const FILES_IN_HANDLER_MODULE = [
  {
    path: "src/index.ts",
  },
  {
    path: "package.json",
    data: {
      name: "PACKAGE-NAME",
      version: "1.0.0",
      main: "dist/index.js",
      scripts: {
        build: "tsc",
      },
      dependencies: {},
    },
  },
  {
    path: "tsconfig.json",
    data: {
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
  },
];
