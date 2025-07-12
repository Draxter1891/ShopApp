export const tabIcons = {
  Home: {
    active: 'home',
    inactive: 'home-outline',
  },
  Liked: {
    active: 'heart',
    inactive: 'heart-outline',
  },
  Cart: {
    active: 'cart',
    inactive: 'cart-outline',
  },
  Profile: {
    active: 'person',
    inactive: 'person-outline',
  },
} as const;

export type TabRouteName = keyof typeof tabIcons;
