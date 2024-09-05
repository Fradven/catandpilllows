import { API_ENDPOINTS } from '@/components/utils/contantes';
import UserCycleInfos from '@/components/classes/UserCycleInfos';

export const UserCycleService = {
    async getUserCycleInfos(userId: string): Promise<UserCycleInfos> {
        const response = await fetch(`${API_ENDPOINTS.GET_USER_CYCLE_INFO}?userId=${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user cycle info');
        }
        const userCycleInfo = await response.json();
        return userCycleInfo;
    },

    async updateUserCycleInfos(updatedInfo: UserCycleInfos): Promise<void> {
        const response = await fetch(API_ENDPOINTS.UPDATE_USER_CYCLE_INFO, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedInfo),
        });

        if (!response.ok) {
            throw new Error('Failed to update user cycle info');
        }
    },

    async addCycle(userId: string, dateStart: Date): Promise<any> {
        const response = await fetch(API_ENDPOINTS.ADD_CYCLE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, dateStart }),
        });

        if (!response.ok) {
            throw new Error('Failed to add new cycle');
        }

        return await response.json();
    },

    async endCycle(userId: string, cycleId: number, dateEnd: Date): Promise<void> {
        const response = await fetch(API_ENDPOINTS.UPDATE_CYCLE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, cycleId, dateEnd }),
        });

        if (!response.ok) {
            throw new Error('Failed to end the cycle');
        }
    },

    async recalculateAverages(userId: string): Promise<void> {
        const response = await fetch(`${API_ENDPOINTS.RECALCULATE_AVERAGES}?userId=${userId}`);
        if (!response.ok) {
            throw new Error('Failed to recalculate averages');
        }
    },
};