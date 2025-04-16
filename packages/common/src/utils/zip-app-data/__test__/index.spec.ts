import { zipAppData } from "..";
import manifestJson from "./manifest.json";

test("manifest", async () => {
  const { resources } = manifestJson;

  const zipAppDataRes = zipAppData({
    resources,
  });

  /**
   * TODO：验证压缩文件
   */

  expect(manifestJson).toMatchSnapshot();
});
