import { TableColumn } from "../../Generic/interface/TableColumn";


export const tableColumns: Array<TableColumn> = [
  {
    name: 'First Name',
    field: "firstName",
    filterable: true,
    class: '',
    fieldType: 'string',
  },
  {
    name: 'Last Name',
    field: "lastName",
    filterable: true,
    class: '',
    fieldType: 'string',
  },
  {
    name: 'Email',
    field: "email",
    filterable: true,
    class: '',
    fieldType: 'string',
  },
  {
    name: 'Bank Name',
    class: '',
    field: 'bankName',
    fieldType : "string"
  },
  {
    name: 'Account Number',
    class: '',
    field: 'accountNumber',
    fieldType : "string"
  },
  {
    name: 'Notes',
    class: '',
    field: 'notes',
    fieldType : "string"
  }
];

