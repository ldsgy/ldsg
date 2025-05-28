import {
  RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS as FORMS_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS,
  FormsSpecificResourceSettings,
} from "@ldsg/forms";
import { ResourceRecord } from "@ldsg/types";
import { BLOG_APPLICATION_RESOURCE_ID } from "../constants";
import { MIAN_FORMS_RESOURCE_ID } from "./constants";

export * from "./form/get-post-detail";

export const mianFormsResourceRecord: ResourceRecord<FormsSpecificResourceSettings> =
  {
    id: MIAN_FORMS_RESOURCE_ID,
    kind: FORMS_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS.kind,
    parentId: BLOG_APPLICATION_RESOURCE_ID,
    settings: {
      title: "Main Forms",
      description: "",
    },
  };
