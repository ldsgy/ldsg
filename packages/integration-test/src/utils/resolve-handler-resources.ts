import { ResolveResourcesParams } from "./types";

const HANDLER_KIND = "HANDLER";

/**
 * TODO: 解析出所有 handler 类型资源并用 handler 类型资源所规定的 handler 解析为处理方法
 */
export const resolveHandlerResources = (params: ResolveResourcesParams) => {
  const { resources } = params;

  const handlerResourceDefinitionResource = resources.filter(
    (value) =>
      value.kind === "RESOURCE_DEFINITION" &&
      value.settings.kind === HANDLER_KIND
  );

  const handlerResources = resources.filter(
    (value) => value.kind === "HANDLER"
  );

  const a = handlerResources.find((value) => value.parentId);
};
