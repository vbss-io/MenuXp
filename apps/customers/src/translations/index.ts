import translations0 from '../components/cart/edit-cart-item-dialog/translations.json' assert { type: 'json' };
import translations1 from '../components/client/client-address-form/translations.json' assert { type: 'json' };
import translations2 from '../components/client/client-address-slide/translations.json' assert { type: 'json' };
import translations3 from '../components/client/client-form/client-login-form/translations.json' assert { type: 'json' };
import translations4 from '../components/client/client-form/client-register-form/translations.json' assert { type: 'json' };
import translations5 from '../components/client/client-name-slide/translations.json' assert { type: 'json' };
import translations6 from '../components/client/client-profile/translations.json' assert { type: 'json' };
import translations7 from '../components/combo/combo-card/translations.json' assert { type: 'json' };
import translations8 from '../components/combo/combo-dialog/translations.json' assert { type: 'json' };
import translations9 from '../components/combo/combo-items-list/translations.json' assert { type: 'json' };
import translations10 from '../components/menu-item/menu-item-dialog/translations.json' assert { type: 'json' };
import translations11 from '../components/menu-item/menu-item-optionals/translations.json' assert { type: 'json' };
import translations12 from '../components/menu-layout-sections/banner-section/translations.json' assert { type: 'json' };
import translations13 from '../components/menu-layout-sections/carousel-section/translations.json' assert { type: 'json' };
import translations14 from '../components/menu-layout-sections/categories-section/translations.json' assert { type: 'json' };
import translations15 from '../components/menu-layout-sections/combos-section/translations.json' assert { type: 'json' };
import translations16 from '../components/menu-layout-sections/menu-items-section/translations.json' assert { type: 'json' };
import translations17 from '../components/notification/notification-bell/translations.json' assert { type: 'json' };
import translations18 from '../components/order/checkout-slide-view/address-step/translations.json' assert { type: 'json' };
import translations19 from '../components/order/checkout-slide-view/payment-step/translations.json' assert { type: 'json' };
import translations20 from '../components/order/checkout-slide-view/review-items-step/translations.json' assert { type: 'json' };
import translations21 from '../components/order/checkout-slide-view/summary-step/translations.json' assert { type: 'json' };
import translations22 from '../components/order/checkout-slide-view/translations.json' assert { type: 'json' };
import translations23 from '../components/restaurant/restaurant-client-warning-banner/translations.json' assert { type: 'json' };
import translations24 from '../components/restaurant/restaurant-header/translations.json' assert { type: 'json' };
import translations25 from '../components/restaurant/restaurant-operation-warning-banner/translations.json' assert { type: 'json' };
import translations26 from '../hooks/translations.json' assert { type: 'json' };
import translations27 from '../lib/utils/translations.json' assert { type: 'json' };
import translations28 from '../pages/error/translations.json' assert { type: 'json' };
import translations29 from '../pages/menu/cart/translations.json' assert { type: 'json' };
import translations30 from '../pages/menu/category/translations.json' assert { type: 'json' };
import translations31 from '../pages/menu/combo/translations.json' assert { type: 'json' };
import translations32 from '../pages/menu/coupons/translations.json' assert { type: 'json' };
import translations33 from '../pages/menu/games/translations.json' assert { type: 'json' };
import translations34 from '../pages/menu/product/translations.json' assert { type: 'json' };
import translations35 from '../pages/menu/profile/translations.json' assert { type: 'json' };
import translations36 from '../pages/menu/translations.json' assert { type: 'json' };
import translations37 from '../pages/not-found/translations.json' assert { type: 'json' };

export interface Translation {
  pt: string;
  en: string;
  es: string;
  [key: string]: string;
}

const allTranslations: Translation[] = [
  ...translations0,
  ...translations1,
  ...translations2,
  ...translations3,
  ...translations4,
  ...translations5,
  ...translations6,
  ...translations7,
  ...translations8,
  ...translations9,
  ...translations10,
  ...translations11,
  ...translations12,
  ...translations13,
  ...translations14,
  ...translations15,
  ...translations16,
  ...translations17,
  ...translations18,
  ...translations19,
  ...translations20,
  ...translations21,
  ...translations22,
  ...translations23,
  ...translations24,
  ...translations25,
  ...translations26,
  ...translations27,
  ...translations28,
  ...translations29,
  ...translations30,
  ...translations31,
  ...translations32,
  ...translations33,
  ...translations34,
  ...translations35,
  ...translations36,
  ...translations37
];
const uniqueTranslations = allTranslations.filter(
  (translation, index, self) => index === self.findIndex((t) => t.pt === translation.pt)
);

export default uniqueTranslations;
