const food_display_list = document.querySelector(".food-display-list");
const food_search = document.querySelector(".search-input");
import { explore_menu_category } from "./menuList.js";
import { food_list, cart_items } from "./informationalObjects.js";
import * as chitietsp from "./chitietsp.js";
const back = document.querySelector(".back")
const next = document.querySelector(".next")
// import * as pagination from "./pagination.js";
let foodPriceItems = food_list;
let foodMenuItems = food_list;
let food_to_display = food_list;
let foodSearchItems = food_list;
let currentPage = 1;
let maxPage = Math.ceil(food_to_display.length / 6);
const currentPageElement = document.querySelector("#currentPage");
const maxPageElement = document.querySelector("#pageNumber");
const inputMin = document.querySelector(".input-min")
const inputMax = document.querySelector(".input-max")


function add_to_cart(id) {
  if (!cart_items[id]) {
    cart_items[id] = 1;
  } else {
    cart_items[id] += 1;
  }
  foodListDisplay();
}
function remove_from_cart(id) {
  cart_items[id] -= 1;

  foodListDisplay();
}

function add_remove_icon() {
  let plus_icon = document.querySelectorAll(".plus-icon");
  let minus_icon = document.querySelectorAll(".minus-icon");
  plus_icon.forEach((element) =>
    element.addEventListener("click", () => add_to_cart(element.id))
  );
  minus_icon.forEach((element) =>
    element.addEventListener("click", () => remove_from_cart(element.id))
  );
}

export var pages = [];
export var page_number = 0;
export function foodListLogic() {
  
  foodInputSearch();
  foodPriceSearch();
  foodListDisplay();
  pagination()  


}

function textSP(food) {
  if(food != null){
    var text = `
          <div class="food-item">
            <div class="food-item-img-container">
              <img src='${food.image}' class="food-item-img"/>
            </div>
            <div class="food-item-info">
              <div class="food-item-name-rating">
                <p>${food.name}</p>
              </div>
              <p class="food-item-price">Giá ${food.price} VND</p>
              <button>
                <i class="fa-solid fa-cart-shopping"></i>
              </button>
            </div>
          </div>
          `;
    return text;

  }
  return ""
}

function foodInputSearch() {
  food_search.addEventListener("input", (e) => {
    foodSearchItems = [];
    food_list.forEach((food) => {
      if (
        food.name.toLocaleLowerCase().includes(e.target.value.toLowerCase())
      ) {
        foodSearchItems.push(food);
      }
    });
    FoodItemsJoin();
  });
}

export function foodMenuSearch() {
  foodMenuItems = [];
  food_list.forEach((food) => {
    if (
      explore_menu_category == "all" ||
      explore_menu_category == food.category
    ) {
      foodMenuItems.push(food);
    }
  });
  FoodItemsJoin();
}

function FoodItemsJoin() {
  let firstJoin = [];
  let secondJoin = []
  foodSearchItems.forEach((searchItems) => {
    foodMenuItems.forEach((menuItems) => {
      if (searchItems == menuItems) {
        firstJoin.push(searchItems);
      }
    });
  });

  firstJoin.forEach(joinItems => {
    foodPriceItems.forEach(priceItems => {
      if(priceItems == joinItems){
        secondJoin.push(priceItems)
      }
    })
  })
  food_to_display = secondJoin;
  foodListDisplay();
}

function foodPriceSearch() {
  let max = inputMax.attributes[1].value
  let min = inputMin.attributes[1].value

  inputMax.addEventListener("input", (e) => {
    max = e.target.value
    logic()
  })
  inputMin.addEventListener("input", (e) => {
    min = e.target.value
    logic()})
  

  function logic(){
    foodPriceItems = []


food_list.forEach(food => {
  if(food.price > min && food.price < max){
    foodPriceItems.push(food)
  }
}
)
FoodItemsJoin()
  }
}


export function foodListDisplay() {
  maxPage = Math.ceil(food_to_display.length / 6);
  currentPage = 1
  maxPageElement.innerHTML = maxPage;
  displayFoodList()
  
  

}


export function pagination(){

  back.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      console.log("max" + maxPage);
      console.log("cur" +currentPage);
      
      displayFoodList();
    }
  });
  next.addEventListener("click", () => {
    if (currentPage < maxPage) {
      currentPage++;
      console.log("max" + maxPage);
      console.log("cur" +currentPage);

      displayFoodList();
    }
  });
}
function displayFoodList(){
currentPageElement.innerHTML = currentPage;
food_display_list.innerHTML = "";
  for (let i = (currentPage - 1) * 6; i < currentPage * 6; i++) {
    food_display_list.innerHTML += textSP(food_to_display[i]);
    chitietsp.showChiTiet();
  }

}

