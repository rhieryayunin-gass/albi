import {
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { EmergencyService }
from './emergency.service';

@Controller('emergency')
export class EmergencyController {
  constructor(
    private readonly emergencyService: EmergencyService,
  ) {}

  @Get('state')
  getState() {
    return this.emergencyService.getState();
  }

  @Post('freeze')
  freeze() {
    this.emergencyService.freeze(
      'MANUAL_FREEZE',
    );

    return {
      success: true,
    };
  }

  @Post('resume')
  resume() {
    this.emergencyService.resume();

    return {
      success: true,
    };
  }
}