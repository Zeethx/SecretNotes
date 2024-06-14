import {z} from 'zod';

export const loginSchema = z.object({
    credential: z.string().email().or(z.string()),
    password: z.string(),
});