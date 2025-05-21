import { ROOT_RESOURCE_ID } from "@ldsg/constants";
import { ObjectResource } from "@ldsg/object";

export const postInfoWithoutIdObject = new ObjectResource({
  id: "post-info-without-id-object",
  kind: "object",
  parentId: ROOT_RESOURCE_ID,
  settings: {
    title: "无ID博文信息",
    description: "",
    name: "post-info-without-id",
  },
});
