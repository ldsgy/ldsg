import { ResourceRecord, ResourceSettings } from "@ldsg/types";
import { ROOT_RESOURCE_ID } from "../constants";
import { getManifestByResourceRecordsWithResourceModules } from "./get-manifest-by-resource-records-with-resource-modules";

const applicationResourceRecords: ResourceRecord<ResourceSettings>[] = [
  {
    id: "main-app",
    kind: "application",
    parentId: ROOT_RESOURCE_ID,
    settings: {
      title: "主要应用",
      description: "",
    },
  },
];

test("get constants", () => {
  const { manifest } = getManifestByResourceRecordsWithResourceModules({
    resourceRecords: applicationResourceRecords,
  });

  expect(manifest).toMatchSnapshot();
});
