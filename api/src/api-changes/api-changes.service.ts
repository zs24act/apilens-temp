import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiChange, ApiChangeDocument } from './schemas/api-change.schema';

@Injectable()
export class ApiChangesService {
  constructor(
    @InjectModel(ApiChange.name)
    private readonly apiChangeModel: Model<ApiChangeDocument>,
  ) {}

  async create(apiId: string, diff: any): Promise<ApiChange> {
    const createdApiChange = new this.apiChangeModel({ api: apiId, diff });
    return createdApiChange.save();
  }

  async findAllForApi(apiId: string): Promise<ApiChange[]> {
    return this.apiChangeModel.find({ api: apiId }).exec();
  }
}
