import { formatISO, addMinutes } from 'date-fns';

const formatDate = (date, offsetMinutes = 0) => {
  // Adjust the date by the offset in minutes
  const adjustedDate = addMinutes(date, offsetMinutes);

  // Format the adjusted date to ISO 8601 with timezone offset
  return formatISO(adjustedDate, { representation: 'complete' });
};

export { formatDate };