import { RestaurantOperationWarningBanner } from '@/components/restaurant/restaurant-operation-warning-banner'
import { BusinessWeekDay } from '@/types/restaurant'

const mockBusinessHours: Record<string, string> = {
  [BusinessWeekDay.MONDAY]: '20:00-23:00',
  [BusinessWeekDay.TUESDAY]: '20:00-23:00',
  [BusinessWeekDay.WEDNESDAY]: '20:00-23:00',
  [BusinessWeekDay.THURSDAY]: '20:00-23:00',
  [BusinessWeekDay.FRIDAY]: '20:00-23:00',
  [BusinessWeekDay.SATURDAY]: '20:00-00:00',
  [BusinessWeekDay.SUNDAY]: '20:00-22:00'
}

export const RestaurantOperationWarningBannerShowcase = () => {
  return (
    <RestaurantOperationWarningBanner
      operationId={null}
      businessHours={mockBusinessHours}
      acceptsScheduling={true}
      forceShow
    />
  )
}

RestaurantOperationWarningBannerShowcase.displayName = 'RestaurantOperationWarningBannerShowcase'

export default RestaurantOperationWarningBannerShowcase
