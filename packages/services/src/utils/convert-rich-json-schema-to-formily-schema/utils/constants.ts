import { TypeToDefaultMap } from "./types";

export const DEFAULT_TYPE_TO_DEFAULT_MAP: TypeToDefaultMap = {
  array: {
    "x-component": "ArrayItems",
    "x-decorator": "FormItem",
  },
  boolean: {
    "x-component": "Checkbox",
    "x-decorator": "FormItem",
  },
  integer: {
    "x-component": "NumberPicker",
    "x-decorator": "FormItem",
  },
  null: {},
  number: {
    "x-component": "NumberPicker",
    "x-decorator": "FormItem",
  },
  object: {},
  string: {
    "x-component": "Input",
    "x-decorator": "FormItem",
  },
};
