import { ObjectResource } from "@ldsg/object";
export * from "./object-fields";

export const objectResource = new ObjectResource({
  id: "id-object",
  kind: "object",
  parentId: "root",
  settings: {
    title: "ID",
    description: "",
    name: "id",
  },
});
