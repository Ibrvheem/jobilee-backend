import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { SUCCESS } from 'constants/CustomResponses';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    endpoint: this.configService.getOrThrow('R2_ENDPONT'),
    region: this.configService.getOrThrow('R2_REGION'),
    credentials: {
      accessKeyId: this.configService.getOrThrow('R2_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.getOrThrow('R2_SECRET_ACCESS_KEY'),
    },
  });

  constructor(private readonly configService: ConfigService) {}
  async upload({ filePath, file }: { filePath: string; file: Buffer }) {
    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: 'assistry',
          Key: filePath,
          Body: file,
        }),
      );
      return {
        ...SUCCESS,
        url: `https://daily-pilot-bucket.s3.${this.configService.getOrThrow('R2_REGION')}.amazonaws.com/${filePath}`,
      };
    } catch (err) {
      console.error('There was an error uploading file to S3:', err);
    }
  }
}
