import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../services/global/global.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public global: GlobalService) {
  }

  ngOnInit() {
  }

}
