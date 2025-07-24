import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApisService } from './apis.service';
import { CreateApiDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';

@UseGuards(JwtAuthGuard)
@Controller('apis')
export class ApisController {
  constructor(private readonly apisService: ApisService) {}

  @Post()
  create(@Body(new ValidationPipe()) createApiDto: CreateApiDto, @Req() req) {
    return this.apisService.create(createApiDto, req.user.userId);
  }

  @Get()
  findAll(@Req() req) {
    return this.apisService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.apisService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateApiDto: UpdateApiDto,
    @Req() req,
  ) {
    return this.apisService.update(id, updateApiDto, req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.apisService.remove(id, req.user.userId);
  }
}
