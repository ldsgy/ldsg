import { SPECIFIC_WORKFLOW_NODE_TYPE_TO_WORKFLOW_NODE_TYPE_RESOURCE_ID_MAP } from "../../constants";
import {
  GetWorkflowData,
  GetWorkflowDataRes,
  WorkflowResource,
} from "../../resource";
import { WorkflowData, WorkflowNodeExecuter } from "../../types";

class AWorkflowResource extends WorkflowResource {
  getWorkflowData: GetWorkflowData = () => {
    const workflowData: WorkflowData = {
      edges: [
        {
          sourceWorkflowNodeResourceId: "1",
          targetWorkflowNodeResourceId: "2",
        },
        {
          sourceWorkflowNodeResourceId: "2",
          targetWorkflowNodeResourceId: "3",
        },
        {
          sourceWorkflowNodeResourceId: "3",
          targetWorkflowNodeResourceId: "4",
        },
        {
          sourceWorkflowNodeResourceId: "4",
          targetWorkflowNodeResourceId: "5",
        },
      ],
      nodes: [
        {
          id: "1",
          workflowNodeTypeResourceId:
            SPECIFIC_WORKFLOW_NODE_TYPE_TO_WORKFLOW_NODE_TYPE_RESOURCE_ID_MAP.start,
          Executer: class AWorkflowNodeExecuter extends WorkflowNodeExecuter {
            execute = async () => {
              const { setVariables } = this;

              setVariables({
                variables: "abc",
              });
            };
          },
        },
        {
          id: "2",
          workflowNodeTypeResourceId: "",
          Executer: class AWorkflowNodeExecuter extends WorkflowNodeExecuter {
            execute = async () => {
              const { setVariables } = this;

              setVariables({
                variables: "def",
              });
            };
          },
        },
        {
          id: "3",
          workflowNodeTypeResourceId: "",
          Executer: class AWorkflowNodeExecuter extends WorkflowNodeExecuter {
            execute = async () => {
              const { setVariables } = this;

              setVariables({
                variables: "ghi",
              });
            };
          },
        },
        {
          id: "4",
          workflowNodeTypeResourceId: "",
          Executer: class AWorkflowNodeExecuter extends WorkflowNodeExecuter {
            execute = async () => {
              const { setVariables } = this;

              setVariables({
                variables: "jkl",
              });
            };
          },
        },
        {
          id: "5",
          workflowNodeTypeResourceId:
            SPECIFIC_WORKFLOW_NODE_TYPE_TO_WORKFLOW_NODE_TYPE_RESOURCE_ID_MAP.end,
          Executer: class AWorkflowNodeExecuter extends WorkflowNodeExecuter {
            execute = async () => {
              const { setVariables } = this;

              setVariables({
                variables: "mno",
              });
            };
          },
        },
      ],
    };

    const res: GetWorkflowDataRes = {
      workflowData,
    };

    return res;
  };
}

test("WorkflowResource execute", async () => {
  const aWorkflowResource = new AWorkflowResource({
    id: "test",
    kind: "workflow",
    parentId: "root",
    settings: {
      title: "",
      description: "",
    },
  });

  const { endNodeOutputVariables } = await aWorkflowResource.execute({
    startNodeInputVariables: {
      hello: "world",
    },
  });

  expect(endNodeOutputVariables).toMatchSnapshot();
});
