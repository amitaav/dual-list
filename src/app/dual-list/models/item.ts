export class Item {
    rank: number;
    value: any;
    selected: boolean;
    selectedColor: string;
    unselectedColor: string;
    backgroundColor: string;
    textColor: string;
    icon: string;
    iconColor: string;
    show: boolean;

    constructor(value: any) {
        this.value = value;
        this.selected = false;
        this.backgroundColor = 'white';
        this.textColor = 'black';
        this.iconColor = 'black';
        this.show = true;
    }

    clone(): Item {
        const clonedItem = new Item(this.value);
        clonedItem.rank = this.rank;
        clonedItem.selected = this.selected;
        clonedItem.selectedColor = this.selectedColor;
        clonedItem.unselectedColor = this.unselectedColor;
        clonedItem.backgroundColor = this.backgroundColor;
        clonedItem.textColor = this.textColor;
        clonedItem.icon = this.icon;
        clonedItem.iconColor = this.iconColor;
        clonedItem.show = this.show;

        return clonedItem;
    }

    toggleSelection(): void {
        this.selected = !this.selected;
        if (this.selected) {
            this.backgroundColor = this.selectedColor;
        } else {
            this.backgroundColor = this.unselectedColor;
        }
    }
}
