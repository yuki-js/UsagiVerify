// config.js
import { nfigure } from "@kintaman-co/nfigure";
import { typeboxValidator } from "@kintaman-co/nfigure-typebox";
import { Type } from "@sinclair/typebox";

const schema = Type.Object({
  PORT: Type.Integer(),
  PRIVATE_KEY: Type.String(),
  ERC1155WithLock_ADDRESS: Type.String(),
  manpokoUrl: Type.String(),
  masterSecret: Type.String(),
  skipProve: Type.Optional(Type.Boolean()),
  rpcUrl: Type.String(),
});

export default nfigure({
  validator: typeboxValidator(schema), // give types and validates the configuration
});
