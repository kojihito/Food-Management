import { foods } from "./chitietsp.js";
const pages = document.querySelectorAll(".page")
let linkPressed

export function pageDisplay(){
    const pageButtonLinks = document.querySelectorAll(".pageButtonLink");
    
    
    let pageToDisplay
    pages.forEach(page => {
        if(page.attributes.page.value == "home"){
            pageToDisplay = page
            
        }
    })
    
    removeAllPages()
    displayChoosenPage(pageToDisplay)
    
    pageButtonLinks.forEach(link =>    {
        linkPressed = link
        // link.removeEventListener("click",()=>displayChoosenPage(link))
        link.addEventListener("click",()=>displayChoosenPage(link))
    }
        
    )
}

function removeAllPages(){
    pages.forEach(page => page.style.display = "none"
    )
}


export function displayChoosenPage(pageLink){

    
    if (foods.length == 0 && pageLink.attributes.class.value== "btn_ThanhToan") {
        return
    }
        pages.forEach(page => {
            if(page.attributes.page.value == pageLink.attributes.page.value){
                removeAllPages()
                page.style.display = "block"
        }})
    }

function getPageValue(page){
    // console.log(page.attributes.page.value);
    
    return page.attributes.page.value
}