// coupon-response-dto.ts
export interface CouponResponseDTO {
  id: number;
  couponId: string;
  code: string;
  discountAmount: number;
  percentage: boolean;
  validFrom: string;
  validUntil: string;
  usageLimit: number;
  usedCount: number;
  active: boolean;
}
