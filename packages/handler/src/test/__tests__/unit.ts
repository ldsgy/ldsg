import { ROOT_RESOURCE_ID } from "@ldsg/constants";
import { RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS } from "../../constants";
import { HandlerResource } from "../../resource";
import { handler as settingsHandler } from "../a";

describe("handler module unit test", () => {
  describe("handler", () => {
    const mockHandlerResource = new HandlerResource({
      id: "mock-handler",
      kind: RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS.kind,
      parentId: ROOT_RESOURCE_ID,
      settings: {
        title: "Mock Handler",
        description: "",
        code: "",
        dependencies: [],
        handler: settingsHandler,
      },
    });

    const handler = mockHandlerResource.getHandler();

    test("is defined", () => {
      expect(handler).toBeDefined();
    });

    test("this is changed", () => {
      const handlerRes = handler();

      console.debug("handlerRes", handlerRes);

      expect(handlerRes).toBeDefined();
    });

    // expect(getHandlerRes()).toMatchSnapshot();
  });
});
