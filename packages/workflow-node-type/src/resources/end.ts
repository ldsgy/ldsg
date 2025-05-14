import { SPECIFIC_WORKFLOW_NODE_TYPE_TO_WORKFLOW_NODE_TYPE_RESOURCE_ID_MAP } from "@ldsg/workflow";
import { WorkflowNodeTypeResource } from "../resource";

export const endWorkflowNodeTypeResource = new WorkflowNodeTypeResource({
  id: SPECIFIC_WORKFLOW_NODE_TYPE_TO_WORKFLOW_NODE_TYPE_RESOURCE_ID_MAP.end,
  kind: "workflow_node_type",
  parentId: "root",
  settings: {
    title: "结束",
    description: "",
    fieldPropertiesSchema: {},
    handlerResourceId: "",
  },
});
