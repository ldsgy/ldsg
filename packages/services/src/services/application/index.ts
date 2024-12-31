import { Service, ServiceLevel, SettingsSchema } from "@ldsg/core";
import { RequestHandler } from "express";
import { GraphQLJSONObject, SchemaComposer } from "graphql-compose";
import { applyMiddleware } from "graphql-middleware";
import { createYoga, YogaServerOptions } from "graphql-yoga";
import _ from "lodash";
import { useSofa } from "sofa-api";
import { ServiceType } from "../../enum";
import { ModifyGraphQLSchema } from "../../types";
import { APPLICATION_SERVICE_DEFAULT_SETTINGS_SCHEMA } from "./constants";
import { ApplicationContext, ApplicationInstance } from "./types";

export * from "./constants";
export * from "./types";

export interface GetApplicationInstanceParams {
  basePath?: string;
  yogaServerOptions?: YogaServerOptions<any, any>;
}

type GetApplicationInstance = (
  params?: GetApplicationInstanceParams
) => ApplicationInstance;

interface ServicesParams {
  services: Service[];
}

export class ApplicationService extends Service {
  settingsSchema: SettingsSchema = APPLICATION_SERVICE_DEFAULT_SETTINGS_SCHEMA;

  appendToContext = (context: any) => {
    context.getService = this.getService;

    context.getServices = this.getServices;
  };

  getGraphQLSchema = (params: ServicesParams) => {
    const { services } = params;

    const schemaComposer = new SchemaComposer();

    services.forEach((value) => {
      value.modifyGraphQLSchema?.({ schemaComposer });
    });

    let schema = schemaComposer.buildSchema();

    const middlewareServices = this.getServices({
      level: ServiceLevel.CHILD,
      type: ServiceType.MIDDLEWARE,
    });

    const middlewares = middlewareServices
      .sort((a, b) => a.getSettings().sort - b.getSettings().sort)
      .map((value) => value.getMiddleware());

    const filterMiddlewares = middlewares.filter((value) => {
      return !!value;
    });

    if (middlewares.length) {
      schema = applyMiddleware(schema, ...filterMiddlewares);
    }

    return schema;
  };

  getContext = (params: ServicesParams) => {
    const { services } = params;

    const context: ApplicationContext = {};

    /**
     * append context
     */
    services.forEach((value) => {
      value.appendToContext?.(context);
    });

    return context;
  };

  getApplicationInstance: GetApplicationInstance = (params) => {
    const { basePath: paramsBasePath = "/", yogaServerOptions } = params || {};

    const basePath = _.endsWith(paramsBasePath, "/")
      ? paramsBasePath.slice(0, -1)
      : paramsBasePath;

    const services = this.getServices();

    const context = this.getContext({ services });

    const schema = this.getGraphQLSchema({ services });

    /**
     * yoga
     */
    const graphqlEndpoint = `${basePath}/graphql`;

    const yoga = createYoga({
      context,
      graphqlEndpoint,
      landingPage: false,
      schema,
      ...yogaServerOptions,
    });

    /**
     * sofa
     */
    const sofaBasePath = `${basePath}/api`;

    const sofaServerUrl = sofaBasePath;

    const sofa = useSofa({
      basePath: sofaBasePath,
      schema,
      openAPI: {
        info: {
          title: "Example API",
          description: "Example API Description",
          version: "3.0.0",
        },
        servers: [{ url: sofaServerUrl }],
      },
    });

    const httpServices = this.getServices({
      level: ServiceLevel.CHILD,
      type: ServiceType.HTTP,
    });

    const otherPathRequestHandler: Record<string, RequestHandler> = {};

    httpServices.forEach((httpService) => {
      const { path } = httpService.getSettings();

      otherPathRequestHandler[path] = httpService.handleRequest;
    });

    const applicationInstance: ApplicationInstance = {
      context,
      yoga,
      sofa,
      otherPathRequestHandler,
    };

    return applicationInstance;
  };

  modifyGraphQLSchema: ModifyGraphQLSchema = (params) => {
    const { schemaComposer } = params;

    schemaComposer.Query.addFields({
      hello: {
        description: "示例，正常时返回 Hello world!",
        type: "String!",
        resolve: () => {
          return "Hello world!";
        },
      },
    });

    const ServiceTC = schemaComposer.createObjectTC({
      name: "Service",
      description: "服务",
      fields: {
        id: {
          description: "ID",
          type: "ID!",
        },
        property: {
          description: "属性",
          type: "JSON",
          args: {
            name: {
              description: "名称",
              type: "String!",
            },
            params: {
              description: "参数",
              type: GraphQLJSONObject,
            },
          },
          resolve: (source, args, context, info) => {
            return source.getProperty(args);
          },
        },
      },
    });

    const settings = this.getSettings();

    const { exposeServiceInfo = false } = settings;

    if (exposeServiceInfo) {
      schemaComposer.Query.addFields({
        service: {
          description: "服务",
          type: ServiceTC.NonNull,
          args: {
            params: {
              description: "参数",
              type: GraphQLJSONObject,
            },
          },
          resolve: (source, args, context, info) => {
            const { params = {} } = args;

            return this.getService(params);
          },
        },
        services: {
          description: "服务组",
          type: ServiceTC.NonNull.List.NonNull,
          args: {
            params: {
              description: "参数",
              type: GraphQLJSONObject,
            },
          },
          resolve: (source, args, context, info) => {
            const { params = {} } = args;

            return this.getServices(params);
          },
        },
      });
    }
  };
}
