import { ROOT_RESOURCE_ID } from "@ldsg/constants";
import {
  HandlerExtendedResourceSettings,
  HandlerSpecificResourceSettings,
} from "@ldsg/handler";
import { ResourceRecord } from "@ldsg/types";
import { RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS } from "../constants";
import {
  FieldTypeBasePlatform,
  FieldTypeResourceHandler,
  FieldTypeSpecificResourceSettings,
} from "../types";

export const stringFieldTypeResourceRecord: ResourceRecord<
  HandlerExtendedResourceSettings<FieldTypeSpecificResourceSettings>
> = {
  id: "string-field-type",
  kind: RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS.kind,
  parentId: ROOT_RESOURCE_ID,
  settings: {
    title: "字符串字段类型",
    description: "",
    fieldPropertiesSchema: {
      type: "object",
      properties: {},
    },
    handlerResourceId: "string-field-type-handler",
  },
};

const handler: FieldTypeResourceHandler = (params) => {
  const { fieldProperties, platform } = params;

  let res;

  switch (platform) {
    case FieldTypeBasePlatform.COMMON: {
      res = {
        ...fieldProperties,
        type: "string",
      };

      break;
    }

    default: {
      break;
    }
  }

  return res;
};

export const stringFieldTypeHandlerResourceRecord: ResourceRecord<HandlerSpecificResourceSettings> =
  {
    id: "string-field-type-handler",
    kind: "handler",
    parentId: ROOT_RESOURCE_ID,
    settings: {
      title: "字符串字段类型处理程序",
      description: "",
      code: "",
      dependencies: [],
      handler,
    },
  };
