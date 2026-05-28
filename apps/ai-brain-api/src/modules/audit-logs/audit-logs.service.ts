import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditLogsService {
  log(action: string, payload: unknown) {
    console.log(action, payload);
  }
}