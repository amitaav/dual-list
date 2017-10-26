import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ItemList } from '../models/item-list';
import { Item } from '../models/item';
import { ItemType } from '../models/item-type';
import { SortOptions } from '../models/sortoptions';
import { ListheaderComponent } from '../listheader/listheader.component';

@Component({
  selector: 'app-listpart',
  templateUrl: './listpart.component.html',
  styleUrls: ['./listpart.component.css']
})
export class ListpartComponent implements OnInit {
  @Input()
  search: boolean;
  @Input()
  range: boolean;
  @Input() // ASC
  initiallySorted: boolean;
  @Input()
  sort: boolean;
  @Input()
  sortKey: string;
  @Input()
  sortFnAsc: any;
  @Input()
  sortFnDesc: any;
  @Input()
  allowMove: boolean;
  @Input()
  addToList: boolean;
  @Input()
  dataType: string;
  @Input()
  selectColor: string;
  @Input()
  unselectColor: string;
  @Input()
  itemColor: string;
  @Input()
  icon: string;
  @Input()
  iconColor: string;
  @Input()
  listName: string;
  @Input()
  inputData: Array<any>;
  @Input()
  height: string;
  @Input()
  addNewHint: string;
  @Input()
  textChoice: string;
  @Input()
  rangeChoice: string;
  @Input()
  textLabel: string;
  @Input()
  rangeLabel: string;
  @Input()
  textHint: string;
  @Input()
  rangeStartHint: string;
  @Input()
  rangeEndHint: string;

  // as it is inside ngIf
  @ViewChild('addnew') addnew: ElementRef;

  // as it is inside ngIf
  @ViewChild('searchL') searchL: ElementRef;

  searchOrRange: string;
  inputItemList: ItemList;

  constructor() { }

  ngOnInit() {
    this.searchOrRange = (this.search && this.range) ? 'search' : (this.search) ? 'search' : (this.range) ? 'range' : null;

    const inputItems = new Array<Item>();

    if (this.dataType === 'STRING' || this.dataType === 'CUSTOM') {
      this.inputData.forEach(inp => {
        inputItems.push(new Item(inp));
      });
    }

    if (this.dataType === 'NUMBER') {
      this.inputData.forEach(inp => {
        inputItems.push(new Item(parseInt(inp)) );
      });
    }

    let inItemType: ItemType;
    if (this.dataType === 'STRING') {
      inItemType = ItemType.STRING;
    }

    if (this.dataType === 'NUMBER') {
      inItemType = ItemType.NUMBER;
    }

    if (this.dataType === 'DATE') {
      inItemType = ItemType.DATE;
    }

    if (this.dataType === 'CUSTOM') {
      inItemType = ItemType.CUSTOM;
    }

    this.inputItemList = new ItemList(
      this.listName,
      inItemType,
      inputItems,
      this.unselectColor,
      this.selectColor,
      this.itemColor,
      this.initiallySorted,
      this.sortFnAsc,
      this.sortFnDesc,
      this.iconColor,
      this.icon
    );

  }

  add(val: any): void {
    if (this.dataType === 'STRING') {
      this.inputItemList.add(new Item(val));
    }

    if (this.dataType === 'NUMBER' && !Number.isNaN(val) ) {
      this.inputItemList.add(new Item(parseInt(val)) );
    }

    if (this.dataType === 'CUSTOM') {
      const objVal = JSON.parse(val);
      this.inputItemList.add(new Item(objVal));
    }
  }

  remove(item: Item): void {
    this.inputItemList.remove(item.rank);
  }

  moveUp(idx): void {
    this.inputItemList.moveUp(idx);
  }

  moveDown(idx): void {
    this.inputItemList.moveDown(idx);
  }
}
