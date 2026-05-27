/**
 * Rutas de eventos de calendatio.
 * Ruta: host + "/api/events"
 */

import { Router } from "express";

import { body, check } from "express-validator";

import isDateFnsDate from "../helpers/validators/isDateFnsDate.validator";

import validateJwt from "../middlewares/validateJwt.middleware";
import checkFinalJsonFieldsValidation from "../middlewares/checkFinalJsonFieldsValidation.middleware";

import {
  createCalendarEvent,
  deleteCalendarEvent,
  getCalendarEvents,
  updateCalendarEvent,
} from "../controllers/calendarEvents.controller";

const calendarEventsRouter = Router();

calendarEventsRouter.use(validateJwt);

calendarEventsRouter.get("/", getCalendarEvents);
calendarEventsRouter.post(
  "/",
  [
    check("title", "Debes proporcionar el título del evento.").not().isEmpty(),
    check("title", "El título del evento debe ser un texto.").isString(),

    check("start", "Debes proporcionar la fecha de inicio del evento.")
      .not()
      .isEmpty(),
    check(
      "start",
      "La fecha de inicio del evento debe ser un número que represente una fecha UNIX.",
    ).isNumeric(),
    check(
      "start",
      "La fecha de inicio del evento debe tener un formato como tal.",
    ).custom(isDateFnsDate),

    check("end", "Debes proporcionar la fecha de finalización del evento.")
      .not()
      .isEmpty(),
    check(
      "start",
      "La fecha de finalización del evento debe ser un número que represente una fecha UNIX.",
    ).isNumeric(),
    check(
      "end",
      "La fecha de finalización del evento debe tener un formato como tal.",
    ).custom(isDateFnsDate),

    check("note", "La nota debe ser un texto.")
      .if(body("note").not().isEmpty())
      .isString(),
    checkFinalJsonFieldsValidation,
  ],
  createCalendarEvent,
);
calendarEventsRouter.put(
  "/:id",
  [
    check("title", "Debes proporcionar el título del evento.").not().isEmpty(),
    check("title", "El título del evento debe ser un texto.").isString(),

    check("start", "Debes proporcionar la fecha de inicio del evento.")
      .not()
      .isEmpty(),
    check(
      "start",
      "La fecha de inicio del evento debe ser un número que represente una fecha UNIX.",
    ).isNumeric(),
    check(
      "start",
      "La fecha de inicio del evento debe tener un formato como tal.",
    ).custom(isDateFnsDate),

    check("end", "Debes proporcionar la fecha de finalización del evento.")
      .not()
      .isEmpty(),
    check(
      "start",
      "La fecha de finalización del evento debe ser un número que represente una fecha UNIX.",
    ).isNumeric(),
    check(
      "end",
      "La fecha de finalización del evento debe tener un formato como tal.",
    ).custom(isDateFnsDate),

    check("note", "La nota debe ser un texto.")
      .if(body("note").not().isEmpty())
      .isString(),
    checkFinalJsonFieldsValidation,
  ],
  updateCalendarEvent,
);
calendarEventsRouter.delete("/:id", deleteCalendarEvent);

export default calendarEventsRouter;
