// utils/dateFormatter.ts
export const formatToReadableDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatToReadableDateTime = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export const formatCustomDate = (
  isoDate: string,
  options: Intl.DateTimeFormatOptions
): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", options);
};
