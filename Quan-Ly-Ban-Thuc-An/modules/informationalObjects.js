export const food_list = getLocalStorage("food_list")?getLocalStorage("food_list"):[{
        id: 1,
        name: "Cơm chiên dương châu",
        image: "./images/com chien duong chau.jpg",
        price: 35000,
        description: "Là món cơm chiên Việt Nam hấp dẫn với tôm, xúc xích, trứng và rau, được nêm nếm hoàn hảo để tạo nên một bữa ăn đậm đà hương vị.",
        category: "Cơm chiên",
    },
    {
        id: 2,
        name: "Bún bò",
        image: "./images/bun bo.jpg",
        price: 35000,
        description: "Là một ăn đậm đà của Việt Nam với thịt bò mềm, bún và các loại thảo mộc thơm trong nước dùng cay nồng.",
        category: "Bún",
    },
    {
        id: 3,
        name: "Lẩu gà",
        image: "./images/lau ga.webp",
        price: 80000,
        description: "món lẩu gà của Việt Nam, gồm thịt gà mềm, rau và thảo mộc được ninh trong nước dùng đậm đà, ăn kèm với mì hoặc cơm.",
        category: "Lẩu",
    },
    {
        id: 4,
        name: "Sữa chua",
        image: "https://imgs.search.brave.com/6_Q7yxunHnvmPE7ctY7vnJOVwUoW7YtFfgqBYXvUOBI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/eW91bWVkLnZuL3Rp/bi10dWMvd3AtY29u/dGVudC91cGxvYWRz/LzIwMjAvMDgvMTku/anBn",
        price: 10000,
        description: "Món ăn nhẹ mịn mượt, vị chua ngọt, bổ dưỡng và tốt cho tiêu hóa, thích hợp ăn trực tiếp hoặc kết hợp với trái cây, mật ong.",
        category: "Tráng miệng",
    },
    {
        id: 5,
        name: "Bánh mì thịt",
        image: "https://imgs.search.brave.com/U6mPHARfwKRqEW830QeYlPiN_EPnFscLvrwYzRqTpNM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zcGlj/ZWJyZWV6ZS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMTgv/MDkvQmFuaC1NaS1U/aGl0LTItZTE2MDAw/MDQ0MDE5NzQuanBn",
        price: 15000,
        description: "Nhân thịt, pate, rau tươi, và gia vị đậm đà, được yêu thích.",
        category: "Bánh mì",
    },
    {
        id: 6,
        name: "Cá áp chảo",
        image: "https://imgs.search.brave.com/7brdeoHhRkFozO7hA1eTmLsfvnEh6C09ttMfyrGK5Bs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tb25u/Z29uLnR2L3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIwLzA5L2Yz/NjU1MWYxNGQ2ZDE5/MzFkZWRhNTM2ZmZk/OTg4MWIxLWNhY2gt/Y2hpZW4tY2EtdGh1/LW5nb24tbmhvLmpw/Zw",
        price: 40000,
        description: "Giòn rụm, thơm ngon với vỏ vàng, thịt mềm ngọt, thường chấm nước mắm và ăn kèm rau sống, tạo hương vị đậm đà.",
        category: "Hải sản",
    },
    {
        id: 7,
        name: "Ốc cuốn lá lốt",
        image: "https://imgs.search.brave.com/NVtWX7Z6s3NAm_Cr7KWjQQsCEVVLFRdKpm9V4vQ7JB0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly92Y2Ru/MS1naWFkaW5oLnZu/ZWNkbi5uZXQvMjAy/MS8xMS8xOS9UaG5o/cGhtMS0xNjM3MzI4/NTUxLTU5NDUtMTYz/NzMyODU2NC5qcGc_/dz01MDAmaD0zMDAm/cT0xMDAmZHByPTEm/Zml0PWNyb3Amcz10/bWZjX2NnWGJuYWh6/WFctNjZsT0ZB",
        price: 53000,
        description: "Dân dã, thơm ngon với ốc băm cuộn lá lốt, nướng hoặc chiên, chấm cùng nước mắm chua ngọt, tạo hương vị hấp dẫn.",
        category: "Hải sản",
    },
    {
        id: 8,
        name: "Cơm chiên gà nướng ",
        image: "./images/gà nướng.jpg",
        price: 119000,
        description: "Món gà nướng với lớp da giòn tan, vàng óng, thịt bên trong mềm ngọt, đậm đà hương vị các loại gia vị như sả, tỏi, ớt",
        category: "Cơm chiên",
    },
    {
        id: 9,
        name: "tiramisu ",
        image: "./images/tiramisu.jpg",
        price: 25000,
        description: "Tiramisu là một món tráng miệng Ý nổi tiếng với hương vị cà phê đậm đà, lớp bánh quy ẩm mềm và vị ngọt béo của kem mascarpone",
        category: "Tráng miệng",
    },
    {
        id: 10,
        name: "Gỏi ngó sen tôm thịt",
        image: "./images/goingosen.jpg",
        price: 89000,
        description: "Gỏi ngó sen tôm thịt là một món ăn khai vị thanh mát, giòn ngon. Với vị ngọt của ngó sen, vị dai của tôm",
        category: "Hải sản",
    },
    {
        id: 11,
        name: "Mì xào hải sản",
        image: "./images/mixao.jpg",
        price: 99000,
        description: " Mì được xào cùng nhiều loại hải sản tươi ngon như tôm, mực, nghêu, cùng các loại rau củ, tạo nên một món ăn đầy màu sắc và hương vị",
        category: "Hải sản",
    },
    {
        id: 12,
        name: "Lẩu nghêu hấp xả",
        image: "./images/ochuong.jpg",
        price: 79000,
        description: "Nghêu tươi được hấp cùng sả, ớt, tạo nên hương thơm hấp dẫn. Thịt nghêu ngọt, mọng nước",
        category: "Lẩu",
    },
    {
        id: 13,
        name: "Cơm ếch chiên giòn",
        image: "./images/echchiengion.jpg",
        price: 109000,
        description: "Ếch được làm sạch, ướp gia vị, lăn qua bột chiên giòn rồi chiên ngập dầu đến khi vàng ruộm",
        category: "Cơm chiên",
    },
    {
        id: 14,
        name: "Bánh mì bò lúc lắc",
        image: "./images/boluclac.jpg",
        price: 99000,
        description: "Món ăn được chế biến từ thịt bò thái mỏng, ướp gia vị đậm đà, xào nhanh tay trên lửa lớn cùng các loại rau củ",
        category: "Bánh mì",
    },
    {
        id: 15,
        name: "Ốc bưu nướng tiêu",
        image: "./images/ocbuu.jpg",
        price: 69000,
        description: "Ốc bưu tươi ngon được làm sạch, ướp gia vị đậm đà, nướng trên lửa than hồng đến khi vỏ ốc bung ra.",
        category: "Tráng miệng",
    },
    {
        id: 16,
        name: "Cơm sụn gà chiên mắm",
        image: "./images/sunga.jpg",
        price: 89000,
        description: " Sụn gà giòn giòn, dai dai được chiên giòn với mắm, tỏi, ớt tạo nên món nhậu hấp dẫn.",
        category: "Cơm chiên",
    },
    {
        id: 17,
        name: "Rau muống xào tỏi",
        image: "./images/raumuong.jpg",
        price: 79000,
        description: " Món ăn đơn giản nhưng lại rất đưa cơm. Rau muống xanh mướt được xào nhanh tay với tỏi phi thơm",
        category: "Tráng miệng",
    },
    {
        id: 18,
        name: "Bún đậu hũ chiên xả",
        image: "./images/dauhu.jpg",
        price: 69000,
        description: "Đậu hũ non được chiên giòn, sau đó xào với xả ớt tạo nên món ăn thơm ngon, lạ miệng.",
        category: "Bún",
    },

];

