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
  const typedRequest = request as RequestWithJwtPayload;
  const requestBody = request.body as CreateCalendarEventRequestBody;
  const uid = typedRequest.jwtPayload.uid;

  const calendarEventId = request.params.id;

  try {
    const calendarEvent = await CalendarEventModel.findById(calendarEventId);

    if (!calendarEvent) {
      return response.status(404).json({
        ok: false,
        message: "El evento buscado por el ID que proporcionaste no existe.",
      });
    }

    if (calendarEvent.user.toString() !== uid) {
      return response.status(401).json({
        ok: false,
        message:
          "No estás autorizado para modificar el evento; solo el dueño de un evento puede hacer modificaciones sobre el mismo.",
      });
    }

    const calendarEventNewData = {
      ...requestBody,
      user: uid,
    };

    const updatedCalendarEvent = await CalendarEventModel.findByIdAndUpdate(
      calendarEvent.id,
      calendarEventNewData,
      { returnDocument: "after" },
    );

    return response.status(200).json({
      ok: true,
      calendarEvent: updatedCalendarEvent,
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

const deleteCalendarEvent = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const typedRequest = request as RequestWithJwtPayload;
  const uid = typedRequest.jwtPayload.uid;

  const calendarEventId = request.params.id;

  try {
    const calendarEvent = await CalendarEventModel.findById(calendarEventId);

    if (!calendarEvent) {
      return response.status(404).json({
        ok: false,
        message: "El evento buscado por el ID que proporcionaste no existe.",
      });
    }

    if (calendarEvent.user.toString() !== uid) {
      return response.status(401).json({
        ok: false,
        message:
          "No estás autorizado para eliminar el evento; solo el dueño de un evento puede hacer eliminar su propio evento.",
      });
    }

    const deletedCalendarEvent = await CalendarEventModel.findByIdAndDelete(
      calendarEvent.id,
    );

    return response.status(200).json({
      ok: true,
      event: deletedCalendarEvent,
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

export {
  getCalendarEvents,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
};
