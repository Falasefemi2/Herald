import { Effect } from "effect";
import { migrate } from "./src/schema";
import "./src/mailer";
import { enqueue } from "./src/queue";
import { start } from "./src/worker";

async function main() {
  try {
    await (Effect.runPromise as any)(migrate);
  } catch (error) {
    console.error("migration failed", error);
  }

  let id;
  try {
    id = await (Effect.runPromise as any)(
      enqueue("email", {
        to: "falasefemi31@gmail.com",
        subject: "Hello from world",
        html: "<strong>Hello from world!</strong>",
      }),
    );
  } catch (error) {
    console.error("enqueue failed", error);
    id = "enqueue failed";
  }
  console.log("Enqueued job:", id);

  // start the worker
  start("email");
}

main();
