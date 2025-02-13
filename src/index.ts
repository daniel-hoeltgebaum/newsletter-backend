import { Hono } from "hono";
import { subscriber } from "./routes/subscriber";
import { newsletter } from "./routes/newsletter";

const app = new Hono();

// connect routes
app.route("/subscriber", subscriber);
app.route("/newsletter", newsletter);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
