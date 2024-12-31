/**
 * 字段类型
 */
export enum FieldType {
  /**
   * 文本
   */
  TEXT = "TEXT",

  /**
   * 数字
   */
  NUMBER = "NUMBER",

  /**
   * ID
   */
  ID = "ID",

  /**
   * MongoID
   */
  MongoID = "MongoID",

  /**
   * 日期
   */
  DATE = "DATE",

  /**
   * 选项
   */
  OPTIONS = "OPTIONS",

  /**
   * 是否
   */
  BOOLEAN = "BOOLEAN",

  /**
   * 图片
   */
  IMAGE = "IMAGE",

  /**
   * 附件
   */
  FILE = "FILE",

  /**
   * JSON
   */
  JSON = "JSON",

  /**
   * 对象
   */
  OBJECT = "OBJECT",

  /**
   * 列表
   */
  LIST = "LIST",
}

/**
 * 字段组方向
 */
export enum FieldsDirection {
  INPUT = "INPUT",
  OUTPUT = "OUTPUT",
}
