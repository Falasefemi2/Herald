import { migrate } from "./src/schema";
import "./src/mailer";
import { enqueue } from "./src/queue";
import { start } from "./src/worker";

async function main() {
  await migrate();

  const id = await enqueue("email", {
    to: "falasefemi31@gmail.com",
    subject: "Hello from world",
    html: "<strong>Hello from world!</strong>",
  });
  console.log("Enqueued job:", id);

  // start the worker
  start("email");
}

main();
