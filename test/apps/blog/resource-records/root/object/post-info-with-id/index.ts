import { ROOT_RESOURCE_ID } from "@ldsg/constants";
import { ObjectResource } from "@ldsg/object";

export const postInfoWithIdObject = new ObjectResource({
  id: "post-info-with-id-object",
  kind: "object",
  parentId: ROOT_RESOURCE_ID,
  settings: {
    title: "有ID博文信息",
    description: "",
    name: "post-info-with-id",
  },
});
