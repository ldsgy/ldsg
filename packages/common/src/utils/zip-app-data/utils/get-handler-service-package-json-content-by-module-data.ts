import _ from "lodash";
import { HandlerServiceModuleData } from "../../../types";
import { HANDLER_PACKAGE_JSON_BASE_FILE_INFO } from "../constants";

interface GetHandlerServicePackageJsonContentByModuleDataParams {
  moduleName: string;
  moduleData: HandlerServiceModuleData;
  reuseMainAppDependencies: string[];
}

export interface PackageJsonContent {
  name: string;
  version: string;
  main: string;
  scripts: Record<string, string>;
  dependencies?: Record<string, string>;
}

interface GetHandlerServicePackageJsonContentByModuleDataRes {
  content: PackageJsonContent;
}

type GetHandlerServicePackageJsonContentByModuleData = (
  params: GetHandlerServicePackageJsonContentByModuleDataParams
) => GetHandlerServicePackageJsonContentByModuleDataRes;

export const getHandlerServicePackageJsonContentByModuleData: GetHandlerServicePackageJsonContentByModuleData =
  (params) => {
    const { moduleName, moduleData, reuseMainAppDependencies } = params;

    const { modules } = moduleData;

    const { content } = HANDLER_PACKAGE_JSON_BASE_FILE_INFO;

    _.set(content, "name", moduleName);

    const dependencies = _.omit(
      _.fromPairs(modules.map((value) => [value.name, value.version])),
      reuseMainAppDependencies
    );

    _.set(content, "dependencies", dependencies);

    const res = { content };

    return res;
  };
