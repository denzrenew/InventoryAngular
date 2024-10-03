import { TableColumn } from "../Generic/interface/TableColumn";

export const tableColumns: Array<TableColumn> = [
    {
    name: 'Account Number',
    class: '',    
    field: 'accountNumber',
    filterable: true,
    fieldType : "string"
  },
  {
    name: 'Account Holder Name',
    class: '',
    field: 'accountHolderName',
    filterable: false,
    fieldType : "string"
  },
  {
    name: 'Bank Name',
    class: '',
    field: 'bankName',
    fieldType : "string"
  },
   {
    name: 'Notes',
    class: '',
    field: 'notes',
    fieldType : "string"
  },
];

