export const getDiffDays = (firstDate, secondDate) => {
    const dayInSeconds = 1000 * 60 * 60 * 24;

    return Math.floor(Math.abs(firstDate.getTime() - secondDate.getTime()) / dayInSeconds);
};
