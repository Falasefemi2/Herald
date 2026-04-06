import { Data } from "effect";

export class DatabaseError extends Data.TaggedError("DatabaseError")<{
  cause: unknown;
}> {}

export class EmailError extends Data.TaggedError("EmailError")<{
  cause: unknown;
}> {}

export class QueueError extends Data.TaggedError("QueueError")<{
  cause: unknown;
}> {}
