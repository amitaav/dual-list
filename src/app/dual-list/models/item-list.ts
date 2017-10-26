import { Item } from './item';
import { ItemType } from './item-type';
import { SortOptions } from './sortoptions';

export class ItemList {
    name: string;
    dataType: ItemType;
    clickedList: Array<Item>;
    completeList: Array<Item>;
    unselectColor: string;
    selectColor: string;
    textColor: string;
    initiallySorted: boolean;
    icon: string;
    iconColor: string;
    sortFnAsc: any;
    sortFnDesc: any;

    constructor(
        name: string,
        dataType: ItemType = ItemType.STRING,
        completeList: Array<Item> = new Array<Item>(),
        unselectedColor: string,
        selectedColor: string,
        textColor: string,
        initiallySorted: boolean = false,
        sortFnAsc: any = null,
        sortFnDesc: any = null,
        iconColor: string,
        icon?: string
    ) {
        this.name = name;
        this.dataType = dataType;
        this.clickedList = new Array<Item>();
        this.completeList = completeList;
        this.unselectColor = unselectedColor;
        this.selectColor = selectedColor;
        this.textColor = textColor;
        this.icon = icon ? icon : null;
        this.sortFnAsc = sortFnAsc;
        this.sortFnDesc = sortFnDesc;
        this.iconColor = iconColor;
        this.initiallySorted = initiallySorted;

        if (this.initiallySorted) {
            this.sortAsc();
        }

        this.completeList.forEach((item, index) => {
            this.setStyle(item);
            item.rank = index;
        });
    }

    setStyle(item): void {
        item.selectedColor = this.selectColor;
        item.unselectedColor = this.unselectColor;
        item.backgroundColor = this.unselectColor;
        item.textColor = this.textColor;
        item.iconColor = this.iconColor;
        item.icon = this.icon;
    }

    add(item: Item): void {
        const newItem = item.clone();
        this.setStyle(newItem);
        newItem.rank = this.completeList.length;
        this.completeList.push(newItem);
    }

    addAll(items: Array<Item>): void {
        items.forEach((item, index) => {
            this.add(item);
        });
    }

    removeNoRerank(rank: number): void {
        this.completeList.splice(rank, 1);
    }

    reRank(): void {
        this.completeList.forEach((item, index) => item.rank = index);
    }

    remove(rank: number): void {
        this.completeList.splice(rank, 1);
        this.completeList.forEach((item, index) => item.rank = index);
    }

    removeAll(items: Array<Item>): void {

        items.forEach(item => {
            this.completeList.splice(item.rank, 1);
        });
    }

    sortAsc(): void {
        this.sort(SortOptions.direction.ASC);
    }

    sortDesc(): void {
        this.sort(SortOptions.direction.DESC);
    }

    sort(sortDir: SortOptions = SortOptions.direction.ASC): void {
        if (!sortDir) {
            sortDir = SortOptions.direction.ASC;
        }

        if (sortDir === SortOptions.direction.ASC) {
            if (this.dataType === ItemType.STRING) {
                this.completeList = this.completeList.sort
                    (
                    function (n1, n2) {
                        if (n1.value < n2.value) { return -1; }
                        if (n1.value > n2.value) { return 1; }
                        return 0;
                    }
                    );
            }

            if (this.dataType === ItemType.NUMBER) {
                this.completeList = this.completeList.sort((n1, n2) => Number(n1.value) - Number(n2.value));
            }

            if (this.dataType === ItemType.DATE) {
            }

            if (this.dataType === ItemType.CUSTOM) {
                this.completeList = this.completeList.sort((n1, n2) => this.sortFnAsc(n1, n2));
            }
        }

        if (sortDir === SortOptions.direction.DESC) {
            if (this.dataType === ItemType.STRING) {
                this.completeList = this.completeList.sort(
                    function (n1, n2) {
                        if (n1.value < n2.value) { return 1; }
                        if (n1.value > n2.value) { return -1; }
                        return 0;
                    }
                );
            }

            if (this.dataType === ItemType.NUMBER) {
                this.completeList = this.completeList.sort((n1, n2) => Number(n2.value) - Number(n1.value));
            }

            if (this.dataType === ItemType.DATE) {
            }

            if (this.dataType === ItemType.CUSTOM) {
                this.completeList = this.completeList.sort((n1, n2) => this.sortFnDesc(n1, n2));
            }
        }

        this.completeList.forEach((item, index) => { item.rank = index; });
    }

    updateSelection(inItem: Item): void {
        inItem.toggleSelection();
        if (inItem.selected) {
            this.clickedList.push(inItem);
        } else {
            this.clickedList = this.clickedList.filter(item => item.rank !== inItem.rank);
        }
    }

    search(searchText: any): void {
        if (this.dataType === ItemType.STRING) {
            this.completeList.forEach(item => {
                if (item.value.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
                    item.show = true;
                } else {
                    item.show = false;
                }
            });
        }

        if (this.dataType === ItemType.NUMBER) {
            this.completeList.forEach(item => {
                console.log(item.value);

                if (('' + item.value).indexOf('' + searchText) !== -1) {
                    item.show = true;
                } else {
                    item.show = false;
                }
            });
        }

        if (this.dataType === ItemType.CUSTOM) {
            this.completeList.forEach(item => {
                item.show = false;
                Object.keys(item.value).forEach(key => {
                    if ( ('' + item.value[key]).indexOf(searchText) !== -1) {
                        item.show = true;
                    }
                });
            });
        }
    }

    clearSearch(searchRef): void {
        searchRef.value = null;
        this.completeList.forEach(item => {
            item.show = true;
        });
    }

    range(start: number, end: number): void {
        if (start && end) {
            this.completeList.forEach(item => {
                if (item.rank >= start && item.rank <= end) {
                    item.show = true;
                } else {
                    item.show = false;
                }
            });
        }

        // tslint:disable-next-line:one-line
        else if (start) {
            this.completeList.forEach(item => {
                if (item.rank >= start) {
                    item.show = true;
                } else {
                    item.show = false;
                }
            });
        }

        // tslint:disable-next-line:one-line
        else if (end) {
            this.completeList.forEach(item => {
                if (item.rank <= end) {
                    item.show = true;
                } else {
                    item.show = false;
                }
            });
        }
    }

    clearRange(rangeStartRef, rangeEndRef): void {
        rangeStartRef.value = null;
        rangeEndRef.value = null;
        this.completeList.forEach(item => {
            item.show = true;
        });
    }

    displayCount(): number {
        let displayCount = 0;
        this.completeList.forEach(item => {
            if (item.show) {
                displayCount++;
            }
        });
        return displayCount;
    }

    moveUp(idx): void {
        const temp = this.completeList[idx - 1];
        this.completeList[idx - 1] = this.completeList[idx];
        this.completeList[idx] = temp;
    }

    moveDown(idx): void {
        const temp = this.completeList[idx + 1];
        this.completeList[idx + 1] = this.completeList[idx];
        this.completeList[idx] = temp;
    }
}
