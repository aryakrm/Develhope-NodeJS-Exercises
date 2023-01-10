import { Static, Type } from "@sinclair/typebox";

export const studentSchema = Type.Object(
  {
    name: Type.String(),
    age: Type.Integer(),
    score: Type.Integer(),
    isPassed: Type.Boolean(),
  },
  { additionalProperties: false }
);

export type StudentData = Static<typeof studentSchema>;
