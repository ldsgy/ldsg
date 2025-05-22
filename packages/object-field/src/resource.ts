import { FieldTypeResource } from "@ldsg/field-type";
import { FieldInfo, GetFieldInfo } from "@ldsg/object";
import { Resource } from "@ldsg/resource";
import { ObjectFieldSpecificResourceSettings } from "./types";

export class ObjectFieldResource extends Resource<ObjectFieldSpecificResourceSettings> {
  getFieldInfo: GetFieldInfo = (params) => {
    const {
      id,
      settings: { title, description, name, properties },
      getResourcesFromSettings,
    } = this;

    const { fieldTypeResource } = getResourcesFromSettings();

    const { fieldTypeInfo } = (
      fieldTypeResource as FieldTypeResource
    ).getFieldTypeInfo({
      ...params,
      fieldProperties: properties,
    });

    const fieldInfo: FieldInfo = {
      id,
      title,
      description,
      name,
      typeInfo: fieldTypeInfo,
    };

    const res = {
      fieldInfo,
    };

    return res;
  };
}
