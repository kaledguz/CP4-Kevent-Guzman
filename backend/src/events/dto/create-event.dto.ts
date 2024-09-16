//export class CreateEventDto {}
import { Event } from '@prisma/client';
export type CreateEventDto = Omit<Event, 'id' | 'createdBy'>;
