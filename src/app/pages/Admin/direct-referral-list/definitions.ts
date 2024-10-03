import { TableColumn } from "../../Generic/interface/TableColumn";


export const tableColumns: Array<TableColumn> = [
  {
    name: 'First Name',
    field: "firstName",
    filterable: true,
    class: 'd-none',
    fieldType: 'string',
    hidden: true
  },
  {
    name: 'Last Name',
    field: "lastName",
    filterable: true,
    class: 'd-none',
    fieldType: 'string',
    hidden: true
  },
  {
    name: 'Email',
    field: "email",
    filterable: true,
    class: 'd-none',
    fieldType: 'string',
    hidden: true
  },
  {
    name: 'Id',
    class: '',
    field: 'id',
    fieldType : "string"
  },
  {
    name: 'Parent User Id',
    class: '',
    field: 'parentUserId',
    fieldType : "string"
  },
  {
    name: 'Parent First Name',
    class: '',
    field: 'parentFirstName',
    fieldType : "string"
  },
  {
    name: 'Parent Last Name',
    class: '',
    field: 'parentLastName',
    fieldType : "string"
  },
    {
    name: 'childUserId',
    class: '',    
    field: 'childUserId',
    fieldType : "string"
  },
  {
    name: 'Refer First Name',
    class: '',
    field: 'referFirstName',
    fieldType : "string"
  },
  {
    name: 'Refer Last Name',
    class: '',
    field: 'referLastName',
    fieldType : "string"
  },
  {
    name: 'Package Amount',
    class: '',
    field: 'packageAmount',
    fieldType : "number"
  },
  {
    name: 'Package Reward',
    class: '',
    field: 'packageReward',
    fieldType : "number"
  },
  {
    name: 'Degree',
    class: '',
    field: 'degree',
    fieldType : "number"
  },
  {
    name: 'Earning Type',
    class: '',
    field: 'typeOfEarning',
    fieldType : "number"
  },
  {
    name: 'Created Date',
    class: '',
    format: 'mm/dd/yyyy',
    field: 'createdDate',
    fieldType : "date"
  }
];

