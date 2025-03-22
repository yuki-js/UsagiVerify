// config.js
import { nfigure } from "@kintaman-co/nfigure";
import { typeboxValidator } from "@kintaman-co/nfigure-typebox";
import { Type } from "@sinclair/typebox";

const schema = Type.Object({
  PORT: Type.Integer(),
});

export default nfigure({
  validator: typeboxValidator(schema), // give types and validates the configuration
});
