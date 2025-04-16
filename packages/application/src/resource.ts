import { Resource } from "@ldsg/resource";
import express, { Express } from "express";
import { ApplicationResourceSettings } from "./types";

export class ApplicationResource extends Resource<ApplicationResourceSettings> {
  createApp: () => Express = () => {
    const app = express();

    app.get("/", (req, res) => {
      res.send("Hello, World!");
    });

    return app;
  };
}
