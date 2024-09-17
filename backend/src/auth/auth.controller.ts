import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetUser } from './decorators/get-user.decorator';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createAuthDto: CreateAuthDto) {
    console.log('Signup request received:', createAuthDto);
    return this.authService.signup(createAuthDto);
  }

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    console.log('Login request received:', loginAuthDto);
    return this.authService.login(loginAuthDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    console.log('User info request received for user:', user);
    return user;
  }
}
