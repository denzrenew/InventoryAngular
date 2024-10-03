import { Injectable } from '@angular/core';
import SharedServiceModel from '../models/shared-service.model';

@Injectable({ providedIn: 'root' })
export class SharedService {
  private sharedService: SharedServiceModel[] = [];

  constructor() { }

  attachService(id: string, obj: any): void {
    const model: SharedServiceModel = { id, service: obj };
    this.sharedService.push(model);
  }

  getService(id: string): SharedServiceModel {
    return this.sharedService.find(i => i.id === id);
  }
  
}