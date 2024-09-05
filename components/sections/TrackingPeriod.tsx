import { Button } from "@nextui-org/button";
import dayjs from 'dayjs';

interface TrackingPeriodProps {
    cycle: any;
    userCycleInfo: any;
    onEndPeriod: () => void;
}

const TrackingPeriod = ({ cycle, userCycleInfo, onEndPeriod }: TrackingPeriodProps) => {
    const startDate = dayjs(cycle.dateStart);
    const daysPassed = dayjs().diff(startDate, 'day');
    const daysLeft = userCycleInfo.avgPeriodDays - daysPassed;

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-white w-full">
            <div className="flex flex-col items-center space-y-6 p-6 rounded-md shadow-lg w-full max-w-lg mx-auto">
                <h2 className="text-3xl font-semibold mb-4">Tracking Current Period</h2>

                <div className="text-center">
                    <p className="text-lg">Period started on: <span className="font-bold">{startDate.format('MMMM D, YYYY')}</span></p>
                    <p className="text-4xl font-bold my-4">{daysLeft} days left</p>

                    <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                            className="bg-indigo-600 h-4 rounded-full"
                            style={{ width: `${(daysPassed / userCycleInfo.avgPeriodDays) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="flex justify-around w-full mt-4">
                    <div className="text-center">
                        <p className="text-lg">Avg Cycle Days</p>
                        <p className="text-xl font-bold">{userCycleInfo.avgCycleDays}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-lg">Avg Period Days</p>
                        <p className="text-xl font-bold">{userCycleInfo.avgPeriodDays}</p>
                    </div>
                </div>

                <Button
                    onClick={onEndPeriod}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg mt-4"
                >
                    End Period
                </Button>
            </div>
        </div>
    );
};

export default TrackingPeriod;
