import {z} from 'zod'

const user = z.string().min(3).max(10)
export type userType = z.infer<typeof user>
const password = z.string().min(8).max(20).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/)
export type passwordType = z.infer<typeof password>