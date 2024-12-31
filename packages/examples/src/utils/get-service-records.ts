import { ServiceRecords } from "@ldsg/common";
import dotenv from "dotenv";
import fs from "fs-extra";
import _ from "lodash";
import path from "path";
import { appsDirPath } from "../constants";

interface GetserviceRecordsParams {
  appName: string;
}

interface GetserviceRecordsRes {
  serviceRecords: ServiceRecords;
}

type GetserviceRecords = (
  params: GetserviceRecordsParams
) => GetserviceRecordsRes;

export const getServiceRecords: GetserviceRecords = (params) => {
  const { appName } = params;

  const appDirPath = path.join(appsDirPath, appName);

  const envFilePath = path.join(appDirPath, ".env");

  const existsSyncRes = fs.existsSync(envFilePath);

  if (existsSyncRes) {
    const environmentVariables = dotenv.parse(fs.readFileSync(envFilePath));

    _.merge(process.env, environmentVariables);
  }

  const serviceRecordsFilePath = path.join(appDirPath, "service-records.json");

  const readJsonSyncRes = fs.readJsonSync(
    serviceRecordsFilePath
  ) as ServiceRecords;

  const serviceRecords = readJsonSyncRes.map((value) => {
    const { type } = value;

    const res = value;

    if (type === "HANDLER") {
      const rawModuleId = _.get(res, "settings.moduleId");

      const newModuleId = path.join(
        appsDirPath,
        appName,
        "handlers",
        rawModuleId
      );

      _.set(res, "settings", { moduleId: newModuleId });
    }

    return res;
  });

  const res = {
    serviceRecords,
  };

  return res;
};
