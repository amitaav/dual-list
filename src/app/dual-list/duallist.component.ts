import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ItemList } from './models/item-list';
import { Item } from './models/item';
import { ItemType } from './models/item-type';
import { SortOptions } from './models/sortoptions';
import { ListheaderComponent } from './listheader/listheader.component';
import { ListpartComponent } from './listpart/listpart.component';

@Component({
    selector: 'comp-duallist',
    templateUrl: './duallist.component.html',
    styleUrls: ['./duallist.component.css']
})
export class DuallistComponent implements OnInit {
    @Input()
    search = true;
    @Input()
    range = true;
    @Input() // ASC
    initiallySorted = true;
    @Input()
    sort = true;
    @Input()
    sortFnAsc: any;
    @Input()
    sortFnDesc: any;
    @Input()
    allowMove = true;
    @Input()
    addToLeft = true;
    @Input()
    dataType = 'STRING';
    @Input()
    selectColor = 'blue';
    @Input()
    unselectColor = 'white';
    @Input()
    itemColor = 'black';
    @Input()
    icon: string;
    @Input()
    iconColor = 'black';
    @Input()
    availableListName = 'Available';
    @Input()
    availableInput: Array<any> = [];
    @Input()
    selectedListName = 'Selected';
    @Input()
    selectedInput: Array<any> = [];
    @Input()
    height = '200 px';
    @Input()
    addNewHint = 'Add new';
    @Input()
    textChoice = 'Content';
    @Input()
    rangeChoice = 'Range';
    @Input()
    textLabel = 'Content Search';
    @Input()
    rangeLabel = 'Range Search';
    @Input()
    textHint = 'Search';
    @Input()
    rangeStartHint = 'Start';
    @Input()
    rangeEndHint = 'End';

    @ViewChild('available') available: ListpartComponent;
    @ViewChild('selected') selected: ListpartComponent;

    constructor() {
    }

    ngOnInit(): void {
    }

    moveLTR(): void {
        const sourceRanks = [];
        this.available.inputItemList.completeList.forEach(item => {
            if (item.selected) {
                item.selected = false;
                const sourceRank = item.rank;
                sourceRanks.push(sourceRank);
                this.selected.inputItemList.add(item);
            }
        });

        sourceRanks.reverse();
        sourceRanks.forEach(idx => {
            this.available.inputItemList.removeNoRerank(idx);
        });
        this.available.inputItemList.reRank();
    }

    moveAllLTR(): void {
        this.available.inputItemList.completeList.forEach(item => {
            item.selected = false;
            this.selected.inputItemList.add(item);
        });

        this.available.inputItemList.completeList = [];
        this.available.inputItemList.clickedList = [];
    }

    moveRTL(): void {
        const sourceRanks = [];

        this.selected.inputItemList.completeList.forEach(item => {
            if (item.selected) {
                item.selected = false;
                const sourceRank = item.rank;
                sourceRanks.push(sourceRank);
                this.available.inputItemList.add(item);
            }
        });

        sourceRanks.reverse();
        sourceRanks.forEach(idx => {
            this.selected.inputItemList.removeNoRerank(idx);
        });
        this.selected.inputItemList.reRank();
    }

    moveAllRTL(): void {
        this.selected.inputItemList.completeList.forEach(item => {
            item.selected = false;
            this.available.inputItemList.add(item);
        });

        this.selected.inputItemList.completeList = [];
        this.selected.inputItemList.clickedList = [];
    }
}
