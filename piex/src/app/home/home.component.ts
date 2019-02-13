import { Component, OnInit } from '@angular/core';
// import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  isEditing: boolean = false;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
  }
}
