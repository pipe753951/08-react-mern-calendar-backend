import { Request, Response } from "express";
import { Types } from "mongoose";

import type { RequestWithJwtPayload } from "../types/requests/RequestWithJwtPayload";
import type { CreateCalendarEventRequestBody } from "../types/requests/calendar/CreateCalendarEventRequestBody.interface";

import { CalendarEventModel } from "../models/CalendarEvent.model";

const getCalendarEvents = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const calendarEvents = await CalendarEventModel.find().populate(
    "user",
    "name",
  );
  console.log(`Petición a ${request.url}`);

  return response.json({
    ok: true,
    calendarEvents,
  });
};

const createCalendarEvent = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  try {
    const typedRequest = request as RequestWithJwtPayload;

    const requestBody = typedRequest.body as CreateCalendarEventRequestBody;
    const calendarEvent = new CalendarEventModel(requestBody);
    calendarEvent.user = new Types.ObjectId(typedRequest.jwtPayload.uid);

    const savedCalendarEvent = await calendarEvent.save();

    return response.status(201).json({
      ok: true,
      calendarEvent: savedCalendarEvent,
    });
  } catch (error) {
    console.error(new Error("Hubo un error inesperado", { cause: error }));
    return response.status(500).json({
      ok: false,
      message:
        "Hubo un error interno desde el servidor. Se recomienda que te comuniques con el administrador para encontrar una solución.",
    });
  }
};

const updateCalendarEvent = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  console.log(`Petición a ${request.url}`);

  return response.json({
    ok: true,
    controller: "updateCalendarEvents",
  });
};

const deleteCalendarEvent = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  console.log(`Petición a ${request.url}`);

  return response.json({
    ok: true,
    controller: "deleteCalendarEvents",
  });
};

export {
  getCalendarEvents,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
};
