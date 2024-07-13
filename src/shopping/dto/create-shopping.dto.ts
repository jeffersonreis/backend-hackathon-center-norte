export class CreateShoppingDto {
  readonly id: number;
  readonly name: string;
  readonly address: string;
  readonly city: string;
  readonly state: string;
  readonly zipCode: string;
  readonly phone: string;
  readonly email: string;
  readonly website: string;
  readonly openingHours: string;
  readonly minLat: string;
  readonly maxLat: string;
  readonly minLong: string;
  readonly maxLong: string;
}
