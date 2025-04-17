export const FILES_IN_HANDLER_MODELE = [
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
] as const;

export const FILES_IN_ROOT_MODELE = [
  {
    path: ".env",
  },
  {
    path: "index.ts",
    data: 'import { createApp } from "@ldsg/app";\nimport { SERVICE_TYPE_MAP } from "@ldsg/services";\nimport { StorageService } from "@ldsgy/storage-service";\nimport SERVICE_RECORDS_JSON from "./service-records.json";\n\nconst app = createApp({\n  serviceRecords: SERVICE_RECORDS_JSON,\n  serviceTypeMap: {\n    ...SERVICE_TYPE_MAP,\n    STORAGE: {\n      class: StorageService,\n    },\n  },\n});\n\nconst port = process.env.PORT || "3000";\n\napp.listen(port, () => {\n  console.log(`App listening on http://localhost:${port}`);\n\n  console.log(`GraphQL listening on http://localhost:${port}/graphql`);\n});\n',
  },
  {
    path: "manifest.json",
  },
  {
    path: "package.json",
    data: {
      name: "ldsg-app",
      version: "0.0.0",
      description: "",
      author: "",
      private: true,
      license: "UNLICENSED",
      scripts: {
        build:
          "pnpm run --workspace-root build:workspace-root && pnpm run --workspace-root build:recursive",
        "build:workspace-root": "tsc --project tsconfig.json",
        "build:recursive": "pnpm run --recursive build",
        start: "node dist/index.js",
      },
      dependencies: {
        "@ldsg/app": "latest",
        graphql: "^16.9.0",
        "graphql-middleware": "^6.1.35",
        "graphql-shield": "^7.6.5",
      },
      devDependencies: {
        "@types/node": "^22.1.0",
        "ts-loader": "^9.5.1",
        tslib: "^2.6.3",
        typescript: "^5.5.4",
      },
    },
  },
  {
    path: "pnpm-workspace.yaml",
    data: `packages:
  - "handlers/*"
`,
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
      },
      include: ["./index.ts", "./manifest.json"],
    },
  },
] as const;
