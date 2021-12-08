export const UserRole = {
  Admin: 0,
  Editor: 1,
};

/*
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const defaultMenuType = 'menu-default';

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = 'en';
export const localeOptions = [
  { id: 'en', name: 'English - LTR', direction: 'ltr' },
  // { id: 'es', name: 'Español', direction: 'ltr' },
  { id: 'enrtl', name: 'English - RTL', direction: 'rtl' },
];

export const firebaseConfig = {
  apiKey: 'AIzaSyCiiwQ0oELTIsCgCnPi-lE8waav7IbyEBM',
  authDomain: 'andco-ba988.firebaseapp.com',
  databaseURL: 'https://andco-ba988.firebaseio.com',
  projectId: 'andco-ba988',
  storageBucket: 'andco-ba988.appspot.com',
  messagingSenderId: '353166709217',
};

export const adminRoot = '/app';
export const buyUrl = 'https://1.envato.market/k4z0';
export const searchPath = `${adminRoot}/#`;
export const servicePath = 'https://api.coloredstrategies.com';

export const currentUser = {
  id: 1,
  displayName: 'Test user',
  title: 'Test User',
  img: '/assets/img/profiles/l-1.jpg',
  date: 'Last seen today 15:24',
  role: UserRole.Admin,
};

export const themeColorStorageKey = '__theme_selected_color';
export const isMultiColorActive = true;
export const defaultColor = 'light.purplemonster';
export const isDarkSwitchActive = true;
export const defaultDirection = 'ltr';
export const themeRadiusStorageKey = '__theme_radius';
export const isAuthGuardActive = true;
export const colors = [
  'bluenavy',
  'blueyale',
  'blueolympic',
  'greenmoss',
  'greenlime',
  'purplemonster',
  'orangecarrot',
  'redruby',
  'yellowgranola',
  'greysteel',
];
