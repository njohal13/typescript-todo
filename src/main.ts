import './css/style.css'
import FullList from './model/FullList'
// import the models we created 
import FullList from './model/FullList'
import ListItem from './model/ListItem'
import ListTemplate from './templates/ListTemplates'

//create an init app fxn
const intiApp = (): void => {
    const fullList = FullList.instance
    const template = ListTemplate.instance
    const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement
    itemEntryForm.addEventListener("submit",(event: SubmitEvent): void => {
        event.preventDefault()

        //handler that submits the new event
        const input = document.getElementById("newItem") as HTMLInputElement
        const newEntryText: string = input.value.trim()
        if(!newEntryText.length) return

        //calculate item id
        const itemId: number = fullList.list.length 
            ? parseInt(fullList.list[fullList.list.length -1].id) + 1
            : 1

        const newItem = new ListItem(itemId.toString(), newEntryText)

        fullList.addItem(newItem)
        template.render(fullList)
    })

    const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement

    clearItems.addEventListener("click", (): void => {
        fullList.clearList()
        template.clear()
    })

     //load and render list at beginning when app is first launched
     fullList.load()
     template.render(fullList)

}


//run js once DOM content is loaded
document.addEventListener("DOMContentLoaded", intiApp)