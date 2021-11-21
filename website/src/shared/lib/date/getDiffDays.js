export const getDiffDays = (firstDate, secondDate) => {
    return Math.floor(Math.abs(firstDate.getTime() - secondDate.getTime()) / 1000 / 60 / 60 / 24);
};
