import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { OWL_CONFIG3 } from '../../../config/owl.config';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.css']
})
export class SlidersComponent implements OnInit {
  CustomSlide: OwlOptions = OWL_CONFIG3;

  constructor() { }

  ngOnInit() {
  }

}
