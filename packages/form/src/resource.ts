import { ObjectInfo, ObjectResource } from "@ldsg/object";
import { Resource } from "@ldsg/resource";
import { FormSpecificResourceSettings } from "./types";

interface GetFormInfoParams {
  /**
   * Platform
   * Such as mongoose\formily.
   */
  platform: string;
}

export interface FormInfo {
  /**
   * Form Name
   */
  name: string;

  /**
   * Input Object Info
   */
  inputObjectInfo: ObjectInfo;

  /**
   * Output Object Info
   */
  outputObjectInfo: ObjectInfo;
}

type GetFormInfo = (params: GetFormInfoParams) => FormInfo;

export class FormResource extends Resource<FormSpecificResourceSettings> {
  getFormInfo: GetFormInfo = (params) => {
    const { platform } = params;

    const {
      settings: { name },
      getResourcesFromSettings,
    } = this;

    const { inputObjectResource, outputObjectResource, workflowResource } =
      getResourcesFromSettings();

    const inputObjectInfo = (
      inputObjectResource as ObjectResource
    ).getObjectInfo({ platform });

    const outputObjectInfo = (
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
