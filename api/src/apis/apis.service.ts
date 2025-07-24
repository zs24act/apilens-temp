import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateApiDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';
import { Api, ApiDocument } from './schemas/api.schema';
import axios from 'axios';

@Injectable()
export class ApisService {
  constructor(
    @InjectModel(Api.name) private readonly apiModel: Model<ApiDocument>,
  ) {}

  async create(createApiDto: CreateApiDto, userId: string): Promise<Api> {
    const createdApi = new this.apiModel({ ...createApiDto, user: userId });
    const spec = await this.fetchSpec(createApiDto.url);
    createdApi.lastSpec = spec;
    return createdApi.save();
  }

  async findAll(userId: string): Promise<Api[]> {
    return this.apiModel.find({ user: userId }).exec();
  }

  async findOne(id: string, userId: string): Promise<Api | null> {
    return this.apiModel.findOne({ _id: id, user: userId }).exec();
  }

  async update(
    id: string,
    updateApiDto: UpdateApiDto,
    userId: string,
  ): Promise<Api | null> {
    return this.apiModel
      .findOneAndUpdate({ _id: id, user: userId }, updateApiDto, { new: true })
      .exec();
  }

  async remove(id: string, userId: string): Promise<Api | null> {
    return this.apiModel.findOneAndDelete({ _id: id, user: userId }).exec();
  }

  async fetchSpec(url: string): Promise<any> {
    const response = await axios.get(url);
    return response.data;
  }
}
