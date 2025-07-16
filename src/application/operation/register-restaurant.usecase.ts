import type { RestaurantDetails } from '@/domain/models/restaurant-details.model'
import type { LocalStorage } from '@/domain/storage/local-storage'
import { Registry } from '@/infra/dependency-injection/registry'

export interface RegisterRestaurantUsecaseInput extends Omit<RestaurantDetails, 'id'> {
  username: string
}

export class RegisterRestaurantUsecase {
  private readonly localStorage: LocalStorage

  constructor() {
    this.localStorage = Registry.getInstance().inject('localStorage') as LocalStorage
  }

  private generateId(): string {
    // Gera um id aleatório simples (ex: 16 caracteres alfanuméricos)
    return Math.random().toString(36).substr(2, 16)
  }

  async execute(input: RegisterRestaurantUsecaseInput): Promise<RestaurantDetails> {
    const { username, ...restaurantData } = input
    const id = this.generateId()
    const restaurants = this.localStorage.get<RestaurantDetails[]>('restaurants') || []
    const newRestaurant: RestaurantDetails = { ...restaurantData, id }
    this.localStorage.set('restaurants', [...restaurants, newRestaurant])
    const users = this.localStorage.get<any[]>('users') || []
    const updatedUsers = users.map((u) =>
      u.username === username ? { ...u, restaurants: [{ id: newRestaurant.id, default: true }] } : u
    )
    this.localStorage.set('users', updatedUsers)
    return newRestaurant
  }
}
