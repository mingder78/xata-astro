// Generated with CLI
import { getXataClient } from "./xata";
const xata = getXataClient();

const page = await xata.db.users.getPaginated();
console.log(page.records);

