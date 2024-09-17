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
    return this.prismaService.event.findMany({
      include: { participants: true },
    });
  }

  async findOne(id: number) {
    const eventFound = await this.prismaService.event.findUnique({
      where: { id },
      include: { participants: true },
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
      where: { id },
    });
    if (!deleteEvent) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return deleteEvent;
  }

  async participate(eventId: number, userId: number) {
    const event = await this.prismaService.event.findUnique({
      where: { id: eventId },
      include: { participants: true },
    });

    if (!event) {
      throw new NotFoundException(`Event with id ${eventId} not found`);
    }

    const isAlreadyParticipating = event.participants.some(
      (participant) => participant.id === userId,
    );

    if (isAlreadyParticipating) {
      return {
        message: 'You are already participating in this event',
        status: 'already_participating',
      };
    }

    await this.prismaService.event.update({
      where: { id: eventId },
      data: {
        participants: {
          connect: { id: userId },
        },
      },
    });

    return { message: 'Participation successful', status: 'success' };
  }

  async cancelParticipation(eventId: number, userId: number) {
    const event = await this.prismaService.event.findUnique({
      where: { id: eventId },
      include: { participants: true },
    });

    if (!event) {
      throw new NotFoundException(`Event with id ${eventId} not found`);
    }

    const isParticipating = event.participants.some(
      (participant) => participant.id === userId,
    );

    if (!isParticipating) {
      throw new Error('You are not participating in this event');
    }

    return this.prismaService.event.update({
      where: { id: eventId },
      data: {
        participants: {
          disconnect: { id: userId },
        },
      },
    });
  }
}
