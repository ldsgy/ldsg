import { ROOT_RESOURCE_ID } from "@ldsg/constants";
import {
  HandlerExtendedResourceSettings,
  HandlerSpecificResourceSettings,
} from "@ldsg/handler";
import { ResourceRecord } from "@ldsg/types";
import * as mongodb from "mongodb";
import { RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS } from "../constants";
import {
  FieldTypeBasePlatform,
  FieldTypeResourceHandler,
  FieldTypeSpecificResourceSettings,
} from "../types";

export const mongoIdFieldTypeResourceRecord: ResourceRecord<
  HandlerExtendedResourceSettings<FieldTypeSpecificResourceSettings>
> = {
  id: "mongo-id-field-type",
  kind: RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS.kind,
  parentId: ROOT_RESOURCE_ID,
  settings: {
    title: "MongoID字段类型",
    description: "",
    fieldPropertiesSchema: {
      type: "object",
      properties: {},
    },
    handlerResourceId: "mongo-id-field-type-handler",
  },
};

const handler: FieldTypeResourceHandler = (params) => {
  const { fieldProperties, platform } = params;

  let res;

  switch (platform) {
    case FieldTypeBasePlatform.COMMON: {
      res = {
        ...fieldProperties,
        type: "mongo_id",
      };

      break;
    }

    case FieldTypeBasePlatform.GRAPHQL: {
      res = "ID";

      break;
    }

    case FieldTypeBasePlatform.MONGOOSE: {
      res = {
        type: mongodb.ObjectId,
      };

      break;
    }

    default: {
      break;
    }
  }

  return res;
};

export const mongoIdFieldTypeHandlerResourceRecord: ResourceRecord<HandlerSpecificResourceSettings> =
  {
    id: "mongo-id-field-type-handler",
    kind: "handler",
    parentId: ROOT_RESOURCE_ID,
    settings: {
      title: "MongoID字段类型处理程序",
      description: "",
      code: "",
      dependencies: [],
      handler,
    },
  };
