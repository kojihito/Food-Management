function checkLogin() {
    let currentUser = JSON.parse(localStorage.getItem("currentuser"));
    // BỎ ĐOẠN CHẶN TRUY CẬP - LUÔN CHO PHÉP VÀO ADMIN
    if (currentUser && currentUser.userType == 1) {
        document.getElementById("name-acc").innerHTML = currentUser.fullname;
    } else {
        // Nếu chưa login hoặc không phải admin, vẫn cho vào nhưng không hiển thị tên
        // Có thể hiển thị mặc định hoặc để trống
        const nameAcc = document.getElementById("name-acc");
        if (nameAcc) {
            nameAcc.innerHTML = "Admin"; // hoặc để trống: ""
        }
    }
}

// Gọi hàm khi load trang
window.onload = function() {
    checkLogin();
    showProduct();
    showOrder(orders);
    showUser();
    showThongKe(createObj());

    // Load tab đang active (nếu vào URL trực tiếp)
    const activeTab = document.querySelector('.sidebar-list-item.tab-content.active');
    const activeIndex = Array.from(sidebars).indexOf(activeTab);
    if (activeIndex === 5) {
        setTimeout(showPriceManagement, 100);
    }
};

//do sidebar open and close
const menuIconButton = document.querySelector(".menu-icon-btn");
const sidebar = document.querySelector(".sidebar");
menuIconButton.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

// log out admin user
/*
let toogleMenu = document.querySelector(".profile");
let mune = document.querySelector(".profile-cropdown");
toogleMenu.onclick = function () {
    mune.classList.toggle("active");
};
*/

// tab for section
const sidebars = document.querySelectorAll(".sidebar-list-item.tab-content");
const sections = document.querySelectorAll(".section");

for(let i = 0; i < sidebars.length; i++) {
    sidebars[i].onclick = function () {
        // Xóa active cũ
        document.querySelector(".sidebar-list-item.active")?.classList.remove("active");
        document.querySelector(".section.active")?.classList.remove("active");

        // Thêm active mới
        sidebars[i].classList.add("active");
        sections[i].classList.add("active");

        // === TỰ ĐỘNG LOAD DỮ LIỆU KHI CHUYỂN TAB ===
        if (i === 1) { // Tab Sản phẩm
            showProduct();
        } else if (i === 3) { // Tab Đơn hàng
            findOrder();
        } else if (i === 4) { // Tab Thống kê
            thongKe(0);
        } else if (i === 5) {
            setTimeout(() => {
                showPriceManagement();
                renderCategoryProfits();
            }, 100);
        } else if (i === 6) { // Quản lý tồn kho (giả sử là tab thứ 7 trong sidebar)
            setTimeout(() => {
                inventoryCurrentPage = 1;
                inventoryAlertPage = 1;
                showInventory();
            }, 100);
        }
    };
}

const closeBtn = document.querySelectorAll('.section');
console.log(closeBtn[0])
for(let i=0;i<closeBtn.length;i++){
    closeBtn[i].addEventListener('click',(e) => {
        sidebar.classList.add("open");
    })
}

// Get amount product
function getAmoumtProduct() {
    let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
    return products.length;
}

// Get amount user
function getAmoumtUser() {
    let accounts = localStorage.getItem("accounts") ? JSON.parse(localStorage.getItem("accounts")) : [];
    return accounts.filter(item => item.userType == 0).length;
}

// Get amount user
function getMoney() {
    let tongtien = 0;
    let orders = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
    orders.forEach(item => {
        tongtien += item.tongtien
    });
    return tongtien;
}

document.getElementById("amount-user").innerHTML = getAmoumtUser();
document.getElementById("amount-product").innerHTML = getAmoumtProduct();
document.getElementById("doanh-thu").innerHTML = vnd(getMoney());

// Doi sang dinh dang tien VND
function vnd(price) {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}
// Phân trang 
let perPage = 12;
let currentPage = 1;
let totalPage = 0;
let perProducts = [];
let priceCurrentPage = 1;
let pricePerPage = 12;
let categoryProfits = JSON.parse(localStorage.getItem('categoryProfits')) || {};

function displayList(productAll, perPage, currentPage) {
    let start = (currentPage - 1) * perPage;
    let end = (currentPage - 1) * perPage + perPage;
    let productShow = productAll.slice(start, end);
    showProductArr(productShow);
}

function setupPagination(productAll, perPage) {
    document.querySelector('.page-nav-list').innerHTML = '';
    let page_count = Math.ceil(productAll.length / perPage);
    for (let i = 1; i <= page_count; i++) {
        let li = paginationChange(i, productAll, currentPage);
        document.querySelector('.page-nav-list').appendChild(li);
    }
}

function paginationChange(page, productAll, currentPage) {
    let node = document.createElement(`li`);
    node.classList.add('page-nav-item');
    node.innerHTML = `<a href="#">${page}</a>`;
    if (currentPage == page) node.classList.add('active');
    node.addEventListener('click', function () {
        currentPage = page;
        displayList(productAll, perPage, currentPage);
        let t = document.querySelectorAll('.page-nav-item.active');
        for (let i = 0; i < t.length; i++) {
            t[i].classList.remove('active');
        }
        node.classList.add('active');
    })
    return node;
}

// Hiển thị danh sách sản phẩm 
function showProductArr(arr) {
    let productHtml = "";
    if(arr.length == 0) {
        productHtml = `<div class="no-result"><div class="no-result-i"><i class="fa-light fa-face-sad-cry"></i></div><div class="no-result-h">Không có sản phẩm để hiển thị</div></div>`;
    } else {
        arr.forEach(product => {
            let btnCtl = product.status == 1 ? 
            `<button class="btn-delete" onclick="deleteProduct(${product.id})"><i class="fa-regular fa-trash"></i></button>` :
            `<button class="btn-delete" onclick="changeStatusProduct(${product.id})"><i class="fa-regular fa-eye"></i></button>`;
            productHtml += `
            <div class="list">
                    <div class="list-left">
                    <img src="${product.img}" alt="">
                    <div class="list-info">
                        <h4>${product.title}</h4>
                        
                        <span class="list-category">${product.category}</span>
                    </div>
                </div>
                <div class="list-right">
                    <div class="list-price">
                    <span class="list-current-price">${vnd(product.price)}</span>                   
                    </div>
                    <div class="list-control">
                    <div class="list-tool">
                        <button class="btn-edit" onclick="editProduct(${product.id})"><i class="fa-light fa-pen-to-square"></i></button>
                        ${btnCtl}
                    </div>                       
                </div>
                </div> 
            </div>`;
        });
    }
    document.getElementById("show-product").innerHTML = productHtml;
}

function showProduct() {
    let selectOp = document.getElementById('the-loai').value;
    let valeSearchInput = document.getElementById('form-search-product').value;
    let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];

    if(selectOp == "Tất cả") {
        result = products.filter((item) => item.status == 1);
    } else if(selectOp == "Đã xóa") {
        result = products.filter((item) => item.status == 0);
    } else {
        result = products.filter((item) => item.category == selectOp);
    }

    result = valeSearchInput == "" ? result : result.filter(item => {
        return item.title.toString().toUpperCase().includes(valeSearchInput.toString().toUpperCase());
    })

    displayList(result, perPage, currentPage);
    setupPagination(result, perPage, currentPage);
}

function cancelSearchProduct() {
    let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")).filter(item => item.status == 1) : [];
    document.getElementById('the-loai').value = "Tất cả";
    document.getElementById('form-search-product').value = "";
    displayList(products, perPage, currentPage);
    setupPagination(products, perPage, currentPage);
}

window.onload = showProduct();

function createId(arr) {
    let id = arr.length;
    let check = arr.find((item) => item.id == id);
    while (check != null) {
        id++;
        check = arr.find((item) => item.id == id);
    }
    return id;
}

// Xóa sản phẩm 
function deleteProduct(id) {
    // === GIỮ LẠI CONFIRM ĐỂ TRẢI NGHIỆM THỰC TẾ ===
    if (confirm("Bạn có chắc muốn xóa?")) {
        // === GIẢ LẬP XÓA THÀNH CÔNG ===
        toast({ 
            title: 'Success', 
            message: 'Xóa sản phẩm thành công! (Giả lập - không xóa thật)', 
            type: 'success', 
            duration: 3000 
        });

        // === KHÔNG LÀM GÌ VỚI DỮ LIỆU ===
        // Không tìm index
        // Không đổi status
        // Không lưu localStorage
        // Không reload danh sách
    }
    // Nếu bấm "Hủy" → không làm gì
}

function changeStatusProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    let index = products.findIndex(item => {
        return item.id == id;
    })
    if (confirm("Bạn có chắc chắn muốn hủy xóa?") == true) {
        products[index].status = 1;
        toast({ title: 'Success', message: 'Khôi phục sản phẩm thành công !', type: 'success', duration: 3000 });
    }
    localStorage.setItem("products", JSON.stringify(products));
    showProduct();
}

