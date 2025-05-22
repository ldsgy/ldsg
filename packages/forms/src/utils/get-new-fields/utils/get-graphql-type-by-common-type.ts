interface GetGraphqlTypeByCommonTypeParams {
  commonType: any;
}

interface GetGraphqlTypeByCommonTypeRes {
  graphqlType: any;
}

type GetGraphqlTypeByCommonType = (
  params: GetGraphqlTypeByCommonTypeParams
) => GetGraphqlTypeByCommonTypeRes;

export const getGraphqlTypeByCommonType: GetGraphqlTypeByCommonType = (
  params
) => {
  const { commonType } = params;

  const { type } = commonType;

  let graphqlType: any;

  switch (type) {
    case "string": {
      graphqlType = "String";

      break;
    }

    default:
      break;
  }

  const res = {
    graphqlType,
  };

  return res;
};
