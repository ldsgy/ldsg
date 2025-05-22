import { FormInfo, GetFormInfo } from "@ldsg/forms";
import { ObjectResource } from "@ldsg/object";
import { Resource } from "@ldsg/resource";
import { WorkflowResource } from "@ldsg/workflow";
import { FormSpecificResourceSettings } from "./types";

export class FormResource extends Resource<FormSpecificResourceSettings> {
  getFormInfo: GetFormInfo = (params) => {
    const {
      id,
      settings: { title, description, name },
      getResourcesFromSettings,
    } = this;

    const { inputObjectResource, outputObjectResource, workflowResource } =
      getResourcesFromSettings();

    const { objectInfo: inputObjectInfo } = (
      inputObjectResource as ObjectResource
    ).getObjectInfo(params);

    const { objectInfo: outputObjectInfo } = (
      outputObjectResource as ObjectResource
    ).getObjectInfo(params);

    const { workflowInfo } = (
      workflowResource as WorkflowResource
    ).getWorkflowInfo();

    const res: FormInfo = {
      id,
      title,
      description,
      name,
      inputObjectInfo,
      outputObjectInfo,
      workflowInfo,
    };

    return res;
  };
}
