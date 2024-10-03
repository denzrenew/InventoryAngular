import { TableColumn } from "../Generic/interface/TableColumn";

export const tableColumnsMB1: Array<TableColumn> = [

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
    name: 'Type',
    class: '',
    field: 'typeOfEarning',
    fieldType : "string"
  },
  {
    name: 'Order #',
    class: '',
    field: 'orderReferenceNumber',
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