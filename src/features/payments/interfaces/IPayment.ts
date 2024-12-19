export interface IPayment {
  id:          number;
  amount:      number;
  paymentDate: Date;
  type:        string;
  status:      string;
}

export interface CreatePaymentReqDto extends Omit<IPayment, 'id'> {
  rentalId: number;
}

export interface UpdatePaymentReqDto extends CreatePaymentReqDto {}