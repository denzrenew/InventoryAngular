import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaiscTableEmitService {

//we have to set an empty defaultValue for the TableRow
  public defaultValue : string = '';
  public TableRow : BehaviorSubject<string>= new BehaviorSubject<string>(this.defaultValue);


  public sendValue(RowtoEmit:string){
    this.TableRow.next(RowtoEmit);}

  public recieveValue():Observable<string>{
      return this.TableRow.asObservable();}  

  constructor() { }
}