/**
 * Rutas de eventos de calendatio.
 * Ruta: host + "/api/events"
 */

import { Router } from "express";

import validateJwt from "../middlewares/validateJwt.middleware";
import {
  createCalendarEvent,
  deleteCalendarEvent,
  getCalendarEvents,
  updateCalendarEvent,
} from "../controllers/calendarEvents.controller";

const calendarEventsRouter = Router();

calendarEventsRouter.use(validateJwt);

calendarEventsRouter.get("/", getCalendarEvents);
calendarEventsRouter.post("/", createCalendarEvent);
calendarEventsRouter.put("/:id", updateCalendarEvent);
calendarEventsRouter.delete("/:id", deleteCalendarEvent);

export default calendarEventsRouter;
