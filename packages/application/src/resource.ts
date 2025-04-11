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

  start = () => {
    const app = this.createApp();

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
      console.log(`app listening on port ${port}`);
    });
  };
}
