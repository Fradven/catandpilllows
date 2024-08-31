/* eslint-disable */
class Cycle {
  id: number;
  userId: number;
  dateStart: Date;
  dateEnd: Date;

  constructor(id: number, userId: number, dateStart: Date, dateEnd: Date) {
    this.id = id;
    this.userId = userId;
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
  }

  getDuration(): number {
    return (this.dateEnd.getTime() - this.dateStart.getTime()) / (1000 * 3600 * 24);
  }
}

export default Cycle;