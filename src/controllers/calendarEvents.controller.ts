import { Request, Response } from "express";

const getCalendarEvents = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  console.log(`Petición a ${request.url}`);

  return response.json({
    ok: true,
    controller: "getEvents",
  });
};

const createCalendarEvent = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  console.log(`Petición a ${request.url}`);
  console.debug({ body: request.body });

  return response.json({
    ok: true,
    controller: "createCalendarEvents",
  });
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
