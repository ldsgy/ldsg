import { HandlerResourceSettings } from "@ldsg/handler";
import { Manifest } from "@ldsg/resource";
import _ from "lodash";
import { PrepareParams } from "./types";

type Prepare = (params: PrepareParams) => Promise<void>;

export const prepare: Prepare = async (params) => {
  const { manifest } = params;

  const { resources } = manifest;

  // const dependencies = getDependencies({ resources });

  const handlerResources = resources.filter(
    (value) => value.kind === "HANDLER"
  ) as Manifest.Resource<HandlerResourceSettings>[];

  const dependencies = _.flatMapDeep(
    handlerResources.map((value) => value.settings.dependencies)
  );

  handlerResources.map((value) => value.settings.code);

  console.debug("dependencies", dependencies);
};
