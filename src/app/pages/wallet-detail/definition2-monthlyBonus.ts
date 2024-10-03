import { TableColumn } from "../Generic/interface/TableColumn";

export const tableColumnsMB2: Array<TableColumn> = [

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
    name: 'Package Amount',
    class: '',
    cellClass : 'number-right',
    field: 'packageAmount',
    format: 'money',
    fieldType : "number"
  },
/*    {
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
