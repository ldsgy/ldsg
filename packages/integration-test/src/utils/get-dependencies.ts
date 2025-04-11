import {
  HandlerResourceDependency,
  HandlerResourceSettings,
} from "@ldsg/handler";
import { Manifest } from "@ldsg/resource";
import _ from "lodash";

interface Params {
  resources: Manifest.Resource[];
}

type GetDependencies = (params: Params) => HandlerResourceDependency[];

export const getDependencies: GetDependencies = (params) => {
  const { resources } = params;

  const handlerResources = resources.filter(
    (value) => value.kind === "HANDLER"
  ) as Manifest.Resource<HandlerResourceSettings>[];

  const res = _.flatMapDeep(
    handlerResources.map((value) => value.settings.dependencies)
  );

  return res;
};
