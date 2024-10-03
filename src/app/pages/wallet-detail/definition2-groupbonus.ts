import { TableColumn } from "../Generic/interface/TableColumn";

export const tableColumnsGB2: Array<TableColumn> = [

    {
    name: 'Transaction Date',
    class: '',
    format: 'mm/dd/yyyy',
    field: 'createdDate',
    filterable: true,
    hidden:true,
    fieldType : "date"
  },
  {
    name: 'Type',
    class: '',
    field: 'typeOfEarning',
    fieldType : "string"
  },  
  {
    name: 'Package Amount',
    class: '',
    cellClass : 'number-right',
    field: 'packageAmount',
    format: 'money',
    fieldType : "number"
  },
  {
    name: 'Package Reward',
    class: '',
    cellClass : 'number-right',
    field: 'packageReward',
    format: 'money',
    fieldType : "number"
  }
];