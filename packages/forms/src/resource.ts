import { FormResource } from "@ldsg/form";
import { Resource } from "@ldsg/resource";
import { FormsSpecificResourceSettings } from "./types";

export class FormsResource extends Resource<FormsSpecificResourceSettings> {
  getSubFormResources = () => {
    const { id, getFilteredResources } = this;

    const { resources } = getFilteredResources({
      parentId: id,
    });

    return resources as FormResource[];
  };
}
