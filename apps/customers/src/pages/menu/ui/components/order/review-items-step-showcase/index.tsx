import { ReviewItemsStep } from '@/components/order/checkout-slide-view/review-items-step'
import type { Cart } from '@/types/cart'
import * as S from '../../styles'

export const ReviewItemsStepShowcase: React.FC = () => {
  const getCartDescription = (cart: Cart | null): string => {
    if (!cart) {
      return 'Error state when cart data is not available'
    }
    if (cart.items.length === 0) {
      return 'Empty state with no items in cart'
    }
    return `${cart.itemCount} item${cart.itemCount > 1 ? 's' : ''} - R$ ${cart.total.toFixed(2)}`
  }

  const mockCarts: Array<Cart | null> = [
    null,
    {
      id: 'cart-empty',
      restaurantId: 'restaurant-1',
      items: [],
      total: 0,
      itemCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'cart-single',
      restaurantId: 'restaurant-1',
      items: [
        {
          itemId: 'item-1',
          name: 'X-Burger Clássico',
          price: 25.9,
          quantity: 1,
          itemType: 'menu-item'
        }
      ],
      total: 25.9,
      itemCount: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'cart-with-optionals',
      restaurantId: 'restaurant-1',
      items: [
        {
          itemId: 'item-2',
          name: 'Pizza Margherita Grande',
          price: 45.0,
          quantity: 1,
          itemType: 'menu-item',
          optionals: [
            {
              name: 'Borda Recheada com Catupiry',
              price: 8.0,
              quantity: 1
            },
            {
              name: 'Azeitonas',
              price: 3.5,
              quantity: 1
            }
          ]
        },
        {
          itemId: 'item-3',
          name: 'Refrigerante 2L',
          price: 10.0,
          quantity: 1,
          itemType: 'menu-item'
        }
      ],
      total: 66.5,
      itemCount: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'cart-multiple',
      restaurantId: 'restaurant-1',
      items: [
        {
          itemId: 'item-4',
          name: 'X-Bacon',
          price: 28.9,
          quantity: 2,
          itemType: 'menu-item',
          optionals: [
            {
              name: 'Cheddar Extra',
              price: 5.0,
              quantity: 2
            }
          ]
        },
        {
          itemId: 'item-5',
          name: 'Batata Frita Grande',
          price: 18.0,
          quantity: 1,
          itemType: 'menu-item'
        },
        {
          itemId: 'item-6',
          name: 'Milk Shake de Chocolate',
          price: 15.0,
          quantity: 1,
          itemType: 'menu-item'
        }
      ],
      total: 95.8,
      itemCount: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'cart-combo',
      restaurantId: 'restaurant-1',
      items: [
        {
          itemId: 'combo-1',
          name: 'Combo Família - 2 Pizzas + Refrigerante',
          price: 89.9,
          quantity: 1,
          itemType: 'combo',
          optionals: [
            {
              name: 'Pizza Calabresa',
              price: 0,
              quantity: 1
            },
            {
              name: 'Pizza Portuguesa',
              price: 0,
              quantity: 1
            },
            {
              name: 'Coca-Cola 2L',
              price: 0,
              quantity: 1
            }
          ]
        },
        {
          itemId: 'item-7',
          name: 'Sobremesa: Pudim',
          price: 12.0,
          quantity: 2,
          itemType: 'menu-item'
        }
      ],
      total: 113.9,
      itemCount: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'cart-large',
      restaurantId: 'restaurant-1',
      items: [
        {
          itemId: 'item-8',
          name: 'Hambúrguer Artesanal Premium',
          price: 35.9,
          quantity: 3,
          itemType: 'menu-item',
          optionals: [
            {
              name: 'Bacon',
              price: 4.0,
              quantity: 3
            },
            {
              name: 'Queijo Cheddar',
              price: 3.5,
              quantity: 3
            }
          ]
        },
        {
          itemId: 'item-9',
          name: 'Onion Rings',
          price: 16.0,
          quantity: 2,
          itemType: 'menu-item'
        },
        {
          itemId: 'item-10',
          name: 'Nuggets (10 unidades)',
          price: 22.0,
          quantity: 1,
          itemType: 'menu-item',
          optionals: [
            {
              name: 'Molho Barbecue',
              price: 2.0,
              quantity: 2
            }
          ]
        },
        {
          itemId: 'item-11',
          name: 'Suco Natural Laranja 500ml',
          price: 8.5,
          quantity: 3,
          itemType: 'menu-item'
        },
        {
          itemId: 'item-12',
          name: 'Brownie com Sorvete',
          price: 18.0,
          quantity: 2,
          itemType: 'menu-item'
        }
      ],
      total: 255.2,
      itemCount: 11,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]

  const cartLabels = [
    'Cart Not Found (null)',
    'Empty Cart (0 items)',
    'Single Item (1 item)',
    'Items with Optionals (2 items)',
    'Multiple Items (4 items)',
    'Combo with Items (3 items)',
    'Large Cart (11 items)'
  ]

  return (
    <S.ShowcaseContainer>
      <S.Label>ReviewItemsStep</S.Label>
      <S.ShowcaseGrid>
        {mockCarts.map((cart, index) => (
          <S.ShowcaseCard key={index}>
            <S.ShowcaseCardTitle>{cartLabels[index]}</S.ShowcaseCardTitle>
            <S.ShowcaseCardDescription>{getCartDescription(cart)}</S.ShowcaseCardDescription>
            <div style={{ marginTop: '1rem', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem' }}>
              <ReviewItemsStep cart={cart} />
            </div>
          </S.ShowcaseCard>
        ))}
      </S.ShowcaseGrid>
    </S.ShowcaseContainer>
  )
}
