import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prismaService: PrismaService) {}

  async create(createEventDto: CreateEventDto, userId: number) {
    console.log("ID de l'utilisateur reçu dans le service :", userId);
    if (!userId) {
      throw new Error('User ID is undefined');
    }
    return this.prismaService.event.create({
      data: {
        ...createEventDto,
        createdBy: {
          connect: { id: userId },
        },
      },
    });
  }

  findAll() {
    return this.prismaService.event.findMany();
  }

  async findOne(id: number) {
    const eventFound = await this.prismaService.event.findUnique({
      where: {
        id: id,
      },
    });
    if (!eventFound) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return eventFound;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.prismaService.event.update({
      where: { id },
      data: updateEventDto,
    });
    return event;
  }

  async remove(id: number) {
    const deleteEvent = await this.prismaService.event.delete({
      where: {
        id,
      },
    });
    if (!deleteEvent) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return deleteEvent;
  }
}
