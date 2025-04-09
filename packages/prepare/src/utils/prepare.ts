import { HandlerResourceSettings } from "@ldsg/handler";
import { Manifest } from "@ldsg/resource";
import _ from "lodash";

interface Params {
  manifest: Manifest;
}

type Prepare = (params: Params) => Promise<void>;

export const prepare: Prepare = async (params) => {
  const { manifest } = params;

  const { resources } = manifest;

  const handlerResources = resources.filter(
    (value) => value.kind === "HANDLER"
  ) as Manifest.Resource<HandlerResourceSettings>[];

  const dependencies = _.flatMapDeep(
    handlerResources.map((value) => value.settings.dependencies)
  );

  console.debug("dependencies", dependencies);
};
