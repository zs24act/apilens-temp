import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiChangesModule } from 'src/api-changes/api-changes.module';
import { ApisModule } from 'src/apis/apis.module';
import { SchedulingService } from './scheduling.service';

@Module({
  imports: [ScheduleModule.forRoot(), ApisModule, ApiChangesModule],
  providers: [SchedulingService],
})
export class SchedulingModule {}
