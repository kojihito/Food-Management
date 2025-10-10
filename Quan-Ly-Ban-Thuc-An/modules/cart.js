import { food_list } from "./informationalObjects.js";
import { foods } from "./chitietsp.js";
import { displayChoosenPage, pageDisplay} from "./pageDisplay.js";
import { loginedUser } from "./signCode.js";


export function showCart() {
    const elementCart = document.querySelector(".cart-icon");
    if (elementCart) {
        elementCart.addEventListener("click", function () {
            // Xóa overlay cũ nếu có
            const existingOverlay = document.querySelector(".overlay");
            if (existingOverlay) {
                existingOverlay.remove();
            }

            // Tạo overlay và giỏ hàng
            const overlay = document.createElement("div");
            overlay.classList.add("overlay");

            const cartContainer = document.createElement("div");
            cartContainer.classList.add("cart_container");
            cartContainer.innerHTML = `
                <div style="display: flex; width: 100%; ">
                    <i class="fa-regular fa-rectangle-xmark" style="color: black; margin-left: auto; font-size: 24px;"></i>
                </div>
                <div>
                    <div style="width: 100%; text-align: center; font-size: 24px; margin: 12px 0; color:rgb(61, 61, 57)">Sản phẩm</div>
                    <div style="margin-right: 50px; margin-bottom: 50px;" class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Sản phẩm</th>
                                    <th>Loại</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Thêm vào giỏ</th>
                                </tr>
                            </thead>
                            <tbody class="listSP"></tbody>
                        </table>
                    </div>
                </div>
                <div class="container_cart" style="background-color: white;">
                    <div style="width: 100%; text-align: center; font-size: 24px; margin: 12px 0; color:rgb(61, 61, 57)">
                        <i class="fa-solid fa-cart-shopping"></i>Giỏ hàng
                    </div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                    <th>Xóa</th>
                                </tr>
                            </thead>
                            <tbody class="cart-body"></tbody>
                        </table>
                    </div>
                    <div style="background-color: white;">
                        <div style="width: 100%; display: flex; justify-content: space-between; margin: 10px 0;">
                            <span>Tạm tính: </span>
                            <span class="total_TamTinh">0 VND</span>
                        </div>
                        <span class="product_null">* Bạn chưa có sản phẩm để thanh toán</span>
                        <button class="btn_ThanhToan " page="ThanhToan">Thanh toán</button>
                        
                    </div>
                </div>
            `;

            // Thêm overlay và cartContainer vào DOM
            document.body.appendChild(overlay);
            overlay.appendChild(cartContainer);

            // Sự kiện đóng cửa sổ
            const closeBtn = cartContainer.querySelector("i");
            closeBtn.addEventListener("click", function () {
                document.querySelectorAll(".SoLuong1").forEach((item)=>{
                    item.innerText = 1;
                });
                overlay.remove();
            });

            // Hiển thị danh sách sản phẩm
            const elementBodySP = document.querySelector(".listSP");
            if (elementBodySP) {
                elementBodySP.innerHTML = ``;
                food_list.forEach((food) => {
                    elementBodySP.innerHTML += `
                        <tr>
                            <td>
                                <div class="product-info">
                                    <img src="${food.image}" alt="ảnh sản phẩm" id="img" width="30%" height="auto"> 
                                    <span>${food.name}</span>
                                </div>
                            </td>
                            <td><span class="tag">${food.category}</span></td>
                            <td>${food.price} VND</td>
                            <td>
                                <div class="container_btn">
                                    <button class="giamSoLuong1">-</button>
                                    <button class="soLuong1">1</button>
                                    <button class="tangSoLuong1">+</button>
                                </div>
                            </td>
                            <td>
                                <button class="edit ThemSanPham">
                                    <span>Thêm</span>
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                            </td>
                        </tr>`;
                });

            }

            // Khởi tạo giỏ hàng
            updateCart();

            // Thêm sự kiện "Thêm sản phẩm"
            suKienThemSanPham();

            // Nút "Thanh toán"
            var element_btnThanhToan= document.querySelector(".btn_ThanhToan");
            if(!isEmptyProduct(foods)){
                element_btnThanhToan.classList.add("pageButtonLink");
            }

            element_btnThanhToan.addEventListener("click", () => {
                if(foods.length===0){
                    document.querySelector(".product_null").style.display = "block";
                }
                else{
                    if(loginedUser!=null){
                        
                        document.getElementById("accress_order").value = loginedUser.address;
                    }
                    document.querySelector(".product_null").style.display = "none";
                        overlay.remove();
                        var body_product = document.querySelector(".no-data");
                        body_product.innerHTML = "";
                        var total_tmp = 0;
                        foods.forEach((item)=>{
                            body_product.innerHTML += `
                                <td class="bill_title" >${item.food.name}</td>
                                <td class="bill_price" style="color: rgb(243, 124, 2);text-align: center;">${item.food.price}</td>
                                <td class="bill_count" style="text-align: center;">${item.soluong}</td>
                                <td class="bill_thanh_tien" style="color: rgb(243, 124, 2);text-align: right;">${item.soluong*item.food.price} VND</td>
                            `;
                            total_tmp += item.food.price*item.soluong;
                        });
                        document.getElementById("thanh_toan_tmp_cal_money").innerText = total_tmp+" VND";

                        van_chuyen();
                    
                }
            });
            pageDisplay();
        });
    }
}

