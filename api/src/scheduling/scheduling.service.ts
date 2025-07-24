import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ApiChangesService } from '../api-changes/api-changes.service';
import { ApisService } from '../apis/apis.service';
import * as diff from 'diff';
import { InjectModel } from '@nestjs/mongoose';
import { Api, ApiDocument } from '../apis/schemas/api.schema';
import { Model } from 'mongoose';

@Injectable()
export class SchedulingService {
  constructor(
    private readonly apisService: ApisService,
    private readonly apiChangesService: ApiChangesService,
    @InjectModel(Api.name) private readonly apiModel: Model<ApiDocument>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    const apis = await this.apiModel.find().exec();
    for (const api of apis) {
      const newSpec = await this.apisService.fetchSpec(api.url);
      const oldSpec = api.lastSpec;
      if (JSON.stringify(newSpec) !== JSON.stringify(oldSpec)) {
        const differences = diff.diffJson(oldSpec, newSpec);
        if (differences.length > 1) {
          await this.apiChangesService.create(api._id as string, differences);
          api.lastSpec = newSpec;
          await api.save();
        }
      }
    }
  }
}
