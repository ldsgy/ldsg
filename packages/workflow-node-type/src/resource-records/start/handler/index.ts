import { ROOT_RESOURCE_ID } from "@ldsg/constants";
import {
  RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS as HANDLER_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS,
  HandlerResource,
  HandlerSpecificResourceSettings,
} from "@ldsg/handler";
import { ResourceRecord } from "@ldsg/types";
import {
  WorkflowNodeExecuter,
  WorkflowNodeExecuterExecute,
} from "@ldsg/workflow";
import {
  ExtraWorkflowNodeInfo,
  GetExtraWorkflowNodeInfoParams,
} from "../../../types";
import { START_WORKFLOW_NODE_TYPE_HANDLER_RESOURCE_ID } from "./constants";

function handler(
  this: HandlerResource,
  params: GetExtraWorkflowNodeInfoParams
): ExtraWorkflowNodeInfo {
  const { workflowNodeProperties } = params;

  const { input } = workflowNodeProperties;

  class AWorkflowNodeExecuter extends WorkflowNodeExecuter {
    execute: WorkflowNodeExecuterExecute = () => {
      const { setVariables, inputVariables } = this;

      setVariables({
        variables: inputVariables,
      });
    };
  }

  const res: ExtraWorkflowNodeInfo = {
    Executer: AWorkflowNodeExecuter,
  };

  return res;
}

export const startWorkflowNodeTypeHandlerResourceRecord: ResourceRecord<HandlerSpecificResourceSettings> =
  {
    id: START_WORKFLOW_NODE_TYPE_HANDLER_RESOURCE_ID,
    kind: HANDLER_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS.kind,
    parentId: ROOT_RESOURCE_ID,
    settings: {
      title: "开始工作流节点类型",
      description: "",
      code: "",
      dependencies: [],
      handler,
    },
  };
