import { Handler } from "@ldsg/handler";

export const handler: Handler<
  [
    {
      /**
       * Field Properties
       */
      fieldProperties?: any;
      /**
       * Platform
       * Such as mongoose\formily.
       */
      platform: string;
    }
  ],
  {}
> = (params) => {
  const { fieldProperties, platform } = params;

  const { max } = fieldProperties;

  let res;

  switch (platform) {
    case "mongoose": {
      res = {
        type: "String",
        ...(max
          ? {
              maxLength: max,
            }
          : {}),
      };

      break;
    }

    default: {
      res = {};

      break;
    }
  }

  return res;
};
