import { Resource } from "@ldsg/resource";

class A extends Resource {
  handler() {
    const res = this.getFilteredResources({});

    return res;
  }
}

export const handler = new A({} as any).handler;
