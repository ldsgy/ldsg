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
import jsonata from "jsonata";
import {
  ExtraWorkflowNodeInfo,
  GetExtraWorkflowNodeInfoParams,
} from "../../../types";
import { END_WORKFLOW_NODE_TYPE_HANDLER_RESOURCE_ID } from "./constants";

function handler(
  this: HandlerResource,
  params: GetExtraWorkflowNodeInfoParams
): ExtraWorkflowNodeInfo {
  const { workflowNodeProperties } = params;

  const { output } = workflowNodeProperties;

  const { jsonataStr } = output;

  const expression = jsonata(jsonataStr);

  class EndWorkflowNodeExecuter extends WorkflowNodeExecuter {
    execute: WorkflowNodeExecuterExecute = async () => {
      const { setVariables, nodeIdToVariablesMap } = this;

      const variables = await expression.evaluate({
        nodeIdToVariablesMap: Object.fromEntries(nodeIdToVariablesMap),
      });

      setVariables({
        variables,
      });
    };
  }

  const res: ExtraWorkflowNodeInfo = {
    Executer: EndWorkflowNodeExecuter,
  };

  return res;
}

export const endWorkflowNodeTypeHandlerResourceRecord: ResourceRecord<HandlerSpecificResourceSettings> =
  {
    id: END_WORKFLOW_NODE_TYPE_HANDLER_RESOURCE_ID,
    kind: HANDLER_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS.kind,
    parentId: ROOT_RESOURCE_ID,
    settings: {
      title: "结束工作流节点类型",
      description: "",
      code: "",
      dependencies: [],
      handler,
    },
  };