export const availableImages = [
    "./images/com_chien_duong_chau.jpg",
    "./images/bun_bo.jpg",
    "./images/lau_ga.webp",
    "./images/sua_chua.jpg"

];

export const menu_list = getLocalStorage("menu_list")?getLocalStorage("menu_list"):
[
  {
    menu_name: "Cơm chiên",
    menu_image: "./images/com chien.jpg",
  },
  {
    menu_name: "Lẩu",
    menu_image: "./images/lau.jpg",
  },
  {
    menu_name: "Bún",
    menu_image: "./images/bun.jpg",
  },
  {
    menu_name: "Bánh mì",
    menu_image: "./images/banh mi.jpg",
  },
  {
    menu_name: "Hải sản",
    menu_image: "./images/hai san.jpg",
  },
  {
    menu_name: "Tráng miệng",
    menu_image: "./images/trang mieng.jpg",
  },
];

export const cart_items = {};

export const adminNavbarLinks = [{
        page: "home",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>',
        text: "Trang chính"
    },
    {
        page: "analytics",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M160 80c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 352c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-352zM0 272c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 160c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48L0 272zM368 96l32 0c26.5 0 48 21.5 48 48l0 288c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48z"/></svg>',
        text: "Thống kê"
    },
    {
        page: "user",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>',
        text: "Người dùng"
    },
    {
        page: "product",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 0C400 0 288 32 288 176l0 112c0 35.3 28.7 64 64 64l32 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 0-112 0-208c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7L80 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224.4c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16l0 134.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8L64 16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z"/></svg>',
        text: "Sản phẩm"
    },
    {
        page: "shipping",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M112 0C85.5 0 64 21.5 64 48l0 48L16 96c-8.8 0-16 7.2-16 16s7.2 16 16 16l48 0 208 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L64 160l-16 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l16 0 176 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L64 224l-48 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l48 0 144 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L64 288l0 128c0 53 43 96 96 96s96-43 96-96l128 0c0 53 43 96 96 96s96-43 96-96l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64 0-32 0-18.7c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7L416 96l0-48c0-26.5-21.5-48-48-48L112 0zM544 237.3l0 18.7-128 0 0-96 50.7 0L544 237.3zM160 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z"/></svg>',
        text: "Shipping"
    },
];

