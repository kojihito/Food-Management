import {getLocalStorage, setLocalStorage, users } from "./informationalObjects.js";
let receipts =getLocalStorage("receipts")
const board = document.querySelector(".adminOrderBoard")
export function adminOrderLogic(){
orderBoardDisplay()


}

function orderBoardDisplay(){
  board.innerHTML = `
   <div class="section">
        <h2>Mã</h2>
        <h2>Người mua</h2>
        <h2>Đơn hàng</h2>
        <h2>Trạng thái</h2>
        <h2>thêm</h2>
      </div>
      
  `
  if (receipts == null) {
  return
  }
    if (receipts != null) {
      
      receipts.forEach(receipt => {
        let buyer
        users.forEach(user => {
          if(receipt.email == user.email){
            buyer = user
          }
        })
          
          board.innerHTML += `
           <div class="section">
            <div>
              ${receipt.id}
            </div>
            <div class="user">
              <img
                src="${buyer.avt}"
                alt=""
              />
              <div>
                <p class="name">${buyer.userName}</p>
                <p class="email">${buyer.email}</p>
              </div>
            </div>
            <div class="foods">
            ${getReceiptFoodImg(receipt.ArrayFoods)}  
            </div>
  
            ${orderStatusDisplay(receipt)}
               
            <div class="remove" receiptID="${receipt.id}">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
                />
              </svg>
              <p>Gỡ</p>
            </div>
          </div>
          `
          
          
      })
    }




    removeReceiptLogic()
    orderStatusLogic()
}

function removeReceiptLogic(){
const removeButtons = document.querySelectorAll(".adminOrderBoard .remove")
removeButtons.forEach(button => {
    button.addEventListener("click",() => {
        removeReceipt(button.attributes.receiptID.value)
    })
})

function removeReceipt(orderID){
    
    receipts.forEach(receipt => {
        if (receipt.id == orderID) {
            receipts.splice(receipts.indexOf(receipt),1)
            setLocalStorage("receipts",receipts)
        }
        
    })
orderBoardDisplay()
}
}

function orderStatusLogic(){
    const selects = document.querySelectorAll(".adminOrderBoard select")

    selects.forEach(select => {
        select.addEventListener("change", () => {
            const selectID = select.attributes.orderid.value
            const selectValue = select.value
            receipts.forEach(receipt => {
                if(receipt.id == selectID){
                    receipt.status = selectValue
                    setLocalStorage("receipts",receipts)
                }
            })
            
        })
    })
    
}

function getReceiptFoodImg(foods){
  
    let images =""
 if(foods != null){   
    foods.forEach(foodDetails => {

    images +=`
     <img src="${foodDetails.food.image}" alt="">
     `
     
    })
  }
    return images

}

function orderStatusDisplay(receipt){
return `
  <select name="" orderID="${receipt.id}">
          <option value="processing" ${valueDisplay(receipt.status,"processing")}>Đang xử lý</option>
          <option value="cooking" ${valueDisplay(receipt.status,"cooking")}>Đang nấu</option>
          <option value="shipping" ${valueDisplay(receipt.status,"shipping")}>Đang giao hàng</option>
        </select>
`

function valueDisplay(value,curr){
    if(value == curr){
        return`
        selected="selected"
        `

    }
}
}