import { TableColumn } from "../Generic/interface/TableColumn";

export const tableColumns2: Array<TableColumn> = [

    {
    name: 'Transaction Date',
    class: '',
    format: 'mm/dd/yyyy',
    field: 'createdDate',
    filterable: true,
    hidden:true,
    fieldType : "date"
  },
  {
    name: 'Referral Last Name',
    class: '',
    field: 'referLastName',
    fieldType : "string"
  },
  {
    name: 'Referral First Name',
    class: '',
    field: 'referFirstName',
    fieldType : "string"
  },
  {
    name: 'Package Amount',
    class: '',
    cellClass : 'number-right',
    field: 'packageAmount',
    format: 'money',
    fieldType : "number"
  },
   /* {
    name: 'Flushout Amount',
    class: '',
    cellClass : 'number-right',
    field: 'flashOutValue',
    format: 'negative-money',
    fieldType : "number"
  }, */
  {
    name: 'Reward',
    class: '',
    cellClass : 'number-right',
    field: 'packageReward',
    filterable: false,
    format: 'money',
    fieldType : "number"
  }
];
