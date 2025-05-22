import {
  arrayFieldTypeHandlerResourceRecord,
  arrayFieldTypeResourceRecord,
} from "./array";
import {
  booleanFieldTypeHandlerResourceRecord,
  booleanFieldTypeResourceRecord,
} from "./boolean";
import {
  mongoIdFieldTypeHandlerResourceRecord,
  mongoIdFieldTypeResourceRecord,
} from "./mongo-id";
import {
  numberFieldTypeHandlerResourceRecord,
  numberFieldTypeResourceRecord,
} from "./number";
import {
  objectFieldTypeHandlerResourceRecord,
  objectFieldTypeResourceRecord,
} from "./object";
import {
  stringFieldTypeHandlerResourceRecord,
  stringFieldTypeResourceRecord,
} from "./string";

export * from "./array";
export * from "./boolean";
export * from "./mongo-id";
export * from "./number";
export * from "./object";
export * from "./string";

export const FIELD_TYPE_RELATED_RESOURCE_RECORD = [
  arrayFieldTypeHandlerResourceRecord,
  arrayFieldTypeResourceRecord,
  booleanFieldTypeHandlerResourceRecord,
  booleanFieldTypeResourceRecord,
  mongoIdFieldTypeHandlerResourceRecord,
  mongoIdFieldTypeResourceRecord,
  numberFieldTypeHandlerResourceRecord,
  numberFieldTypeResourceRecord,
  objectFieldTypeHandlerResourceRecord,
  objectFieldTypeResourceRecord,
  stringFieldTypeHandlerResourceRecord,
  stringFieldTypeResourceRecord,
];
