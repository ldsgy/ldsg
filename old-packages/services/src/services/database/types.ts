import mongoose from "mongoose";

export type GetMongooseConnection = () => mongoose.Connection;

export interface MongooseCreateConnectionParams {
  uri: string;
  options?: mongoose.ConnectOptions;
}

export type GetMongooseCreateConnectionParams =
  () => MongooseCreateConnectionParams;
