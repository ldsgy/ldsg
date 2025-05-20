import { ApplicationResource } from "@ldsg/application";
import { ROOT_RESOURCE_ID } from "@ldsg/constants";

export const applicationResource = new ApplicationResource({
  id: "blog-application",
  kind: "application",
  parentId: ROOT_RESOURCE_ID,
  settings: {
    title: "博客应用",
    description: "",
  },
});
