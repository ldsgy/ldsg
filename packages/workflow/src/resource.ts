import { Resource } from "@ldsg/resource";
import _ from "lodash";
import { SPECIFIC_WORKFLOW_NODE_TYPE_TO_WORKFLOW_NODE_TYPE_RESOURCE_ID_MAP } from "./constants";
import {
  GetWorkflowEdgeInfo,
  GetWorkflowNodeInfo,
  WorkflowEdgeInfo,
  WorkflowInfo,
  WorkflowNodeInfo,
  WorkflowSpecificResourceSettings,
} from "./types";
import {
  getEndNodeOutputVariables,
  GetEndNodeOutputVariablesRes,
  getOrderedNodeList,
} from "./utils";

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

export type Execute = () => Promise<GetEndNodeOutputVariablesRes>;

export type NodeId = string;

export type NodeOutputVariables = any;

export type NodeIdToOutputVariablesMap = Record<NodeId, NodeOutputVariables>;

export class WorkflowResource extends Resource<WorkflowSpecificResourceSettings> {
  nodeIdToOutputVariablesMap: NodeIdToOutputVariablesMap = {};

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
    const { getWorkflowInfo, nodeIdToOutputVariablesMap } = this;

    const { workflowInfo } = getWorkflowInfo();

    const { nodes } = workflowInfo;

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
      workflowInfo,
      startNode,
      endNode,
    });

    const executeList = orderedNodeList.map((node) => {
      const { id, Executer } = node;

      const executer = new Executer({
        nodeId: id,
        nodeIdToOutputVariablesMap,
      });

      const res = executer.execute;

      return res;
    });

    for (const execute of executeList) {
      await execute();
    }

    const res = getEndNodeOutputVariables({
      endNode,
      nodeIdToOutputVariablesMap,
    });

    return res;
  };
}
