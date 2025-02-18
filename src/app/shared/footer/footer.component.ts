import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  topMenuList = [];
  menuObjList = [];
  constructor(
    private navbarComponent: NavbarComponent
  ) {
    this.topMenuList = navbarComponent.topMenuList;
    this.menuObjList = navbarComponent.menuObjList;
  }

  ngOnInit(): void {
  }

}
