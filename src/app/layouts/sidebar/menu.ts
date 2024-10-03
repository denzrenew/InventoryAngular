import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [

    {
        id: 201,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },    
    {
        id: 202,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'bx-home-circle',
        link: '/dashboard',

    },
    /*{
        id: 208,
        label: 'MENUITEMS.CONSOLIDATEDBONUS.TEXT',
        icon: 'bx-barcode',
        link: '/GwalletDetails/groupBonus',

    },*/  
    {
        id: 209,
        label: 'Commission Rate',
        icon: 'bx-git-merge',
        link: '/comissionlist',

    },  
    {
        id: 209,
        label: 'Orders',
        icon: 'bx-git-merge',
        link: '/orderlist',

    },  
    {
        id: 210,
        label: 'MENUITEMS.PROFILE.TEXT',
        icon: 'bx-user',
        link: '/userprofile',

    },
    {
        id: 211,
        label: 'MENUITEMS.ADMIN.TEXT',
        icon: 'bx-aperture',
        idAdminOnly: true,
        subItems: [
            {
                id: 300,
                label: 'Orders',
                link: '/orderlist',
                parentId: 2
        
            },  
            {
                id: 212,
                label: 'MENUITEMS.ADMIN.LIST.DEPOSIT',
                link: '/deposit-admin',
                parentId: 2
            },
            {
                id: 213,
                label: 'MENUITEMS.ADMIN.LIST.WITHDRAWAL',
                link: '/withdrawal-admin',
                parentId: 2
            },
            {
                id: 214,
                label: 'MENUITEMS.ADMIN.LIST.BANK',
                link: '/bank-admin',
                parentId: 2
            },
            {
                id: 215,
                label: 'MENUITEMS.ADMIN.LIST.DIRECTREFERRAL',
                link: '/all-direct-referral',
                parentId: 2
            },
            {
                id: 216,
                label: 'MENUITEMS.ADMIN.LIST.MONTHLYBONUSES',
                link: '/all-monthly-bonuses',
                parentId: 2
            },
/*             {
                id: 217,
                label: 'MENUITEMS.ADMIN.LIST.COSOLIDATED',
                link: '/all-consolidated-bonuses',
                parentId: 2
            },    */         
            /*{
                id: 217,
                label: 'MENUITEMS.ADMIN.LIST.GROUPBONUSES',
                link: '/all-group-bonuses',
                parentId: 2
            },
            {
                id: 218,
                label: 'MENUITEMS.ADMIN.LIST.GENEALOGY',
                link: '/all-genealogy',
                parentId: 2
            },*/
            {
                id: 219,
                label: 'MENUITEMS.ADMIN.LIST.PROFILES',
                link: '/all-profile',
                parentId: 2
            },
            { id: 215, label: 'Package - Report', link: '/reports/contracts', parentId: 2 },
          //  { id: 216, label: 'Main Wallet - Report', link: '/reports/main-wallet', parentId: 2 },
            { id: 217, label: 'Deposit - Report', link: '/reports/deposit', parentId: 2 },
            { id: 218, label: 'Withdrawal - Report', link: '/reports/withdrawal', parentId: 2 },
            { id: 220, label: 'Admin Help and Support', link: '/all-help-and-support', parentId: 2 },
        ]


    }
];

