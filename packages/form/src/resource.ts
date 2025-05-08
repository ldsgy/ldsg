import { FormInfo, GetFormInfo } from "@ldsg/forms";
import { ObjectResource } from "@ldsg/object";
import { Resource } from "@ldsg/resource";
import { FormSpecificResourceSettings } from "./types";

export class FormResource extends Resource<FormSpecificResourceSettings> {
  getFormInfo: GetFormInfo = (params) => {
    const { platform } = params;

    const {
      settings: { name },
      getResourcesFromSettings,
    } = this;

    const { inputObjectResource, outputObjectResource, workflowResource } =
      getResourcesFromSettings();

    const { objectInfo: inputObjectInfo } = (
      inputObjectResource as ObjectResource
    ).getObjectInfo({ platform });

    const { objectInfo: outputObjectInfo } = (
      outputObjectResource as ObjectResource
    ).getObjectInfo({ platform });

    const res: FormInfo = {
      name,
      inputObjectInfo,
      outputObjectInfo,
    };

    return res;
  };
}
