export const getLastUpdated = (updatedOn: string) => {
  const lastUpdated: any = new Date(updatedOn);
  const currentDate: any = new Date();

  const timeDiff = currentDate - lastUpdated;
  const secondsDiff = Math.floor(timeDiff / 1000);
  const minutesDiff = Math.floor(secondsDiff / 60);
  const hoursDiff = Math.floor(minutesDiff / 60);
  const daysDiff = Math.floor(hoursDiff / 24);
  const weeksDiff = Math.floor(daysDiff / 7);
  const monthsDiff = Math.floor(daysDiff / 30);
  const yearsDiff = Math.floor(daysDiff / 365);

  function getTimeDifference() {
    if (daysDiff < 1) {
      return `${hoursDiff} hours ago`;
    } else if (daysDiff < 7) {
      return `${daysDiff} days ago`;
    } else if (monthsDiff < 1) {
      return `${weeksDiff} weeks ago`;
    } else if (monthsDiff < 12) {
      return `${monthsDiff} months ago`;
    } else {
      return `${yearsDiff} years ago`;
    }
  }

  return getTimeDifference();
};

export const convertToDateString = (updatedOn: string) => {
  const date = new Date(updatedOn);
  return date.toDateString();
};
