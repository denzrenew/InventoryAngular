import { TableColumn } from "../../Generic/interface/TableColumn";


export const tableColumns: Array<TableColumn> = [
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
    filterable: false,
    fieldType : "number"
  },
    {
    name: 'Reward Type',
    class: '',
    format: '',
    field: 'rewardType',
    fieldType : "string"
  },
  {
    name: 'Is Transferred',
    class: '',
    field: 'isTransferred',
    fieldType : "string"
  },
  {
    name: 'Date Transferred',
    class: '',
    format: 'mm/dd/yyyy',
    field: 'dateTransferred',
    fieldType : "date"
  },
  {
    name: 'First Name',
    class: '',
    field: 'firstName',
    fieldType : "string"
  },
  {
    name: 'Last Name',
    class: '',
    field: 'lastName',
    fieldType : "string"
  },
  {
    name: 'Degree',
    class: '',
    field: 'degree',
    fieldType : "string"
  }
];

