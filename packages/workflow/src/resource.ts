import { HandlerExtendedResource } from "@ldsg/handler";
import { GetWorkflowEdgeInfo, WorkflowEdgeInfo } from "@ldsg/workflow-edge";
import _ from "lodash";
import { WorkflowSpecificResourceSettings } from "./types";

interface GetWorkflowEdgeInfoListRes {
  workflowEdgeInfoList: WorkflowEdgeInfo[];
}

export type GetWorkflowEdgeInfoList = () => GetWorkflowEdgeInfoListRes;

export class WorkflowResource extends HandlerExtendedResource<WorkflowSpecificResourceSettings> {
  getWorkflowEdgeInfoList: GetWorkflowEdgeInfoList = () => {
    const { id, getFilteredResources } = this;

    const { resources } = getFilteredResources<{
      getWorkflowEdgeInfo?: GetWorkflowEdgeInfo;
    }>({
      parentId: id,
    });

    const mapRes = resources.map((resource) => {
      return resource.getWorkflowEdgeInfo?.();
    });

    const getWorkflowEdgeInfoResList = _.filter(
      mapRes,
      (value) => !_.isUndefined(value)
    );

    const workflowEdgeInfoList = _.map(
      getWorkflowEdgeInfoResList,
      "workflowEdgeInfo"
    );

    const res = {
      workflowEdgeInfoList,
    };

    return res;
  };
}
