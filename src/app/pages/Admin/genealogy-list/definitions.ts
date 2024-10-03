import { TableColumn } from "../../Generic/interface/TableColumn";


export const tableColumns: Array<TableColumn> = [
  {
    name: 'Id',
    class: '',
    field: 'id',
    fieldType : "string"
  },
  {
    name: 'Child User Id',
    class: '',
    field: 'childUserId',
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
    name: 'Email',
    class: '',
    field: 'email',
    filterable: true,
    fieldType : "string"
  },
  {
    name: 'Parent User Id',
    class: '',
    field: 'parentUserId',
    fieldType : "string"
  },
  {
    name: 'Referred By First Name',
    class: '',
    format: '',
    field: 'referByFirstName',
    fieldType : "string"
  },
  {
    name: 'Referred by Last Name',
    class: '',
    field: 'referByLastName',
    fieldType : "string"
  },
  {
    name: 'Is Placed',
    class: '',
    field: 'isPlaced',
    fieldType : "string"
  },
  {
    name: 'Created Date',
    class: '',
    field: 'createdDate',
    fieldType : "date"
  }
];

