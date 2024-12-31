import { getPathInfo } from ".";

test("include application id path", () => {
  const getPathInfoRes = getPathInfo({
    basePath: "/testappid/",
    path: "/testappid/graphql",
  });

  expect(getPathInfoRes).toEqual({
    endpoint: "graphql",
    relativePath: "graphql",
  });
});

test("without application id path", () => {
  const getPathInfoRes = getPathInfo({
    basePath: "/",
    path: "/graphql",
  });

  expect(getPathInfoRes).toEqual({
    endpoint: "graphql",
    relativePath: "graphql",
  });
});
