module.exports.timestampLog = (message) => {
  const date = new Date();
  const hours = formatTwoDigits(date.getHours());
  const minutes = formatTwoDigits(date.getMinutes());
  const seconds = formatTwoDigits(date.getSeconds());
  const mili = formatThreeDigits(date.getMilliseconds());
  console.log(`[${hours}:${minutes}:${seconds}:${mili}] - ${message}`);
}

const formatTwoDigits = number => number < 10 ? `0${number}` : `${number}`;
const formatThreeDigits = number => number < 100 ? (number < 10 ? `00${number}` : `0${number}`) : `${number}`;