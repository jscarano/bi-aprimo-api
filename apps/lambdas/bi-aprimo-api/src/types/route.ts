import { HttpMethods } from "./http-methods";

 export interface Route {
   methods: HttpMethods[];
   name: string;
   patterns: Array<string | RegExp>;
 }