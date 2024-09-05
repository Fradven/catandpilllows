import React, { useState } from "react";
import dayjs from "dayjs";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

interface StartNewPeriodModalProps {
    isOpen: boolean;
    onClose: () => void;
    onStartNewPeriod: (dateStart: Date) => void;
}

const StartNewPeriodModal = ({ isOpen, onClose, onStartNewPeriod }: StartNewPeriodModalProps) => {
    const [startDate, setStartDate] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleStart = () => {
        if (!startDate) {
            setError("Please select a start date.");
            return;
        }
        onStartNewPeriod(new Date(startDate));
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onCLose) => (
                    <>
                        <ModalHeader>
                            <h3>Start New Period</h3>
                        </ModalHeader>
                        <ModalBody>
                            <Input
                                type="date"
                                label="Start Date"
                                value={startDate || ""}
                                onChange={(e) => setStartDate(e.target.value)}
                                fullWidth
                                min={dayjs().subtract(1, "year").format("YYYY-MM-DD")}
                                max={dayjs().format("YYYY-MM-DD")}
                            />
                            {error && <p style={{ color: "red" }}>{error}</p>}
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={handleStart}>Start Period</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default StartNewPeriodModal;
