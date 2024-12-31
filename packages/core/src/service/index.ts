import _ from "lodash";
import * as URI from "uri-js";
import { ServiceLevel } from "./enum";
import {
  GetProperty,
  GetService,
  GetServices,
  GetSettings,
  GetSettingsSchema,
  GetUriInfo,
  ServiceProperties,
  Settings,
  SettingsSchema,
} from "./types";

export * from "./enum";
export * from "./types";

export class Service implements ServiceProperties {
  /**
   * id
   */
  id?: string;

  type?: string;

  /**
   * parent id
   */
  parentId?: string;

  level?: ServiceLevel;

  settings?: Settings;

  settingsSchema?: SettingsSchema;

  services?: Service[];

  [key: string]: any;

  constructor(params?: ServiceProperties) {
    const keys = _.keys(params);

    keys.forEach((key) => {
      const value = params?.[key];

      if (value) {
        this[key] = value;
      }
    });
  }

  getId = () => {
    const id = this.id;

    if (!id) {
      throw new Error("id is required");
    }

    return id;
  };

  getType = () => {
    const type = this.type;

    if (!type) {
      throw new Error("type is required");
    }

    return type;
  };

  getParentId = () => {
    const parentId = this.parentId;

    return parentId;
  };

  getService: GetService = (params) => {
    const getServicesResult = this.getServices(params);

    return getServicesResult[0];
  };

  getServices: GetServices = (params) => {
    const { id, level, type, settings } = params || {};

    const { services } = this;

    const filterPredicate: Partial<Service> = {};

    let filterRes: Service[] = [];

    if (id) {
      filterPredicate.id = id;
    } else {
      if (type) {
        filterPredicate.type = type;
      }

      if (settings) {
        filterPredicate.settings = settings;
      }

      switch (level) {
        case ServiceLevel.CHILD: {
          filterPredicate.parentId = this.getId();

          break;
        }

        case ServiceLevel.PARENT: {
          filterPredicate.id = this.getParentId();

          break;
        }

        case ServiceLevel.PEER: {
          filterPredicate.parentId = this.getParentId();

          break;
        }

        case ServiceLevel.SELF: {
          filterPredicate.id = this.getId();

          break;
        }

        default: {
          break;
        }
      }
    }

    if (!filterRes.length) {
      filterRes = _.filter(services, filterPredicate);
    }

    const res = filterRes;

    return res;
  };

  /**
   * 获取当前层级服务设置
   * @returns 服务设置
   */
  getSettings: GetSettings = () => {
    const settings = this.settings ?? {};

    return settings;
  };

  /**
   * 获取当前服务配置结构
   * @returns 服务配置结构
   */
  getSettingsSchema: GetSettingsSchema = () => {
    const settingsSchema = this.settingsSchema ?? {};

    return settingsSchema;
  };

  getAlias = () => {
    const settings = this.getSettings();

    const { alias } = settings;

    if (!alias) {
      throw new Error("alias in settings is required");
    }

    return alias;
  };

  getCamelCaseAlias = () => {
    return _.camelCase(this.getAlias());
  };

  getPascalAlias = () => {
    return _.upperFirst(this.getCamelCaseAlias());
  };

  getProperty: GetProperty = (params) => {
    const { name, params: paramsParams } = params;

    const property = _.get(this, name);

    let res: any = property;

    if (typeof property === "function") {
      if (paramsParams) {
        res = property(paramsParams);
      } else {
        res = property();
      }
    }

    return res;
  };

  getUriInfo: GetUriInfo = () => {
    const settings = this.getSettings();

    const { uri } = settings;

    if (!uri) {
      throw new Error("uri in settings is required");
    }

    const res = URI.parse(uri);

    return res;
  };

  getChildHandlerServiceHandler = () => {
    const handlerService = this.getService({
      level: ServiceLevel.CHILD,
      type: "HANDLER",
    });

    if (!handlerService) {
      return;
    }

    return handlerService.getHandler();
  };
}
