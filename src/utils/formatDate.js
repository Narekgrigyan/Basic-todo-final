export const formatDate = (date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    day: "numeric",
    minute: "numeric",
    hour: "numeric",
  }).format(date);