var indexCur;

function editProduct(id) {
    let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
    let index = products.findIndex(item => {
        return item.id == id;
    })
    indexCur = index;
    document.querySelectorAll(".add-product-e").forEach(item => {
        item.style.display = "none";
    })
    document.querySelectorAll(".edit-product-e").forEach(item => {
        item.style.display = "block";
    })
    document.querySelector(".add-product").classList.add("open");
    //
    document.querySelector(".upload-image-preview").src = products[index].img;
    document.getElementById("ten-mon").value = products[index].title;
    document.getElementById("mo-ta").value = products[index].desc;
    document.getElementById("chon-mon").value = products[index].category;
    // Bỏ set giá bán vì input đã xóa
}

function getPathImage(path) {
    let patharr = path.split("/");
    return "./assets/img/products/" + patharr[patharr.length - 1];
}

// Hàm sửa sp mới - không load
let btnUpdateProductIn = document.getElementById("update-product-button");
btnUpdateProductIn.addEventListener("click", (e) => {
    e.preventDefault();

    // LẤY DỮ LIỆU ĐỂ KIỂM TRA CÓ THAY ĐỔI KHÔNG (giữ nguyên logic cũ)
    let products = JSON.parse(localStorage.getItem("products"));
    let imgProduct = products[indexCur].img;
    let titleProduct = products[indexCur].title;
    let descProduct = products[indexCur].desc;
    let categoryProduct = products[indexCur].category;
    let imgProductCur = getPathImage(document.querySelector(".upload-image-preview").src);
    let titleProductCur = document.getElementById("ten-mon").value;
    let descProductCur = document.getElementById("mo-ta").value;
    let categoryText = document.getElementById("chon-mon").value;

    // KIỂM TRA CÓ THAY ĐỔI KHÔNG
    const hasChange = imgProductCur !== imgProduct || 
                      titleProductCur !== titleProduct || 
                      descProductCur !== descProduct || 
                      categoryText !== categoryProduct;

    if (hasChange) {
        // HIỆN TOAST GIẢ LẬP THÀNH CÔNG
        toast({ 
            title: "Success", 
            message: "Sửa sản phẩm thành công!", 
            type: "success", 
            duration: 3000 
        });
    } else {
        // NẾU KHÔNG THAY ĐỔI → HIỆN CẢNH BÁO
        toast({ 
            title: "Warning", 
            message: "Sản phẩm của bạn không thay đổi!", 
            type: "warning", 
            duration: 3000 
        });
    }

    // ĐÓNG MODAL + RESET FORM
    setDefaultValue();
    document.querySelector(".add-product").classList.remove("open");

    // KHÔNG LÀM GÌ HẾT → KHÔNG LƯU, KHÔNG RELOAD, KHÔNG GÌ CẢ
});

let btnAddProductIn = document.getElementById("add-product-button");
btnAddProductIn.addEventListener("click", (e) => {
    e.preventDefault();

    // === BỎ TẤT CẢ VALIDATE ===
    // Không kiểm tra tên món, mô tả, ảnh, danh mục...

    // === GIẢ LẬP THÀNH CÔNG ===
    toast({ 
        title: "Success", 
        message: "Thêm sản phẩm thành công!", 
        type: "success", 
        duration: 3000 
    });

    // === ĐÓNG POPUP + RESET FORM ===
    document.querySelector(".add-product").classList.remove("open");
    setDefaultValue(); // Giữ reset form như cũ

    // === KHÔNG LÀM GÌ KHÁC ===
    // Không tạo object, không push, không lưu localStorage, không reload danh sách
});

document.querySelector(".modal-close.product-form").addEventListener("click",() => {
    setDefaultValue();
})

function setDefaultValue() {
    document.querySelector(".upload-image-preview").src = "./assets/img/blank-image.png";
    document.getElementById("ten-mon").value = "";
    document.getElementById("gia-moi").value = "";
    document.getElementById("mo-ta").value = "";
    document.getElementById("chon-mon").value = "Món chay";
}

// Open Popup Modal
let btnAddProduct = document.getElementById("btn-add-product");
btnAddProduct.addEventListener("click", () => {
    document.querySelectorAll(".add-product-e").forEach(item => {
        item.style.display = "block";
    })
    document.querySelectorAll(".edit-product-e").forEach(item => {
        item.style.display = "none";
    })
    document.querySelector(".add-product").classList.add("open");
});

// Close Popup Modal
let closePopup = document.querySelectorAll(".modal-close");
let modalPopup = document.querySelectorAll(".modal");

for (let i = 0; i < closePopup.length; i++) {
    closePopup[i].onclick = () => {
        modalPopup[i].classList.remove("open");
    };
}

// On change Image
function uploadImage(el) {
    let path = "./assets/img/products/" + el.value.split("\\")[2];
    document.querySelector(".upload-image-preview").setAttribute("src", path);
}

// Đổi trạng thái đơn hàng
function changeStatus(id, el) {
    let orders = JSON.parse(localStorage.getItem("order"));
    let order = orders.find((item) => {
        return item.id == id;
    });
    order.trangthai = 1;
    el.classList.remove("btn-chuaxuly");
    el.classList.add("btn-daxuly");
    el.innerHTML = "Đã xử lý";
    localStorage.setItem("order", JSON.stringify(orders));
    findOrder(orders);
}

// Format Date
function formatDate(date) {
    let fm = new Date(date);
    let yyyy = fm.getFullYear();
    let mm = fm.getMonth() + 1;
    let dd = fm.getDate();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    return dd + "/" + mm + "/" + yyyy;
}

// Show order
function showOrder(arr) {
    let orderHtml = "";
    if (arr.length == 0) {
        orderHtml = `<tr><td colspan="6" style="text-align:center;">Không có dữ liệu</td></tr>`;
    } else {
        arr.forEach((item) => {
            // Xác định class + text trạng thái cho bảng
            let statusClass = "";
            let statusText = "";

            switch (item.trangthai) {
                case 0:
                    statusClass = "status-no-complete";    
                    statusText = "Chưa xử lý";
                    break;
                case 1:
                    statusClass = "status-processing";    
                    statusText = "Đang xử lý";
                    break;
                case 2:
                    statusClass = "status-delivering";     
                    statusText = "Đang giao";
                    break;
                case 3:
                    statusClass = "status-complete";      
                    statusText = "Đã xử lý";
                    break;
                default:
                    statusClass = "status-no-complete";
                    statusText = "Chưa xử lý";
            }

            const statusBadge = `<span class="status-badge ${statusClass}">${statusText}</span>`;
            const date = formatDate(item.thoigiandat);

            orderHtml += `
            <tr>
                <td>${item.id}</td>
                <td>${item.khachhang}</td>
                <td>${date}</td>
                <td>${vnd(item.tongtien)}</td>
                <td>${statusBadge}</td>
                <td class="control">
                    <button class="btn-detail" onclick="detailOrder('${item.id}')">
                        <i class="fa-regular fa-eye"></i> Chi tiết
                    </button>
                </td>
            </tr>`;
        });
    }
    document.getElementById("showOrder").innerHTML = orderHtml;
}

let orders = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
window.onload = showOrder(orders);

// Get Order Details
function getOrderDetails(madon) {
    let orderDetails = localStorage.getItem("orderDetails") ?
        JSON.parse(localStorage.getItem("orderDetails")) : [];
    let ctDon = [];
    orderDetails.forEach((item) => {
        if (item.madon == madon) {
            ctDon.push(item);
        }
    });
    return ctDon;
}

