import { SpecificResourceSettings } from "@ldsg/types";
import { WorkflowEdgeInfo } from "@ldsg/workflow";

export interface WorkflowEdgeSpecificResourceSettings
  extends SpecificResourceSettings,
    WorkflowEdgeInfo {}
