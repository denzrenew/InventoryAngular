import { TableColumn } from "../../Generic/interface/TableColumn";

export const tableColumns: TableColumn[] = [
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
    field: "id",
    class: '',
    fieldType: 'string'
  },
  {
    name: 'Owner User Id',
    field: "ownerUserId",
    class: '',
    fieldType: 'string' 
  },
  {
    name: 'Owner First Name',
    field: "ownerFirstName",
    class: '',
    fieldType: 'string'
  },
  {
    name: "Owner Last Name",
    field: "ownerLastName",
    class: '',
    fieldType: 'string'
  },
  {
    name: "Owner Email",
    field: "ownerEmail",
    class: '',
    fieldType: 'string'
  },
  {
    name: "Referred By UserId",
    field: "referByUserId",
    class: '',
    fieldType: 'string'
  },
  {
    name: "Refer by First Name",
    field: "referFirstName",
    class: '',
    fieldType: 'string'
  },
  {
    name: "Refer by Last Name",
    field: "referLastName",
    class: '',
    fieldType: 'string'
  },
  {
    name: "Refer by Email",
    field: "referEmail",
    class: '',
    fieldType: 'string'
  },
  {
    name: "Amount",
    field: "amount",
    class: '',
    fieldType: 'number'
  },
  {
    name: "Date Created",
    field: "createdDate",
    class: '',
    format: 'mm/dd/yyyy',
    fieldType : 'datetime'
  },
  {
    name: "Date Last Modified",
    field: "lastModified",
    class: '',
    fieldType: 'string'
  },
  {
    name: "Is Active",
    field: "isActive",
    class: '',
    fieldType: 'string'
  },
  {
    name: "Degree",
    field: "degree",
    class: '',
    fieldType: 'string'
  },
  {
    name: "Contract Start At",
    field: "startAt",
    class: '',
    format: 'mm/dd/yyyy',
    fieldType : "date"
  },
  {
    name: "Contract End At",
    field: "expiration",
    class: '',
    format: 'mm/dd/yyyy',
    fieldType : "date"
  },
  {
    name: "Contract Attachment",
    field: "contractAttachment",
    class: '',
    fieldType: 'string'
  },
  {
    name: "Is Auto Renew",
    field: "isAutoRenew",
    class: '',
    fieldType: 'string'
  },
];
