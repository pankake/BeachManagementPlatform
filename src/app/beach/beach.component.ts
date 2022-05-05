import {Component, OnInit, TemplateRef} from '@angular/core';
import {BeachService} from "../services/beach.service";
import {Router} from "@angular/router";
import Beach from "../models/beach";
import { faDog, faCocktail, faBowlFood, faHotdog, faBowlRice, faMask, faVolleyball,
        faWheelchair, faWifi} from '@fortawesome/free-solid-svg-icons';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-beach',
  templateUrl: './beach.component.html',
  styleUrls: ['./beach.component.scss']
})
export class BeachComponent implements OnInit {

  beaches: Beach[] = [];
  faDog: any = faDog;
  faCocktail: any = faCocktail;
  faHotdog: any = faHotdog;
  faMask: any = faMask;
  faVolleyball: any = faVolleyball;
  faWheelchair: any = faWheelchair;
  faWifi: any = faWifi;

  closeResult: string = '';
  numberOfBeaches = 0;

  constructor(private beachService: BeachService, private router: Router, private modalService: NgbModal) {

  }

  ngOnInit() {
    this.beachService.getBeaches()
      .subscribe((beaches: any) => {
        this.beaches = beaches;
        if(this.beaches)
          this.numberOfBeaches = this.beaches.length;
      });
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  deleteBeach(beach: Beach) {
    this.beachService.deleteBeach(beach._id)
      .subscribe(() => this.beaches = this.beaches.filter(b => b._id != beach._id));

    this.numberOfBeaches--;

    this.beachService.getBeaches()
      .subscribe((beaches: any) => {
        this.beaches = beaches;
      });
  }

  getLatitude(beach: any): number {
    return Number(beach.coordinates.lat);
  }

  getLongitude(beach: any): number {
    return Number(beach.coordinates.lng);
  }
}
