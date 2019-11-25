import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})

/*Grid Mandatory params*/
/***
@params() gridColumnDefinition
@params() gridData
@params() getGridData
***/

export class GridComponent implements OnInit {
  @Input() gridColumnDefinition;
  @Input() gridData;
  @Input() sorting;
  @Input() pageLinks;
  @Input() pagination;
  @Output() getGridData = new EventEmitter();
  @Output() getAction = new EventEmitter();
  totalRecords = 0;
  constructor() { }

  /* load data from parent component (when lazy is true) */
  loadData(event) {
    this.getGridData.emit(event);
  }

  /* Grid button action */
  clickAction(action, value) {
    const grid = {
      gridAction: action,
      val: value,
    };
    this.getAction.emit(grid);
  }
  ngOnInit() {
    this.totalRecords = this.gridData ? this.gridData.length : 0;
  }

}
