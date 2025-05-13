import { SpecificResourceSettings } from "@ldsg/types";
import { WorkflowEdgeInfo } from "./workflow-edge-info";

export interface WorkflowEdgeSpecificResourceSettings
  extends SpecificResourceSettings,
    WorkflowEdgeInfo {}