function detailOrder(id) {
    document.querySelector(".modal.detail-order").classList.add("open");
    let orders = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
    let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
    // Lấy hóa đơn
    let order = orders.find((item) => item.id == id);
    // Lấy chi tiết hóa đơn
    let ctDon = getOrderDetails(id);
    let spHtml = `<div class="modal-detail-left"><div class="order-item-group">`;
    ctDon.forEach((item) => {
        let detaiSP = products.find(product => product.id == item.id);
        spHtml += `<div class="order-product">
            <div class="order-product-left">
                <img src="${detaiSP.img}" alt="">
                <div class="order-product-info">
                    <h4>${detaiSP.title}</h4>
                    <p class="order-product-note"><i class="fa-light fa-pen"></i> ${item.note || ''}</p>
                    <p class="order-product-quantity">SL: ${item.soluong}<p>
                </div>
            </div>
            <div class="order-product-right">
                <div class="order-product-price">
                    <span class="order-product-current-price">${vnd(item.price)}</span>
                </div>
            </div>
        </div>`;
    });
    spHtml += `</div></div>`;
    spHtml += `<div class="modal-detail-right">
        <ul class="detail-order-group">
            <li class="detail-order-item">
                <span class="detail-order-item-left"><i class="fa-light fa-calendar-days"></i> Ngày đặt hàng</span>
                <span class="detail-order-item-right">${formatDate(order.thoigiandat)}</span>
            </li>
            <li class="detail-order-item">
                <span class="detail-order-item-left"><i class="fa-light fa-truck"></i> Hình thức giao</span>
                <span class="detail-order-item-right">${order.hinhthucgiao}</span>
            </li>
            <li class="detail-order-item">
            <span class="detail-order-item-left"><i class="fa-thin fa-person"></i> Người nhận</span>
            <span class="detail-order-item-right">${order.tenguoinhan}</span>
            </li>
            <li class="detail-order-item">
            <span class="detail-order-item-left"><i class="fa-light fa-phone"></i> Số điện thoại</span>
            <span class="detail-order-item-right">${order.sdtnhan}</span>
            </li>
            <li class="detail-order-item tb">
                <span class="detail-order-item-left"><i class="fa-light fa-clock"></i> Thời gian giao</span>
                <p class="detail-order-item-b">${(order.thoigiangiao == "" ? "" : (order.thoigiangiao + " - ")) + formatDate(order.ngaygiaohang)}</p>
            </li>
            <li class="detail-order-item tb">
                <span class="detail-order-item-t"><i class="fa-light fa-location-dot"></i> Địa chỉ nhận</span>
                <p class="detail-order-item-b">${order.diachinhan}</p>
            </li>
            <li class="detail-order-item tb">
                <span class="detail-order-item-t"><i class="fa-light fa-note-sticky"></i> Ghi chú</span>
                <p class="detail-order-item-b">${order.ghichu}</p>
            </li>
        </ul>
    </div>`;
    document.querySelector(".modal-detail-order").innerHTML = spHtml;

    // Button trạng thái
    let classDetailBtn, textDetailBtn;
    switch(order.trangthai) {
        case 0:
            classDetailBtn = "btn-chuaxuly";
            textDetailBtn = "Chưa xử lý";
            break;
        case 1:
            classDetailBtn = "btn-dangxuly";
            textDetailBtn = "Đang xử lý";
            break;
        case 2:
            classDetailBtn = "btn-danggiao";
            textDetailBtn = "Đang giao";
            break;
        case 3:
            classDetailBtn = "btn-daxuly";
            textDetailBtn = "Đã xử lý";
            break;
    }
    document.querySelector(
        ".modal-detail-bottom"
    ).innerHTML = `<div class="modal-detail-bottom-left">
        <div class="price-total">
            <span class="thanhtien">Thành tiền</span>
            <span class="price">${vnd(order.tongtien)}</span>
        </div>
    </div>
    <div class="modal-detail-bottom-right">
        <button class="modal-detail-btn ${classDetailBtn}" onclick="advanceStatus('${order.id}',this)">${textDetailBtn}</button>
    </div>`;
}

// Tiến trạng thái
function advanceStatus(id, el) {
    let orders = JSON.parse(localStorage.getItem("order"));
    let order = orders.find((item) => item.id == id);
    if (order.trangthai < 3) {
        order.trangthai += 1;
        localStorage.setItem("order", JSON.stringify(orders));
        findOrder();  // Refresh table
        // Update button và modal
        let newClass, newText;
        switch(order.trangthai) {
            case 1: newClass = "btn-dangxuly"; newText = "Đang xử lý"; break;
            case 2: newClass = "btn-danggiao"; newText = "Đang giao"; break;
            case 3: newClass = "btn-daxuly"; newText = "Đã xử lý"; break;
        }
        el.classList.remove(...el.classList);
        el.classList.add("modal-detail-btn", newClass);
        el.innerHTML = newText;
        toast({ title: 'Thành công', message: `Đơn hàng cập nhật: ${newText}`, type: 'success', duration: 2000 });
    } else {
        toast({ title: 'Thông báo', message: 'Đơn hàng đã hoàn tất!', type: 'info', duration: 2000 });
    }
}

// Find Order
function findOrder() {
    let tinhTrang = parseInt(document.getElementById("tinh-trang").value);
    let ct = document.getElementById("form-search-order").value;
    let timeStart = document.getElementById("time-start").value;
    let timeEnd = document.getElementById("time-end").value;
    
    if (timeEnd < timeStart && timeEnd != "" && timeStart != "") {
        alert("Lựa chọn thời gian sai !");
        return;
    }
    let orders = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
    let result = tinhTrang == 2 ? orders : orders.filter((item) => {
        return item.trangthai == tinhTrang;
    });
    result = ct == "" ? result : result.filter((item) => {
        return (item.khachhang.toLowerCase().includes(ct.toLowerCase()) || item.id.toString().toLowerCase().includes(ct.toLowerCase()));
    });

    if (timeStart != "" && timeEnd == "") {
        result = result.filter((item) => {
            return new Date(item.thoigiandat) >= new Date(timeStart).setHours(0, 0, 0);
        });
    } else if (timeStart == "" && timeEnd != "") {
        result = result.filter((item) => {
            return new Date(item.thoigiandat) <= new Date(timeEnd).setHours(23, 59, 59);
        });
    } else if (timeStart != "" && timeEnd != "") {
        result = result.filter((item) => {
            return (new Date(item.thoigiandat) >= new Date(timeStart).setHours(0, 0, 0) && new Date(item.thoigiandat) <= new Date(timeEnd).setHours(23, 59, 59)
            );
        });
    }
    showOrder(result);
}

function cancelSearchOrder(){
    let orders = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
    document.getElementById("tinh-trang").value = 2;
    document.getElementById("form-search-order").value = "";
    document.getElementById("time-start").value = "";
    document.getElementById("time-end").value = "";
    showOrder(orders);
}

// Create Object Thong ke
function createObj() {
    let orders = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
    let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : []; 
    let orderDetails = localStorage.getItem("orderDetails") ? JSON.parse(localStorage.getItem("orderDetails")) : []; 
    let result = [];
    orderDetails.forEach(item => {
        // Lấy thông tin sản phẩm
        let prod = products.find(product => {return product.id == item.id;});
        let obj = new Object();
        obj.id = item.id;
        obj.madon = item.madon;
        obj.price = item.price;
        obj.quantity = item.soluong;
        obj.category = prod.category;
        obj.title = prod.title;
        obj.img = prod.img;
        obj.time = (orders.find(order => order.id == item.madon)).thoigiandat;
        result.push(obj);
    });
    return result;
}

// Filter 
function thongKe(mode) {
    let categoryTk = document.getElementById("the-loai-tk").value;
    let ct = document.getElementById("form-search-tk").value;
    let timeStart = document.getElementById("time-start-tk").value;
    let timeEnd = document.getElementById("time-end-tk").value;
    if (timeEnd < timeStart && timeEnd != "" && timeStart != "") {
        alert("Lựa chọn thời gian sai !");
        return;
    }
    let arrDetail = createObj();
    let result = categoryTk == "Tất cả" ? arrDetail : arrDetail.filter((item) => {
        return item.category == categoryTk;
    });

    result = ct == "" ? result : result.filter((item) => {
        return (item.title.toLowerCase().includes(ct.toLowerCase()));
    });

    if (timeStart != "" && timeEnd == "") {
        result = result.filter((item) => {
            return new Date(item.time) > new Date(timeStart).setHours(0, 0, 0);
        });
    } else if (timeStart == "" && timeEnd != "") {
        result = result.filter((item) => {
            return new Date(item.time) < new Date(timeEnd).setHours(23, 59, 59);
        });
    } else if (timeStart != "" && timeEnd != "") {
        result = result.filter((item) => {
            return (new Date(item.time) > new Date(timeStart).setHours(0, 0, 0) && new Date(item.time) < new Date(timeEnd).setHours(23, 59, 59)
            );
        });
    }    
    showThongKe(result,mode);
}

// Show số lượng sp, số lượng đơn bán, doanh thu
function showOverview(arr){
    document.getElementById("quantity-product").innerText = arr.length;
    document.getElementById("quantity-order").innerText = arr.reduce((sum, cur) => (sum + parseInt(cur.quantity)),0);
    document.getElementById("quantity-sale").innerText = vnd(arr.reduce((sum, cur) => (sum + parseInt(cur.doanhthu)),0));
}

