import { TableColumn } from "../Generic/interface/TableColumn";

export const tableColumnsGB1: Array<TableColumn> = [

    {
    name: 'Transaction Date',
    class: '',
    format: 'mm/dd/yyyy',
    field: 'createdDate',
    filterable: true,
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
    name: 'Package Reward',
    class: '',
    cellClass : 'number-right',
    field: 'packageReward',
    format: 'money',
    fieldType : "number"
  }
];