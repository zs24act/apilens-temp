import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiChangesService } from './api-changes.service';

@UseGuards(JwtAuthGuard)
@Controller('api-changes')
export class ApiChangesController {
  constructor(private readonly apiChangesService: ApiChangesService) {}

  @Get(':apiId')
  findAllForApi(@Param('apiId') apiId: string) {
    return this.apiChangesService.findAllForApi(apiId);
  }
}
