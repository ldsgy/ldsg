import { RequestHandler } from "express";

export type ApplicationContext = Record<string, any>;

export interface ApplicationInstance {
  /**
   * 上下文
   */
  context: ApplicationContext;

  /**
   * sofa server instance
   */
  sofa: any;

  /**
   * yoga server instance
   */
  yoga: any;

  otherPathRequestHandler: Record<string, RequestHandler>;
}
