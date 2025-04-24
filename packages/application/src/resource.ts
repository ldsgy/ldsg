import { Resource } from "@ldsg/resource";
import express, { Express } from "express";
import { ApplicationSpecificResourceSettings } from "./types";

export class ApplicationResource extends Resource<ApplicationSpecificResourceSettings> {
  createApp: () => Express = () => {
    const app = express();

    const { name } = this.settings;

    app.get("/", (req, res) => {
      res.send(`Hello, ${name}!`);
    });

    return app;
  };
}
