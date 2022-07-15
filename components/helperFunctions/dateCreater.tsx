function createDates() : string[][] {
    const date = new Date();
    const weeklyDatesTemp = new Array(7);
    const monthlyDatesTemp = new Array(30);
    let weeklyAvailable = date.getDate();
    let monthlyAvailable = date.getMonth() + 1;
    let weeklyCount = 6;
    let currentDate = "";
    while (weeklyCount >= 0) {
        currentDate = "";
        currentDate = currentDate + weeklyAvailable.toString() + '/' + monthlyAvailable.toString();
        weeklyDatesTemp[weeklyCount] = currentDate;
        weeklyCount-= 1;
        weeklyAvailable -= 1;
        if (weeklyAvailable === 0) {
            monthlyAvailable -= 1;
            // check whats the previous month 
            if (monthlyAvailable === 1 ||
                monthlyAvailable === 3 ||
                monthlyAvailable === 5 ||
                monthlyAvailable === 7 ||
                monthlyAvailable === 8 ||
                monthlyAvailable === 10 ||
                monthlyAvailable === 12) {
                    weeklyAvailable = 31;
                } else {
                    weeklyAvailable = 30;
                }

        }

        if (monthlyAvailable === 0) {
            monthlyAvailable -= 1;
            monthlyAvailable = 12;
        }


    }

    weeklyAvailable = date.getDate();
    monthlyAvailable = date.getMonth() + 1;
    let monthlyCount = 29;
    while (monthlyCount >= 0) {
        currentDate = "";
        currentDate = currentDate + weeklyAvailable.toString() + '/' + monthlyAvailable.toString();
        monthlyDatesTemp[monthlyCount] = currentDate;
        weeklyAvailable -= 1;
        if (weeklyAvailable === 0) {
            monthlyAvailable -= 1;
            // check whats the previous month 
            if (monthlyAvailable === 1 ||
                monthlyAvailable === 3 ||
                monthlyAvailable === 5 ||
                monthlyAvailable === 7 ||
                monthlyAvailable === 8 ||
                monthlyAvailable === 10 ||
                monthlyAvailable === 12) {
                    weeklyAvailable = 31;
                } else {
                    weeklyAvailable = 30;
                }

        }

        if (monthlyAvailable === 0) {
            monthlyAvailable -= 1;
            monthlyAvailable = 12;
        }
        
        monthlyCount -=1 ;
    }
    return [weeklyDatesTemp, monthlyDatesTemp];
}


export default createDates;