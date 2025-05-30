import { Resource } from "@ldsg/resource";
import _ from "lodash";
import { SPECIFIC_WORKFLOW_NODE_TYPE_TO_WORKFLOW_NODE_TYPE_RESOURCE_ID_MAP } from "./constants";
import {
  GetWorkflowEdgeInfo,
  GetWorkflowNodeInfo,
  NodeIdToVariablesMap,
  WorkflowData,
  WorkflowEdgeInfo,
  WorkflowExecute,
  WorkflowInfo,
  WorkflowNodeInfo,
  WorkflowSpecificResourceSettings,
} from "./types";
import { getEndNodeOutputVariables, getOrderedNodeList } from "./utils";

export interface GetWorkflowEdgeInfoListRes {
  workflowEdgeInfoList: WorkflowEdgeInfo[];
}

export type GetWorkflowEdgeInfoList = () => GetWorkflowEdgeInfoListRes;

export interface GetWorkflowNodeInfoListRes {
  workflowNodeInfoList: WorkflowNodeInfo[];
}

export type GetWorkflowNodeInfoList = () => GetWorkflowNodeInfoListRes;

export interface GetWorkflowDataRes {
  workflowData: WorkflowData;
}

export type GetWorkflowData = () => GetWorkflowDataRes;

export interface GetWorkflowInfoRes {
  workflowInfo: WorkflowInfo;
}

export type GetWorkflowInfo = () => GetWorkflowInfoRes;

export class WorkflowResource extends Resource<WorkflowSpecificResourceSettings> {
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

  getWorkflowData: GetWorkflowData = () => {
    const { getWorkflowEdgeInfoList, getWorkflowNodeInfoList } = this;

    const { workflowEdgeInfoList } = getWorkflowEdgeInfoList();

    const { workflowNodeInfoList } = getWorkflowNodeInfoList();

    const workflowData = {
      edges: workflowEdgeInfoList,
      nodes: workflowNodeInfoList,
    };

    const res = {
      workflowData,
    };

    return res;
  };

  execute: WorkflowExecute = async (params) => {
    console.debug(
      "wcm packages/workflow/src/resource.ts execute params",
      params
    );

    const { startNodeInputVariables } = params;

    console.debug(
      "wcm packages/workflow/src/resource.ts execute startNodeInputVariables",
      startNodeInputVariables
    );

    const { getWorkflowData } = this;

    const nodeIdToVariablesMap: NodeIdToVariablesMap = {};

    const { workflowData } = getWorkflowData();

    const { nodes } = workflowData;

    const startNode = nodes.find(
      (value) =>
        value.workflowNodeTypeResourceId ===
        SPECIFIC_WORKFLOW_NODE_TYPE_TO_WORKFLOW_NODE_TYPE_RESOURCE_ID_MAP.start
    );

    const endNode = nodes.find(
      (value) =>
        value.workflowNodeTypeResourceId ===
        SPECIFIC_WORKFLOW_NODE_TYPE_TO_WORKFLOW_NODE_TYPE_RESOURCE_ID_MAP.end
    );

    if (!startNode || !endNode) {
      throw new Error("invalid workflow nodes");
    }

    const { orderedNodeList } = getOrderedNodeList({
      workflowData,
      startNode,
      endNode,
    });

    console.debug(
      "wcm packages/workflow/src/resource.ts execute startNodeOutputVariables nodeIdToVariablesMap",
      nodeIdToVariablesMap
    );

    const executeList = orderedNodeList.map((node) => {
      const { id, Executer } = node;

      if (Executer) {
        const executer = new Executer({
          nodeId: id,
          nodeIdToVariablesMap,
          inputVariables: startNodeInputVariables,
        });

        const res = executer.execute;

        return res;
      }
    });

    for (const execute of executeList) {
      await execute?.();
    }

    console.debug(
      "wcm packages/workflow/src/resource.ts execute getEndNodeOutputVariables nodeIdToVariablesMap",
      nodeIdToVariablesMap
    );

    const res = getEndNodeOutputVariables({
      endNode,
      nodeIdToVariablesMap,
    });

    console.debug(
      "wcm packages/workflow/src/resource.ts execute getEndNodeOutputVariables res",
      res
    );

    return res;
  };

  getWorkflowInfo: GetWorkflowInfo = () => {
    const { execute } = this;

    const workflowInfo = {
      execute,
    };

    const res = {
      workflowInfo,
    };

    return res;
  };
}
