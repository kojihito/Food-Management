import { food_list, cart_items } from "./informationalObjects.js";

export const foods = [];
export function showChiTiet() {
    const chonsp = document.querySelectorAll(".food-item");

    chonsp.forEach(function(item) {
        item.addEventListener("click", function() {
            // Xóa overlay hiện tại nếu đã có để tránh tạo nhiều lần
            const existingOverlay = document.querySelector(".overlay");
            if (existingOverlay) {
                existingOverlay.remove();
            }
            
            const nameElement = item.querySelector(".food-item-name-rating p");
            var element_food;
            food_list.forEach(food =>{
                if(food.name==nameElement.textContent){
                    element_food = food;
                    return;
                }
            });
            

            // Tạo phần tử overlay
            const overlay = document.createElement("div");
            overlay.classList.add("overlay");

            // Tạo phần tử container_product_detail bên trong overlay
            const productDetail = document.createElement("div");
            productDetail.classList.add("container_product_detail");

            // Thêm nội dung vào div chi tiết sản phẩm
            productDetail.innerHTML = `
                <div class="close-btn">
                    <i class="fa-regular fa-rectangle-xmark" style="color: black;"></i>
                </div>
                <div class="product_img">
                    <img src="${element_food.image}" alt="ảnh sản phẩm" id="img" width="330px" height="250px">
                </div>
                <div class="Product_Description">
                    <h1>${element_food.name}</h1>
                    <p>${element_food.description}</p>
                    <h4>Ghi chú:</h4>
                    <div class="note-container">
                        <textarea name="note" id="note" placeholder="Nhập ghi chú của bạn..."></textarea>
                        <h4>Số lượng phần ăn</h4>
                        <div class="increase_decrease">
                            <div>
                                <button id="btn-decrease">-</button>
                                <button id="counter">1</button>
                                <button id="btn-increase">+</button>
                            </div>
                            <p>${element_food.price} VND</p>
                        </div>
                    </div>
                </div>
                <div class="add_cart">
                    <button>Thêm vào giỏ hàng</button>
                </div>
            `;
            
            let count = 1;
            productDetail.querySelector("#btn-decrease").addEventListener("click",()=>{
                if(count>1){
                    count -= 1;
                    document.getElementById("counter").textContent = count;
                    document.querySelector(".increase_decrease p").textContent = element_food.price*count + " VND";
                }
            });

            productDetail.querySelector("#btn-increase").addEventListener("click", function(){
                count += 1;
                document.getElementById("counter").textContent = count;
                document.querySelector(".increase_decrease p").textContent = element_food.price*count + " VND";
            });

            // Thêm sự kiện để đóng overlay khi nhấn vào nút Đóng
            productDetail.querySelector(".close-btn").addEventListener("click", function() {
                overlay.remove(); // Xóa overlay khỏi DOM
            });

            productDetail.querySelector(".add_cart").addEventListener("click", () => {
                // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng
                const existingFood = foods.find(item => item.food.id === element_food.id);
            
                if (existingFood) {
                    // Nếu tồn tại, tăng số lượng
                    existingFood.soluong += count;
                } else {
                    // Nếu chưa tồn tại, thêm mới vào giỏ hàng
                    foods.push({
                        food: element_food,
                        soluong: count
                    });
                }
            
                // Đóng overlay và hiển thị thông báo
                overlay.remove();
                document.querySelector(".dot").style.display = "block";
            });
            
            // Thêm container_product_detail vào overlay và thêm overlay vào body
            overlay.appendChild(productDetail);
            document.body.appendChild(overlay);
        });
    });

}


