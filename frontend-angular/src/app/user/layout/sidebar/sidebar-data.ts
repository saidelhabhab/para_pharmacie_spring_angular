import { NavItem } from "./nav-item/nav-item";


export const navItems: NavItem[] = [
  // ========== HOME SECTION ==========
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'solar:pie-chart-2-line-duotone', // Better for analytics
    route: '/user/dashboard',
  },

  // ========== MANAGEMENT SECTION ==========
  {
    divider: true,
    navCap: 'Management',
  },
  {
    displayName: 'Customers',
    iconName: 'solar:user-id-line-duotone', // Specific to customers
    route: '/user/customers',
  },
  {
    displayName: 'Orders',
    iconName: 'solar:cart-large-3-line-duotone', // Modern shopping cart
    route: '/user/orders',
  },
  {
    displayName: 'Products',
    iconName: 'solar:medicine-bottle-line-duotone', // Pharmacy-specific
    route: '/user/products',
  },
  {
    displayName: 'Inventory',
    iconName: 'solar:box-minimalistic-line-duotone', // Stock management
    route: '/user/inventory',
  },

  // ========== PHARMACY-SPECIFIC ==========
  {
    divider: true,
    navCap: 'Pharmacy',
  },
  {
    displayName: 'Prescriptions',
    iconName: 'solar:document-text-line-duotone', // For Rx management
    route: '/user/prescriptions',
  },
  {
    displayName: 'Suppliers',
    iconName: 'solar:truck-line-duotone', // For vendors
    route: '/user/suppliers',
  },

  // ========== SYSTEM SECTION ==========
  {
    divider: true,
    navCap: 'System',
  },
  {
    displayName: 'Users & Roles',
    iconName: 'solar:users-group-two-rounded-line-duotone',
    route: '/user/access-control',
  },
  {
    displayName: 'Settings',
    iconName: 'solar:settings-line-duotone', // Modern settings icon
    route: '/user/settings',
  },
  {
    displayName: 'Reports',
    iconName: 'solar:chart-line-duotone', // For analytics
    route: '/user/reports',
  },
 
  {
    displayName: 'ToDo',
    iconName: 'solar:airbuds-case-minimalistic-line-duotone',
    route: 'https://matdash-angular-main.netlify.app/apps/todo',
    chip: true,
    external: true,
    chipClass: 'bg-secondary text-white',
    chipContent: 'PRO',
  },
  {
    displayName: 'Invoice',
    iconName: 'solar:bill-list-line-duotone',
    route: '',
    chip: true,
    chipClass: 'bg-secondary text-white',
    chipContent: 'PRO',
    children: [
      {
        displayName: 'List',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://matdash-angular-main.netlify.app/apps/invoice',
        chip: true,
        external: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
      {
        displayName: 'Detail',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://matdash-angular-main.netlify.app/apps/viewInvoice/101',
        chip: true,
        external: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
      {
        displayName: 'Create',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://matdash-angular-main.netlify.app/apps/addInvoice',
        chip: true,
        external: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
      {
        displayName: 'Edit',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://matdash-angular-main.netlify.app/apps/editinvoice/101',
        chip: true,
        external: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
    ],
  },
  {
    displayName: 'Blog',
    iconName: 'solar:widget-4-line-duotone',
    route: 'apps/blog',
    chip: true,
    chipClass: 'bg-secondary text-white',
    chipContent: 'PRO',
    children: [
      {
        displayName: 'Post',
        subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://matdash-angular-main.netlify.app/apps/blog/post',
        chip: true,
        external: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
      {
        displayName: 'Detail',
        subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://matdash-angular-main.netlify.app/apps/blog/detail/Early Black Friday Amazon deals: cheap TVs, headphones, laptops',
        chip: true,
        external: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
    ],
  },

 
  {
    divider: true,
    navCap: 'Pages',
  },
  {
    displayName: 'Roll Base Access',
    iconName: 'solar:lock-password-unlocked-line-duotone',
    route: 'https://matdash-angular-main.netlify.app/apps/permission',
    external: true,
    chip: true,
    chipClass: 'bg-secondary text-white',
    chipContent: 'PRO',
  },
 

  {
    navCap: 'Extra',
    divider: true
  },
  {
    displayName: 'Icons',
    iconName: 'solar:sticker-smile-circle-2-line-duotone',
    route: '/extra/icons',
  },
  {
    displayName: 'Sample Page',
    iconName: 'solar:planet-3-line-duotone',
    route: '/extra/sample-page',
  },

  {
    divider: true,
    navCap: 'Forms',
  },
  {
    displayName: 'Form elements',
    iconName: 'solar:password-minimalistic-input-line-duotone',
    route: 'forms/forms-elements',
    chip: true,
    chipClass: 'bg-secondary text-white',
    chipContent: 'PRO',
    children: [
      {
        displayName: 'Autocomplete',
        subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://matdash-angular-main.netlify.app/forms/forms-elements/autocomplete',
        external: true,
        chip: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
      {
        displayName: 'Button',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://matdash-angular-main.netlify.app/forms/forms-elements/button',
        external: true,
        chip: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
      {
        displayName: 'Checkbox',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://matdash-angular-main.netlify.app/forms/forms-elements/checkbox',
        external: true,
        chip: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
      {
        displayName: 'Radio',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://matdash-angular-main.netlify.app/forms/forms-elements/radio',
        external: true,
        chip: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
      {
        displayName: 'Datepicker',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://matdash-angular-main.netlify.app/forms/forms-elements/datepicker',
        external: true,
        chip: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
    ],
  },
 

  {
    divider: true,
    navCap: 'Tables',
  },
  {
    displayName: 'Tables',
    iconName: 'solar:tablet-line-duotone',
    route: 'tables',
    chip: true,
    chipClass: 'bg-secondary text-white',
    chipContent: 'PRO',
    children: [
      {
        displayName: 'Basic Table',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://matdash-angular-main.netlify.app/tables/basic-table',
        external: true,
        chip: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
      {
        displayName: 'Dynamic Table',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://matdash-angular-main.netlify.app/tables/dynamic-table',
        external: true,
        chip: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
      {
        displayName: 'Expand Table',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://matdash-angular-main.netlify.app/tables/expand-table',
        external: true,
        chip: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
      {
        displayName: 'Filterable Table',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://matdash-angular-main.netlify.app/tables/filterable-table',
        external: true,
        chip: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
      {
        displayName: 'Footer Row Table',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://matdash-angular-main.netlify.app/tables/footer-row-table',
        external: true,
        chip: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
      {
        displayName: 'HTTP Table',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://matdash-angular-main.netlify.app/tables/http-table',
        external: true,
        chip: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
      {
        displayName: 'Mix Table',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://matdash-angular-main.netlify.app/tables/mix-table',
        external: true,
        chip: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
      {
        displayName: 'Multi Header Footer',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://matdash-angular-main.netlify.app/tables/multi-header-footer-table',
        external: true,
        chip: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
      {
        displayName: 'Pagination Table',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://matdash-angular-main.netlify.app/tables/pagination-table',
        external: true,
        chip: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
      {
        displayName: 'Row Context Table',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://matdash-angular-main.netlify.app/tables/row-context-table',
        external: true,
        chip: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
      {
        displayName: 'Selection Table',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://matdash-angular-main.netlify.app/tables/selection-table',
        external: true,
        chip: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
      {
        displayName: 'Sortable Table',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://matdash-angular-main.netlify.app/tables/sortable-table',
        external: true,
        chip: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
      {
        displayName: 'Sticky Column',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://matdash-angular-main.netlify.app/tables/sticky-column-table',
        external: true,
        chip: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
      {
        displayName: 'Sticky Header Footer',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://matdash-angular-main.netlify.app/tables/sticky-header-footer-table',
        external: true,
        chip: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
    ],
  },
  {
    displayName: 'Data table',
    iconName: 'solar:database-line-duotone',
    route: 'https://matdash-angular-main.netlify.app/datatable/kichen-sink',
    external: true,
    chip: true,
    chipClass: 'bg-secondary text-white',
    chipContent: 'PRO',
  },

  {
    divider: true,
    navCap: 'Chart',
  },
  {
    displayName: 'Line',
    iconName: 'solar:align-top-line-duotone',
    route: 'https://matdash-angular-main.netlify.app/charts/line',
    external: true,
    chip: true,
    chipClass: 'bg-secondary text-white',
    chipContent: 'PRO',
  },
  {
    divider: true,
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'solar:lock-keyhole-minimalistic-line-duotone',
    route: '/authentication',
    children: [
      {
        displayName: 'Login',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: '/authentication/login',
      },
      {
        displayName: 'Side Login',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://matdash-angular-main.netlify.app/authentication/boxed-login',
        external: true,
        chip: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
    ],
  },
  {
    displayName: 'Register',
    iconName: 'solar:user-plus-rounded-line-duotone',
    route: '/authentication',
    children: [
      {
        displayName: 'Register',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: '/authentication/register',
      },
      {
        displayName: 'Side Register',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://matdash-angular-main.netlify.app/authentication/boxed-register',
        external: true,
        chip: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
    ],
  },
  {
    displayName: 'Forgot Pwd',
    iconName: 'solar:password-outline',
    route: '/authentication',
    chip: true,
    chipClass: 'bg-secondary text-white',
    chipContent: 'PRO',
    children: [
      {
        displayName: 'Side Forgot Pwd',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://matdash-angular-main.netlify.app/authentication/side-forgot-pwd',
        external: true,
        chip: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
      {
        displayName: 'Boxed Forgot Pwd',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://matdash-angular-main.netlify.app/authentication/boxed-forgot-pwd',
        external: true,
        chip: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
    ],
  }
   
  
  
];
