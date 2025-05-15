import { Manifest } from "@ldsg/resource";

export const manifest: Manifest = {
  resources: [
    {
      id: "HANDLER_RESOURCE_DEFINITION",
      parentId: "ROOT",
      kind: "resource_definition",
      settings: {
        title: "处理程序资源定义",
        description:
          "此资源用于定义处理程序资源，处理程序资源主要包含引入模块列表与相应的处理程序代码，处理程序类型资源无子级资源。",
        kind: "handler",
        subKinds: [],
      },
    },
    {
      id: "HANDLER_RESOURCE_HANDLER",
      parentId: "HANDLER_RESOURCE_DEFINITION",
      kind: "handler",
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
};
