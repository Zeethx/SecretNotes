import {z} from 'zod';

export const loginSchema = z.object({
    identifier: z.string().email().or(z.string()),
    password: z.string(),
});