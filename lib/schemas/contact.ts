import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name must not exceed 50 characters' })
    .trim(),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .trim(),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters' })
    .max(5000, { message: 'Message must not exceed 5000 characters' })
    .trim(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
