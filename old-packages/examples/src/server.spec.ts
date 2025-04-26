import { createApp } from "@ldsg/create-app";
import fs from "fs-extra";
import { getIntrospectionQuery } from "graphql";
import request from "supertest";
import { appsDirPath } from "./constants";
import { getServiceRecords } from "./utils";

const fileNames = fs.readdirSync(appsDirPath);

describe("examples", () => {
  for (const fileName of fileNames) {
    const appName = fileName;

    if (appName === "dev") {
      break;
    }

    test(`app with app name equal to ${appName}`, async () => {
      const { serviceRecords } = getServiceRecords({
        appName,
      });

      const app = createApp({
        serviceRecords,
      });

      const helloQueryResponse = await request(app)
        .post("/graphql")
        .send({
          query: `
      query {
        hello
      }
    `,
        });

      expect(helloQueryResponse.statusCode).toMatchSnapshot();

      expect(helloQueryResponse.body).toMatchSnapshot();

      const resultOfGetIntrospectionQuery = getIntrospectionQuery();

      const introspectionQueryResponse = await request(app)
        .post("/graphql")
        .send({
          query: resultOfGetIntrospectionQuery,
        });

      expect(introspectionQueryResponse.statusCode).toMatchSnapshot();

      expect(introspectionQueryResponse.body).toMatchSnapshot();
    });
  }
});
