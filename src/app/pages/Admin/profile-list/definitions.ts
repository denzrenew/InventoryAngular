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
    name: 'Middle Name',
    class: '',
    field: 'middleName',
    filterable: true,
    fieldType : "string"
  },
    {
    name: 'Country',
    class: '',    
    field: 'country',
    filterable: true,
    fieldType : "string"
  },
  {
    name: 'Mobile',
    class: '',
    field: 'mobile',
    fieldType : "string"
  },
  {
    name: 'AccountType',
    class: '',
    field: 'accountType',
    fieldType : "string"
  },
  {
    name: 'Is Active',
    class: '',
    field: 'isActive',
    fieldType : "string"
  }
];

