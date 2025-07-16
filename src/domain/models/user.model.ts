export interface User {
  id: string
  name: string
  email: string
  role: string
  status: string
  avatar?: string
  restaurants: Array<{
    id: string
    default: boolean
  }>
}
