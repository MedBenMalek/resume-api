import { RouterContext, Bson } from "./dep.ts";
import { connect } from './db.ts';
import { CarrierSchema, TypeCarrierSchema, ProfileSchema, TagSchema, ContactSchema } from "./models.ts";

const db = await connect();

export const getCarrier = async (ctx: RouterContext) => {
  const carrierSchemaCollection = db.collection<CarrierSchema>("carrier");
  const typeCarrierCollection = db.collection<TypeCarrierSchema>("typeCarrier");
  try {
    // @ts-ignore("noCursorTimeout not yet implemented in options")
    const entities: CarrierSchema[] = await carrierSchemaCollection.find({}, { noCursorTimeout: false }).toArray();
    for (const entity of entities) {
      // @ts-ignore("noCursorTimeout not yet implemented in options")
      const type = await typeCarrierCollection.findOne({_id: new Bson.ObjectId(entity.type)}, { noCursorTimeout: false }) as TypeCarrierSchema;
      type._id = type?._id.toString();
      entity._id = entity._id.toString();
      entity.type = type;
    }
    ctx.response.status = 200
    ctx.response.body = entities;
  } catch (e) {
    ctx.response.status = 404
    ctx.response.body = e;
  }
}

export const getProfile = async (ctx: RouterContext) => {
  const collection = db.collection<ProfileSchema>("profile");
  try {
    // @ts-ignore("noCursorTimeout not yet implemented in options")
    const entity: ProfileSchema = await collection.findOne({}, { noCursorTimeout: false });
    entity._id = entity._id.toString();
    ctx.response.status = 200
    ctx.response.body = entity;
  } catch (e) {
    ctx.response.status = 405
    ctx.response.body = e;
  }
}

export const getTags = async (ctx: RouterContext) => {
  const collection = db.collection<TagSchema>("tag");
  try {
    // @ts-ignore("noCursorTimeout not yet implemented in options")
    const entities: TagSchema[] = await collection.find({}, { noCursorTimeout: false }).toArray();
    entities.map(e => e._id = e._id.toString());
    ctx.response.status = 200
    ctx.response.body = entities;
  } catch (e) {
    ctx.response.status = 404
    ctx.response.body = e;
  }
}

export const saveMessage = async (ctx: RouterContext) => {
  const result = ctx.request.body();
  try {
    if (result.type === "json") {
      const entity = await result.value as ContactSchema;
      entity._id = new Bson.ObjectId();
      const collection = db.collection<ContactSchema>("contacts");
      await collection.insertOne(entity);
      entity._id = entity._id.toString();
      ctx.response.status = 200
      ctx.response.body = entity;
    } else {
      throw new Error('Failed to read json')
    }
  } catch (e) {
    ctx.response.status = 405
    ctx.response.body = e;
  }
}