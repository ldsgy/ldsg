import {
  RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS as FORM_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS,
  FormSpecificResourceSettings,
} from "@ldsg/form";
import { ResourceRecord } from "@ldsg/types";
import { ID_OBJECT_RESOURCE_ID } from "../../../object/id/constants";
import { POST_INFO_WITH_ID_OBJECT_RESOURCE_ID } from "../../../object/post-info-with-id/constants";
import { GET_POST_DETAIL_FORM_WORKFLOW_RESOURCE_ID } from "../../../workflow/get-post-detail-form/constants";
import { MIAN_FORMS_RESOURCE_ID } from "../constants";

export const postFormResourceRecord: ResourceRecord<FormSpecificResourceSettings> =
  {
    id: "get-post-detail-form",
    kind: FORM_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS.kind,
    parentId: MIAN_FORMS_RESOURCE_ID,
    settings: {
      title: "Get Post Detail",
      description: "",
      name: "get-post-detail",
      inputObjectResourceId: ID_OBJECT_RESOURCE_ID,
      outputObjectResourceId: POST_INFO_WITH_ID_OBJECT_RESOURCE_ID,
      workflowResourceId: GET_POST_DETAIL_FORM_WORKFLOW_RESOURCE_ID,
    },
  };
