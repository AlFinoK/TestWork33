import { z } from 'zod'

// const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])/

export const loginSchema = z.object({
  username: z.string().min(3, { message: 'username_min' }),
  password: z.string().min(6, { message: 'password_min' }),
  // .regex(PASSWORD_REGEX, { message: 'validation.password_pattern' }),
})

export type LoginSchemaType = z.infer<typeof loginSchema>
