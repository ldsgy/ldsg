import { Resource } from "@ldsg/resource";
import express, { Express } from "express";
import { ApplicationResourceSettings } from "./types";

export class ApplicationResource extends Resource<ApplicationResourceSettings> {
  createExpressApplication: () => Express = () => {
    const app = express();

    app.get("/", (req, res) => {
      res.send("Hello, World!");
    });

    return app;
  };

  listen = () => {
    const app = this.createExpressApplication();

    const port = 3000;

    return app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  };
}
