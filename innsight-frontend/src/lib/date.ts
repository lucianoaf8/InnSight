export const getTodayDate = (): string => {
    const now = new Date();
    return now.toISOString().split("T")[0]; // returns YYYY-MM-DD
  };
  
  export const formatDisplayDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  