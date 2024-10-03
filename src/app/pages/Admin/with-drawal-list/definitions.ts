import { TableColumn } from "../../Generic/interface/TableColumn";


export const tableColumns: Array<TableColumn> = [
  {
    name: 'First Name',
    class: '',
    field: 'firstName',
    filterable: true,
    fieldType : "string"
  },
  {
    name: 'Last Name',
    class: '',
    field: 'lastName',
    filterable: true,
    fieldType : "string"
  },
  {
    name: 'Email',
    class: '',
    field: 'email',
    filterable: true,
    fieldType : "string"
  },
  {
    name: 'Bank Name',
    class: '',
    field: 'bankName',
    fieldType : "string"
  },
  {
    name: 'Date',
    class: '',
    field: 'createdDate',
    fieldType : "string"
  },
  {
    name: 'Amount',
    class: '',
    field: 'amount',
    fieldType : "money"
  },
  {
    name: 'Withdrawal Fee',
    class: '',
    field: 'fee',
    fieldType : "money"
  },
  {
    name: 'Account No',
    class: '',
    field: 'accountNumber',
    fieldType : "string"
  },
  {
    name: 'Account Holder',
    class: '',
    field: 'accountHolderName',
    fieldType : "string"
  },
  {
    name: 'Details',
    class: '',
    field: 'details',
    fieldType : "string"
  },
  {
    name: 'Status',
    class: '',
    field: 'status',
    fieldType : "string"
  },
];

