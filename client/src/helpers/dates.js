 export const current_day = new Date().getDate();
export const days = Array.from({ length: 31 }, (_, i) => i + 1);

function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber);

  return date.toLocaleString("en-US", { month: "short" });
}

export const current_month = new Date().getMonth();
export const months = Array.from({ length: 12 }, (_, i) => getMonthName(i));

export const current_year = new Date().getFullYear();
export const years = Array.from({ length: 150 }, (_, i) => current_year - i - 3);
