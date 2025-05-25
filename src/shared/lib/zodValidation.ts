import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(3, { message: 'username_min' }),
  password: z.string().min(6, { message: 'password_min' }),
})

export type LoginSchemaType = z.infer<typeof loginSchema>
