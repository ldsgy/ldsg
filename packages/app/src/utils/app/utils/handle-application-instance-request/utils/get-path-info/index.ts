import path from "path";

interface GetRequestInfoParams {
  basePath: string;
  path: string;
}

interface RequestInfo {
  endpoint: string;
  relativePath: string;
}

type GetRequestInfo = (params: GetRequestInfoParams) => RequestInfo;

export const getPathInfo: GetRequestInfo = (params) => {
  const { basePath, path: paramsPath } = params;

  const relativePath = path.relative(basePath, paramsPath);

  const splitRes = relativePath.split("/");

  let endpoint = "http";

  switch (splitRes[0]) {
    case "graphql": {
      endpoint = "graphql";

      break;
    }

    case "api": {
      endpoint = "api";

      break;
    }

    default:
      break;
  }

  const result: RequestInfo = {
    endpoint,
    relativePath,
  };

  return result;
};
