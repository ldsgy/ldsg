import { getDependencies } from "./get-dependencies";

test("getDependencies", () => {
  const getDependenciesRes = getDependencies({
    resources: [
      {
        id: "HANDLER_RESOURCE_DEFINITION",
        parentId: "ROOT",
        kind: "RESOURCE_DEFINITION",
        settings: {
          title: "处理程序资源定义",
          description:
            "此资源用于定义处理程序资源，处理程序资源主要包含引入模块列表与相应的处理程序代码，处理程序类型资源无子级资源。",
          kind: "HANDLER",
          subKinds: [],
        },
      },
      {
        id: "HANDLER_RESOURCE_HANDLER",
        parentId: "HANDLER_RESOURCE_DEFINITION",
        kind: "HANDLER",
        settings: {
          title: "处理程序资源处理程序",
          description: "所有处理程序资源都需要通过此处理程序进行处理。",
          dependencies: [
            {
              name: "@ldsg/handler",
            },
          ],
        },
      },
    ],
  });

  expect(getDependenciesRes).toMatchSnapshot();
});
