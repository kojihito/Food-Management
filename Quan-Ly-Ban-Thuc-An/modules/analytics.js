const board = document.querySelector(".analyticBoard");
const topOverviewElement = document.querySelectorAll(
  ".adminAnalytics .overview > div"
);
const incomeElement = topOverviewElement[0].children[0].children[1];
const orderElement = topOverviewElement[1].children[0].children[1];
const userElement = topOverviewElement[2].children[0].children[1];
const productElement = topOverviewElement[3].children[0].children[1];
const inputDate = document.querySelector(`.adminAnalytics input`);
let datesPrinted = null;
let day;
let year;
let month;
import { food_list, getLocalStorage, users } from "./informationalObjects.js";
let receipts = getLocalStorage("receipts")
export function adminAnalyticsLogic() {
  const analyticButtonLink = document.querySelector(`a[page ="analytics"]`);
  analyticButtonLink.addEventListener("click", () => {
    reCalculateAnalyticsPage();
  });
  analyticBoardDisplay();
  dateFilterLogic();
}

function analyticBoardDisplay() {
  board.innerHTML = `
    <div class="row">
          <p>Ngày</p>
          <p>Doanh thu</p>
        </div>
    `;
if (receipts==null) {
return  
}
  if (receipts != null) {
    receipts.forEach((receipt) => {
      if (!dateAlreadyExist(receipt.NgayMua)) {
        board.innerHTML += `
          <div class="row">
          <p>${getYear(receipt.NgayMua)}-${getMonth(receipt.NgayMua)}-${getDay(
          receipt.NgayMua
        )}</p>

          <div style="justify:content-center; display:flex;
    flex-direction: column;
          
          ">
          <p>${receipt.TongCong}đ</p>

          </div>
          </div>
          `;
      } else {
        const rowElements = document.querySelectorAll(".analyticBoard .row");
        let rowToInlncude;

        rowElements.forEach((row) => {
          const rowDate = row.children[0].innerHTML;
          if (
            getYear(rowDate) == getYear(receipt.NgayMua) &&
            getMonth(rowDate) == getMonth(receipt.NgayMua) &&
            getDay(receipt.NgayMua) == getDay(rowDate)
          ) {
            rowToInlncude = row;
          }
        })
        if (rowToInlncude != null) {
          rowToInlncude.children[1].innerHTML +=  `
                   <p>${receipt.TongCong}đ</p>

          `
        }
      }
    });
  }
}

function reCalculateAnalyticsPage() {
  incomeElement.innerHTML = `${sumtotal()}đ`;
  if (receipts == null) {
    orderElement.innerHTML = 0;
  } else {
    orderElement.innerHTML = `${receipts.length}`;
  }
  userElement.innerHTML = `${users.length}`;
  productElement.innerHTML = `${food_list.length}`;
  function sumtotal() {
    let total = 0;
    if (receipts != null) {
      receipts.forEach((receipt) => {
        total += receipt.TongCong;
      });
    }
    return total;
  }
}

function dateAlreadyExist(date) {
  if (datesPrinted == null) {
    datesPrinted = [];
    setDatePrinted(date);
    return false;
  } else {
    return checkDate();
  }

  function checkDate() {
    let bool;
    datesPrinted.forEach((datePrint) => {
      if (
        datePrint.year == getYear(date) &&
        datePrint.month == getMonth(date) &&
        datePrint.day == getDay(date)
      ) {
        bool = true;
      } else {
        setDatePrinted(date);
        bool = false;
      }
    });
    return bool;
  }
}

function setDatePrinted(date) {
  let newDate = {
    day: getDay(date),
    month: getMonth(date),
    year: getYear(date),
  };

  datesPrinted.push(newDate);
}

function dateFilterLogic() {
  inputDate.addEventListener("change", () => {
    getCalendar(inputDate.value);
  });
}

function getCalendar(date) {
  day = getDay(date);
  month = getMonth(date);
  year = getYear(date);
}

function getDay(date) {
  let dayToGet = "";
  for (let index = 8; index < 10; index++) {
    dayToGet += date[index];
  }
  return dayToGet;
}
function getMonth(date) {
  let monthToGet = "";
  for (let index = 5; index < 7; index++) {
    monthToGet += date[index];
  }
  return monthToGet;
}
function getYear(date) {
  let yearToGet = "";
  for (let index = 0; index < 4; index++) {
    yearToGet += date[index];
  }
  return yearToGet;
}
