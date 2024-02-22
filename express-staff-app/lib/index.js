// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ! Вспомогательные функции

exports.dStr = (dNow) => {
  return (
    dNow.getFullYear() +
    "-" +
    (dNow.getMonth() + 1) +
    "-" +
    dNow.getDate() +
    "_" +
    dNow.getHours() +
    "-" +
    dNow.getMinutes() +
    "-" +
    dNow.getSeconds() +
    "-" +
    dNow.getMilliseconds()
  );
};

exports.dShortStr = (dNow) => {
  return (
    dNow.getDate() + "." + (dNow.getMonth() + 1) + "." + dNow.getFullYear()
  );
};

exports.months = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];
// --------------------------------------------------------------------------------------------------------------------------------------------------------