function showThongKe(arr,mode) {
    let orderHtml = "";
    let mergeObj = mergeObjThongKe(arr);
    showOverview(mergeObj);

    switch (mode){
        case 0:
            mergeObj = mergeObjThongKe(createObj());
            showOverview(mergeObj);
            document.getElementById("the-loai-tk").value = "Tất cả";
            document.getElementById("form-search-tk").value = "";
            document.getElementById("time-start-tk").value = "";
            document.getElementById("time-end-tk").value = "";
            break;
        case 1:
            mergeObj.sort((a,b) => parseInt(a.quantity) - parseInt(b.quantity))
            break;
        case 2:
            mergeObj.sort((a,b) => parseInt(b.quantity) - parseInt(a.quantity))
            break;
    }
    for(let i = 0; i < mergeObj.length; i++) {
        orderHtml += `
        <tr>
        <td>${i + 1}</td>
        <td><div class="prod-img-title"><img class="prd-img-tbl" src="${mergeObj[i].img}" alt=""><p>${mergeObj[i].title}</p></div></td>
        <td>${mergeObj[i].quantity}</td>
        <td>${vnd(mergeObj[i].doanhthu)}</td>
        <td><button class="btn-detail product-order-detail" data-id="${mergeObj[i].id}"><i class="fa-regular fa-eye"></i> Chi tiết</button></td>
        </tr>      
        `;
    }
    document.getElementById("showTk").innerHTML = orderHtml;
    document.querySelectorAll(".product-order-detail").forEach(item => {
        let idProduct = item.getAttribute("data-id");
        item.addEventListener("click", () => {           
            detailOrderProduct(arr,idProduct);
        })
    })
}

showThongKe(createObj())

function mergeObjThongKe(arr) {
    let result = [];
    arr.forEach(item => {
        let check = result.find(i => i.id == item.id) // Không tìm thấy gì trả về undefined

        if(check){
            check.quantity = parseInt(check.quantity)  + parseInt(item.quantity);
            check.doanhthu += parseInt(item.price) * parseInt(item.quantity);
        } else {
            const newItem = {...item}
            newItem.doanhthu = newItem.price * newItem.quantity;
            result.push(newItem);
        }
        
    });
    return result;
}

function detailOrderProduct(arr,id) {
    let orderHtml = "";
    arr.forEach(item => {
        if(item.id == id) {
            orderHtml += `<tr>
            <td>${item.madon}</td>
            <td>${item.quantity}</td>
            <td>${vnd(item.price)}</td>
            <td>${formatDate(item.time)}</td>
            </tr>      
            `;
        }
    });
    document.getElementById("show-product-order-detail").innerHTML = orderHtml
    document.querySelector(".modal.detail-order-product").classList.add("open")
}

// User
let addAccount = document.getElementById('signup-button');
let updateAccount = document.getElementById("btn-update-account")

document.querySelector(".modal.signup .modal-close").addEventListener("click",() => {
    signUpFormReset();
})

function openCreateAccount() {
    document.querySelector(".signup").classList.add("open");
    document.querySelectorAll(".edit-account-e").forEach(item => {
        item.style.display = "none"
    })
    document.querySelectorAll(".add-account-e").forEach(item => {
        item.style.display = "block"
    })
}

function signUpFormReset() {
    document.getElementById('fullname').value = ""
    document.getElementById('phone').value = ""
    document.getElementById('password').value = ""
    document.querySelector('.form-message-name').innerHTML = '';
    document.querySelector('.form-message-phone').innerHTML = '';
    document.querySelector('.form-message-password').innerHTML = '';
}

function showUserArr(arr) {
    let accountHtml = '';
    if(arr.length == 0) {
        accountHtml = `<td colspan="5">Không có dữ liệu</td>`
    } else {
        arr.forEach((account, index) => {
            let tinhtrang = account.status == 0 ? `<span class="status-no-complete">Bị khóa</span>` : `<span class="status-complete">Hoạt động</span>`;
            accountHtml += ` <tr>
            <td>${index + 1}</td>
            <td>${account.fullname}</td>
            <td>${account.phone}</td>
            <td>${formatDate(account.join)}</td>
            <td>${tinhtrang}</td>
            <td class="control control-table">
            <button class="btn-edit" id="edit-account" onclick='editAccount(${account.phone})' ><i class="fa-light fa-pen-to-square"></i></button>
            <button class="btn-delete" id="delete-account" onclick="deleteAcount(${index})"><i class="fa-regular fa-trash"></i></button>
            </td>
        </tr>`
        })
    }
    document.getElementById('show-user').innerHTML = accountHtml;
}

function showUser() {
    let tinhTrang = parseInt(document.getElementById("tinh-trang-user").value);
    let ct = document.getElementById("form-search-user").value.trim();
    let timeStart = document.getElementById("time-start-user").value;
    let timeEnd = document.getElementById("time-end-user").value;

    // Kiểm tra thời gian hợp lệ
    if (timeStart && timeEnd && timeEnd < timeStart) {
        alert("Thời gian kết thúc phải lớn hơn hoặc bằng thời gian bắt đầu!");
        return;
    }

    // Lấy danh sách user (chỉ user thường - userType == 0)
    let accounts = localStorage.getItem("accounts") 
        ? JSON.parse(localStorage.getItem("accounts")).filter(item => item.userType == 0) 
        : [];

    // Lọc theo tình trạng
    let result = accounts;
    if (tinhTrang !== 2) {
        result = result.filter(item => item.status === tinhTrang);
    }

    // Lọc theo từ khóa tìm kiếm (họ tên hoặc số điện thoại)
    if (ct) {
        const searchLower = ct.toLowerCase();
        result = result.filter(item => 
            item.fullname.toLowerCase().includes(searchLower) || 
            item.phone.toString().includes(ct)
        );
    }

    // Xử lý lọc theo thời gian tham gia (join)
    if (timeStart || timeEnd) {
        const startDate = timeStart ? new Date(timeStart) : null;
        const endDate = timeEnd ? new Date(timeEnd) : null;

        if (startDate) startDate.setHours(0, 0, 0, 0);
        if (endDate) endDate.setHours(23, 59, 59, 999);

        result = result.filter(item => {
            const joinDate = new Date(item.join);
            if (isNaN(joinDate)) return false; // Bỏ qua nếu ngày không hợp lệ

            const afterStart = !startDate || joinDate >= startDate;
            const beforeEnd = !endDate || joinDate <= endDate;
            return afterStart && beforeEnd;
        });
    }

    // Hiển thị kết quả
    showUserArr(result);
}

function cancelSearchUser() {
    let accounts = localStorage.getItem("accounts") ? JSON.parse(localStorage.getItem("accounts")).filter(item => item.userType == 0) : [];
    showUserArr(accounts);
    document.getElementById("tinh-trang-user").value = 2;
    document.getElementById("form-search-user").value = "";
    document.getElementById("time-start-user").value = "";
    document.getElementById("time-end-user").value = "";
}

window.onload = showUser();

function deleteAcount(phone) {
    let accounts = JSON.parse(localStorage.getItem('accounts'));
    let index = accounts.findIndex(item => item.phone == phone);
    if (confirm("Bạn có chắc muốn xóa?")) {
        accounts.splice(index, 1)
    }
    localStorage.setItem("accounts", JSON.stringify(accounts));
    showUser();
}

let indexFlag;
function editAccount(phone) {
    document.querySelector(".signup").classList.add("open");
    document.querySelectorAll(".add-account-e").forEach(item => {
        item.style.display = "none"
    })
    document.querySelectorAll(".edit-account-e").forEach(item => {
        item.style.display = "block"
    })
    let accounts = JSON.parse(localStorage.getItem("accounts"));
    let index = accounts.findIndex(item => {
        return item.phone == phone
    })
    indexFlag = index;
    document.getElementById("fullname").value = accounts[index].fullname;
    document.getElementById("phone").value = accounts[index].phone;
    document.getElementById("password").value = accounts[index].password;
    document.getElementById("user-status").checked = accounts[index].status == 1 ? true : false;
}

updateAccount.addEventListener("click", (e) => {
    e.preventDefault();
    let accounts = JSON.parse(localStorage.getItem("accounts"));
    let fullname = document.getElementById("fullname").value;
    let phone = document.getElementById("phone").value;
    let password = document.getElementById("password").value;
    if(fullname == "" || phone == "" || password == "") {
        toast({ title: 'Chú ý', message: 'Vui lòng nhập đầy đủ thông tin !', type: 'warning', duration: 3000 });
    } else {
        accounts[indexFlag].fullname = document.getElementById("fullname").value;
        accounts[indexFlag].phone = document.getElementById("phone").value;
        accounts[indexFlag].password = document.getElementById("password").value;
        accounts[indexFlag].status = document.getElementById("user-status").checked ? true : false;
        localStorage.setItem("accounts", JSON.stringify(accounts));
        toast({ title: 'Thành công', message: 'Thay đổi thông tin thành công !', type: 'success', duration: 3000 });
        document.querySelector(".signup").classList.remove("open");
        signUpFormReset();
        showUser();
    }
})

