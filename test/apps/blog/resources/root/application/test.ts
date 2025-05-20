import { ApplicationResource } from "@ldsg/application";
import { ROOT_RESOURCE_ID } from "@ldsg/constants";

export const testApplicationResource = new ApplicationResource({
  id: "test-application",
  kind: "application",
  parentId: ROOT_RESOURCE_ID,
  settings: {
    title: "测试应用",
    description: "",
  },
});
