import { FieldTypeBasePlatform, FieldTypeInfo } from "@ldsg/field-type";
import { getGraphqlTypeByCommonType } from "./get-graphql-type-by-common-type";

interface GetGraphqlTypeByTypeInfoParams {
  typeInfo: FieldTypeInfo;
}

interface GetGraphqlTypeByTypeInfoRes {
  graphqlType: any;
}

type GetGraphqlTypeByTypeInfo = (
  params: GetGraphqlTypeByTypeInfoParams
) => GetGraphqlTypeByTypeInfoRes;

export const getGraphqlTypeByTypeInfo: GetGraphqlTypeByTypeInfo = (params) => {
  const { typeInfo } = params;

  const { platformToTypeMap } = typeInfo;

  let graphqlType = platformToTypeMap[FieldTypeBasePlatform.GRAPHQL];

  if (!graphqlType) {
    const commonType = platformToTypeMap[FieldTypeBasePlatform.COMMON];

    graphqlType = getGraphqlTypeByCommonType({
      commonType,
    }).graphqlType;
  }

  const res = {
    graphqlType,
  };

  return res;
};
