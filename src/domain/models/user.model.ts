export interface User {
  id: string
  username: string
  email: string
  role: string
  status: string
  name?: string
  avatar?: string
  restaurants: Array<{
    id: string
    default: boolean
  }>
}
