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
import Cycle from "@/components/classes/Cycle";

/**
 * MainPage component serves as the main entry point for the menstrual cycle tracking application.
 * It handles the user’s cycle data, tracking active cycles, fetching and displaying historical data,
 * and managing the user interface for starting or ending a cycle.
 *
 * States:
 * - `userId`: Stores the ID of the currently logged-in user.
 * - `cycles`: Maintains an array of cycles retrieved from the backend.
 * - `loading`: Indicates if data is being fetched or processed.
 * - `trackingCycle`: Represents the currently active menstrual cycle if one is ongoing.
 * - `userCycleInfo`: Stores calculated information and statistics related to the user's cycles.
 * - `isEndModalOpen`: Tracks the visibility state of the "End Cycle" modal.
 *
 * Effects:
 * - Fetches initial data such as the userId, cycles, and cycle-related information upon component mount or when `userId` changes.
 *
 * Functions:
 * - `fetchCycles(userId)`: Retrieves cycle data for the given user and updates the `cycles` state.
 * - `handleAddCycle(cycle)`: Adds a new cycle to the existing cycles and updates the current active cycle state.
 * - `handleEndPeriod(dateEnd)`: Ends the currently active cycle by updating the backend, fetching updated cycle lists, and recalculating user statistics.
 *
 * JSX Structure:
 * - Displays a `Spinner` while data is loading.
 * - Renders different components based on the tracking state:
 *   - `TrackingPeriod` component for managing an active cycle.
 *   - `MainPageFirstCycleForm` for adding the first cycle if none exist.
 *   - `CycleStats` for reviewing past cycle statistics and optionally starting a new cycle.
 * - Includes the `EndPeriodModal` for ending the currently active cycle.
 */
const MainPage = () => {
    const [userId, setUserId] = useState<string | null>();
    const [cycles, setCycles] = useState<Cycle[]>([]);
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

    const handleAddCycle = (cycle: Cycle) => {
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
