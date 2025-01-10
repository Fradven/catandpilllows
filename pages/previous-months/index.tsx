import React, { useEffect, useState } from "react";
import { CalendarDate, parseDate } from "@internationalized/date";
import MainLayout from "@/layouts/MainLayout";
import { DatePicker } from "@nextui-org/date-picker";
import { Button } from "@nextui-org/button";
import { SessionService } from "@/services/sessionService";
import { UserCycleService } from "@/services/userCycleService";
import { API_ENDPOINTS, MESSAGES } from "@/components/utils/contantes";
import { Spinner } from "@nextui-org/spinner";

const PreviousMonths = () => {
    const [userId, setUserId] = useState<string | null>();
    const [dateStart, setDateStart] = useState<CalendarDate | null>(null);
    const [dateEnd, setDateEnd] = useState<CalendarDate | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const cycleHandler = async () => {
        setSuccess(null);
        setError(null);

        if (userId) {
            if (!dateEnd || !dateStart) {
                setError("Please enter a start date AND an end date.");
                return;
            }

            const start = dateStart.toDate("UTC");
            const end = dateEnd.toDate("UTC");

            try {
                const response = await fetch(API_ENDPOINTS.ADD_CYCLE, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId,
                        dateStart: start.toISOString(),
                        ...(end && { dateEnd: end.toISOString() })
                    })
                });

                if (response.ok) {
                    await UserCycleService.recalculateAverages(userId);
                    setDateStart(null);
                    setDateEnd(null)

                    setSuccess("New cycle successfully added!");
                    setTimeout(() => setSuccess(null), 5000);
                    setError(null);
                } else {
                    setError(MESSAGES.ADD_CYCLE_FAILED);
                }
            } catch (error) {
                setError(MESSAGES.ADD_CYCLE_FAILED);
            }
        }
    };

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

    const fetchInitialData = async () => {
        setUserId(SessionService.getUserId());
        setLoading(false);
    };
    useEffect(() => {
        if (!userId) fetchInitialData();
    }, [userId]);

    const today = parseDate(new Date().toISOString().split("T")[0]);

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
            <div className="flex flex-col justify-center items-center min-h-[calc(100vh-64px)] bg-gray-100">
                <div
                    className="flex flex-col items-center space-y-4 p-6 bg-white rounded-md shadow-lg w-full max-w-md mx-auto">
                    <h2 className="text-2xl font-semibold mb-4">Register your previous period cycles</h2>

                    <DatePicker
                        label="Start Date"
                        value={dateStart}
                        onChange={(value) => setDateStart(value as CalendarDate)}
                        maxValue={dateEnd || today}
                        variant="underlined"
                        isRequired
                        className="w-full"
                    />

                    <DatePicker
                        label="End Date"
                        value={dateEnd}
                        onChange={(value) => setDateEnd(value as CalendarDate)}
                        maxValue={today}
                        minValue={dateStart || undefined}
                        variant="underlined"
                        isRequired
                        className="w-full"
                    />

                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-success">{success}</p>}

                    <Button
                        onClick={cycleHandler}
                        disabled={!!error || !dateStart}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                        Add Cycle
                    </Button>
                </div>
            </div>
        </MainLayout>
    );
};

export default PreviousMonths;
