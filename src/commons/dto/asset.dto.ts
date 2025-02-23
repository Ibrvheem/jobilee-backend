import { IsString } from 'class-validator';

export class AssetDTO {
  @IsString()
  kind: string;

  @IsString()
  assetStorageKey: string;
}
