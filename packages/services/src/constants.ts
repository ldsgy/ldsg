import { Service } from "@ldsg/core";
import {
  ApplicationService,
  CustomService,
  DatabaseService,
  FieldService,
  HandlerService,
  HttpService,
  KeyValueStorageService,
  MiddlewareService,
  TableService,
} from "./services";

export const SERVICE_TYPE_MAP = {
  APPLICATION: {
    class: ApplicationService,
  },
  CUSTOM: {
    class: CustomService,
  },
  DATABASE: {
    class: DatabaseService,
  },
  FIELD: {
    class: FieldService,
  },
  HTTP: {
    class: HttpService,
  },
  HANDLER: {
    class: HandlerService,
  },
  KEY_VALUE_STORAGE: {
    class: KeyValueStorageService,
  },
  MIDDLEWARE: {
    class: MiddlewareService,
  },
  TABLE: {
    class: TableService,
  },
  SERVICE: {
    class: Service,
  },
} as const;
