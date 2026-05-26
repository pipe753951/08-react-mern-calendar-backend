import { model, Schema } from "mongoose";

const CalendarEventSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  note: {
    type: String,
  },
  start: {
    type: Date,
    require: true,
  },
  end: {
    type: Date,
    require: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const CalendarEventModel = model("User", CalendarEventSchema);

export { CalendarEventModel, CalendarEventSchema };
