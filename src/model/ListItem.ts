//1. Create a model for the list item

export interface Item {
    id: string,
    item: string,
    checked: boolean,
}

export default class ListItem implements Item {
    constructor(
        private _id: string = '',
        private _item: string = '',
        private _checked: boolean = false,
    ) {}

    //implement getter and setter for each property
            //shift alt downawrrow to copy n paste 
            //cmd D to select and change words at same time

    get id(): string {
        return this._id
    }
    set id(id: string){
        this._id = id 
    }

    get item(): string {
        return this._item
    }
    set item(item: string){
        this._item = item 
    }

    get checked(): boolean {
        return this._checked
    }
    set checked(checked: boolean){
        this._checked = checked 
    }


     
}