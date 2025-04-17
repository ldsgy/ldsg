import { HandlerResourceDependency } from "@ldsg/handler";
import _ from "lodash";

interface GetHandlerPackageJsonParams {
  packageJson: PackageJson;
  moduleName: string;
  dependencies: HandlerResourceDependency[];
  reuseMainAppDependencies: string[];
}

export interface PackageJson {
  name: string;
  version: string;
  main: string;
  scripts: Record<string, string>;
  dependencies: Record<string, string>;
}

interface GetHandlerPackageJsonRes {
  packageJson: PackageJson;
}

type GetHandlerPackageJson = (
  params: GetHandlerPackageJsonParams
) => GetHandlerPackageJsonRes;

export const getHandlerPackageJson: GetHandlerPackageJson = (params) => {
  const { moduleName, dependencies, reuseMainAppDependencies, packageJson } =
    params;

  _.set(packageJson, "name", moduleName);

  const packageJsonDependencies = _.omit(
    _.fromPairs(
      dependencies.map((value) => [value.name, value.version ?? "latest"])
    ),
    reuseMainAppDependencies
  );

  _.set(packageJson, "dependencies", packageJsonDependencies);

  const res = { packageJson };

  return res;
};
