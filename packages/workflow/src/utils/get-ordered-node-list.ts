import { WorkflowData, WorkflowNodeInfo } from "../types";

interface GetOrderedNodeListParams {
  workflowData: WorkflowData;
  startNode: WorkflowNodeInfo;
  endNode: WorkflowNodeInfo;
}

interface GetOrderedNodeListRes {
  orderedNodeList: WorkflowNodeInfo[];
}

type GetOrderedNodeList = (
  params: GetOrderedNodeListParams
) => GetOrderedNodeListRes;

/**
 * 获取有序的节点列表
 * 暂时先实现单线工作流，且节点只有开始与目标端口各一个。
 * 1. 找到开始与结束节点
 * 2. 从开始节点逐一向后查找
 */
export const getOrderedNodeList: GetOrderedNodeList = (params) => {
  const { workflowData, startNode, endNode } = params;

  const { edges, nodes } = workflowData;

  const orderedNodeList: WorkflowNodeInfo[] = [startNode, endNode];

  let currentNodeId = startNode.id;

  let pending = true;

  do {
    const currentEdge = edges.find(
      (edge) => edge.sourceWorkflowNodeResourceId === currentNodeId
    );

    if (!currentEdge) {
      throw new Error("invalid edge");
    }

    const { targetWorkflowNodeResourceId } = currentEdge;

    const targetWorkflowNode = nodes.find(
      (node) => node.id === targetWorkflowNodeResourceId
    );

    if (targetWorkflowNode) {
      orderedNodeList.splice(-1, 0, targetWorkflowNode);

      currentNodeId = targetWorkflowNode.id;

      if (currentNodeId === endNode.id) {
        pending = false;
      }
    } else {
      throw new Error("invalid edge");
    }
  } while (pending);

  const res = {
    orderedNodeList,
  };

  return res;
};
