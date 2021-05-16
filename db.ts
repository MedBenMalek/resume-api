import "https://deno.land/x/dotenv/load.ts";
import { MongoClient } from "./dep.ts";

export const connect = async () => {
  const client = new MongoClient();
  await client.connect({
    db: Deno.env.get('DB_NAME')!,
    tls: true,
    servers: [
      { 
        host: Deno.env.get('DB_HOST')!,
        port: 27017,
      },
    ],
    credential: {
      username: Deno.env.get('DB_USER'),
      password: Deno.env.get('DB_PWD'),
      db: Deno.env.get('DB_NAME'),
      mechanism: "SCRAM-SHA-1",
    },
  });
  return client.database("resume");
}