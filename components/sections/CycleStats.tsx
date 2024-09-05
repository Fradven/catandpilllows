import { useEffect, useState } from 'react';
import { UserCycleService } from '@/services/userCycleService';
import { Spinner } from '@nextui-org/spinner';
import dayjs from 'dayjs';
import { Button } from "@nextui-org/button";
import StartNewPeriodModal from "@/components/modals/StartNewPeriodModal";

interface Props {
    userId: string;
    onCycleCreated: (newCycle: any) => void;
}

const CycleStats = ({ userId, onCycleCreated }: Props) => {
    const [loading, setLoading] = useState(true);
    const [userCycleInfo, setUserCycleInfo] = useState<any>(null);
    const [latestCycle, setLatestCycle] = useState<any>(null);
    const [daysPassed, setDaysPassed] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleStartNewPeriod = async (dateStart: Date) => {
        try {
            const newCycle = await UserCycleService.addCycle(userId, dateStart);
            onCycleCreated(newCycle);
        } catch (error) {
            console.error('Failed to start new period:', error);
        }
    };

    useEffect(() => {
        const fetchCycleData = async () => {
            try {
                const userCycle = await UserCycleService.getUserCycleInfos(userId);
                setUserCycleInfo(userCycle);

                const response = await fetch(`/api/getCycles?userId=${userId}`);
                const cycles = await response.json();

                if (cycles.length > 0) {
                    const latest = cycles[cycles.length - 1];
                    setLatestCycle(latest);

                    if (latest.dateEnd) {
                        const endDate = dayjs(latest.dateEnd);
                        const daysSinceEnd = dayjs().diff(endDate, 'day');
                        setDaysPassed(daysSinceEnd);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch cycle data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCycleData();
    }, [userId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center w-full h-full">
                <Spinner
                    size="lg"
                    color="warning"
                    label="Fetching your data..."
                    labelColor="warning"
                />
            </div>
        );
    }

    const daysLeft = userCycleInfo ? userCycleInfo.avgCycleDays - (daysPassed ?? 0) : 0;
    const progressWidth = userCycleInfo ? ((daysPassed ?? 0) / userCycleInfo.avgCycleDays) * 100 : 0;

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] w-full">
            <div className="flex flex-col items-center space-y-6 p-6 rounded-md shadow-lg w-full max-w-lg mx-auto">
                <div className="text-center">
                    <p className="text-lg">Last period ended on: <span className="font-bold">{dayjs(latestCycle.dateEnd).format('MMMM D, YYYY')}</span></p>
                    <p className="text-4xl font-bold my-4">{daysLeft} days left</p>

                    <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                            className="bg-indigo-600 h-4 rounded-full"
                            style={{ width: `${progressWidth > 100 ? 100 : progressWidth}%` }}
                        />
                    </div>
                </div>

                <div className="flex justify-around w-full mt-4">
                    <div className="text-center">
                        <p className="text-lg">Avg Cycle Days</p>
                        <p className="text-xl font-bold">{userCycleInfo?.avgCycleDays}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-lg">Avg Period Days</p>
                        <p className="text-xl font-bold">{userCycleInfo?.avgPeriodDays}</p>
                    </div>
                </div>

                <Button onClick={() => setIsModalOpen(true)} className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg mt-4">
                    Start New Period
                </Button>

                <StartNewPeriodModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onStartNewPeriod={handleStartNewPeriod}
                />
            </div>
        </div>
    );
};

export default CycleStats;
