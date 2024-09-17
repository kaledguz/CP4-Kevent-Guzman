import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;
    console.log('Signup process started for:', email);

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      console.log('User already exists:', email);
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    console.log('User created successfully:', email);
    return this.generateToken(user);
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    console.log('Login process started for:', email);

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.log('Invalid credentials for email:', email);
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      console.log('Invalid password for email:', email);
      throw new UnauthorizedException('Invalid credentials');
    }

    console.log('Login successful for email:', email);
    return this.generateToken(user);
  }

  private generateToken(user: any) {
    const payload = { email: user.email, sub: user.id };
    console.log('Generating JWT for user:', user.email);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
