import { Resource } from "@ldsg/resource";
import mongoose from "mongoose";
import { DatabaseSpecificResourceSettings } from "./types";

export class DatabaseResource extends Resource<DatabaseSpecificResourceSettings> {
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
