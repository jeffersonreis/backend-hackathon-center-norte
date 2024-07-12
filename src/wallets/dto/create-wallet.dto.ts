export class CreateWalletDto {
  readonly customerId: string;
  readonly balance: number;
  readonly transactions: {
    storeId: string;
    date: string;
    amount: number;
    type: string;
    description: string;
  }[];
}
