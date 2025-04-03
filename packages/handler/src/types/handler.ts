type DefaultParams = any[]

type DefaultRes = any

export type Handler<Params extends DefaultParams = DefaultParams, Res extends DefaultRes = DefaultRes> = (...params: Params) => Res | Promise<Res>;