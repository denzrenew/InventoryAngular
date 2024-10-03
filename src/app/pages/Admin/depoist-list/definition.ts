import { TableColumn } from "../../Generic/interface/TableColumn";


export const tableColumns: Array<TableColumn> = [
  {
    name: 'Id',
    class: '',
    field: 'id',
    fieldType : "string"
  },
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
    name: 'Details',
    class: '',
    field: 'details',
    filterable: false,
    hidden: true,
    fieldType : "string"
  },
    {
    name: 'Transaction Date',
    class: '',
    format: 'mm/dd/yyyy',
    field: 'createdDate',
    fieldType : "date"
  },
  {
    name: 'Amount',
    class: '',
    field: 'amount',
    fieldType : "string"
  },
  {
    name: 'Category',
    class: '',
    field: 'category',
    fieldType : "string"
  },
  {
    name: 'Status',
    class: 'status',
    field: 'status',
    fieldType : "string"
  },
  {
    name: 'Attachment',
    class: '',
    field: 'filePath',
    fieldType : "string"
  }
];

