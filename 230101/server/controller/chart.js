/**
 * 数据面板控制层及实现
 * @type {Model<InferSchemaType<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultSchemaOptions, {sale: {default: *[], type: ArrayConstructor}, charge: {default: number, type: NumberConstructor}, occupancy: {default: number, type: NumberConstructor}, createTime: {default: *, type: StringConstructor}, comment: {default: number, type: NumberConstructor}, updateTime: {default: *, type: StringConstructor}, visitor: {default: number, type: NumberConstructor}, hot: {default: *[], type: ArrayConstructor}, status: {default: string, type: StringConstructor}}>>, ObtainSchemaGeneric<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultSchemaOptions, {sale: {default: *[], type: ArrayConstructor}, charge: {default: number, type: NumberConstructor}, occupancy: {default: number, type: NumberConstructor}, createTime: {default: *, type: StringConstructor}, comment: {default: number, type: NumberConstructor}, updateTime: {default: *, type: StringConstructor}, visitor: {default: number, type: NumberConstructor}, hot: {default: *[], type: ArrayConstructor}, status: {default: string, type: StringConstructor}}>, "TQueryHelpers">, ObtainSchemaGeneric<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultSchemaOptions, {sale: {default: *[], type: ArrayConstructor}, charge: {default: number, type: NumberConstructor}, occupancy: {default: number, type: NumberConstructor}, createTime: {default: *, type: StringConstructor}, comment: {default: number, type: NumberConstructor}, updateTime: {default: *, type: StringConstructor}, visitor: {default: number, type: NumberConstructor}, hot: {default: *[], type: ArrayConstructor}, status: {default: string, type: StringConstructor}}>, "TInstanceMethods">, ObtainSchemaGeneric<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultSchemaOptions, {sale: {default: *[], type: ArrayConstructor}, charge: {default: number, type: NumberConstructor}, occupancy: {default: number, type: NumberConstructor}, createTime: {default: *, type: StringConstructor}, comment: {default: number, type: NumberConstructor}, updateTime: {default: *, type: StringConstructor}, visitor: {default: number, type: NumberConstructor}, hot: {default: *[], type: ArrayConstructor}, status: {default: string, type: StringConstructor}}>, "TVirtuals">, module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultSchemaOptions, {sale: {default: *[], type: ArrayConstructor}, charge: {default: number, type: NumberConstructor}, occupancy: {default: number, type: NumberConstructor}, createTime: {default: *, type: StringConstructor}, comment: {default: number, type: NumberConstructor}, updateTime: {default: *, type: StringConstructor}, visitor: {default: number, type: NumberConstructor}, hot: {default: *[], type: ArrayConstructor}, status: {default: string, type: StringConstructor}}>> | ObtainSchemaGeneric<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultSchemaOptions, {sale: {default: *[], type: ArrayConstructor}, charge: {default: number, type: NumberConstructor}, occupancy: {default: number, type: NumberConstructor}, createTime: {default: *, type: StringConstructor}, comment: {default: number, type: NumberConstructor}, updateTime: {default: *, type: StringConstructor}, visitor: {default: number, type: NumberConstructor}, hot: {default: *[], type: ArrayConstructor}, status: {default: string, type: StringConstructor}}>, "TStaticMethods">}
 */
const Chart=require('../models/chart');
const crud=require('./crudUtil');
const {success,responseSelf, fail,exception} = require('../util/response');


/**
 * 查询数据面板数据
 * @param ctx
 * @returns {Promise<void>}
 */
const query =async ctx => ctx.body={a:'aaa'}//await crud.findAll(ctx,Chart,undefined)






module.exports={
    query
}