export function tmp(){
   
    document.getElementById("accress_order").value = loginedUser.address;
}
function isEmptyProduct(foods){
    if(foods.length===0){
        return true;
    }
    return false;
}

function van_chuyen() {
    var comboBox = document.querySelector("#hinh_thuc_van_chuyen");
    var phivanchuyen = document.getElementById("phi_van_chuyen");
    if(comboBox.value==="1"){
        phivanchuyen.innerText = "20000 VND";
        document.getElementById("tong_cong").innerText = `${tong_cong()} VND`;
    }
    comboBox.addEventListener("change",()=>{
        const selectedValue = parseInt(comboBox.value);
        if (selectedValue === 1) { 
            phivanchuyen.innerText = "20000 VND"; 
        } else if (selectedValue === 2) {
            phivanchuyen.innerText = "50000 VND";
        } else if (selectedValue === 3) {
            phivanchuyen.innerText = "80000 VND";
        }
        document.getElementById("tong_cong").innerText = `${tong_cong()} VND`
    });
}

function tong_cong(){
    const number = parseInt(document.getElementById("phi_van_chuyen").textContent.split(" ")[0], 10);
    var total_TamTinh = parseInt(document.getElementById("thanh_toan_tmp_cal_money").textContent.split(" ")[0], 10);
    var total = total_TamTinh + number;
    return total;
}

// Hàm cập nhật giỏ hàng
function updateCart() {
    let total_TamTinh = 0;
    const element_cart_body = document.querySelector(".cart-body");
    const element_TamTinh = document.querySelector(".total_TamTinh");

    if (element_cart_body) {
        element_cart_body.innerHTML = ``;
        foods.forEach((item) => {
            const thanhtien = parseFloat(item.food.price) * item.soluong;
            total_TamTinh += thanhtien;

            element_cart_body.innerHTML += `
                <tr>
                    <td>
                        <div class="product-info">
                            <img src="${item.food.image}" alt="ảnh sản phẩm" id="img" width="30%" height="auto"> 
                            <span>${item.food.name}</span>
                        </div>
                    </td>
                    <td class="price">${item.food.price} VND</td>
                    <td>
                        <div class="container_btn">
                            <button class="giamSoLuong">-</button>
                            <button class="soLuong">${item.soluong}</button>
                            <button class="tangSoLuong">+</button>
                        </div>
                    </td>
                    <td>
                        <span class="thanhTien">${thanhtien} VND</span>
                    </td>
                    <td>
                        <i class="fa-solid fa-trash delete" style="color: #74C0FC; font-size: 20px; cursor: pointer;"></i>
                    </td>
                </tr>`;
        });

        element_TamTinh.innerText = `${total_TamTinh} VND`;

        // Gán sự kiện cho các nút trong giỏ
        bindCartEvents();
    }
}

