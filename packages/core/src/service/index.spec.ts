import { Service } from ".";

describe("service", () => {
  test("getUriInfo", async () => {
    const service = new Service({
      settings: {
        uri: "uri://user:pass@example.com:123/one/two.three?q1=a1&q2=a2#body",
      },
    });

    expect(service.getUriInfo()).toMatchSnapshot();
  });
});