addAccount.addEventListener("click", (e) => {
    e.preventDefault();

    let fullNameUser = document.getElementById('fullname').value.trim();

    // Reset tất cả thông báo lỗi
    document.querySelectorAll('.form-message-name, .form-message-phone, .form-message-password').forEach(el => {
        el.innerHTML = '';
    });

    let isValid = true;

    // === CHỈ KIỂM TRA HỌ VÀ TÊN ===
    if (fullNameUser.length === 0) {
        document.querySelector('.form-message-name').innerHTML = 'Vui lòng nhập họ và tên';
        document.getElementById('fullname').focus();
        isValid = false;
    } else if (fullNameUser.length < 3) {
        document.querySelector('.form-message-name').innerHTML = 'Tên phải ít nhất 3 ký tự';
        document.getElementById('fullname').value = '';
        isValid = false;
    }

    // === BỎ HẾT VALIDATE SỐ ĐIỆN THOẠI & MẬT KHẨU ===

    // === XỬ LÝ KẾT QUẢ ===
    if (isValid) {
        // GIẢ LẬP THÀNH CÔNG – KHÔNG LƯU
        toast({ 
            title: 'Thành công', 
            message: 'Tạo thành công tài khoản !', 
            type: 'success', 
            duration: 3000 
        });

        // Đóng popup + reset form
        document.querySelector(".signup").classList.remove("open");
        signUpFormReset();
    } else {
        // Nếu thiếu tên → cảnh báo
        toast({ 
            title: 'Cảnh báo !', 
            message: 'Vui lòng nhập đầy đủ họ và tên!', 
            type: 'error', 
            duration: 3000 
        });
    }

    // KHÔNG LƯU, KHÔNG RELOAD, KHÔNG GÌ HẾT
});

document.getElementById("logout-acc").addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem("currentuser");
    window.location = "./index.html";
})

/* ==================== QUẢN LÝ GIÁ BÁN - PHIÊN BẢN HOÀN CHỈNH CUỐI CÙNG ==================== */

function formatVND(price) {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
}

function formatVNDNumber(num) {
    if (!num && num !== 0) return '';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function parseVNDNumber(str) {
    if (!str) return 0;
    return parseInt(str.replace(/\./g, '')) || 0;
}

function calculatePrice(cost, profitRate) {
    return Math.round(cost * (1 + profitRate / 100));
}

// Render danh sách + format input
function renderPriceList(products) {
    let html = '';
    if (products.length === 0) {
        html = `<div class="no-result"><div class="no-result-i"><i class="fa-light fa-face-sad-cry"></i></div><div class="no-result-h">Không có sản phẩm để hiển thị</div></div>`;
    } else {
        products.forEach(p => {
            const costDisplay = p.costPrice ? formatVNDNumber(p.costPrice) : '';
            html += `
            <div class="list" data-id="${p.id}">
                <div class="list-left">
                    <img src="${p.img}" alt="">
                    <div class="list-info">
                        <h4>${p.title}</h4>
                        <span class="list-category">${p.category}</span>
                    </div>
                </div>
                <div class="list-right price-input-group">
                    <div class="price-input-wrapper">
                        <div class="price-input-label">Giá vốn</div>
                        <input type="text" class="cost-price" value="${costDisplay}" data-raw="${p.costPrice || 0}" placeholder="0" readonly>
                    </div>
                    <div class="price-input-wrapper">
                        <div class="price-input-label">% Lợi nhuận</div>
                        <input type="number" class="profit-rate" value="${p.profitRate || 0}" min="0" max="1000" step="0.1">
                    </div>
                    <div class="price-input-wrapper">
                        <div class="price-input-label">Giá bán</div>
                        <input type="text" class="selling-price" value="${formatVND(p.price)}" readonly>
                    </div>
                </div>
            </div>`;
        });
    }
    document.getElementById('price-product-list').innerHTML = html;
    applyPriceInputFormatting(); // Gọi format ngay
}

// Format + tính realtime
function applyPriceInputFormatting() {
    document.querySelectorAll('#price-product-list .cost-price').forEach(input => {
        // Đảm bảo data-raw luôn đúng
        if (!input.hasAttribute('data-raw')) {
            const raw = parseVNDNumber(input.value);
            input.setAttribute('data-raw', raw);
            input.value = formatVNDNumber(raw);
        }

        input.addEventListener('input', function(e) {
            let digits = e.target.value.replace(/\D/g, '');
            e.target.setAttribute('data-raw', digits);
            e.target.value = formatVNDNumber(digits);
            triggerPriceCalculation(e.target);
        });

        input.addEventListener('blur', function() {
            let digits = this.getAttribute('data-raw') || '0';
            this.value = formatVNDNumber(digits);
            triggerPriceCalculation(this);
        });
    });

    document.querySelectorAll('#price-product-list .profit-rate').forEach(input => {
        input.addEventListener('input', () => triggerPriceCalculation(input));
    });
}

function triggerPriceCalculation(triggeredInput) {
    const row = triggeredInput.closest('.list');
    if (!row) return;

    const costRaw = parseVNDNumber(row.querySelector('.cost-price').getAttribute('data-raw'));
    const profitRate = parseFloat(row.querySelector('.profit-rate').value) || 0;
    const newPrice = calculatePrice(costRaw, profitRate);
    row.querySelector('.selling-price').value = formatVND(newPrice);
}

// Hiển thị + phân trang
function displayPriceList(productAll, perPage, currentPage) {
    let start = (currentPage - 1) * perPage;
    let end = start + perPage;
    let productShow = productAll.slice(start, end);
    renderPriceList(productShow);
}

function setupPricePagination(productAll, perPage) {
    const pageList = document.getElementById('price-page-nav');
    pageList.innerHTML = '';
    let page_count = Math.ceil(productAll.length / perPage);
    for (let i = 1; i <= page_count; i++) {
        let li = document.createElement('li');
        li.classList.add('page-nav-item');
        if (i === priceCurrentPage) li.classList.add('active');
        li.innerHTML = `<a href="#">${i}</a>`;
        li.addEventListener('click', () => {
            priceCurrentPage = i;
            displayPriceList(productAll, perPage, priceCurrentPage);
            document.querySelectorAll('#price-page-nav .page-nav-item').forEach(n => n.classList.remove('active'));
            li.classList.add('active');
        });
        pageList.appendChild(li);
    }
}

function showPriceManagement(reset = false) {
    if (reset) {
        document.getElementById('price-search').value = '';
        document.getElementById('price-the-loai').value = 'Tất cả';
    }

    const search = document.getElementById('price-search').value.toLowerCase();
    const categoryFilter = document.getElementById('price-the-loai').value;
    let products = JSON.parse(localStorage.getItem('products') || '[]');

    let filtered = products.filter(p => p.status == 1);
    if (categoryFilter !== 'Tất cả') filtered = filtered.filter(p => p.category === categoryFilter);
    if (search) filtered = filtered.filter(p => p.title.toLowerCase().includes(search));

    // Render theo sub-tab hiện tại
    const activeTab = document.querySelector('.sub-tab-btn.active').dataset.tab;
    if (activeTab === 'by-category') {
        renderCategoryProfits();
        document.getElementById('tab-by-category').style.display = 'block';
        document.getElementById('tab-by-product').style.display = 'none';
    } else {
        renderPriceList(filtered); // hàm cũ của bạn
        document.getElementById('tab-by-category').style.display = 'none';
        document.getElementById('tab-by-product').style.display = 'block';
        setupPricePagination(filtered);
    }
}

// Sub-tab switching
document.querySelectorAll('.sub-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.sub-tab-btn').forEach(b => {
            b.classList.remove('active');
            b.style.color = '#666';
            b.style.borderBottom = 'none';
        });
        btn.classList.add('active');
        btn.style.color = '#d32f2f';
        btn.style.borderBottom = '3px solid #d32f2f';

        showPriceManagement(); // reload nội dung
    });
});

function saveCategoryProfit(category) {
    const input = document.querySelector(`.category-profit[data-category="${category}"]`);
    if (input) {
        categoryProfits[category] = parseInt(input.value) || 100;
        localStorage.setItem('categoryProfits', JSON.stringify(categoryProfits));
        toast({ title: "Success", message: "Lưu % lợi nhuận cho loại món thành công!", type: "success", duration: 3000 });
    }
}

function loadCategoryProfits() {
    categoryProfits = JSON.parse(localStorage.getItem('categoryProfits')) || {};
    document.querySelectorAll('.category-profit').forEach(input => {
        const cat = input.dataset.category;
        input.value = categoryProfits[cat] || 100;
    });
}

function renderCategoryProfits() {
    const container = document.getElementById('category-profit-list');
    const categories = ['Món chay', 'Món mặn', 'Món lẩu', 'Món ăn vặt', 'Món tráng miệng', 'Nước uống'];
    
    let html = '<table style="width:100%; border-collapse: collapse;">';
    html += '<tr style="background:#f0f0f0;"><th style="padding:10px; text-align:left;">Danh mục</th><th style="padding:10px; text-align:center;">Tỷ lệ lợi nhuận (%)</th><th style="padding:10px; text-align:center;">Thao tác</th></tr>';
    
    categories.forEach(cat => {
        const rate = categoryProfits[cat] || 100;
        html += `
        <tr style="border-bottom:1px solid #eee;">
            <td style="padding:10px;">${cat}</td>
            <td style="padding:10px; text-align:center;">
                <input type="number" value="${rate}" min="0" style="width:80px; text-align:center;" 
                       onchange="categoryProfits['${cat}'] = this.value; localStorage.setItem('categoryProfits', JSON.stringify(categoryProfits));">
            </td>
            <td style="padding:10px; text-align:center;">
                <button onclick="saveSingleCategory('${cat}')" style="background:#4caf50; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">
                    Lưu
                </button>
            </td>
        </tr>`;
    });
    html += '</table>';
    container.innerHTML = html;
}

