import { ProColumns } from "@ant-design/pro-components";
import { SchemaTypes } from "@formily/json-schema";
import {
  RichJsonSchema,
  Service,
  ServiceLevel,
  SettingsSchema,
} from "@ldsg/core";
import {
  InputTypeComposerDefinition,
  InputTypeComposerFieldConfigDefinition,
  InputTypeComposerFieldConfigMapDefinition,
  ObjectTypeComposerDefinition,
  ObjectTypeComposerFieldConfigDefinition,
  ObjectTypeComposerFieldConfigMapDefinition,
  ResolverDefinition,
  TypeDefinitionString,
} from "graphql-compose";
import { JSONSchema7TypeName } from "json-schema";
import _ from "lodash";
import mongoose, { SchemaDefinitionProperty } from "mongoose";
import { ServiceType } from "../../enum";
import { ModifyGraphQLSchema } from "../../types";
import {
  convertRichJsonSchemaToFormilySchema,
  convertRichJsonSchemaToJsonSchema,
} from "../../utils";
import { FIELD_SERVICE_DEFAULT_SETTINGS_SCHEMA } from "./constants";
import { FieldType } from "./enum";
import {
  AddInputTypeComposerFieldConfigDefinition,
  AddObjectTypeComposerFieldConfigMapDefinition,
  AddPropertyToFormilySchema,
  AddPropertyToJsonSchema,
  AddPropertyToMongooseSchemaDefinition,
  FieldTypeInfo,
  GetChildFieldServices,
  GetFormilySchema,
  GetInputITC,
  GetInputITCDefinition,
  GetInputITCFieldConfigMapDefinition,
  GetInputTypeComposerFieldConfigDefinition,
  GetJsonSchema,
  GetMongooseSchemaDefinitionProperty,
  GetObjecTypeComposerFieldConfigDefinition,
  GetOutputOTC,
  GetOutputOTCDefinition,
  GetOutputOTCFieldConfigMapDefinition,
  GetOutputType,
  GetProComponentsSchemaColumn,
  GetRichJsonSchema,
  ModifyGraphQLSchemaObjectType,
  ModifyRichJsonSchema,
} from "./types";

export * from "./constants";
export * from "./enum";
export * from "./types";

export class FieldService extends Service {
  settingsSchema: SettingsSchema = FIELD_SERVICE_DEFAULT_SETTINGS_SCHEMA;

  getFieldInfo = () => {
    const settings = this.getSettings();

    const camelCaseFieldName = this.getCamelCaseAlias();

    const {
      name,
      description,
      type,
      required = false,
      unique = false,
      multiple = false,
    } = settings;

    const result: FieldTypeInfo = {
      name,
      description,
      camelCaseFieldName,
      type,
      required,
      unique,
      multiple,
    };

    return result;
  };

  getMongooseSchemaDefinitionProperty: GetMongooseSchemaDefinitionProperty =
    () => {
      const fieldInfo = this.getFieldInfo();

      const { type, camelCaseFieldName, required, unique, multiple } =
        fieldInfo;

      const mongooseSchemaDefinitionProperty: SchemaDefinitionProperty = {
        alias: camelCaseFieldName,
        required,
        unique,
      };

      switch (type) {
        case FieldType.BOOLEAN: {
          mongooseSchemaDefinitionProperty.type = Boolean;

          break;
        }

        case FieldType.DATE: {
          mongooseSchemaDefinitionProperty.type = Date;

          break;
        }

        case FieldType.JSON:
        case FieldType.OBJECT: {
          mongooseSchemaDefinitionProperty.type = mongoose.Schema.Types.Mixed;

          break;
        }

        case FieldType.LIST: {
          mongooseSchemaDefinitionProperty.type = [];

          break;
        }

        case FieldType.NUMBER: {
          mongooseSchemaDefinitionProperty.type = Number;

          break;
        }

        case FieldType.MongoID: {
          mongooseSchemaDefinitionProperty.type =
            mongoose.Schema.Types.ObjectId;

          break;
        }

        case FieldType.IMAGE: {
          if (multiple) {
            mongooseSchemaDefinitionProperty.type = [String];
          } else {
            mongooseSchemaDefinitionProperty.type = String;
          }

          break;
        }

        case FieldType.FILE:
        case FieldType.ID:
        case FieldType.OPTIONS:
        case FieldType.TEXT:
        default: {
          mongooseSchemaDefinitionProperty.type = String;

          break;
        }
      }

      return mongooseSchemaDefinitionProperty;
    };

