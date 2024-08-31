import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import dayjs from 'dayjs';

interface EndPeriodModalProps {
    isOpen: boolean;
    onClose: () => void;
    onEndPeriod: (dateEnd: Date) => void;
    startDate: Date;
}

const EndPeriodModal = ({ isOpen, onClose, onEndPeriod, startDate }: EndPeriodModalProps) => {
    const [endDate, setEndDate] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleEnd = () => {
        if (!endDate) {
            setError('Please select an end date.');
            return;
        }
        const endDateParsed = new Date(endDate);
        if (endDateParsed <= startDate) {
            setError('End date must be after the start date.');
            return;
        }
        onEndPeriod(endDateParsed);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalHeader>
                <h3>End Current Period</h3>
            </ModalHeader>
            <ModalBody>
                <Input
                    type="date"
                    label="End Date"
                    value={endDate || ''}
                    onChange={(e) => setEndDate(e.target.value)}
                    fullWidth
                    min={dayjs(startDate).format('YYYY-MM-DD')}
                    max={dayjs().format('YYYY-MM-DD')}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </ModalBody>
            <ModalFooter>
                <Button onClick={handleEnd}>End Period</Button>
            </ModalFooter>
        </Modal>
    );
};

export default EndPeriodModal;
