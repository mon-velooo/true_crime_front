import { format } from "date-fns";

const formatDate = (date: Date | undefined) => {
  if (!date) return '';
  return format(date, 'MMMM dd, yyyy');
};

export default formatDate;