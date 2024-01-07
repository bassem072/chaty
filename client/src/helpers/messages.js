import moment from "moment-timezone";

export const isNewDay = (date1, date2) => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const dateA = moment(date1).tz(timezone).format().substring(0, 10);
  const dateB = moment(date2).tz(timezone).format().substring(0, 10);
  if (dateA === dateB) {
    return false;
  } else {
    return true;
  }
};

export const checkDateDiff = (date1, date2, numberOfMins) => {
  const dateA = new Date(date1);
  const dateB = new Date(date2);
  let diffTime = Math.abs(dateB - dateA);
  let diffMin = Math.ceil(diffTime / (1000 * 60));

  return diffMin > numberOfMins;
};

export const checkShow = (index, messages) => {
  if (index === messages.length - 1) {
    return true;
  } else {
    if (messages[index].sender.id === messages[index + 1].sender.id) {
      if (isNewDay(messages[index].createdAt, messages[index + 1].createdAt)) {
        return true;
      } else {
        return checkDateDiff(
          messages[index].createdAt,
          messages[index + 1].createdAt,
          30
        );
      }
    } else {
      return true;
    }
  }
};

export const checkDir = (char) => {
  if (/[\u0600-\u06FF]/.test(char)) {
    return "rtl";
  } else {
    return "ltr";
  }
};