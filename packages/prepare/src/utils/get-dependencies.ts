import {
  HandlerResourceDependency,
  HandlerResourceSettings,
} from "@ldsg/handler";
import { Manifest } from "@ldsg/resource";
import _ from "lodash";

interface Params {
  manifest: Manifest;
}

type GetDependencies = (params: Params) => HandlerResourceDependency[];

export const getDependencies: GetDependencies = (params) => {
  const { manifest } = params;

  const { resources } = manifest;

  const handlerResources = resources.filter(
    (value) => value.kind === "HANDLER"
  ) as Manifest.Resource<HandlerResourceSettings>[];

  const res = _.flatMapDeep(
    handlerResources.map((value) => value.settings.dependencies)
  );

  return res;
};
