import { Manifest } from "@ldsg/resource";
import { RESOURCE_KINDS_RESOURCES } from "../constants";

export const getConstants = (params: Manifest) => {
  const { resources } = params;

  const manifest: Manifest = {
    resources: [...RESOURCE_KINDS_RESOURCES, ...resources],
  };

  const res = { manifest };

  return res;
};
