import { TableColumn } from "../Generic/interface/TableColumn";

export const tableColumns: Array<TableColumn> = [
    {
    name: 'Order #',
    class: '',    
    field: 'referenceNumber',
    filterable: true,
    fieldType : "string"
    
  },
  {
    name: 'Ordered By',
    class: '',    
    field: 'name',
    filterable: true,
    fieldType : "string"
    
  },
  {
    name: 'Total Amount',
    class: '',
    field: 'grandTotal',
    filterable: false,
    format: 'money',
    fieldType : "number"
  },
  {
    name: 'Status',
    class: '',
    field: 'status',
    filterable: false,
    fieldType : "string"
  },
  {
    name: 'Is Paid',
    class: '',
    field: 'isPaid',
    filterable: false,
    format: 'yesno',
    fieldType : "string"
  }
];

