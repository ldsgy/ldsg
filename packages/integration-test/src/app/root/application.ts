import { ApplicationResource } from "@ldsg/application";
import { ROOT_RESOURCE_ID } from "@ldsg/constants";

export const testApplicationResource = new ApplicationResource({
  id: "test-application",
  parentId: ROOT_RESOURCE_ID,
});
