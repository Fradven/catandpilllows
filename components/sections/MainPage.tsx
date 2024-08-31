import React, { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { API_ENDPOINTS, MESSAGES } from "@/components/utils/contantes";
import { Spinner } from "@nextui-org/spinner";
import MainPageFirstCycleForm from "@/components/sections/MainPageFirstCycleForm";
import CycleStats from "@/components/sections/CycleStats";
import TrackingPeriod from "@/components/sections/TrackingPeriod";
import { UserCycleService } from "@/services/userCycleService";
import { SessionService } from "@/services/sessionService";
import EndPeriodModal from "@/components/modals/EndPeriodModal";

const MainPage = () => {
    const [userId, setUserId] = useState<string | null>();
    const [cycles, setCycles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [trackingCycle, setTrackingCycle] = useState<any | null>(null);
    const [userCycleInfo, setUserCycleInfo] = useState<any | null>(null);
    const [isEndModalOpen, setIsEndModalOpen] = useState(false);

    useEffect(() => {
        const fetchInitialData = async () => {
            setUserId(SessionService.getUserId());
            if (userId) {
                const fetchedCycles = await fetchCycles(userId);
                setCycles(fetchedCycles);

                const fetchedUserCycleInfo = await UserCycleService.getUserCycleInfos(userId);
                setUserCycleInfo(fetchedUserCycleInfo);

                const activeCycle = fetchedCycles.find((cycle: { dateEnd: any; }) => !cycle.dateEnd);
                if (activeCycle) {
                    setTrackingCycle(activeCycle);
                }
            } else {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, [userId]);

    const fetchCycles = async (userId: string) => {
        try {
            const response = await fetch(`${API_ENDPOINTS.GET_CYCLES}?userId=${userId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(MESSAGES.ADD_CYCLE_FAILED, error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCycle = (cycle: any) => {
        setCycles([...cycles, cycle]);
        setTrackingCycle(cycle);
    };

    const handleEndPeriod = async (dateEnd: Date) => {
        if (!trackingCycle || !userId) return;

        await UserCycleService.endCycle(userId, trackingCycle.id, dateEnd);

        const updatedCycles = await fetchCycles(userId);
        setCycles(updatedCycles);

        await UserCycleService.recalculateAverages(userId);

        const updatedUserCycleInfo = await UserCycleService.getUserCycleInfos(userId);
        setUserCycleInfo(updatedUserCycleInfo);

        setTrackingCycle(null);
    };

    if (loading) {
        return <div className="w-full h-full flex justify-center items-center">
            <Spinner
                size="lg"
                color="warning"
                label="Getting cozy..."
                labelColor="warning"
            />
        </div>;
    }

    return (
        <MainLayout>
            {trackingCycle ? (
                <TrackingPeriod
                    cycle={trackingCycle}
                    userCycleInfo={userCycleInfo}
                    onEndPeriod={() => setIsEndModalOpen(true)}
                />
            ) : cycles.length === 0 ? (
                <MainPageFirstCycleForm userId={userId} cycleHandler={handleAddCycle} />
            ) : (
                <CycleStats userId={userId ?? ""} onCycleCreated={handleAddCycle} />
            )}

            {trackingCycle && (
                <EndPeriodModal
                    isOpen={isEndModalOpen}
                    onClose={() => setIsEndModalOpen(false)}
                    onEndPeriod={handleEndPeriod}
                    startDate={new Date(trackingCycle.dateStart)}
                />
            )}
        </MainLayout>
    );
};

export default MainPage;