function saveSingleCategory(cat) {
    const input = document.querySelector(`input[onchange*="categoryProfits['${cat}']"]`);
    if (input) {
        categoryProfits[cat] = parseInt(input.value) || 100;
        localStorage.setItem('categoryProfits', JSON.stringify(categoryProfits));
        toast({ title: "Success", message: `Đã lưu tỷ lệ lợi nhuận cho ${cat}!`, type: "success", duration: 2000 });
    }
}

// === CHỈ 1 EVENT LISTENER DUY NHẤT ===
const saveAllBtn = document.getElementById('save-all-prices');
if (saveAllBtn) {
    saveAllBtn.replaceWith(saveAllBtn.cloneNode(true)); // Xóa hết listener cũ
    document.getElementById('save-all-prices').addEventListener('click', () => {
        let products = JSON.parse(localStorage.getItem('products') || '[]');
        document.querySelectorAll('#price-product-list .list').forEach(row => {
            const id = parseInt(row.dataset.id);
            const costRaw = parseVNDNumber(row.querySelector('.cost-price').getAttribute('data-raw'));
            const profitRate = parseFloat(row.querySelector('.profit-rate').value) || 0;
            const price = calculatePrice(costRaw, profitRate);

            const product = products.find(p => p.id === id);
            if (product) {
                product.costPrice = costRaw;
                product.profitRate = profitRate;
                product.price = price;
            }
        });
        localStorage.setItem('products', JSON.stringify(products));
        toast({ title: 'Thành công', message: 'Đã lưu tất cả giá bán!', type: 'success', duration: 3000 });
    });
}

// Load khi chuyển tab
document.querySelectorAll('.sidebar-list-item.tab-content')[5].addEventListener('click', () => {
    setTimeout(showPriceManagement, 100);
});

/* ==================== QUẢN LÝ NHẬP HÀNG - PHIÊN BẢN HOÀN CHỈNH ==================== */

let importBills = JSON.parse(localStorage.getItem('importBills')) || [];
let importCurrentPage = 1;
const importPerPage = 10;

// Tạo ID phiếu nhập
function generateImportCode() {
    const now = new Date();
    const dateStr = now.toISOString().slice(2, 10).replace(/-/g, '');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `PN${dateStr}${random}`;
}

// Format số có dấu chấm
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Parse số từ chuỗi có dấu chấm
function parseNumber(str) {
    return parseInt(str.replace(/\./g, '')) || 0;
}

// Load danh sách phiếu
function showImportBills() {
    let from = document.getElementById('import-search-from').value;
    let to = document.getElementById('import-search-to').value;
    let filtered = importBills;

    if (from && to && from > to) {
        toast({ title: 'Lỗi', message: 'Ngày bắt đầu không được lớn hơn ngày kết thúc!', type: 'error', duration: 3000 });
        return;
    }

    if (from) filtered = filtered.filter(b => b.date >= from);
    if (to) filtered = filtered.filter(b => b.date <= to);

    const start = (importCurrentPage - 1) * importPerPage;
    const end = start + importPerPage;
    const pageBills = filtered.slice(start, end);

    let html = '';
    if (pageBills.length === 0) {
        html = `<tr><td colspan="6" style="text-align:center;">Không có phiếu nhập</td></tr>`;
    } else {
        pageBills.forEach((bill, idx) => {
            const totalQty = bill.items.reduce((s, i) => s + i.quantity, 0);
            html += `
            <tr>
                <td>${start + idx + 1}</td>
                <td>${bill.code}</td>
                <td>${formatDate(bill.date)}</td>
                <td>${totalQty}</td>
                <td>${vnd(bill.totalValue)}</td>
                <td class="control">
                    <button class="btn-detail" onclick="viewImportBill('${bill.code}')"><i class="fa-regular fa-eye"></i></button>
                </td>
            </tr>`;
        });
    }
    document.getElementById('import-bill-list').innerHTML = html;
    setupImportPagination(filtered);
}

function setupImportPagination(bills) {
    const nav = document.getElementById('import-page-nav');
    nav.innerHTML = '';
    const pages = Math.ceil(bills.length / importPerPage);
    for (let i = 1; i <= pages; i++) {
        const li = document.createElement('li');
        li.className = 'page-nav-item';
        if (i === importCurrentPage) li.classList.add('active');
        li.innerHTML = `<a href="#">${i}</a>`;
        li.onclick = () => {
            importCurrentPage = i;
            showImportBills();
        };
        nav.appendChild(li);
    }
}

function resetImportSearch() {
    document.getElementById('import-search-from').value = '';
    document.getElementById('import-search-to').value = '';
    importCurrentPage = 1;
    showImportBills();
}

// Mở modal thêm phiếu
document.getElementById('btn-add-import')?.addEventListener('click', () => {
    const modal = document.querySelector('.import-bill-modal');
    modal.classList.add('open');

    // Set ngày + mã
    document.getElementById('import-date').value = new Date().toISOString().slice(0, 10);
    document.getElementById('import-code').value = generateImportCode();

    // Reset danh sách với tiêu đề
    document.getElementById('import-items-container').innerHTML = `
        <div class="import-header-row">
            <div class="header-cell">Tên món</div>
            <div class="header-cell">Số lượng</div>
            <div class="header-cell">Giá nhập</div>
            <div class="header-cell">Thành tiền</div>
            <div class="header-cell"></div>
        </div>
    `;
    updateImportSummary();

    // Load sản phẩm vào dropdown
    loadProductOptions();
});

// Load sản phẩm vào dropdown
function loadProductOptions() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const activeProducts = products.filter(p => p.status == 1);
    window.importProductList = activeProducts;
}

// Thêm dòng sản phẩm
document.getElementById('btn-add-import-item')?.addEventListener('click', () => {
    const container = document.getElementById('import-items-container');
    const index = container.querySelectorAll('.import-item-row').length;

    const row = document.createElement('div');
    row.className = 'import-item-row';
    row.innerHTML = `
        <select class="import-product-select" data-index="${index}">
            <option value="">-- Chọn sản phẩm --</option>
            ${window.importProductList.map(p => `<option value="${p.id}" data-price="${p.costPrice || 0}">${p.title}</option>`).join('')}
        </select>
        <input type="text" class="import-quantity" placeholder="SL" min="1" value="1">
        <input type="text" class="import-price" placeholder="Giá nhập" min="0" value="0">
        <input type="text" class="import-total" readonly placeholder="Thành tiền">
        <button type="button" class="btn-remove-item"><i class="fa-regular fa-trash"></i></button>
    `;
    container.appendChild(row);

    const qtyInput = row.querySelector('.import-quantity');
    const priceInput = row.querySelector('.import-price');

    qtyInput.oninput = () => formatInputNumber(qtyInput, updateImportRow);
    priceInput.oninput = () => formatInputNumber(priceInput, updateImportRow);

    row.querySelector('.import-product-select').onchange = updateImportRow;
    row.querySelector('.btn-remove-item').onclick = () => {
        row.remove();
        updateImportSummary();
    };

    updateImportRow({ target: qtyInput });
});

// Format input số: loại bỏ 0 đầu, thêm dấu chấm
function formatInputNumber(input, callback) {
    let value = input.value.replace(/\D/g, '');
    if (value === '') value = '0';
    if (value !== '0' && value.startsWith('0')) value = value.replace(/^0+/, '');
    input.value = formatNumber(value);
    if (callback) callback({ target: input });
}

// Cập nhật dòng
function updateImportRow(e) {
    const row = e.target.closest('.import-item-row');
    if (!row) return;

    const qty = parseNumber(row.querySelector('.import-quantity').value) || 0;
    const price = parseNumber(row.querySelector('.import-price').value) || 0;
    const total = qty * price;
    row.querySelector('.import-total').value = total > 0 ? vnd(total) : '';
    updateImportSummary();
}

// Cập nhật tổng
function updateImportSummary() {
    const rows = document.querySelectorAll('.import-item-row');
    let totalQty = 0, totalValue = 0;

    rows.forEach(row => {
        const qty = parseNumber(row.querySelector('.import-quantity').value) || 0;
        const price = parseNumber(row.querySelector('.import-price').value) || 0;
        totalQty += qty;
        totalValue += qty * price;
    });

    document.getElementById('total-items').textContent = totalQty; // Tổng SL
    document.getElementById('total-value').textContent = vnd(totalValue);
}