  addPropertyToMongooseSchemaDefinition: AddPropertyToMongooseSchemaDefinition =
    (params) => {
      const { mongooseSchemaDefinition } = params;

      const settings = this.getSettings();

      const path = settings.path;

      const mongooseSchemaDefinitionProperty =
        this.getMongooseSchemaDefinitionProperty();

      mongooseSchemaDefinition[path] = mongooseSchemaDefinitionProperty;
    };

  addPropertyToJsonSchema: AddPropertyToJsonSchema = (params) => {
    const { schema } = params;

    const fieldInfo = this.getFieldInfo();

    const { name, description, type, camelCaseFieldName, required } = fieldInfo;

    let jsonSchemaType: JSONSchema7TypeName;

    switch (type) {
      case FieldType.BOOLEAN: {
        jsonSchemaType = "boolean";

        break;
      }

      case FieldType.NUMBER: {
        jsonSchemaType = "number";

        break;
      }

      case FieldType.TEXT:
      case FieldType.ID:
      case FieldType.MongoID:
      default: {
        jsonSchemaType = "string";

        break;
      }
    }

    schema.properties![camelCaseFieldName] = {
      title: name,
      description,
      type: jsonSchemaType,
    };
  };

  addPropertyToFormilySchema: AddPropertyToFormilySchema = (params) => {
    const { schema } = params;

    const fieldInfo = this.getFieldInfo();

    const { type, camelCaseFieldName, required, name, description } = fieldInfo;

    let formilySchemaTypes: SchemaTypes;

    switch (type) {
      case FieldType.BOOLEAN: {
        formilySchemaTypes = "boolean";

        break;
      }

      case FieldType.NUMBER: {
        formilySchemaTypes = "number";

        break;
      }

      case FieldType.TEXT:
      case FieldType.ID:
      case FieldType.MongoID:
      default: {
        formilySchemaTypes = "string";

        break;
      }
    }

    schema.addProperty(camelCaseFieldName, {
      title: name,
      description,
      type: formilySchemaTypes,
      required,
    });
  };

  getTypeDefinitionString: () => TypeDefinitionString = () => {
    const fieldInfo = this.getFieldInfo();

    const { type, required } = fieldInfo;

    const typeDefinitionStringList: string[] = [];

    switch (type) {
      case FieldType.BOOLEAN: {
        typeDefinitionStringList.push("Boolean");

        break;
      }

      case FieldType.DATE: {
        typeDefinitionStringList.push("Date");

        break;
      }

      case FieldType.JSON:
      case FieldType.OBJECT: {
        typeDefinitionStringList.push("JSON");

        break;
      }

      case FieldType.LIST: {
        typeDefinitionStringList.push("JSON");

        break;
      }

      case FieldType.NUMBER: {
        typeDefinitionStringList.push("Int");

        break;
      }

      case FieldType.MongoID: {
        typeDefinitionStringList.push("MongoID");

        break;
      }

      case FieldType.IMAGE: {
        typeDefinitionStringList.push("Image");

        break;
      }

      case FieldType.FILE:
      case FieldType.ID:
      case FieldType.OPTIONS:
      case FieldType.TEXT:
      default: {
        typeDefinitionStringList.push("String");

        break;
      }
    }

    if (!typeDefinitionStringList.length) {
      throw new Error("invalid type definition string");
    }

    if (required) {
      typeDefinitionStringList.push("!");
    }

    const typeDefinitionString: TypeDefinitionString =
      typeDefinitionStringList.join("");

    return typeDefinitionString;
  };

  getFieldConfigDefinition = () => {
    const fieldInfo = this.getFieldInfo();

    const { description } = fieldInfo;

    const res = {
      type: this.getTypeDefinitionString(),
      description,
    };

    return res;
  };

