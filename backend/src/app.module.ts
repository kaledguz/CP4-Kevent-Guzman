import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [EventsModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
