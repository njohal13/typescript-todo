//2. Create a model for the full list

import ListItem from "./ListItem";

//Create an interface
        //will refer to a getter for the list
        //will also have methods for the list that allow us to load, save, clear, add, and remove items from the list

interface List {
    list: ListItem[],
    load(): void, 
    save(): void,
    clearList(): void,
    addItem(itemObj: ListItem): void,
    removeItem(id: string): void,

}

//class that implements the interface
export default class FullList implements List {
    //singleton - we only need 1 template for the whole app
    static instance: FullList = new FullList()

    private constructor(private _list: ListItem[] = []){}

    get list(): ListItem[] {
        return this._list
    }

    load(): void {
        //retrieve everything from localStorage (if its there)
        const storedList: string | null = localStorage.getItem("myList")
        if (typeof storedList !== "string") return

        //save as an parsedList that is an array of the specified type of obj
        //create new items from that parsed list
        const parsedList: { _id: string, _item: string, _checked: boolean }[] = JSON.parse(storedList) //retrieve parsed storedList from local storage

        //go thru the parsed list create new list item for each one that was stringified
        // & populate list again
        parsedList.forEach(itemObj => {
            const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked)
            FullList.instance.addItem(newListItem)
        })
    }

    save(): void {
        localStorage.setItem("myList", JSON.stringify(this._list))
    }

    clearList(): void {
        this._list = []
        this.save()
    }

    addItem(itemObj: ListItem): void {
        this._list.push(itemObj)
        this.save()
    }

    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id)
        this.save()
    }


}