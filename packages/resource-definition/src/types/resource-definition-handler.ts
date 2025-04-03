import { Handler as ImportHandler } from "./handler";

export type Handler = ImportHandler<[number, string], number>

export const handler: Handler = (params, params1) => {
    const res: ReturnType<Handler> = 1

    return res
}