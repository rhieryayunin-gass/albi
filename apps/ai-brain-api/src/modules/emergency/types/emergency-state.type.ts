export interface EmergencyState {
  frozen: boolean;

  reason: string | null;

  updatedAt: Date | null;
}