import { API_ENDPOINTS } from '@/components/utils/contantes';
import UserCycleInfos from '@/components/classes/UserCycleInfos';

export const UserCycleService = {
    async getUserCycleInfos(userId: number): Promise<UserCycleInfos> {
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
    }
};