//this function takes in milliseconds and convert them to hr:min format
export const getReadableTime = milli => {
  if (milli) {
    const d = new Date(milli);
    const hr = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
    const min = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
    return `${hr}:${min}`;
  }
  return '';
};
