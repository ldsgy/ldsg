import { completeSchema } from "..";
import { DEFAULT_TYPE_TO_DEFAULT_MAP } from "../..";
import { FIELD_SERVICE_DEFAULT_SETTINGS_SCHEMA } from "../../../../../services";

test("empty object", async () => {
  const { formilySchema } = completeSchema({
    richJsonSchema: {
      type: "object",
    },
    typeToDefaultMap: DEFAULT_TYPE_TO_DEFAULT_MAP,
  });

  expect(formilySchema).toMatchSnapshot();
});

test("field service default settings schema", async () => {
  const { formilySchema } = completeSchema({
    richJsonSchema: FIELD_SERVICE_DEFAULT_SETTINGS_SCHEMA,
    typeToDefaultMap: DEFAULT_TYPE_TO_DEFAULT_MAP,
  });

  expect(formilySchema).toMatchSnapshot();
});
