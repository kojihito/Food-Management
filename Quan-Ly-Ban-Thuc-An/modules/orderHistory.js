import { getLocalStorage } from "./informationalObjects.js";
import { receipts } from "./informationalObjects.js";
import { loginedUser } from "./signCode.js";
//import { receipts } from "./informationalObjects.js";
import { users } from "./informationalObjects.js";
import { tmp } from "./cart.js";

export function orderHistory(){
    function orderHistoryDisplay(){

        let receipts = getLocalStorage('receipts');
        
        if(!receipts){
            console.log('Hello World');
        }
        

        let tmpReceipts = [];

        receipts.forEach((r) => {
            if(r.email === loginedUser.email){
                tmpReceipts.push(r);
            }
        })
        console.log(receipts);
        
        var board = document.querySelector(".table_history tbody");
        
            if(board){
                board.innerHTML=``;
                tmpReceipts.forEach((item) => {
                    let today = new Date(item.NgayMua);
                    const day = today.getDate().toString().padStart(2, '0');
                    const month = (today.getMonth() + 1).toString().padStart(2, '0');
                    const year = today.getFullYear();

                    const hours = today.getHours();                 
                    const minutes = today.getMinutes(); 
                    const seconds = today.getSeconds();
                    
                    board.innerHTML += `
                        <tr class="history_item">
                            <td>${item.id}</td>
                            <td>${day}/${month}/${year} ${hours}:${minutes}:${seconds}</td>
                            <td>${item.Address}</td>
                            <td>${item.TongCong} VND</td>
                        </tr>
                    `
                })
        }

        document.querySelectorAll('.history_item').forEach((item)=>{
            item.addEventListener("click",()=>{
                
                
                var body_product = document.querySelector(".no-data-history");
                        
                body_product.innerHTML = "";
                let firt_td = Number(item.querySelector('td').textContent);
                
                tmpReceipts.forEach((tmp)=>{

                    
                    if(firt_td===tmp.id){
                        
                        var total_tmp = 0;
                        tmp.ArrayFoods.forEach((item)=>{
                            body_product.innerHTML += `
                            <td class="bill_title" >${item.food.name}</td>
                            <td class="bill_price" style="color: rgb(243, 124, 2);text-align: center;">${item.food.price}</td>
                            <td class="bill_count" style="text-align: center;">${item.soluong}</td>
                            <td class="bill_thanh_tien" style="color: rgb(243, 124, 2);text-align: right;">${item.soluong*item.food.price} VND</td>
                             `;
                            total_tmp += item.food.price*item.soluong;
                        });
                        document.getElementById("thanh_toan_tmp_cal_money_history").innerText = total_tmp+"VND";
                        document.getElementById("phi_van_chuyen_history").innerText=tmp.PhiVanChuyen+"VND";
                        document.getElementById("tong_cong_history").innerText = tmp.TongCong+"VND";
                        switch (tmp.PhiVanChuyen) {
                            case 20000:
                                document.querySelector(".vanchuyen-history").innerText = "Thường";
                                break;

                            case 50000:
                                document.querySelector(".vanchuyen-history").innerText = "Nhanh";
                                break;
                                    
                            case 80000:
                                document.querySelector(".vanchuyen-history").innerText = "Hỏa tốc";
                                break;
                        
                            default:
                                break;
                        }
                        
                
                    }       
                });
                
                
                
                document.querySelector('.box-checkout-wrapper').style.display = "block";
                document.querySelector('.orderHistory-container').style.display = "none";
            });
        });
    }

   
    

    document.querySelector('#orderHistory-btn').addEventListener('click', () => {
        document.querySelector('.overlay-orderHistory').style.display = 'flex';
        document.querySelector('.sub-menu-wrap').style.display = 'none';
        orderHistoryDisplay();
    })

    document.querySelector('.overlay-orderHistory .close-btn').addEventListener('click', () => {
        document.querySelector('.overlay-orderHistory').style.display = 'none';
    })


    document.querySelector('.tmp').addEventListener("click",()=>{
        document.querySelector('.box-checkout-wrapper').style.display = "none";
        document.querySelector('.orderHistory-container').style.display = "block";
    })
    
   
    
}