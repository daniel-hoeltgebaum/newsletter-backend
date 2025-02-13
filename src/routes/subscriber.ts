import { Hono } from "hono";
import { Subscriber } from "../models/subscriber";

export const subscriber = new Hono();

// find all subscriber
subscriber.get("/", async (c) => {
  const subscribers = await Subscriber.findAll();

  return c.json(
    {
      data: subscribers,
    },
    200
  );
});

// find subscriber by id
subscriber.get("/:id", async (c) => {
  const id = c.req.param("id");
  const subscriber = await Subscriber.find(id);

  return c.json(
    {
      data: subscriber,
    },
    200
  );
});

// find all email adresses
subscriber.get("/emails/", async (c) => {
  const emails = await Subscriber.findAllEmailAdresses();

  return c.json(
    {
      data: emails,
    },
    200
  );
});

// update user by id
subscriber.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  try {
    const updatedSubscriber = await Subscriber.updateSubscriber(id, body);

    if (updatedSubscriber) {
      return c.json(
        { message: "Subscriber updated succesfully", data: updatedSubscriber },
        200
      );
    } else {
      return c.text("Subscriber not found or update failed", 404);
    }
  } catch (error) {
    console.error("Error updating subscriber:", error);
    return c.text("Internal server error", 500);
  }
});

// create new subscriber
subscriber.post("/", async (c) => {
  const body = await c.req.json();

  try {
    const newSubscriber = await Subscriber.createSubscriber(body);

    return c.json(
      { message: "Subscriber succesfully added", data: newSubscriber },
      200
    );
  } catch (error) {
    console.error("Error adding new Subscriber:", error);
    return c.text("Internal Server error", 500);
  }
});

// delete subscriber by id
subscriber.delete("/:id", async (c) => {
  const id = c.req.param("id");

  try {
    const deletedSubscriber = await Subscriber.deleteSubscriber(id);
    if (deletedSubscriber) {
      return c.json(
        { message: "Subscriber deleted succesfully", data: deletedSubscriber },
        200
      );
    } else {
      return c.text("Subscriber not found", 404);
    }
  } catch (error) {
    console.error("Error deleting subscriber:", error);
    return c.text("Internal server error", 500);
  }
});
