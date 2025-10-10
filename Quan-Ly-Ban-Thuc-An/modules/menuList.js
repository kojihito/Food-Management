const explore_menu_list = document.querySelector(".explore-menu-list");
const menu_links = document.querySelectorAll(".navbar-menu a");
import { menu_list } from "./informationalObjects.js";
import { foodListDisplay, foodMenuSearch } from "./foodList.js";
export let explore_menu_category = "all";

export function menuListDisplay() {
  menu_list.forEach((item) => {
    explore_menu_list.innerHTML += `
    <div class="explore-menu-list-item">
    <img src="${item.menu_image}" />
    <p>${item.menu_name}</p>
    </div>
    `;
  });

  const explore_menu_list_items = document.querySelectorAll(
    ".explore-menu-list-item"
  );
  const explore_menu_list_items_image = document.querySelectorAll(
    ".explore-menu-list-item img"
  );

  menu_links.forEach((link) =>
    link.addEventListener("click", () => {
      menu_links.forEach((link) => link.classList.remove("active"));
      link.classList.add("active");
    })

  );

  explore_menu_list_items.forEach((item) => {
    const item_image = item.querySelector("img");
    const item_p = item.querySelector("p");

    menuCategoryElementClick(item_image);
    menuCategoryElementClick(item_p);

    function menuCategoryElementClick(element) {
      element.addEventListener("click", () => {
        if (explore_menu_category != item_p.innerHTML) {
          explore_menu_list_items_image.forEach((image) =>
            image.classList.remove("active")
          );
          item_image.classList.add("active");
          explore_menu_category = item_p.innerHTML;
        } else {
          explore_menu_list_items_image.forEach((image) =>
            image.classList.remove("active")
          );
          explore_menu_category = "all";
        }    
            foodMenuSearch()
        // foodListDisplay();
      });
    }
  });
}

