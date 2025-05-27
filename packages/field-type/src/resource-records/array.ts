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

export const arrayFieldTypeResourceRecord: ResourceRecord<
  HandlerExtendedResourceSettings<FieldTypeSpecificResourceSettings>
> = {
  id: "array-field-type",
  kind: RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS.kind,
  parentId: ROOT_RESOURCE_ID,
  settings: {
    title: "数组字段类型",
    description: "",
    fieldPropertiesSchema: {
      type: "object",
      properties: {},
    },
    handlerResourceId: "array-field-type-handler",
  },
};

const handler: FieldTypeResourceHandler = (params) => {
  const { fieldProperties, platform } = params;

  let res;

  switch (platform) {
    case FieldTypeBasePlatform.COMMON: {
      res = {
        ...fieldProperties,
        type: "array",
      };

      break;
    }

    default: {
      break;
    }
  }

  return res;
};

export const arrayFieldTypeHandlerResourceRecord: ResourceRecord<HandlerSpecificResourceSettings> =
  {
    id: "array-field-type-handler",
    kind: "handler",
    parentId: ROOT_RESOURCE_ID,
    settings: {
      title: "数组字段类型处理程序",
      description: "",
      code: "",
      dependencies: [],
      handler,
    },
  };
