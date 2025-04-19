import { APP_MANIFEST } from "@ldsg/constants";
import { getResourceKindMap } from "./get-resource-kind-map";

test("resolve-manifest-resources", () => {
  const { resourceRecords } = APP_MANIFEST;

  const { resourceKindMap } = getResourceKindMap({
    resourceRecords,
  });

  expect(resourceKindMap).toMatchSnapshot();
});
