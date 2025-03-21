import { Type } from "@sinclair/typebox";

export const schema = Type.Object({
  name: Type.String(),
  age: Type.Number(),
});
