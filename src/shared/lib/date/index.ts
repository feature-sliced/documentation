const getDiffDays = (firstDate: Date, secondDate: Date): number => {
    const dayInSeconds = 1000 * 60 * 60 * 24;

    return Math.floor(
        Math.abs(firstDate.getTime() - secondDate.getTime()) / dayInSeconds,
    );
};

export const date = {
    getDiffDays,
};