  getInputTypeComposerFieldConfigDefinition: GetInputTypeComposerFieldConfigDefinition =
    () => {
      const definition: InputTypeComposerFieldConfigDefinition =
        this.getFieldConfigDefinition();

      return definition;
    };

  getObjecTypeComposerFieldConfigDefinition: GetObjecTypeComposerFieldConfigDefinition =
    () => {
      const definition: ObjectTypeComposerFieldConfigDefinition<any, any, any> =
        this.getFieldConfigDefinition();

      return definition;
    };

  addInputTypeComposerFieldConfigDefinition: AddInputTypeComposerFieldConfigDefinition =
    (params) => {
      const { fieldConfigMapDefinition } = params;

      const camelCaseFieldName = this.getCamelCaseAlias();

      const inputTypeComposerFieldConfigDefinition =
        this.getInputTypeComposerFieldConfigDefinition();

      fieldConfigMapDefinition[camelCaseFieldName] =
        inputTypeComposerFieldConfigDefinition;
    };

  addObjectTypeComposerFieldConfigMapDefinition: AddObjectTypeComposerFieldConfigMapDefinition =
    (params) => {
      const { fieldConfigMapDefinition } = params;

      const camelCaseFieldName = this.getCamelCaseAlias();

      const objecTypeComposerFieldConfigDefinition =
        this.getObjecTypeComposerFieldConfigDefinition();

      fieldConfigMapDefinition[camelCaseFieldName] =
        objecTypeComposerFieldConfigDefinition;
    };

  /**
   * 获取 ProComponents 结构列
   * @returns
   */
  getProComponentsSchemaColumn: GetProComponentsSchemaColumn = () => {
    const fieldInfo = this.getFieldInfo();

    const { name, description, camelCaseFieldName } = fieldInfo;

    const result: ProColumns = {
      copyable: true,
      dataIndex: camelCaseFieldName,
      ellipsis: true,
      title: name,
      tooltip: description,
      width: 200,
    };

    return result;
  };

  modifyGraphQLSchemaObjectType: ModifyGraphQLSchemaObjectType = (params) => {
    const { objectTypeComposer } = params;

    const fieldInfo = this.getFieldInfo();

    const { name, description, type, camelCaseFieldName, required, multiple } =
      fieldInfo;

    const fieldName = `${camelCaseFieldName}${multiple ? "Images" : "Image"}`;

    switch (type) {
      case FieldType.IMAGE: {
        objectTypeComposer.addFields({
          [fieldName]: {
            type: multiple ? "[Image]" : "Image",
            resolve: (source, args, context, info) => {
              const res = (source as any)[camelCaseFieldName];

              return res;
            },
          },
        });

        break;
      }

      default: {
        break;
      }
    }
  };

  syncTableIndexes = async () => {
    const tableService = this.getService({
      level: ServiceLevel.PARENT,
      type: ServiceType.TABLE,
    });

    await tableService?.syncIndexes();
  };

  modifyGraphQLSchema: ModifyGraphQLSchema = (params) => {
    const { schemaComposer } = params;

    const objectTypeName = this.getObjectTypeName();

    if (!objectTypeName) {
      return;
    }

    const graphqlFieldName = this.getCamelCaseAlias();

    const inputITC = this.getInputITC(params);

    const outputType = this.getOutputType(params);

    const fieldInfo = this.getFieldInfo();

    const { description } = fieldInfo;

    const resolverDefinition: ResolverDefinition<any, any, any> = {
      name: graphqlFieldName,
      description,
      type: outputType,
      args: inputITC.getFields(),
    };

    const handler = this.getChildHandlerServiceHandler();

    if (handler) {
      resolverDefinition.resolve = async ({ source, args, context, info }) => {
        return await handler(source, args, context, info);
      };
    }

    const fieldResolver = schemaComposer.createResolver(resolverDefinition);

    const newFields: ObjectTypeComposerFieldConfigMapDefinition<any, any> = {};

    newFields[graphqlFieldName] = fieldResolver;

    switch (objectTypeName) {
      case "Mutation": {
        schemaComposer.Mutation.addFields(newFields);

        break;
      }

      case "Query": {
        schemaComposer.Query.addFields(newFields);

        break;
      }

      default: {
        const objectTypeComposer = schemaComposer.getOTC(objectTypeName);

        objectTypeComposer.addFields(newFields);

        break;
      }
    }
  };

