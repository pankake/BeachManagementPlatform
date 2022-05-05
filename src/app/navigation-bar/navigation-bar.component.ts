import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Params } from "@angular/router";
import { faCloudSun } from '@fortawesome/free-solid-svg-icons';
import { faUmbrellaBeach} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  faCloudSun: any = faCloudSun;
  faUmbrellaBeach: any = faUmbrellaBeach;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.router.navigate(['/weather']);
  }

  ngOnInit(): void {
  }

}