/*
// Lưu phiếu nhập
document.getElementById('btn-save-import')?.addEventListener('click', () => {
    const code = document.getElementById('import-code').value;
    const date = document.getElementById('import-date').value;
    const rows = document.querySelectorAll('.import-item-row');
    const items = [];

    let valid = true;
    rows.forEach(row => {
        const pid = row.querySelector('.import-product-select').value;
        const qty = parseNumber(row.querySelector('.import-quantity').value) || 0;
        const price = parseNumber(row.querySelector('.import-price').value) || 0;
        if (pid && qty > 0 && price >= 0) {
            items.push({ productId: parseInt(pid), quantity: qty, importPrice: price });
        } else if (pid || qty > 0 || price > 0) {
            valid = false;
        }
    });

    if (!valid || items.length === 0) {
        toast({ title: 'Lỗi', message: 'Vui lòng nhập đầy đủ thông tin!', type: 'error', duration: 3000 });
        return;
    }

    const totalValue = items.reduce((sum, i) => sum + i.quantity * i.importPrice, 0);

    const bill = { code, date, items, totalValue };
    importBills.push(bill);
    localStorage.setItem('importBills', JSON.stringify(importBills));

    // CẬP NHẬT TỒN KHO
    let products = JSON.parse(localStorage.getItem('products')) || [];
    items.forEach(item => {
        const p = products.find(pr => pr.id === item.productId);
        if (p) {
            p.quantity = (p.quantity || 0) + item.quantity;
            p.costPrice = item.importPrice;
        }
    });
    localStorage.setItem('products', JSON.stringify(products));

    toast({ title: 'Thành công', message: 'Nhập hàng thành công! Tồn kho đã cập nhật.', type: 'success', duration: 3000 });
    closeImportModal();
    showImportBills();
    if (document.querySelector('.section.product-all.active')) showProduct();
}); */

document.getElementById('btn-save-import')?.addEventListener('click', () => {
    // === BỎ TẤT CẢ KIỂM TRA & XỬ LÝ DỮ LIỆU ===
    // Không đọc code, date, rows, items...
    // Không validate, không tính tổng...

    // === GIẢ LẬP THÀNH CÔNG ===
    toast({ 
        title: 'Thành công', 
        message: 'Nhập hàng thành công!', 
        type: 'success', 
        duration: 3000 
    });

    // === ĐÓNG MODAL ===
    closeImportModal();

    // === KHÔNG LÀM GÌ KHÁC ===
    // Không lưu importBills
    // Không cập nhật products.quantity
    // Không gọi showImportBills()
    // Không gọi showProduct()
});

// Đóng modal
function closeImportModal() {
    document.querySelector('.import-bill-modal').classList.remove('open');
}
document.querySelector('.import-close')?.addEventListener('click', closeImportModal);

// Xem chi tiết phiếu nhập - ĐÚNG THỨ TỰ: Tên | SL | Giá nhập | Thành tiền
function viewImportBill(code) {
    const bill = importBills.find(b => b.code === code);
    if (!bill) return;

    document.getElementById('detail-code').textContent = bill.code;
    document.getElementById('detail-date').textContent = formatDate(bill.date);

    let itemsHtml = '';
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    bill.items.forEach(item => {
        const p = products.find(pr => pr.id === item.productId);
        const name = p?.title || 'Sản phẩm không tồn tại';
        const qty = item.quantity;
        const price = item.importPrice;
        const total = qty * price;
        
        itemsHtml += `
            <tr>
                <td class="product-name">${name}</td>
                <td>${qty}</td>
                <td>${vnd(price)}</td>
                <td>${vnd(total)}</td>
            </tr>`;
    });
    document.getElementById('detail-items').innerHTML = itemsHtml;

    // Tổng số sản phẩm = tổng SL
    const totalQty = bill.items.reduce((s, i) => s + i.quantity, 0);
    document.getElementById('detail-total').textContent = 
        `${totalQty} sản phẩm - Tổng: ${vnd(bill.totalValue)}`;

    document.querySelector('.import-detail-modal').classList.add('open');
}

// Đóng modal chi tiết
document.querySelector('.import-detail-close')?.addEventListener('click', () => {
    document.querySelector('.import-detail-modal').classList.remove('open');
});

// Tự động load khi vào tab
document.querySelectorAll('.sidebar-list-item.tab-content').forEach((tab, i) => {
    if (tab.querySelector('.hidden-sidebar')?.textContent.includes('Quản lý nhập hàng')) {
        tab.addEventListener('click', () => {
            setTimeout(() => {
                importCurrentPage = 1;
                showImportBills();
            }, 100);
        });
    }
});

// SỬA DỮ LIỆU CŨ: ĐẢM BẢO items có đúng cấu trúc {productId, quantity, importPrice}
function fixImportBillsData() {
    let changed = false;
    importBills = importBills.map(bill => {
        if (!bill.items || !Array.isArray(bill.items)) return bill;

        const newItems = bill.items.map(item => {
            // Nếu dữ liệu cũ bị sai thứ tự: [productId, quantity, importPrice] → OK
            // Nếu bị đảo: [productId, importPrice, quantity] → SỬA
            if (typeof item === 'object' && item.productId && item.importPrice !== undefined && item.quantity !== undefined) {
                return item; // Đã đúng
            }

            // Giả sử dữ liệu cũ: [id, qty, price] hoặc [id, price, qty]
            if (Array.isArray(item) && item.length >= 3) {
                const [id, a, b] = item;
                // Nếu a < 1000 → có thể là qty, b là giá
                if (a <= 1000 && b >= 1000) {
                    changed = true;
                    return { productId: id, quantity: a, importPrice: b };
                } else {
                    changed = true;
                    return { productId: id, quantity: b, importPrice: a };
                }
            }
            return item;
        }).filter(Boolean);

        const totalValue = newItems.reduce((sum, i) => sum + i.quantity * i.importPrice, 0);
        return { ...bill, items: newItems, totalValue };
    });

    if (changed) {
        localStorage.setItem('importBills', JSON.stringify(importBills));
        toast({ title: 'Đã sửa', message: 'Dữ liệu nhập hàng cũ đã được cập nhật!', type: 'success', duration: 4000 });
    }
}

// GỌI HÀM KHI LOAD TRANG
document.addEventListener('DOMContentLoaded', () => {
    importBills = JSON.parse(localStorage.getItem('importBills')) || [];
    fixImportBillsData();
    showImportBills();
});

// Tìm kiếm nâng cao: toggle panel
document.getElementById('btn-advanced-search')?.addEventListener('click', () => {
    const panel = document.getElementById('advanced-search-panel');
    const btn = document.getElementById('btn-advanced-search');
    const isOpen = panel.style.display === 'flex';

    panel.style.display = isOpen ? 'none' : 'flex';
    btn.innerHTML = isOpen 
        ? `<i class="fa-light fa-sliders"></i> Tìm nâng cao` 
        : `<i class="fa-light fa-xmark"></i> Đóng`;
    btn.style.background = isOpen ? '#d32f2f' : '#b71c1c';
});

// CẬP NHẬT LẠI HÀM showImportBills() – TÌM THEO MÃ PHIẾU
function showImportBills() {
    let code = document.getElementById('import-search-code')?.value.trim().toUpperCase() || '';
    let from = document.getElementById('import-search-from')?.value || '';
    let to = document.getElementById('import-search-to')?.value || '';
    let filtered = importBills;

    // Tìm theo mã phiếu
    if (code) {
        filtered = filtered.filter(b => b.code.includes(code));
    }

    // Lọc theo ngày
    if (from && to && from > to) {
        toast({ title: 'Lỗi', message: 'Ngày bắt đầu không được lớn hơn ngày kết thúc!', type: 'error', duration: 3000 });
        return;
    }

    if (from) filtered = filtered.filter(b => b.date >= from);
    if (to) filtered = filtered.filter(b => b.date <= to);

    const start = (importCurrentPage - 1) * importPerPage;
    const end = start + importPerPage;
    const pageBills = filtered.slice(start, end);

    let html = '';
    if (pageBills.length === 0) {
        html = `<tr><td colspan="6" style="text-align:center; padding: 40px; color: #b71c1c;">
                    <i class="fa-light fa-face-sad-cry" style="font-size: 2em; margin-bottom: 10px; display: block;"></i>
                    Không tìm thấy phiếu nhập nào
                </td></tr>`;
    } else {
        pageBills.forEach((bill, idx) => {
            const totalQty = bill.items.reduce((s, i) => s + i.quantity, 0);
            html += `
            <tr>
                <td>${start + idx + 1}</td>
                <td><strong>${bill.code}</strong></td>
                <td>${formatDate(bill.date)}</td>
                <td>${totalQty}</td>
                <td style="color: #d32f2f; font-weight: 600;">${vnd(bill.totalValue)}</td>
                <td class="control">
                    <button class="btn-detail" onclick="viewImportBill('${bill.code}')">
                        <i class="fa-regular fa-eye"></i>
                    </button>
                </td>
            </tr>`;
        });
    }
    document.getElementById('import-bill-list').innerHTML = html;
    setupImportPagination(filtered);
}

