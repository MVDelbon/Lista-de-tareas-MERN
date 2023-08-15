import {z} from 'zod'

export const registerSchema = z.object({
    userName: z.string({
        required_error: "Username is required"
        }),
    email: z
        .string({
        required_error: 'Email is required'
        })
        .email({message: 'Invalid email'}),
    password: z
        .string({
            required_error: "Password required",
        })
        .min (6, {
            message: "Password must be at least 6 characteres.",
        }),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });
  