import axios from "axios";

type Handler = (
  source: any,
  args: any,
  context: any,
  info: any
) => Promise<any>;

export const handler: Handler = async (source, args, context, info) => {
  console.debug("handler args", args);

  const response = await axios.request({
    method: "get",
    maxBodyLength: Infinity,
    url: "https://2024.ipchaxun.com/",
    headers: {},
  });

  const res = response.data.ip;

  return res;
};
