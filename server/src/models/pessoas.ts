import { z } from 'zod';

const datetimeSchema = z.string().datetime();

export const personSchema = z.object({
  id: z.number().int(),
  event_id: z.number().int(),
  name: z.string().min(1),
  is_birthday: z.boolean(),
  payment_status: z.string().min(1),
  created_at: datetimeSchema,
});

export const newPersonSchema = z.object({
  event_id: z.coerce.number().int().positive(),
  name: z.string().min(1),
  is_birthday: z.boolean().default(false),
  payment_status: z.string().min(1).default('pendente'),
});

export const updatePersonSchema = newPersonSchema
  .omit({ event_id: true })
  .partial();

export type Person = z.infer<typeof personSchema>;
export type NewPerson = z.infer<typeof newPersonSchema>;
export type UpdatePerson = z.infer<typeof updatePersonSchema>;
