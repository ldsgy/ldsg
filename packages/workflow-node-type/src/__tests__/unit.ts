import { Handler, HandlerResource } from "@ldsg/handler";
import {
  WorkflowNodeExecuter,
  WorkflowNodeExecuterExecute,
} from "@ldsg/workflow";
import { WorkflowNodeTypeResource } from "../resource";
import {
  GetExtraWorkflowNodeInfoParams,
  GetExtraWorkflowNodeInfoRes,
} from "../types";

const handler: Handler<
  [GetExtraWorkflowNodeInfoParams],
  GetExtraWorkflowNodeInfoRes
> = (params) => {
  const { workflowNodeProperties } = params;

  const { name } = workflowNodeProperties;

  class AWorkflowNodeExecuter extends WorkflowNodeExecuter {
    execute: WorkflowNodeExecuterExecute = () => {
      const { setOutputVariables } = this;

      setOutputVariables({
        outputVariables: name,
      });
    };
  }

  const res: GetExtraWorkflowNodeInfoRes = {
    extraWorkflowNodeInfo: {
      Executer: class a extends WorkflowNodeExecuter {
        execute = () => {
          const { setOutputVariables } = this;

          setOutputVariables({
            outputVariables: "abc",
          });
        };
      },
    },
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
    },
    handler,
  });

  const workflowNodeTypeResource = new WorkflowNodeTypeResource({
    id: "test-field-type",
    kind: "field_type",
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
        max: "10",
      },
    });

  console.debug("extraWorkflowNodeInfo", extraWorkflowNodeInfo);

  expect(extraWorkflowNodeInfo).toMatchSnapshot();

  const { Executer } = extraWorkflowNodeInfo;

  const executer = new Executer({
    nodeId: "test-node-id",
    nodeIdToOutputVariablesMap: {},
  });

  executer.execute();

  expect(executer.nodeIdToOutputVariablesMap).toMatchSnapshot();
});
