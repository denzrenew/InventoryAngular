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
    field: 'referFirstName',
    filterable: true,
    fieldType : "string"
  },
  {
    name: 'Last Name',
    class: '',
    field: 'referLastName',
    filterable: true,
    fieldType : "string"
  },  
  {
    name: 'Email',
    class: '',
    filterable: true,
    field: 'referEmail',
    fieldType : "string"
  },
  {
    name: 'Package Amount',
    class: '',
    field: 'packageAmount',
    filterable: false,
    fieldType : "number"
  },
    {
    name: 'Package Reward',
    class: '',    
    field: 'packageReward',
    fieldType : "number"
  },
  {
    name: 'Parent Email',
    class: '',
    field: 'parentEmail',
    filterable: false,
    fieldType : "string"
  },
  {
    name: 'Parent First Name',
    class: '',
    field: 'parentFirstName',
    filterable: false,
    fieldType : "string"
  },
  {
    name: 'Parent Last Name',
    class: '',
    field: 'parentLastName',
    filterable: false,
    fieldType : "string"
  },
  {
    name: 'Create Date',
    class: '',
    format: 'mm/dd/yyyy',
    field: 'createdDate',
    fieldType : "date"
  },
  {
    name: 'Is Transferred',
    class: '',
    field: 'isTransferred',
    fieldType : "boolean"
  },
  {
    name: 'Date Transferred',
    class: '',
    format: 'mm/dd/yyyy',
    field: 'dateTransferred',
    fieldType : "date"
  },
];

