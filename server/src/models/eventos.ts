import { z } from 'zod';

const datetimeSchema = z.string().datetime();

export const eventSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1),
  starts_at: datetimeSchema,
  location: z.string().min(1),
  is_birthday: z.boolean(),
  rodizio_price: z.number().min(0),
  created_at: datetimeSchema,
});

export const newEventSchema = z.object({
  name: z.string().min(1),
  starts_at: datetimeSchema,
  location: z.string().min(1),
  is_birthday: z.boolean().default(false),
  rodizio_price: z.coerce.number().min(0).default(0),
});

export const updateEventSchema = newEventSchema.partial();

export type Event = z.infer<typeof eventSchema>;
export type NewEvent = z.infer<typeof newEventSchema>;
export type UpdateEvent = z.infer<typeof updateEventSchema>;
