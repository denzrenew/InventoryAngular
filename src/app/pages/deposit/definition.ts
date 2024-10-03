import { TableColumn } from "../Generic/interface/TableColumn";

export const tableColumns: Array<TableColumn> = [
    {
    name: 'Transaction Date',
    class: '',
    format: 'mm/dd/yyyy',
    field: 'createdDate',
    filterable: true,
    fieldType : "date"
  },
  {
    name: 'Amount',
    class: '',
    field: 'amount',
    filterable: false,
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
    name: 'Details',
    class: '',
    field: 'details',
    fieldType : "string"
  },
];