// Hàm gán sự kiện
function bindCartEvents() {
    document.querySelectorAll(".tangSoLuong").forEach((item) => {
        item.addEventListener("click", (event) => {
            const parent_element = item.closest("tr");
            const name_food = parent_element.querySelector(".product-info span").textContent;

            foods.forEach((item) => {
                if (item.food.name === name_food) {
                    item.soluong++;
                }
            });

            updateCart();
        });
    });

    document.querySelectorAll(".giamSoLuong").forEach((item) => {
        item.addEventListener("click", (event) => {
            const parent_element = item.closest("tr");
            const name_food = parent_element.querySelector(".product-info span").textContent;

            foods.forEach((item, index) => {
                if (item.food.name === name_food) {
                    if (item.soluong > 1) {
                        item.soluong--;
                    } 
                }
            });

            updateCart();
        });
    });

    document.querySelectorAll(".delete").forEach((btn) => {
        btn.addEventListener("click", (event) => {
            const parent_element = btn.closest("tr");
            const name_food = parent_element.querySelector(".product-info span").textContent;

            for (let i = foods.length - 1; i >= 0; i--) {
                if (foods[i].food.name === name_food) {
                    foods.splice(i, 1);
                }
            }

            if(isEmptyProduct(foods)){
                document.querySelector(".dot").style.display = "none";
                var element_btnThanhToan= document.querySelector(".btn_ThanhToan");
                element_btnThanhToan.classList.remove("pageButtonLink");
                
                const pageButtonLinks = document.querySelectorAll(".pageButtonLink");

                // element_btnThanhToan.addEventListener("click", displayChoosenPage(()=>{
                //     pageButtonLinks.forEach(link => {
                //         if(link.attributes.page == "home"){
                //             return link
                //         }
                //     })
                // }))
                pageDisplay();
            }
            updateCart();
            
            
        });
    });
}


function suKienThemSanPham(){
    document.querySelectorAll(".ThemSanPham").forEach((item) => {
        item.addEventListener("click", (event) => {
            const parent_element = event.target.closest("tr");
            const name_food = parent_element.querySelector(".product-info span").textContent;
            const sl = Number(parent_element.querySelector(".soLuong1").textContent);

            // Kiểm tra sản phẩm đã có trong giỏ chưa
            let found = false;
            foods.forEach((item) => {
                if (item.food.name === name_food) {
                    item.soluong += sl; // Tăng số lượng
                    found = true;
                }
            });

            if (!found) {
                food_list.forEach((food_item) => {
                    if (food_item.name === name_food) {
                        foods.push({
                            food: food_item,
                            soluong: sl,
                        });
                    }
                });
            }
            if(!isEmptyProduct(foods)){
                var element_btnThanhToan= document.querySelector(".btn_ThanhToan");
                element_btnThanhToan.classList.add("pageButtonLink");
                pageDisplay();
            }
            updateCart();
            document.querySelector(".dot").style.display = "block";
            
        });
    });

    document.querySelectorAll(".tangSoLuong1").forEach((btn)=>{
        btn.addEventListener("click",(event)=>{
            const parent_element = event.target.closest("tr");
            var sl = Number(parent_element.querySelector(".soLuong1").textContent);
            sl++;
            parent_element.querySelector(".soLuong1").innerText = sl;
            
        });
    });

    document.querySelectorAll(".giamSoLuong1").forEach((btn)=>{
        btn.addEventListener("click",(event)=>{
            const parent_element = event.target.closest("tr");
            var sl = Number(parent_element.querySelector(".soLuong1").textContent);
            if(sl>1){
                sl--;
                parent_element.querySelector(".soLuong1").innerText = sl;
            }
            
        });
    });
}