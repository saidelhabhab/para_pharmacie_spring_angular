// coupon-request-dto.ts
export interface CouponRequestDTO {
  code: string;
  discountAmount: number;
  percentage: boolean;
  validFrom: string;
  validUntil: string;
  usageLimit: number;
  active: boolean;
}
