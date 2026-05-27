import { isValid } from "date-fns";

const isDateFnsDate = (date: unknown | undefined): boolean => {
  if (!date) return false;

  return isValid(date);
};

export default isDateFnsDate;
