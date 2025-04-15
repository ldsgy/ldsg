import {
  HandlerResource,
  resourceDefinitionResourceSettings as handlerResourceDefinitionResourceSettings,
} from "@ldsg/handler";
import {
  InstantiateResource,
  Resource,
  ResourceDefinitionResourceSettings,
} from "@ldsg/resource";

export class ResourceDefinitionResource extends Resource<ResourceDefinitionResourceSettings> {
  /**
   * 实例化资源
   * 1. 找到 HANDLER 类型子资源
   * 2. 通过 HANDLER 类型子资源内的 handler 方法进行资源实例化
   */
  instantiateResource: InstantiateResource = (params) => {
    const { resourceConstructorParams } = params;

    const { id, settings, getFilteredResource } = this;

    if (resourceConstructorParams.kind !== settings.kind) {
      throw new Error("invalid kind");
    }

    const handlerResource = getFilteredResource({
      parentId: id,
      kind: handlerResourceDefinitionResourceSettings.kind,
    }) as HandlerResource | undefined;

    if (!handlerResource) {
      throw new Error("invalid handler resource");
    }

    const handler = handlerResource.getHandler();

    const res = handler(params);

    return res;
  };
}
