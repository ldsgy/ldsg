import { FieldTypeResource } from "@ldsg/field-type";
import { FieldInfo, GetFieldInfo } from "@ldsg/object";
import { Resource } from "@ldsg/resource";
import { ObjectFieldSpecificResourceSettings } from "./types";

export class ObjectFieldResource extends Resource<ObjectFieldSpecificResourceSettings> {
  getFieldInfo: GetFieldInfo = (params) => {
    const { platform } = params;

    const {
      settings: { title, description, name, properties },
      getResourcesFromSettings,
    } = this;

    const { fieldTypeResource } = getResourcesFromSettings();

    const typeInfo = (fieldTypeResource as FieldTypeResource).getFieldTypeInfo({
      platform,
      fieldProperties: properties,
    });

    const fieldInfo: FieldInfo = {
      title,
      description,
      name,
      typeInfo,
    };

    const res = {
      fieldInfo,
    };

    return res;
  };
}