// Reset tìm kiếm
function resetImportSearch() {
    document.getElementById('import-search-code').value = '';
    document.getElementById('import-search-from').value = '';
    document.getElementById('import-search-to').value = '';
    document.getElementById('advanced-search-panel').style.display = 'none';
    document.getElementById('btn-advanced-search').innerHTML = `<i class="fa-light fa-sliders"></i> Tìm nâng cao`;
    document.getElementById('btn-advanced-search').style.background = '#d32f2f';
    importCurrentPage = 1;
    showImportBills();
}

/* ==================== QUẢN LÝ TỒN KHO ==================== */
let inventoryCurrentPage = 1;
let inventoryAlertPage = 1;
const inventoryPerPage = 12;
const MIN_QUANTITY = 10;

// === RENDER DANH SÁCH CARD ===
function renderInventoryList(products) {
    const container = document.getElementById('inventory-product-list');
    let html = '';
    if (products.length === 0) {
        html = `<div class="no-result"><div class="no-result-i"><i class="fa-light fa-face-sad-cry"></i></div><div class="no-result-h">Không có sản phẩm để hiển thị</div></div>`;
    } else {
        products.forEach(p => {
            const qty = p.quantity || 0;
            const statusClass = qty === 0 ? 'status-out' : (qty <= 10 ? 'status-low' : 'status-normal');
            const statusText = qty === 0 ? 'Hết hàng' : (qty <= 10 ? 'Sắp hết hàng' : 'Bình thường');
            const statusIcon = qty === 0 ? 'fa-times-circle' : (qty <= 10 ? 'fa-exclamation-triangle' : 'fa-check-circle');
            html += `
            <div class="list">
                <div class="list-left">
                    <img src="${p.img}" alt="">
                    <div class="list-info">
                        <h4>${p.title}</h4>
                        <span class="list-category">${p.category}</span>
                    </div>
                </div>
                <div class="list-center inventory-quantity">
                    <span class="quantity-value">${qty}</span>
                </div>
                <div class="list-right inventory-status ${statusClass}">
                    <span class="status-label"><i class="fa-solid ${statusIcon}"></i> ${statusText}</span>
                </div>
            </div>`;
        });
    }
    container.innerHTML = html;
}

function renderInventoryAlert(products) {
    const tbody = document.getElementById('inventory-alert-body');
    const noAlert = document.getElementById('no-alert');
    tbody.innerHTML = '';

    const lowStock = products.filter(p => (p.quantity || 0) <= MIN_QUANTITY);
    
    if (lowStock.length === 0) {
        noAlert.style.display = 'block';
        return;
    }
    noAlert.style.display = 'none';

    lowStock.forEach((p, i) => {
        const qty = p.quantity || 0;
        const isOut = qty === 0;
        const statusColor = isOut ? '#f44336' : '#ff9800';
        const statusText = isOut ? 'Hết hàng' : 'Sắp hết hàng';
        const icon = isOut ? 'fa-times-circle' : 'fa-exclamation-triangle';

        const row = document.createElement('tr');
        row.style.borderBottom = '1px solid #f0f0f0';
        row.innerHTML = `
            <td style="padding: 12px;">${i + 1}</td>
            <td style="padding: 12px; display: flex; align-items: center; gap: 12px;">
                <img src="${p.img}" style="width: 44px; height: 44px; object-fit: cover; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.2);">
                <span style="font-weight: 500;">${p.title}</span>
            </td>
            <td style="padding: 12px;">${p.category}</td>
            <td style="padding: 12px; text-align: center; font-weight: 600; font-size: 15px;">${qty}</td>
            <td style="padding: 12px; text-align: center;">
                <span style="background: ${statusColor}20; color: ${statusColor}; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; display: inline-flex; align-items: center; gap: 5px; min-width: 100px; justify-content: center;">
                    <i class="fa-solid ${icon}"></i> ${statusText}
                </span>
            </td>
            <td style="padding: 12px; text-align: center;">
                <button onclick="handleImportProduct(${p.id})" style="background: linear-gradient(135deg, #ff9800, #f57c00); color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 4px rgba(255,152,0,0.3);">
                    Nhập hàng
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function handleImportProduct(productId) {
    // Switch đến tab Quản lý nhập hàng (giả định sidebar item có text 'Quản lý nhập hàng')
    const importTab = Array.from(document.querySelectorAll('.sidebar-list-item.tab-content'))
        .find(tab => tab.textContent.includes('Quản lý nhập hàng'));
    
    if (importTab) {
        importTab.click();
        // Optional: Set productId để tự động chọn sản phẩm trong tab nhập hàng (nếu bạn có logic)
        localStorage.setItem('importProductId', productId); // Để dùng trong tab nhập hàng nếu cần
        toast({ title: "Info", message: "Chuyển đến quản lý nhập hàng cho sản phẩm ID: " + productId, type: "info", duration: 3000 });
    } else {
        toast({ title: "Error", message: "Không tìm thấy tab Quản lý nhập hàng!", type: "error", duration: 3000 });
    }
}

// === PHÂN TRANG ===
function displayInventoryList(productAll, perPage, currentPage) {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const productShow = productAll.slice(start, end);
    renderInventoryList(productShow);
}

function setupInventoryPagination(productAll, perPage, navId, currentPage, onPageChange) {
    const pageList = document.getElementById(navId);
    pageList.innerHTML = '';
    const page_count = Math.ceil(productAll.length / perPage);
    if (page_count <= 1) return;

    for (let i = 1; i <= page_count; i++) {
        const li = document.createElement('li');
        li.className = 'page-nav-item';
        if (i === currentPage) li.classList.add('active');
        li.innerHTML = `<a href="#">${i}</a>`;
        li.onclick = () => {
            onPageChange(i);
        };
        pageList.appendChild(li);
    }
}

// === TÌM KIẾM + LỌC + LÀM MỚI ===
function showInventory(reset = false) {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const activeProducts = products.filter(p => p.status == 1);

    let category = document.getElementById('inventory-the-loai')?.value || 'Tất cả';
    let search = document.getElementById('inventory-search')?.value.toLowerCase() || '';
    let filtered = activeProducts;

    if (category !== 'Tất cả') {
        filtered = filtered.filter(p => p.category === category);
    }
    if (search) {
        filtered = filtered.filter(p => p.title.toLowerCase().includes(search));
    }

    if (reset) {
        document.getElementById('inventory-the-loai').value = 'Tất cả';
        document.getElementById('inventory-search').value = '';
        inventoryCurrentPage = 1;
        inventoryAlertPage = 1;
    }

    // Xác định tab hiện tại
    const activeTab = document.querySelector('.inventory-sub-tabs .sub-tab-btn.active').dataset.tab;

    if (activeTab === 'search') {
        displayInventoryList(filtered, inventoryPerPage, inventoryCurrentPage);
        setupInventoryPagination(filtered, inventoryPerPage, 'inventory-page-nav', inventoryCurrentPage, (page) => {
            inventoryCurrentPage = page;
            showInventory();
        });
        document.getElementById('tab-inventory-search').style.display = 'block';
        document.getElementById('tab-inventory-alert').style.display = 'none';
    } else {
        renderInventoryAlert(filtered);
        document.getElementById('tab-inventory-search').style.display = 'none';
        document.getElementById('tab-inventory-alert').style.display = 'block';
    }
}

// === TỰ ĐỘNG LOAD KHI VÀO TAB ===
document.addEventListener('DOMContentLoaded', () => {
    const tab = Array.from(document.querySelectorAll('.sidebar-list-item.tab-content'))
        .find(tab => tab.querySelector('.hidden-sidebar')?.textContent.includes('Quản lý tồn kho'));
    
    if (tab) {
        tab.addEventListener('click', () => {
            setTimeout(() => {
                inventoryCurrentPage = 1;
                showInventory();
            }, 100);
        });
    }
});

// Sub-tab switching
document.querySelectorAll('.inventory-sub-tabs .sub-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.inventory-sub-tabs .sub-tab-btn').forEach(b => {
            b.classList.remove('active');
            b.style.background = 'transparent';
            b.style.color = '#666';
            b.style.borderBottom = 'none';
        });
        btn.classList.add('active');
        btn.style.background = '#fff';
        btn.style.color = '#d32f2f';
        btn.style.borderBottom = '3px solid #d32f2f';

        inventoryCurrentPage = 1;
        inventoryAlertPage = 1;
        showInventory();
    });
});
