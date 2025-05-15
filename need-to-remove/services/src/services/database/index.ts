import { Service, ServiceLevel, SettingsSchema } from "@ldsg/core";
import mongoose from "mongoose";
import { DATABASE_SERVICE_DEFAULT_SETTINGS_SCHEMA } from "./constants";
import {
  GetMongooseConnection,
  GetMongooseCreateConnectionParams,
  MongooseCreateConnectionParams,
} from "./types";

export * from "./constants";

export class DatabaseService extends Service {
  settingsSchema: SettingsSchema = DATABASE_SERVICE_DEFAULT_SETTINGS_SCHEMA;

  appendToContext = (context: any) => {
    context.models = this.getMongooseConnectionModels();
  };

  getMongooseCreateConnectionParams: GetMongooseCreateConnectionParams = () => {
    const settings = this.getSettings();

    const { DATABASE_URI = "127.0.0.1", DATABASE_NAME = "27017" } = process.env;

    const { uri = DATABASE_URI, dbName = DATABASE_NAME } = settings;

    const result: MongooseCreateConnectionParams = {
      uri,
      options: {
        dbName,
      },
    };

    return result;
  };

  getMongooseConnection: GetMongooseConnection = () => {
    const { uri, options } = this.getMongooseCreateConnectionParams();

    const connection = mongoose.createConnection(uri, options);

    return connection;
  };

  getMongooseConnectionModels = () => {
    const connection = this.getMongooseConnection();

    const peerServices = this.getServices({
      level: ServiceLevel.PEER,
    });

    peerServices.forEach((value) =>
      value.addMongooseModel?.({
        connection,
      })
    );

    return connection.models;
  };
}
