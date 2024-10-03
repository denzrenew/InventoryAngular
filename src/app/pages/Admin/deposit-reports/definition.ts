import { TableColumn } from "../../Generic/interface/TableColumn";

export const tableColumns: TableColumn[] = [
  {
    name: 'Id',
    class: '',
    field: 'id',
    fieldType : "string"
  },
  {
    name: 'User Id',
    class: '',
    field: 'userId',
    filterable: true,
    fieldType : "number"
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
    name: 'Category',
    class: '',
    field: 'category',
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
  {
    name: 'Date Transfer',
    class: '',
    field: 'dateTransfer',
    format: 'mm/dd/yyyy',
    fieldType : "date"
  },
  {
    name: 'Created Date',
    class: '',
    field: 'createdDate',
    format: 'mm/dd/yyyy',
    fieldType : "date"
  },
];
