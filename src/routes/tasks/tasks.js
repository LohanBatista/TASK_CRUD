import { randomUUID } from "node:crypto";
import { Database } from "../../config/database.js";
import { buildRoutePath } from "../../utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const tasks = database.select("tasks");

      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      database.insert("tasks", task);

      return res.writeHead(201).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      database.delete("tasks", id);

      return res.writeHead(204).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      const existingTask = database.select("tasks", id);

      const updatedTask = {
        ...existingTask,
        title: title !== undefined ? title : existingTask.title,
        description:
          description !== undefined ? description : existingTask.description,
        updated_at: new Date().toISOString(),
      };

      database.update("tasks", id, updatedTask);

      return res.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;

      const updatedTask = {
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      database.update("tasks", id, updatedTask);

      return res.writeHead(204).end();
    },
  },
];
