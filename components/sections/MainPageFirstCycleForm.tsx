import { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { API_ENDPOINTS, MESSAGES } from "@/components/utils/contantes";
import { parseDate, CalendarDate } from "@internationalized/date";
import { DatePicker } from "@nextui-org/date-picker";

interface Props {
    userId: string | null | undefined;
    cycleHandler: (cycles: any) => void;
}

const MainPageFirstCycleForm = ({ userId, cycleHandler }: Props) => {
    const [dateStart, setDateStart] = useState<CalendarDate | null>(null);
    const [dateEnd, setDateEnd] = useState<CalendarDate | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (dateStart && dateEnd && dateStart.compare(dateEnd) > 0) {
            setError("Start date cannot be later than the end date.");
        } else {
            setError(null);
        }
    }, [dateStart, dateEnd]);

    const handleAddCycle = async () => {
        if (!userId || !dateStart || !dateEnd) {
            setError("Please fill out both dates");
            return;
        }

        const start = dateStart.toDate('UTC');
        const end = dateEnd.toDate('UTC');

        try {
            const response = await fetch(API_ENDPOINTS.ADD_CYCLE, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId,
                    dateStart: start.toISOString(),
                    dateEnd: end.toISOString(),
                }),
            });

            if (response.ok) {
                const newCycle = await response.json();
                cycleHandler(newCycle.cycle);
                setError(null);
            } else {
                setError(MESSAGES.ADD_CYCLE_FAILED);
            }
        } catch (error) {
            setError(MESSAGES.ADD_CYCLE_FAILED);
        }
    };

    const today = parseDate(new Date().toISOString().split("T")[0]);

    return (
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-64px)] bg-gray-100">
            <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-md shadow-lg w-full max-w-md mx-auto">
                <h2 className="text-2xl font-semibold mb-4">Please register your latest period cycle</h2>

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
                    className="w-full"
                />

                {error && <p className="text-red-500">{error}</p>}

                <Button
                    onClick={handleAddCycle}
                    disabled={!!error || !dateStart}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                    Add Cycle
                </Button>

                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
        </div>
    );
};

export default MainPageFirstCycleForm;
