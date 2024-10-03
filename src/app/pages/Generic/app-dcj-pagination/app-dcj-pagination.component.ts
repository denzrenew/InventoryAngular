import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-dcj-pagination',
  templateUrl: './app-dcj-pagination.component.html',
  styleUrls: ['./app-dcj-pagination.component.scss']
})
export class DcjPaginationComponent implements OnInit {
  readonly maxPage:number = environment.maxPages
  readonly pageSize:number = environment.pageSzie
  @Output() onPagechange: EventEmitter<number> = new EventEmitter<number>()
  constructor() { }
  @Input() totalRow : number = 0
  pageNumber : number = 1
  numberOfPages : number = 0
  groupNumber : number = 0
  endGroupNumber : number = 0
  ngOnInit(): void {

    this.numberOfPages =  Math.floor(this.totalRow/this.pageSize);  
    if (this.totalRow % this.pageSize !== 0) {
      this.numberOfPages++;
    }
    this.computepage()
  }
  computepage() : void{
    this.groupNumber =  Math.floor(this.pageNumber/this.maxPage);   
    if (this.pageNumber % this.maxPage === 0) {
      this.groupNumber--;
    }
    if (this.numberOfPages - this.groupNumber * this.maxPage >  this.maxPage ) {
      this.endGroupNumber = this.maxPage
    } else {
      this.endGroupNumber = this.numberOfPages - this.groupNumber * this.maxPage 
    }
    this.onPagechange.emit(this.pageNumber)
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.totalRow.currentValue !== changes.totalRow.previousValue ) {
      this.numberOfPages =  Math.floor(this.totalRow/this.pageSize);  
      if (this.totalRow % this.pageSize !== 0) {
        this.numberOfPages++;
      }
      this.pageNumber=1
      this.computepage()
    }
  }
  previosGroup() : void{
    this.pageNumber = (this.groupNumber - 1) * this.maxPage +1 
    this.computepage()
  }
  nextGroup() : void{
    this.pageNumber = (this.groupNumber + 1) * this.maxPage +1 
    this.computepage()
  }
  nextPage() : void{
    this.pageNumber++;
    this.computepage()
  }
  prevPage() : void{
    this.pageNumber--;
    this.computepage()
  }
  clickPageNumber(page:number) : void{
    this.pageNumber = page;
    this.computepage()
  }
}

