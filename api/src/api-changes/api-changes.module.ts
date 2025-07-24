import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiChangesController } from './api-changes.controller';
import { ApiChangesService } from './api-changes.service';
import { ApiChange, ApiChangeSchema } from './schemas/api-change.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ApiChange.name, schema: ApiChangeSchema },
    ]),
  ],
  controllers: [ApiChangesController],
  providers: [ApiChangesService],
  exports: [ApiChangesService],
})
export class ApiChangesModule {}
