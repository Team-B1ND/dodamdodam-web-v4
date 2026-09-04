import type {
  OutSleeping,
  OutSleepingApplication,
  OutSleepingApplyRequest,
  OutSleepingReasonType,
} from "@/entities/out-sleeping/types";
import { apiClient } from "@/shared/libs/api-client";
import type { PageResponse } from "@b1nd/api-client";

const OUT_SLEEPING_BASE = "/out-sleeping";

export const OutSleepingApi = {
  async createOutSleeping(payload: OutSleepingApplyRequest) {
    return await apiClient.post(`${OUT_SLEEPING_BASE}`, payload);
  },

  async getMyOutSleeping() {
    return await apiClient.get<OutSleeping[]>(`${OUT_SLEEPING_BASE}/me`);
  },

  async deleteMyOutSleeping(publicId: string) {
    return await apiClient.delete(`${OUT_SLEEPING_BASE}/${publicId}`);
  },

  async getOutSleepingApplications(params: {
    date: string;
    page: number;
    reasonType?: OutSleepingReasonType;
  }) {
    const searchParams = new URLSearchParams({
      date: params.date,
      size: "20",
      page: String(params.page),
    });

    if (params.reasonType) searchParams.set("reasonType", params.reasonType);

    return await apiClient.get<PageResponse<OutSleepingApplication>>(
      `${OUT_SLEEPING_BASE}?${searchParams}`,
    );
  },

  async allowOutSleeping(publicId: string) {
    return await apiClient.patch(`${OUT_SLEEPING_BASE}/${publicId}/allow`);
  },

  async denyOutSleeping(payload: { publicId: string; denyReason?: string }) {
    return await apiClient.patch(`${OUT_SLEEPING_BASE}/${payload.publicId}/deny`, {
      denyReason: payload.denyReason,
    });
  },

  async revertOutSleeping(publicId: string) {
    return await apiClient.patch(`${OUT_SLEEPING_BASE}/${publicId}/revert`);
  },
};
