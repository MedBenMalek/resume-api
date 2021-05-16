import { Bson } from "../dep.ts";
import { CarrierSchema } from "../models.ts";
import { connect } from '../db.ts';
const db = await connect();

const collection = db.collection<CarrierSchema>("carrier");

const id = new Bson.ObjectId();
// const entity: CarrierSchema = {
//   _id: id,
//   name: "education"
// }

const entity: CarrierSchema = {
  _id: id,
  name: "Private High School of Engineering and Technologies",
  url: "https://esprit.tn/",
  from: new Date('2017-01-01'),
  to: new Date('2020-08-01'),
  type: '60a108419acac54df2cda1fe'
}

const insertId = await collection.insertOne(entity);


// @ts-ignore("noCursorTimeout not yet implemented in options")
const entities: CarrierSchema[] = await collection.find({}, { noCursorTimeout: false }).toArray();
entities.map(e => e._id = e._id.toString());
console.log(entities);