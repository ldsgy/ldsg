import { Handler, HandlerResource } from "@ldsg/handler";
import {
  WorkflowNodeExecuter,
  WorkflowNodeExecuterExecute,
} from "@ldsg/workflow";
import { WorkflowNodeTypeResource } from "../resource";
import {
  ExtraWorkflowNodeInfo,
  GetExtraWorkflowNodeInfoParams,
} from "../types";

const handler: Handler<
  [GetExtraWorkflowNodeInfoParams],
  ExtraWorkflowNodeInfo
> = (params) => {
  const { workflowNodeProperties } = params;

  const { name } = workflowNodeProperties;

  class AWorkflowNodeExecuter extends WorkflowNodeExecuter {
    execute: WorkflowNodeExecuterExecute = async () => {
      const { setVariables } = this;

      setVariables({
        variables: name,
      });
    };
  }

  const res: ExtraWorkflowNodeInfo = {
    Executer: AWorkflowNodeExecuter,
  };

  return res;
};

test("field type", () => {
  new HandlerResource({
    id: "test-handler",
    kind: "handler",
    parentId: "root",
    settings: {
      title: "测试处理程序",
      description: "",
      code: "",
      dependencies: [],
      handler,
    },
  });

  const workflowNodeTypeResource = new WorkflowNodeTypeResource({
    id: "test-workflow-node-type",
    kind: "workflow_node_type",
    parentId: "root",
    settings: {
      title: "文本",
      description: "可用来存储各种文本",
      workflowNodePropertiesSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            title: "名称",
            description: "",
          },
        },
      },
      handlerResourceId: "test-handler",
    },
  });

  const { extraWorkflowNodeInfo } =
    workflowNodeTypeResource.getExtraWorkflowNodeInfo({
      workflowNodeProperties: {
        name: "test",
      },
    });

  expect(extraWorkflowNodeInfo).toMatchSnapshot();

  const { Executer } = extraWorkflowNodeInfo;

  const nodeIdToVariablesMap = new Map();

  const executer = new Executer({
    nodeId: "test-node",
    nodeIdToVariablesMap,
  });

  executer.execute();

  expect(executer.nodeIdToVariablesMap).toMatchSnapshot();
});
