import { TableColumn } from "../Generic/interface/TableColumn";

export const tableColumns: Array<TableColumn> = [
    {
    name: 'Product/Package',
    class: '',    
    field: 'product',
    filterable: true,
    fieldType : "string"
    
  },
  {
    name: 'Price',
    class: '',
    field: 'pricing',
    filterable: false,
    format: 'money',
    fieldType : "number"
  },
  {
    name: 'Commission',
    class: '',
    field: 'comission',
    filterable: false,
    format: 'money',
    fieldType : "number"
  }
];