export const users = getLocalStorage("users")?getLocalStorage("users"):

[
  {
    avt: null,
    email: 'nguyenkhanh0127@gmail.com',
    userName: 'Khanh',
    password: '123456',
    roles: 'Khach hang',
    address: 'TP HCM',
    isBlocked: false
  },
  {
    email: 'captianBao@gmail.com',
    avt: 
    `https://imgs.search.brave.com/7KAKmiD31pUHujt4mXlTIeLdYzPZc3BHXZIxlbhUzCk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vcGljanVt/Ym8uY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy9kaWEtZGUtbG9z/LW11ZXJ0b3MtZGF5/LW9mLXRoZS1kZWFk/LWNlbGVicmF0aW9u/cy1mcmVlLWltYWdl/LmpwZWc_dz02MDAm/cXVhbGl0eT04MA`
    ,
    userName: 'bảo',
    password: '123456',
    roles: 'Admin',
    address: null,
    isBlocked: false
  },
  {
    email: 'admin@gmail.com',
    avt: 
    `https://imgs.search.brave.com/7KAKmiD31pUHujt4mXlTIeLdYzPZc3BHXZIxlbhUzCk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vcGljanVt/Ym8uY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy9kaWEtZGUtbG9z/LW11ZXJ0b3MtZGF5/LW9mLXRoZS1kZWFk/LWNlbGVicmF0aW9u/cy1mcmVlLWltYWdl/LmpwZWc_dz02MDAm/cXVhbGl0eT04MA`
    ,
    userName: 'Bao',
    password: 'admin',
    roles: 'Admin',
    address: null,
    isBlocked: false
  },
  {
    avt: "../images/user pic.jpg",
    email: 'ThanhTran1997@gmail.com',
    userName: 'Tran',
    password: '654321',
    roles: 'Khach hang',
    address: null,
    isBlocked: false
  },
  {
    avt: null,
    email: "nam@gmail.com",
    userName: 'Hoai Nam',
    password: '123456',
    roles: 'Khach hang',
    address: null,
    isBlocked: false
  }
]

export const receipts = 
getLocalStorage("receipts")?getLocalStorage("receipts"):
[{
  id: 1,
  email: "ThanhTran1997@gmail.com",
  Address: "251 Le Quang Dinh",
  ArrayFoods:  [{
    food:food_list[2],
    soluong:2
  }],
  TamTinh: parseInt(document.getElementById("thanh_toan_tmp_cal_money").textContent.split(" ")[0], 10),
  PhiVanChuyen: parseInt(document.getElementById("phi_van_chuyen").textContent.split(" ")[0], 10),
  TongCong: parseInt(document.getElementById("tong_cong").textContent.split(" ")[0], 10),
  NgayMua: new Date()
}]

export function setLocalStorage(key,info){
  localStorage.setItem(key,JSON.stringify(info));
}


export function getLocalStorage(key){
  return JSON.parse(localStorage.getItem(key));
}
