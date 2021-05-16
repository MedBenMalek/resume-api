import {Application, Router, RouterContext } from "./dep.ts";
import { getCarrier, getProfile, saveMessage, getTags } from "./routes.ts";

const router = new Router();

router.get('/', (ctx: RouterContext) => {
  ctx.response.body = 'HOLA!, welcome to my resume API';
})
router.get('/carrier', getCarrier);
router.get('/profile', getProfile);
router.post('/message', saveMessage);
router.get('/tags', getTags);

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port:  3000 | Number(Deno.env.get('PORT')) });
console.log('server upa and running 🚀')