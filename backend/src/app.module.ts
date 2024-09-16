import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [EventsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
