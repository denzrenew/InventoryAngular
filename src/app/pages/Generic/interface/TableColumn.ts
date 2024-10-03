export interface TableColumn {
  name: string;
  field: string;
  class: string;
  fieldType: string;
  format?: string;
  cellClass?: string;
  sortDirection?: string;
  filterable?: boolean;
  sortable?: boolean;
  hidden?: boolean;
}
export interface ColumnToSort {
  field?: string;
  sortDirection?: string;
}
export interface RowMeta {
  showEdit: boolean;
  showDelete: boolean;
  [field: string]: any;
}

