import { Component, DebugElement, Input, OnDestroy, OnInit } from "@angular/core";
import StateModel from "./simple-table.states";
import SimpleTableDefinitionModel from "./simple-table.definition-model";

@Component({
  selector: 'simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.scss']
})

export class SimpleTableComponent<TModel> implements OnInit, OnDestroy {
  @Input() state!: StateModel<TModel>;

  constructor() { }

  ngOnInit(): void { 
    this.state.onInitFn();
    this.state.aggregateCb && this.state.aggregateCb();
    this.sortAndExtractDefinition();
  }

  ngOnDestroy(): void {
      
  }

  protected getHeaderColumns(): string[] {
    return this.state.definition.map(model => model.columnName);
  }

  protected getHeaderColumnData(): string[] {
    return this.state.definition.map(model => model.objectName);
  }

  protected getRow(): number {
    const columns = this.state.definition.map(i => i.objectName);
    const rowIndex = columns.findIndex(column => column === this.state.aggregateColumn);
  
    return rowIndex !== -1 ? rowIndex : 1;
  }

  /**
   * 
   */
  private sortAndExtractDefinition(): void {
    const sortedModels = this.state.definition.slice().sort(this.sortByNumberOrColumnName);
    
    this.state.definition = sortedModels;
  }

  /**
   * Sorts the definition by it's sort number if present. Otherwise, columnName
   * @param model1 
   * @param model2 
   */
  private sortByNumberOrColumnName(
    model1: SimpleTableDefinitionModel,
    model2: SimpleTableDefinitionModel
  ): number {
    // If both have sort properties, sort by sort value; otherwise, fallback to sorting by columnName
    if (model1.sort !== undefined && model2.sort !== undefined) {
      return model1.sort - model2.sort;
    } else if (model1.sort !== undefined) {
      return -1;
    } else if (model2.sort !== undefined) {
      return 1;
    } 

    return model1.columnName.localeCompare(model2.columnName);
  }

}