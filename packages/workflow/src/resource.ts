import { HandlerExtendedResource } from "@ldsg/handler";
import _ from "lodash";
import {
  GetWorkflowEdgeInfo,
  GetWorkflowNodeInfo,
  WorkflowEdgeInfo,
  WorkflowInfo,
  WorkflowNodeInfo,
  WorkflowSpecificResourceSettings,
} from "./types";
import { getOrderedNodeList } from "./utils";

export interface GetWorkflowEdgeInfoListRes {
  workflowEdgeInfoList: WorkflowEdgeInfo[];
}

export type GetWorkflowEdgeInfoList = () => GetWorkflowEdgeInfoListRes;

export interface GetWorkflowNodeInfoListRes {
  workflowNodeInfoList: WorkflowNodeInfo[];
}

export type GetWorkflowNodeInfoList = () => GetWorkflowNodeInfoListRes;

export interface GetWorkflowInfoRes {
  workflowInfo: WorkflowInfo;
}

export type GetWorkflowInfo = () => GetWorkflowInfoRes;

export type Execute = () => Promise<any>;

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

  getWorkflowNodeInfoList: GetWorkflowNodeInfoList = () => {
    const { id, getFilteredResources } = this;

    const { resources } = getFilteredResources<{
      getWorkflowNodeInfo?: GetWorkflowNodeInfo;
    }>({
      parentId: id,
    });

    const mapRes = resources.map((resource) => {
      return resource.getWorkflowNodeInfo?.();
    });

    const GetWorkflowNodeInfoResList = _.filter(
      mapRes,
      (value) => !_.isUndefined(value)
    );

    const workflowNodeInfoList = _.map(
      GetWorkflowNodeInfoResList,
      "workflowNodeInfo"
    );

    const res = {
      workflowNodeInfoList,
    };

    return res;
  };

  getWorkflowInfo: GetWorkflowInfo = () => {
    const { getWorkflowEdgeInfoList, getWorkflowNodeInfoList } = this;

    const { workflowEdgeInfoList } = getWorkflowEdgeInfoList();

    const { workflowNodeInfoList } = getWorkflowNodeInfoList();

    const workflowInfo = {
      edges: workflowEdgeInfoList,
      nodes: workflowNodeInfoList,
    };

    const res = {
      workflowInfo,
    };

    return res;
  };

  execute = async () => {
    const { getWorkflowInfo } = this;

    const { workflowInfo } = getWorkflowInfo();

    const { orderedNodeList } = getOrderedNodeList({
      workflowInfo,
    });

    const workflowVariables = {};

    const executeList = orderedNodeList.map((node) => {
      const { id, Executer } = node;

      const executer = new Executer({
        nodeId: id,
        workflowVariables,
      });

      const res = executer.execute;

      return res;
    });

    for (const execute of executeList) {
      await execute();
    }
  };
}
