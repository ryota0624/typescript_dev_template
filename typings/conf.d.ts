// import * as inversify from "inversify";

declare module conf {
  var container: any;
}

declare module "inversify.conf" {
  export = conf;
}