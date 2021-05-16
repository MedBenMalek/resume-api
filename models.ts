import { Bson } from "./dep.ts";

export interface ContactSchema {
  _id: Bson.ObjectID | string;
  subject: string;
  email: string;
  description: string;
  datetime: Date;
}

export interface ProfileSchema {
  _id: Bson.ObjectID | string;
  firstName: string;
  lastName: string;
  description: string;
}

export interface TypeCarrierSchema {
  _id: Bson.ObjectID | string;
  name: string;
}

export interface TagSchema {
  _id: Bson.ObjectID | string;
  name: string;
  type: string;
  description: string;
}

export interface CarrierSchema {
  _id: Bson.ObjectID | string;
  name: string;
  url : string;
  from: Date;
  to: Date | null;
  tags?: TagSchema[] | string[];
  type: TypeCarrierSchema | string;
}
