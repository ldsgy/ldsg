import { APP_MANIFEST } from "@ldsg/constants";
import { instantiateResourcesRequiredByApp } from "./instantiate-resources-required-by-app";

test("resolve-manifest-resources", () => {
  const { resourceRecords } = APP_MANIFEST;

  const { resources } = instantiateResourcesRequiredByApp({
    resourceRecords,
  });

  expect(resources).toMatchSnapshot();
});
