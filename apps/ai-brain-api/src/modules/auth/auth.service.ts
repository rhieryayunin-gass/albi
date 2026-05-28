import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ) {
    // temporary dummy login

    const dummyUser = {
      id: '1',
      email: 'admin@albi.ai',
      password:
        '$2b$10$2VaT2Yhz7VDs8WqqpK4LVONJjxkI.wUhCbrPV.L0BN.dT26sFUTBu',
    };

    const isMatch = await bcrypt.compare(
      password,
      dummyUser.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    return {
      id: dummyUser.id,
      email: dummyUser.email,
    };
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(
      email,
      password,
    );

    const token = this.jwtService.sign(user);

    return {
      access_token: token,
      user,
    };
  }
}