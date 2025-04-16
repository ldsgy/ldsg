import { getConstants } from "./get-constants";

test("get constants", () => {
  const { manifest } = getConstants();

  expect(manifest).toMatchSnapshot();
});
