const DaysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DaysRu = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

export const getDaysRange = (startDate, endDate) => {
    let dates = [], currentDate = startDate;

    let addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    };

    while (currentDate <= endDate) {
        dates.push(getDayName(currentDate.getDay()));
        currentDate = addDays.call(currentDate, 1);
    }

    return dates;
};

export const getDayName = (dayNum, en = false) => {
    if (en) {
        return DaysEn[dayNum];
    }

    return DaysRu[dayNum];
};

