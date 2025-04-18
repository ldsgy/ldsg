import { ResourceRecord, ResourceSettings } from "@ldsg/resource";
import { ROOT_RESOURCE_ID } from "../constants";
import { getConstants } from "./get-constants";

const applicationResourceRecords: ResourceRecord<ResourceSettings>[] = [
  {
    id: "main-app",
    kind: "APPLICATION",
    parentId: ROOT_RESOURCE_ID,
    settings: {
      title: "主要应用",
      description: "",
    },
  },
];

test("get constants", () => {
  const { manifest } = getConstants({
    resourceRecords: applicationResourceRecords,
  });

  expect(manifest).toMatchSnapshot();
});
