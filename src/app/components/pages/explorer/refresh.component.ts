import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
  styles: []
})
export class RefreshComponent implements OnInit {
  haveExtraQuery: boolean = false;
  extraPath: string;
  constructor(private param: ActivatedRoute, private route: Router) {
    this.param.queryParams.subscribe((extra) => {
      if (extra.haveQuery !== undefined && extra.haveQuery !== null && extra.haveQuery) {
        this.haveExtraQuery = true;
        this.extraPath = extra.path;
      }
    });
  }

  ngOnInit() {
    this.param.params.subscribe((toNavigate) => {
      if (!this.haveExtraQuery) {
        this.route.navigate([`${toNavigate.base}/${toNavigate.to}`]);
      } else {
        // extra data
        this.route.navigate([`${toNavigate.base}/${toNavigate.to}/${this.extraPath}`]);
      }
    });
  }

}
