import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(email: string, password: string) {
    const validUsers = [
      {
        id: '1',
        email: 'admin@test.com',
        passwordHash: '$2b$10$YourHashHere', 
      }
    ];

    const user = validUsers.find(u => u.email === email);
    
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = password === 'admin123';
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { email: user.email, sub: user.id };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
      }
    };
  }
}