import { Resource, ResourceConstructorParams } from "@ldsg/resource";
import mongoose from "mongoose";
import { DatabaseSpecificResourceSettings } from "./types";

export class DatabaseResource extends Resource<DatabaseSpecificResourceSettings> {
  constructor(
    params: ResourceConstructorParams<DatabaseSpecificResourceSettings>
  ) {
    super(params);

    const { connect } = this;

    connect();
  }

  connect = () => {
    const {
      settings: { uri, connectOptions },
    } = this;

    return mongoose.connect(uri, connectOptions);
  };

  disconnect = () => {
    return mongoose.disconnect();
  };
}
