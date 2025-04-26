import { RichJsonSchemaOptions, SettingsSchema } from "@ldsg/core";
import { FieldType, FieldsDirection } from "./enum";

export const FIELD_TYPE_OPTIONS: RichJsonSchemaOptions = [
  {
    label: "文本",
    value: FieldType.TEXT,
  },
  {
    label: "数字",
    value: FieldType.NUMBER,
  },
  {
    label: "ID",
    value: FieldType.ID,
  },
  {
    label: "MongoID",
    value: FieldType.MongoID,
  },
  {
    label: "日期",
    value: FieldType.DATE,
  },
  {
    label: "选项",
    value: FieldType.OPTIONS,
  },
  {
    label: "是否",
    value: FieldType.BOOLEAN,
  },
  {
    label: "图片",
    value: FieldType.IMAGE,
  },
  {
    label: "附件",
    value: FieldType.FILE,
  },
  {
    label: "JSON",
    value: FieldType.JSON,
  },
  {
    label: "对象",
    value: FieldType.OBJECT,
  },
  {
    label: "列表",
    value: FieldType.LIST,
  },
];

export const FIELDS_DIRECTION_OPTIONS: RichJsonSchemaOptions = [
  {
    label: "输入",
    value: FieldsDirection.INPUT,
  },
  {
    label: "输出",
    value: FieldsDirection.OUTPUT,
  },
];

export const FIELD_SERVICE_DEFAULT_SETTINGS_SCHEMA: SettingsSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      title: "名称",
      description: "具有辨识度的名称",
    },
    description: {
      type: "string",
      title: "描述",
      description: "用于注释",
    },
    type: {
      type: "string",
      title: "类型",
      description: "用于字段类型",
      options: FIELD_TYPE_OPTIONS,
      default: FieldType.TEXT,
    },
    alias: {
      type: "string",
      title: "别名",
      description:
        "用于 GraphQL 内生成的字段名，只包含字母、数字和下划线，且以字母开头",
      pattern: "^[a-zA-Z][a-zA-Z0-9_]*$",
    },
    path: {
      type: "string",
      title: "路径",
      description:
        "用于存储，仅表格中有该字段，只包含字母、数字和下划线，且以字母开头",
      pattern: "^[a-zA-Z][a-zA-Z0-9_]*$",
    },
    fieldsDirection: {
      type: "string",
      title: "字段组方向",
      description: "用于 GraphQL，仅表单中有该字段",
      options: FIELDS_DIRECTION_OPTIONS,
    },
    multiple: {
      type: "boolean",
      title: "多选",
      default: false,
      "x-reactions": {
        dependencies: ["type"],
        fulfill: {
          state: {
            display: `{{["IMAGE","OPTIONS"].includes($deps[0])?"visible": "hidden"}}`,
          },
        },
      },
    },
    options: {
      type: "array",
      title: "选项",
      items: {
        type: "object",
        properties: {
          label: {
            type: "string",
            title: "选项名",
          },
          value: {
            type: "string",
            title: "选项值",
          },
        },
        required: ["label", "value"],
      },
      "x-reactions": {
        dependencies: ["type"],
        fulfill: {
          state: {
            display: `{{$deps[0]==="OPTIONS"?"visible": "hidden"}}`,
          },
        },
      },
    },
    required: {
      type: "boolean",
      title: "必填",
      default: false,
    },
    unique: {
      type: "boolean",
      title: "唯一",
      default: false,
    },
    objectTypeName: {
      type: "string",
      title: "对象类型名称",
      description:
        "此表单字段会添加至此对象类型中，仅 GraphQL 中有该字段，与 isInputArgument 二选一",
    },
    isInputArgument: {
      type: "boolean",
      title: "是否是输入参数",
      description:
        "当是输入参数时，会出现在查询参数中，仅 GraphQL 中有该字段，与 objectTypeName 二选一",
      default: false,
    },
  },
  required: ["name", "type", "alias"],
};
