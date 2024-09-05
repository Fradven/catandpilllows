class UserCycleInfos {
    id: number;
    userId: string;
    avgCycleDays: number;
    avgPeriodDays: number;

    constructor(
        id: number,
        userId: string,
        avgCycleDays: number,
        avgPeriodDays: number
    ) {
        this.id = id;
        this.userId = userId;
        this.avgCycleDays = avgCycleDays;
        this.avgPeriodDays = avgPeriodDays;
    }
}

export default UserCycleInfos;