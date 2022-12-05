import FullList from "../model/FullList";

//the interface
interface  DOMList {
    //unordered list element
    ul: HTMLUListElement,
    //the clear method will clear out the list
    clear(): void,
    //render will rec our full list with a full list type, return void
    render(fullList: FullList): void,
}

//Create a class called ListTemplate that implements the interface DOMList
//Make it a singleton so we only need one template for the entire app like we did for the FullList class
export default class ListTemplate implements DOMList {
    
    ul: HTMLUListElement

    static instance: ListTemplate = new ListTemplate()

    private constructor(){
        this.ul = document.getElementById("listItems") as HTMLUListElement
    }
    
    clear(): void {
        this.ul.innerHTML = ''
    }
    
    render(fullList: FullList): void {
        this.clear()

        fullList.list.forEach(item => {
            const li = document.createElement("li") as HTMLLIElement
            li.className = "item"

            const check = document.createElement("input") as HTMLInputElement
            check.id = item.id //using getter to get the item id thats why its not _id
            check.type = "checkbox"
            // check.tabIndex = 0 (not necessary as the checkbox rec a default tabIndex for page navigation)
            check.checked = item.checked
            li.append(check) //append the checkbox to the list item

            check.addEventListener('change', () => {
                item.checked = !item.checked
                fullList.save()
            })

            const label = document.createElement("label") as HTMLLabelElement
            label.htmlFor = item.id
            label.textContent = item.item
            li.append(label)

            const button = document.createElement("button") as HTMLButtonElement
            button.className = 'button'
            button.textContent = 'X'
            li.append(button)

            button.addEventListener('click', () => {
                fullList.removeItem(item.id)
                this.render(fullList)
            })

            this.ul.append(li)
        })
    }
}