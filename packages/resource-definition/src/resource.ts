import { HandlerExtendedResource } from "@ldsg/handler";
import { InstantiateResource } from "@ldsg/resource";
import { ResourceDefinitionSpecificResourceSettings } from "@ldsg/resource-definition-part";

export class ResourceDefinitionResource extends HandlerExtendedResource<ResourceDefinitionSpecificResourceSettings> {
  /**
   * 实例化资源
   * 1. 找到 HANDLER 类型子资源
   * 2. 通过 HANDLER 类型子资源内的 handler 方法进行资源实例化
   */
  instantiateResource: InstantiateResource = (params) => {
    const extendedHandler = this.getExtendedHandler();

    const res = extendedHandler(params);

    return res;
  };
}
