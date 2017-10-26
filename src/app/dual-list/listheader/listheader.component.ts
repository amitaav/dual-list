import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-listheader',
  templateUrl: './listheader.component.html',
  styleUrls: ['./listheader.component.css']
})
export class ListheaderComponent implements OnInit {
  @Input()
  name: string;

  @Input()
  totalCount: number;

  @Input()
  displayCount: number;

  constructor() { }

  ngOnInit() {
  }

}
