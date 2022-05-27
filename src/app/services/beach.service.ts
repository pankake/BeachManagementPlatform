import { Injectable } from '@angular/core';
import { WebService } from "./web.service";
import Beach from "../models/beach";

@Injectable({
  providedIn: 'root'
})
export class BeachService {

  constructor(private webService: WebService) { }

  getBeaches() {
      return this.webService.get('beaches');
  }

  deleteBeach(beachId: string) {
    return this.webService.delete(`beaches/${beachId}`);
  }
}

