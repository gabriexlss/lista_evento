import { z } from 'zod';

const datetimeSchema = z.string().datetime();

export const consumptionItemSchema = z.object({
  id: z.number().int(),
  event_id: z.number().int(),
  person_id: z.number().int(),
  name: z.string().min(1),
  quantity: z.number().int().min(1),
  unit_price: z.number().min(0),
  created_at: datetimeSchema,
});

export const newConsumptionItemSchema = z.object({
  event_id: z.coerce.number().int().positive(),
  person_id: z.coerce.number().int().positive(),
  name: z.string().min(1),
  quantity: z.coerce.number().int().min(1).default(1),
  unit_price: z.coerce.number().min(0),
});

export const updateConsumptionItemSchema = newConsumptionItemSchema
  .omit({ event_id: true, person_id: true })
  .partial();

export type ConsumptionItem = z.infer<typeof consumptionItemSchema>;
export type NewConsumptionItem = z.infer<typeof newConsumptionItemSchema>;
export type UpdateConsumptionItem = z.infer<typeof updateConsumptionItemSchema>;
