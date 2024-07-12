export class CreateCustomerDto {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly address: string;
  readonly city: string;
  readonly state: string;
  readonly zipCode: string;
  readonly phone: string;
  readonly email: string;
  readonly dateOfBirth: string;
  readonly registrationDate: string;
  readonly preferences: string[];
}
