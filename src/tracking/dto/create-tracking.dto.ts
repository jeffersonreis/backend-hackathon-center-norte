export class CreateTrackingDto {
  readonly userId: number;
  readonly latitude: number;
  readonly longitude: number;
  readonly storeId?: number;
  readonly deviceInfo: {
    device_type: string;
    os_version: string;
    app_version: string;
  };
}
