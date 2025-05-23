import { ROOT_RESOURCE_ID } from "@ldsg/constants";
import { ResourceDefinitionSpecificResourceSettings } from "@ldsg/resource-definition";
import { ResourceRecord } from "@ldsg/types";

export { ApplicationResource, handler } from "@ldsg/application";

export const resourceDefinition: ResourceRecord<ResourceDefinitionSpecificResourceSettings> =
  {
    id: "resource-definition",
    kind: "resource_definition",
    parentId: ROOT_RESOURCE_ID,
    settings: {
      title: "",
      description: "",
      kind: "",
      parentKind: ROOT_RESOURCE_ID,
      subKinds: [],
    },
  };
