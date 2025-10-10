import { food_list } from "./informationalObjects.js";
import { availableImages } from "./informationalObjects.js";
import { setLocalStorage,getLocalStorage } from "./informationalObjects.js";
const adminProductBoard = document.querySelector(".adminProductBoard")
let productArr=null
export function adminProductBoardDisplay() {

    adminProductBoard.innerHTML = `
    <div class="section">
    <h2>Tên</h2>
    <h2>Loại</h2>
    <h2>Giá</h2>
    <h2>Thêm/Xóa</h2>
    </div>
    `

    food_list.forEach((item) => {
    
let img = JSON.stringify(item.image)    
        
        adminProductBoard.innerHTML += `
        <div class="product section">
        <div class="info">
        <img src=${img}>
          <div>
            <p class="name">${item.name}</p>
          </div>
        </div>
        <div class="categories">
          <div class="category">${item.category}</div>
        </div>
        <div class="price">
          ${item.price}đ
        </div>
        <div class="actions">
          <div class="modify">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>
            <p>Sửa</p>
          </div>
          <div class="remove">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
              />
            </svg>
            <p>Gỡ</p>
          </div>
        </div>
        <div class="pop-ups">
            <div class="modify">
                <form class="form-container">
                    <label class="form-label" for="modify_Name">Tên sản phẩm:</label>
                    <input class="form-input" type="text" name="productname" id="modify_Name">
                    <label class="form-label" for="modify_Price">Giá sản phẩm:</label>
                    <input class="form-input" type="number" name="Productprice" id="modify_Price">
                    <label class="form-label" for="modify_Category">Danh mục:</label> 
                    <select name="productCategory" id="modify_Category">
                        <option value="Lẩu">Lẩu</option>
                        <option value="Cơm chiên">Cơm chiên</option>
                        <option value="Tráng Miệng">Tráng Miệng</option>
                        <option value="Bún">Bún</option>
                        <option value="Hải sản">Hải sản</option>
                        <option value="Bánh mì">Bánh mì</option>
                    </select>
                    <div style="text-align: center;">
                        <button class="btn-submit" id="confirm_btn" type="submit">xác nhận</button>
                        <button class="btn-close" id="close_btn" type="button">Hủy</button>
                    </div>
                </form>
            </div>
            <div class="remove">
                <h2 style="margin-bottom: 10px; border-bottom: 2px solid rgb(205, 183, 154);"><b>Thông báo</b></h2>
                <p style="font-size: 16px; margin-bottom: 80px;">Bạn có chắc chắn muốn gỡ bỏ sản phẩm ?</p>
                <div class="ynq_btn">
                    <button class="cfms_btn">Xác nhận</button>
                    <button class="denys_btn">Hủy</button>
                </div>
            </div>
        </div>
      </div>
        `;
    });

    let productED = null;

    function updateProduct() {
        if (productED != null) {
            let productN = document.querySelector('.adminProductBoard .pop-ups .modify #modify_Name').value;
            let productP = document.querySelector('.adminProductBoard .pop-ups .modify #modify_Price').value;
            let productC = document.querySelector('.adminProductBoard .pop-ups .modify #modify_Category').value;

            for (let i = 0; i < food_list.length; i++) {
                if (productED === food_list[i].name) {
                    food_list[i].name = productN;
                    food_list[i].price = productP;
                    food_list[i].category = productC;
                    break;
                }
            }
            let foodlist = localStorage.getItem("food_list") ? JSON.parse(localStorage.getItem("food_list")) : []
            alert('Cập nhật sản phẩm thành công');
            document.querySelector(".adminProductBoard .pop-ups .modify").style.display = 'none';
            document.querySelector(".adminProductBoard .pop-ups").style.display = 'none';
            document.querySelector('adminProductPage .top-section .adminProductSearch .search-box input');
            localStorage.setItem("food_list", JSON.stringify(food_list))

            adminProductBoardDisplay();
            reattachEventListeneradminProductBoardDisplay();

        }
    }

    function reattachEventListeneradminProductBoardDisplay() {
        document.querySelectorAll(".adminProductBoard .actions .modify").forEach((button) => {
            button.addEventListener('click', (event) => {
                console.clear();
                document.querySelector(".adminProductBoard .pop-ups").style.display = 'flex';
                document.querySelector(".adminProductBoard .pop-ups .modify").style.display = 'flex';
                productED = event.target.closest(".product").querySelector(".info .name ").textContent;
                for (let i = 0; i < food_list.length; i++) {
                    if (productED === food_list[i].name) {
                        document.querySelector('.adminProductBoard .pop-ups .modify #modify_Name').value = food_list[i].name;
                        document.querySelector('.adminProductBoard .pop-ups .modify #modify_Price').value = food_list[i].price;
                        document.querySelector('.adminProductBoard .pop-ups .modify #modify_Category').value = food_list[i].category;
                        break;
                    }
                }
            })
        })

        document.querySelector('.adminProductBoard .pop-ups .modify .form-container').addEventListener('submit', (event) => {
            console.clear();
            event.preventDefault();
            updateProduct();
        })

        document.querySelector(".adminProductBoard .btn-close").addEventListener('click', () => {
            console.clear();
            document.querySelector(".adminProductBoard .pop-ups .modify").style.display = 'none';
            document.querySelector(".adminProductBoard .pop-ups").style.display = 'none';
        })

        document.querySelectorAll(".adminProductBoard .actions .remove").forEach((button) => {
            button.addEventListener('click', (event) => {
                console.clear();
                document.querySelector(".adminProductBoard .pop-ups").style.display = 'flex';
                document.querySelector(".adminProductBoard .pop-ups .remove").style.display = 'block';
                productED = event.target.closest(".product").querySelector(".info .name").textContent;
            })

        })

        document.querySelector('.adminProductBoard .pop-ups .remove .cfms_btn').addEventListener('click', () => {
            console.clear();
            if (productED != null) {
                for (let i = 0; i < food_list.length; i++) {
                    if (productED === food_list[i].name) {
                        food_list.splice(i, 1);
                        break;
                    }
                }
                let foodlist = localStorage.getItem("food_list") ? JSON.parse(localStorage.getItem("food_list")) : []

                alert('Xóa sản phẩm thành công');
                document.querySelector(".adminProductBoard .pop-ups .remove").style.display = 'none';
                document.querySelector(".adminProductBoard .pop-ups").style.display = 'none';
                document.querySelector('.adminProductPage .top-section .adminProductSearch .search-box input').value = '';
                localStorage.setItem("food_list", JSON.stringify(food_list))
                adminProductBoardDisplay();
                reattachEventListeneradminProductBoardDisplay();

            }
        })

        document.querySelector(".adminProductBoard .denys_btn").addEventListener('click', () => {
            console.clear();
            document.querySelector(".adminProductBoard .pop-ups .remove").style.display = 'none';
            document.querySelector(".adminProductBoard .pop-ups").style.display = 'none';
        })
    }

    function checkname(productE) {
        for (let i = 0; i < food_list.length; i++) {
            if (productE === food_list[i].name) {
                return false;
            }
        }
        return true;
    }

    function adminAddProduct() {
        let productN = document.querySelector('.adminProductPage .top-section .add-product #added_productName').value;
        let productP = document.querySelector('.adminProductPage .top-section .add-product #added_productPrice').value;
        let productD = document.querySelector('.adminProductPage .top-section .add-product #added_productDescription').value;
        let productC = document.querySelector('.adminProductPage .top-section .add-product #added_productCategory').value;
        let productI = document.querySelector('.adminProductPage .top-section .add-product #added_productImage').files[0];
        let inputFile = document.getElementById("added_productImage");
        let img = URL.createObjectURL(productI)

        if (!checkname(productN)) {
            alert('Sản phẩm đã tồn tại!');
            return 0;
        }

        const product = {
            id: food_list.length + 1,
            image: img,
            name: productN,
            price: productP,
            description: productD,
            category: productC,

        }
        let foodlist = localStorage.getItem("food_list") ? JSON.parse(localStorage.getItem("food_list")) : []

        food_list.push(product);
        alert('Thêm Sản Phẩm Thành Công');
        document.querySelector('.adminProductPage .top-section .add-product #added_productName').value = '';
        document.querySelector('.adminProductPage .top-section .add-product #added_productPrice').value = '';
        document.querySelector('.adminProductPage .top-section .add-product #added_productDescription').value = '';
        document.querySelector('.adminProductPage .top-section .pop-ups').style.display = 'none';
        document.querySelector('.adminProductPage .top-section .adminProductSearch .search-box input').value = '';
        localStorage.setItem("food_list", JSON.stringify(food_list))
        adminProductBoardDisplay();
        reattachEventListeneradminProductBoardDisplay();

    }

    reattachEventListeneradminProductBoardDisplay();

    document.querySelector('.adminProductPage .top-section .addProduct_btn').addEventListener('click', () => {
        console.clear();

        document.querySelector('.adminProductPage .top-section .pop-ups').style.display = 'flex';
    })

    document.querySelector('.adminProductPage .top-section .pop-ups .add-product .btn-close').addEventListener('click', () => {
        console.clear();
        document.querySelector('.adminProductPage .top-section .pop-ups .add-product #added_productName').value = '';
        document.querySelector('.adminProductPage .top-section .pop-ups .add-product #added_productPrice').value = '';
        document.querySelector('.adminProductPage .top-section .pop-ups .add-product #added_productDescription').value = '';
        document.querySelector('.adminProductPage .top-section .pop-ups').style.display = 'none';
    })

    document.querySelector('.adminProductPage .top-section .add-product .form-container').addEventListener('submit', (event) => {
        console.clear();
        event.preventDefault();
        adminAddProduct();
    })

    document.querySelector('.adminProductPage .top-section .adminProductSearch .search-box input').addEventListener('input', (event) => {
        let searchInput = document.querySelector('.adminProductPage .top-section .adminProductSearch .search-box input').value;
        console.clear();
        if (searchInput == '') {
            adminProductBoardDisplay();
            reattachEventListeneradminProductBoardDisplay();
            return;
        }

        function debounce(func, delay) {
            let timer;
            return function(...args) {
                clearTimeout(timer);
                timer = setTimeout(() => func.apply(this, args), delay);
            };
        }
        let productArr = [];
        for (let i = 0; i < food_list.length; i++) {
            if (productArr.length >= 20) break;
            if (
                food_list[i].name.toLowerCase().includes(searchInput.toLowerCase()) ||
                String(food_list[i].id).includes(searchInput)
            ) {
                productArr.push(food_list[i]);
            }



            function removeSearchInputEventListener() {
                let searchInput = document.querySelector('.adminProductPage .top-section .adminProductSearch .search-box input');
                if (searchInput && productArr) {
                    searchInput.removeEventListener('input', productArr);
                }
            }
            removeSearchInputEventListener();

        }
        adminProductBoardDisplay();
        reattachEventListeneradminProductBoardDisplay();




    })



}