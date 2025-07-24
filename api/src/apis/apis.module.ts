import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApisController } from './apis.controller';
import { ApisService } from './apis.service';
import { Api, ApiSchema } from './schemas/api.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Api.name, schema: ApiSchema }])],
  controllers: [ApisController],
  providers: [ApisService],
  exports: [ApisService],
})
export class ApisModule {}
