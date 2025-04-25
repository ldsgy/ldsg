import { SpecificResourceSettings } from "@ldsg/types";
import {} from "graphql-compose";
import { SchemaDefinitionProperty } from "mongoose";

export interface FieldTypeSpecificResourceSettings
  extends SpecificResourceSettings {
  /**
   * field type name
   */
  name: string;

  a: Record<string, Record<string, any>>;

  /**
   * Mongoose Schema Definition Property
   */
  mongooseSchemaDefinitionProperty?: SchemaDefinitionProperty;

  graphql?: "";
}
