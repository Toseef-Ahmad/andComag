import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'dashboards',
    icon: 'iconsminds-shop-4',
    label: 'menu.content',
    // to: `${adminRoot}/dashboards/default`,
    to: `${adminRoot}/dashboards`
    // roles: [UserRole.Admin, UserRole.Editor],
  },
  {
    id: 'menu',
    icon: 'iconsminds-box-with-folders',
    label: 'menu.menu',
    to: `${adminRoot}/ui/forms/pending`,
    // to: `${adminRoot}/magazines/pending`,
    subs: [
      {
        id: 'ui-forms',
        label: 'Family',
        // to: `${adminRoot}/ui/forms/pending`,
        to: `${adminRoot}/magazines/pending`,
        subs: [
          {
            icon: 'simple-icon-logout',
            label: 'Pending',
            // to: `${adminRoot}/ui/forms/pending`,
            to: `${adminRoot}/magazines/pending`
          },
          {
            icon: 'simple-icon-layers',
            label: 'Complete',
            // to: `${adminRoot}/ui/forms/layouts`,
            to: `${adminRoot}/magazines/completed`
          },
        ],
      },
      {
        id: 'ui-forms',
        label: 'Nursing',
        to: `${adminRoot}/ui/forms`,
        subs: [
          {
            icon: 'iconsminds-photo',
            label: 'Complete',
            // to: `${adminRoot}/ui/forms/nursingcomplete`,
            to: `${adminRoot}/magazines/nursing's/completed`
          },
        ],
      },
    ],
  },

  {
    id: 'groups',
    icon: 'iconsminds-cinema',
    label: 'menu.cards',
    // to: `${adminRoot}/pages/miscellaneous/knowledge-base`,
    to: `${adminRoot}/groups`
  },

  {
    id: 'users',
    icon: 'iconsminds-male-female',
    label: 'menu.data-list',
    // to: `${adminRoot}/pages/product/data-list`,
    to: `${adminRoot}/users`
  },

  {
    id: 'settings',
    icon: 'simple-icon-settings',
    label: 'menu.blank-page',
    to: `${adminRoot}/blank-page`,
    subs: [
      {
        icon: 'simple-icon-user-following',
        label: 'Admins Management',
        // to: `${adminRoot}/blank-page`,
        to: `${adminRoot}/settings/admin`,
        subs: [
          {
            icon: 'simple-icon-user-following',
            label: 'Admins',
            to: `${adminRoot}/blank-page`,
          }
        ],
      },
      {
        icon: 'simple-icon-user-follow',
        label: 'Magazine features',
        to: `${adminRoot}/pages/miscellaneous/prices`,
        subs: [
          {
            icon: 'simple-icon-notebook',
            label: 'Fun facts',
            // to: `${adminRoot}/pages/miscellaneous/fun-facts`,
            to: `${adminRoot}/settings/fun-facts`,
          },
          {
            icon: 'simple-icon-puzzle',
            label: 'Cover page',
            // to: `${adminRoot}/ui/forms/components`,
            to: `${adminRoot}/settings/cover-page`
          },
        ],
      },
    ],
  },
  // {
  //   id: 'pages',
  //   icon: 'iconsminds-digital-drawing',
  //   label: 'menu.pages',
  //   to: `${adminRoot}/pages`,
  //   subs: [
  //     {
  //       id: 'pages-authorization',
  //       label: 'menu.authorization',
  //       to: '/user',
  //       subs: [
  //         {
  //           icon: 'simple-icon-user-following',
  //           label: 'menu.login',
  //           to: '/user/login',
  //           newWindow: true,
  //         },
  //         {
  //           icon: 'simple-icon-user-follow',
  //           label: 'menu.register',
  //           to: '/user/register',
  //           newWindow: true,
  //         },
  //         {
  //           icon: 'simple-icon-user-following',
  //           label: 'menu.forgot-password',
  //           to: '/user/forgot-password',
  //           newWindow: true,
  //         },
  //         {
  //           icon: 'simple-icon-user-unfollow',
  //           label: 'menu.reset-password',
  //           to: '/user/reset-password',
  //           newWindow: true,
  //         },
  //       ],
  //     },
  //     {
  //       id: 'pages-product',
  //       label: 'menu.product',
  //       to: `${adminRoot}/pages/product`,
  //       subs: [
  //         {
  //           icon: 'simple-icon-list',
  //           label: 'menu.thumb-list',
  //           to: `${adminRoot}/pages/product/thumb-list`,
  //         },
  //         {
  //           icon: 'simple-icon-grid',
  //           label: 'menu.image-list',
  //           to: `${adminRoot}/pages/product/image-list`,
  //         },
  //         {
  //           icon: 'simple-icon-picture',
  //           label: 'menu.details',
  //           to: `${adminRoot}/pages/product/details`,
  //         },
  //         {
  //           icon: 'simple-icon-book-open',
  //           label: 'menu.details-alt',
  //           to: `${adminRoot}/pages/product/details-alt`,
  //         },
  //       ],
  //     },
  //     {
  //       id: 'pages-profile',
  //       label: 'menu.profile',
  //       to: `${adminRoot}/pages/profile`,
  //       subs: [
  //         {
  //           icon: 'simple-icon-share',
  //           label: 'menu.social',
  //           to: `${adminRoot}/pages/profile/social`,
  //         },
  //         {
  //           icon: 'simple-icon-link',
  //           label: 'menu.portfolio',
  //           to: `${adminRoot}/pages/profile/portfolio`,
  //         },
  //       ],
  //     },
  //     {
  //       id: 'pages-blog',
  //       label: 'menu.blog',
  //       to: `${adminRoot}/pages/blog`,
  //       subs: [
  //         {
  //           icon: 'simple-icon-share',
  //           label: 'menu.blog-list',
  //           to: `${adminRoot}/pages/blog/blog-list`,
  //         },
  //         {
  //           icon: 'simple-icon-link',
  //           label: 'menu.blog-detail',
  //           to: `${adminRoot}/pages/blog/blog-detail`,
  //         },
  //       ],
  //     },
  //     {
  //       id: 'pages-miscellaneous',
  //       label: 'menu.miscellaneous',
  //       to: `${adminRoot}/pages/miscellaneous`,
  //       subs: [
  //         {
  //           icon: 'simple-icon-question',
  //           label: 'menu.faq',
  //           to: `${adminRoot}/pages/miscellaneous/faq`,
  //         },
  //         {
  //           icon: 'simple-icon-graduation',
  //           label: 'menu.knowledge-base',
  //           to: `${adminRoot}/pages/miscellaneous/knowledge-base`,
  //         },

  //         {
  //           icon: 'simple-icon-diamond',
  //           label: 'menu.prices',
  //           to: `${adminRoot}/pages/miscellaneous/prices`,
  //         },
  //         {
  //           icon: 'simple-icon-magnifier',
  //           label: 'menu.search',
  //           to: `${adminRoot}/pages/miscellaneous/search`,
  //         },
  //         {
  //           icon: 'simple-icon-envelope-open',
  //           label: 'menu.mailing',
  //           to: `${adminRoot}/pages/miscellaneous/mailing`,
  //         },
  //         {
  //           icon: 'simple-icon-bag',
  //           label: 'menu.invoice',
  //           to: `${adminRoot}/pages/miscellaneous/invoice`,
  //         },

  //         {
  //           icon: 'simple-icon-exclamation',
  //           label: 'menu.error',
  //           to: '/error',
  //           newWindow: true,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: 'applications',
  //   icon: 'iconsminds-air-balloon-1',
  //   label: 'menu.applications',
  //   to: `${adminRoot}/applications`,
  //   subs: [
  //     {
  //       icon: 'simple-icon-check',
  //       label: 'menu.todo',
  //       to: `${adminRoot}/applications/todo`,
  //     },
  //     {
  //       icon: 'simple-icon-calculator',
  //       label: 'menu.survey',
  //       to: `${adminRoot}/applications/survey`,
  //     },
  //     {
  //       icon: 'simple-icon-bubbles',
  //       label: 'menu.chat',
  //       to: `${adminRoot}/applications/chat`,
  //     },
  //   ],
  // },
  // {
  //   id: 'ui',
  //   icon: 'iconsminds-pantone',
  //   label: 'menu.ui',
  //   to: `${adminRoot}/ui`,
  //   subs: [
  //     {
  //       id: 'ui-forms',
  //       label: 'menu.forms',
  //       to: `${adminRoot}/ui/forms`,
  //       subs: [
  //         {
  //           icon: 'simple-icon-notebook',
  //           label: 'menu.layouts',
  //           to: `${adminRoot}/ui/forms/layouts`,
  //         },
  //         {
  //           icon: 'simple-icon-puzzle',
  //           label: 'menu.components',
  //           to: `${adminRoot}/ui/forms/components`,
  //         },
  //         {
  //           icon: 'simple-icon-check',
  //           label: 'menu.validations',
  //           to: `${adminRoot}/ui/forms/validations`,
  //         },
  //         {
  //           icon: 'simple-icon-magic-wand',
  //           label: 'menu.wizard',
  //           to: `${adminRoot}/ui/forms/wizard`,
  //         },
  //       ],
  //     },
  //     {
  //       id: 'ui-components',
  //       label: 'menu.components',
  //       to: `${adminRoot}/ui/components`,
  //       subs: [
  //         {
  //           icon: 'simple-icon-bell',
  //           label: 'menu.alerts',
  //           to: `${adminRoot}/ui/components/alerts`,
  //         },
  //         {
  //           icon: 'simple-icon-badge',
  //           label: 'menu.badges',
  //           to: `${adminRoot}/ui/components/badges`,
  //         },
  //         {
  //           icon: 'simple-icon-control-play',
  //           label: 'menu.buttons',
  //           to: `${adminRoot}/ui/components/buttons`,
  //         },
  //         {
  //           icon: 'simple-icon-picture',
  //           label: 'menu.carousel',
  //           to: `${adminRoot}/ui/components/carousel`,
  //         },
  //         {
  //           icon: 'simple-icon-chart',
  //           label: 'menu.charts',
  //           to: `${adminRoot}/ui/components/charts`,
  //         },
  //         {
  //           icon: 'simple-icon-arrow-up',
  //           label: 'menu.collapse',
  //           to: `${adminRoot}/ui/components/collapse`,
  //         },
  //         {
  //           icon: 'simple-icon-arrow-down',
  //           label: 'menu.dropdowns',
  //           to: `${adminRoot}/ui/components/dropdowns`,
  //         },
  //         {
  //           icon: 'simple-icon-book-open',
  //           label: 'menu.editors',
  //           to: `${adminRoot}/ui/components/editors`,
  //         },

  //         {
  //           icon: 'simple-icon-star',
  //           label: 'menu.icons',
  //           to: `${adminRoot}/ui/components/icons`,
  //         },
  //         {
  //           icon: 'simple-icon-note',
  //           label: 'menu.input-groups',
  //           to: `${adminRoot}/ui/components/input-groups`,
  //         },
  //         {
  //           icon: 'simple-icon-screen-desktop',
  //           label: 'menu.jumbotron',
  //           to: `${adminRoot}/ui/components/jumbotron`,
  //         },
  //         {
  //           icon: 'simple-icon-map',
  //           label: 'menu.maps',
  //           to: `${adminRoot}/ui/components/maps`,
  //         },
  //         {
  //           icon: 'simple-icon-docs',
  //           label: 'menu.modal',
  //           to: `${adminRoot}/ui/components/modal`,
  //         },
  //         {
  //           icon: 'simple-icon-cursor',
  //           label: 'menu.navigation',
  //           to: `${adminRoot}/ui/components/navigation`,
  //         },
  //         {
  //           icon: 'simple-icon-pin',
  //           label: 'menu.popover-tooltip',
  //           to: `${adminRoot}/ui/components/popover-tooltip`,
  //         },
  //         {
  //           icon: 'simple-icon-shuffle',
  //           label: 'menu.sortable',
  //           to: `${adminRoot}/ui/components/sortable`,
  //         },
  //         {
  //           icon: 'simple-icon-grid',
  //           label: 'menu.tables',
  //           to: `${adminRoot}/ui/components/tables`,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: 'docs',
  //   icon: 'iconsminds-library',
  //   label: 'menu.docs',
  //   to: 'https://gogo-react-docs.coloredstrategies.com/',
  //   newWindow: true,
  // },
];
export default data;
