/**
 * The model definition for using the simple table component
 */
export default interface SimpleTableDefinitionModel {
  sort?: number;
  columnName: string;
  objectName: string;
  value?: any;
  format?: string;
  formatType?: 'date' | 'number';
}