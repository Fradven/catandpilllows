import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { SessionService } from "@/components/services/sessionService";
import { API_ENDPOINTS, MESSAGES } from "@/components/utils/contantes";
import { Spinner } from "@nextui-org/spinner";
import MainPageFirstCycleForm from "@/components/sections/MainPageFirstCycleForm";

const MainPage = () => {
    const [userId, setUserId] = useState<string | null>();
    const [cycles, setCycles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setUserId(SessionService.getUserId());
        if (userId) {
            fetchCycles(userId);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchCycles = async (userId: string) => {
        try {
            const response = await fetch(`${API_ENDPOINTS.GET_CYCLES}?userId=${userId}`);
            const data = await response.json();
            setCycles(data);
        } catch (error) {
            console.error(MESSAGES.ADD_CYCLE_FAILED, error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCycle = (cycle: any) => {
        setCycles([...cycles, cycle]);
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
            {cycles.length === 0 ? (
                <MainPageFirstCycleForm userId={userId} cycleHandler={handleAddCycle} />
            ) : (
                <div>
                    <h2>Your Cycle Stats</h2>
                    {/* Placeholder for the stats component */}
                    <p>Stats component will go here...</p>
                </div>
            )}
        </MainLayout>
    );
};

export default MainPage;
