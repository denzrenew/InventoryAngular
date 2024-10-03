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
    name: 'Amount',
    class: '',
    field: 'amount',
    filterable: true,
    fieldType : "number"
  },
  {
    name: 'Created Date',
    class: '',
    field: 'createdDate',
    filterable: true,
    format: 'mm/dd/yyyy',
    fieldType : "date"
  },
  {
    name: 'Last Modified',
    class: '',
    field: 'lastModified',
    filterable: true,
    format: 'mm/dd/yyyy',
    fieldType : "date"
  },
  {
    name: 'Last Modified',
    class: '',
    field: 'lastModified',
    filterable: true,
    format: 'mm/dd/yyyy',
    fieldType : "date"
  },
];
