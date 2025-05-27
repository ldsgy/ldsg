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

export const numberFieldTypeResourceRecord: ResourceRecord<
  HandlerExtendedResourceSettings<FieldTypeSpecificResourceSettings>
> = {
  id: "number-field-type",
  kind: RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS.kind,
  parentId: ROOT_RESOURCE_ID,
  settings: {
    title: "文本字段类型",
    description: "可用来存储各种文本",
    fieldPropertiesSchema: {
      type: "object",
      properties: {
        max: {
          type: "integer",
          title: "最大值",
          description: "",
        },
        min: {
          type: "integer",
          title: "最小值",
          description: "",
        },
      },
    },
    handlerResourceId: "number-field-type-handler",
  },
};

const handler: FieldTypeResourceHandler = (params) => {
  const { fieldProperties, platform } = params;

  let res;

  switch (platform) {
    case FieldTypeBasePlatform.COMMON: {
      res = {
        ...fieldProperties,
        type: "number",
      };

      break;
    }

    default: {
      break;
    }
  }

  return res;
};

export const numberFieldTypeHandlerResourceRecord: ResourceRecord<HandlerSpecificResourceSettings> =
  {
    id: "number-field-type-handler",
    kind: "handler",
    parentId: ROOT_RESOURCE_ID,
    settings: {
      title: "文本字段类型处理程序",
      description: "",
      code: "",
      dependencies: [],
      handler,
    },
  };