  getOutputType: GetOutputType = (params) => {
    let res: ResolverDefinition<any, any, any>["type"];

    const fieldInfo = this.getFieldInfo();

    const { type } = fieldInfo;

    switch (type) {
      case "OBJECT":
      case "LIST":
        res = this.getOutputOTC(params);

        break;

      default: {
        res = this.getTypeDefinitionString();

        break;
      }
    }

    return res;
  };

  getObjectTypeName = () => {
    const settings = this.getSettings();

    const objectTypeName = settings.objectTypeName;

    return objectTypeName;
  };

  getChildFieldServices: GetChildFieldServices = (params) => {
    const { isInputArgument } = params;

    const fieldServices = this.getServices({
      level: ServiceLevel.CHILD,
      type: ServiceType.FIELD,
      settings: {
        isInputArgument,
      },
    });

    const res = fieldServices as unknown as FieldService[];

    return res;
  };

  getInputITCFieldConfigMapDefinition: GetInputITCFieldConfigMapDefinition =
    () => {
      const fieldServices = this.getChildFieldServices({
        isInputArgument: true,
      });

      const fieldConfigMapDefinition: InputTypeComposerFieldConfigMapDefinition =
        {};

      fieldServices.forEach((value) =>
        value.addInputTypeComposerFieldConfigDefinition({
          fieldConfigMapDefinition,
        })
      );

      return fieldConfigMapDefinition;
    };

  getInputITCDefinition: GetInputITCDefinition = () => {
    const pascalAlias = this.getPascalAlias();

    const fields = this.getInputITCFieldConfigMapDefinition();

    const fieldInputName = `${pascalAlias}Input`;

    const definition: InputTypeComposerDefinition = {
      name: fieldInputName,
      fields,
    };

    return definition;
  };

  getInputITC: GetInputITC = (params) => {
    const { schemaComposer } = params;

    const definition = this.getInputITCDefinition();

    const inputITC = schemaComposer.createInputTC(definition);

    return inputITC;
  };

  getOutputOTCFieldConfigMapDefinition: GetOutputOTCFieldConfigMapDefinition =
    () => {
      const fieldServices = this.getChildFieldServices({
        isInputArgument: false,
      });

      const fieldConfigMapDefinition: ObjectTypeComposerFieldConfigMapDefinition<
        any,
        any
      > = {};

      fieldServices.forEach((value) =>
        value.addObjectTypeComposerFieldConfigMapDefinition({
          fieldConfigMapDefinition,
        })
      );

      return fieldConfigMapDefinition;
    };

  getOutputOTCDefinition: GetOutputOTCDefinition = () => {
    const pascalAlias = this.getPascalAlias();

    const fields = this.getOutputOTCFieldConfigMapDefinition();

    const fieldOutputName = `${pascalAlias}Output`;

    const definition: ObjectTypeComposerDefinition<any, any> = {
      name: fieldOutputName,
      fields,
    };

    return definition;
  };

  getOutputOTC: GetOutputOTC = (params) => {
    const { schemaComposer } = params;

    const fieldInfo = this.getFieldInfo();

    const { description } = fieldInfo;

    const definition = this.getOutputOTCDefinition();

    const outputOTC = schemaComposer.createObjectTC(definition);

    outputOTC.setDescription(`${description}负载`);

    return outputOTC;
  };

