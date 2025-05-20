import { APP_MANIFEST } from "@ldsg/constants";
import { getResourceKindMap } from "./get-resource-kind-map";

test("get-resource-kind-map", () => {
  const { resourceRecords } = APP_MANIFEST;

  const { resourceKindMap } = getResourceKindMap({
    resourceRecords,
  });

  expect(resourceKindMap).toMatchSnapshot();
});
