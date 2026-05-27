import { model, Schema, Types } from "mongoose";

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
    ref: "user",
    required: true,
  },
});

CalendarEventSchema.method("toJSON", function () {
  const object = this.toObject() as unknown as Partial<
    ReturnType<typeof this.toObject>
  > & { id: Types.ObjectId | undefined };

  object.id = object["_id"];

  delete object["__v"];
  delete object["_id"];

  return object;
});

const CalendarEventModel = model("calendar_event", CalendarEventSchema);

export { CalendarEventModel, CalendarEventSchema };