  getRichJsonSchemaProperty = () => {
    const fieldInfo = this.getFieldInfo();

    const { name, description, type: fieldInfoType } = fieldInfo;

    let type: JSONSchema7TypeName = "string";

    let xComponent: string | undefined;

    let xComponentProps: Record<string, any> = {};

    let xDecorator: string | undefined;

    let xDecoratorProps: Record<string, any> = {};

    switch (fieldInfoType) {
      case FieldType.BOOLEAN: {
        type = "boolean";

        break;
      }

      case FieldType.DATE: {
        xComponent = "DatePicker";

        xDecorator = "FormItem";

        break;
      }

      case FieldType.FILE: {
        xComponent = "Upload";

        xDecorator = "FormItem";

        break;
      }

      case FieldType.ID: {
        break;
      }

      case FieldType.IMAGE: {
        xComponent = "PlatformImage";

        xComponentProps = {
          maxCount: 1,
        };

        const { multiple } = fieldInfo;

        if (multiple) {
          xComponentProps = {
            maxCount: 9,
            multiple: true,
          };
        }

        break;
      }

      case FieldType.JSON: {
        break;
      }

      case FieldType.LIST: {
        break;
      }

      case FieldType.MongoID: {
        break;
      }

      case FieldType.NUMBER: {
        type = "number";

        xComponent = "NumberPicker";

        xDecorator = "FormItem";

        break;
      }

      case FieldType.OBJECT: {
        type = "object";

        break;
      }

      case FieldType.OPTIONS: {
        break;
      }

      case FieldType.TEXT: {
        break;
      }

      default: {
        break;
      }
    }

    const property: RichJsonSchema = {
      type,
      title: name,
      description,
    };

    if (xComponent) {
      property["x-component"] = xComponent;
    }

    if (!_.isEmpty(xComponentProps)) {
      property["x-component-props"] = xComponentProps;
    }

    if (xDecorator) {
      property["x-decorator"] = xDecorator;
    }

    if (!_.isEmpty(xDecoratorProps)) {
      property["x-decorator-props"] = xDecoratorProps;
    }

    return property;
  };

  modifyRichJsonSchema: ModifyRichJsonSchema = (richJsonSchema) => {
    const fieldInfo = this.getFieldInfo();

    const { camelCaseFieldName } = fieldInfo;

    const property = this.getRichJsonSchemaProperty();

    if (!richJsonSchema.properties) {
      throw new Error("invalid rich json schema");
    }

    richJsonSchema.properties[camelCaseFieldName] = property;
  };

  /**
   * 获取子级富 JSON 结构
   */
  getChildRichJsonSchema: GetRichJsonSchema = (params) => {
    const { isInputArgument = false } = params || {};

    const richJsonSchema: RichJsonSchema = {
      type: "object",
      properties: {},
    };

    const fieldServices = this.getServices({
      level: ServiceLevel.CHILD,
      type: ServiceType.FIELD,
      settings: {
        isInputArgument,
      },
    });

    _.each(fieldServices, (service) =>
      service.modifyRichJsonSchema(richJsonSchema)
    );

    return richJsonSchema;
  };

  /**
   * 获取富 JSON 结构
   * @returns
   */
  getRichJsonSchema: GetRichJsonSchema = (params) => {
    const { isInputArgument } = params;

    let richJsonSchema: RichJsonSchema;

    if (isInputArgument) {
      richJsonSchema = {
        type: "object",
        properties: {},
      };
    } else {
      richJsonSchema = this.getRichJsonSchemaProperty();
    }

    if (richJsonSchema.type === "object") {
      const childRichJsonSchema = this.getChildRichJsonSchema(params);

      const { properties } = childRichJsonSchema;

      richJsonSchema.properties = properties;
    }

    return richJsonSchema;
  };

  /**
   * 获取 JSON 结构
   * @returns
   */
  getJsonSchema: GetJsonSchema = (params) => {
    const richJsonSchema = this.getRichJsonSchema(params);

    const convertRichJsonSchemaToJsonSchemaRes =
      convertRichJsonSchemaToJsonSchema({
        richJsonSchema,
      });

    const result = convertRichJsonSchemaToJsonSchemaRes.jsonSchema;

    return result;
  };

  /**
   * 获取 Formily 结构
   * @returns
   */
  getFormilySchema: GetFormilySchema = (params) => {
    const richJsonSchema = this.getRichJsonSchema(params);

    const convertRichJsonSchemaToFormilySchemaRes =
      convertRichJsonSchemaToFormilySchema({
        richJsonSchema,
      });

    const result = convertRichJsonSchemaToFormilySchemaRes.formilySchema;

    return result;
  };
}
