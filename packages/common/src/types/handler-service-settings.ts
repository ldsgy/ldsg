export interface HandlerServiceSettings {
  moduleId: string;
  moduleData: HandlerServiceModuleData;
}

export interface HandlerServiceModuleData {
  code: string;
  modules: HandlerServiceModuleDataModule[];
}

export interface HandlerServiceModuleDataModule {
  name: string;
  version: string;
  path: string;
  requireName?: string;
}
