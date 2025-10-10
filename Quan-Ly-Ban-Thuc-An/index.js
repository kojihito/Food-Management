import { menuListDisplay } from "./modules/menuList.js"
import { foodListDisplay, foodListLogic, pagination } from "./modules/foodList.js"
import { pageDisplay } from "./modules/pageDisplay.js"
import { adminSidebarIconDisplay } from "./modules/adminSidebar.js"
import { adminUserBoardDisplay } from "./modules/adminUserBoard.js"
import { adminProductBoardDisplay } from "./modules/adminProductBoardDisplay.js"
import { signCode } from "./modules/signCode.js"
import { adminUserManage } from "./modules/adminUserManage.js"
import * as cart from "./modules/cart.js"
import * as ThanhToan from "./modules/ThanhToan.js";
import { adminOrderLogic } from "./modules/adminOrderLogic.js"
import { orderHistory } from "./modules/orderHistory.js"


adminSidebarIconDisplay()
menuListDisplay()
foodListLogic()
adminUserBoardDisplay()
adminProductBoardDisplay()
signCode()
adminUserManage()
cart.showCart();
ThanhToan.formThanhToan();  
adminOrderLogic()
orderHistory();
pageDisplay()

