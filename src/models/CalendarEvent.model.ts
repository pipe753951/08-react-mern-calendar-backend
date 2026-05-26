import { model, Schema } from "mongoose";

const CalendarEventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const CalendarEventModel = model("calendar_event", CalendarEventSchema);

export { CalendarEventModel, CalendarEventSchema };
