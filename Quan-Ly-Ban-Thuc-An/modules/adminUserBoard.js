import { users, 
  // getLocalStorage, setUsers
 } from "./informationalObjects.js";


export function adminUserBoardDisplay(userArr = null){
  // if(getLocalStorage('users')){
  //   setUsers(getLocalStorage('users'));
  // }
    const board = document.querySelector(".adminUserBoard");
    board.innerHTML=`
        <div class="section">
          <p>Name</p>
          <p>Roles</p>
          <p>Actions</p>
        </div>
    `;
   ;
    let userAccs = null;
    
    if(userArr != null){
      userAccs = userArr;
    } else{
      userAccs = users;
    }

    userAccs.forEach((item) => {
        board.innerHTML += `
        <div class="user section" ${item.isBlocked? 'style="background-color: rgba(255, 0, 0, 0.8);"': 'style="background-color: rgba(0, 0, 0, 0.03);"'}>
          <div class="info">
            <img
              src="${(item.avt? item.avt : 'images/user pic.jpg')}"
              alt=""
            />
            <div>
              <p class="name">${item.userName}</p>
              <p class="email">${item.email}</p>
            </div>
          </div>
          <div class="roles">
          ${displayUserRole(item.roles)}
          </div>
          <div class="actions">
            <div class="modify">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                <path
                  d="M224 0a128 128 0 1 1 0 256A128 128 0 1 1 224 0zM178.3 304l91.4 0c11.8 0 23.4 1.2 34.5 3.3c-2.1 18.5 7.4 35.6 21.8 44.8c-16.6 10.6-26.7 31.6-20 53.3c4 12.9 9.4 25.5 16.4 37.6s15.2 23.1 24.4 33c15.7 16.9 39.6 18.4 57.2 8.7l0 .9c0 9.2 2.7 18.5 7.9 26.3L29.7 512C13.3 512 0 498.7 0 482.3C0 383.8 79.8 304 178.3 304zM436 218.2c0-7 4.5-13.3 11.3-14.8c10.5-2.4 21.5-3.7 32.7-3.7s22.2 1.3 32.7 3.7c6.8 1.5 11.3 7.8 11.3 14.8l0 30.6c7.9 3.4 15.4 7.7 22.3 12.8l24.9-14.3c6.1-3.5 13.7-2.7 18.5 2.4c7.6 8.1 14.3 17.2 20.1 27.2s10.3 20.4 13.5 31c2.1 6.7-1.1 13.7-7.2 17.2l-25 14.4c.4 4 .7 8.1 .7 12.3s-.2 8.2-.7 12.3l25 14.4c6.1 3.5 9.2 10.5 7.2 17.2c-3.3 10.6-7.8 21-13.5 31s-12.5 19.1-20.1 27.2c-4.8 5.1-12.5 5.9-18.5 2.4l-24.9-14.3c-6.9 5.1-14.3 9.4-22.3 12.8l0 30.6c0 7-4.5 13.3-11.3 14.8c-10.5 2.4-21.5 3.7-32.7 3.7s-22.2-1.3-32.7-3.7c-6.8-1.5-11.3-7.8-11.3-14.8l0-30.5c-8-3.4-15.6-7.7-22.5-12.9l-24.7 14.3c-6.1 3.5-13.7 2.7-18.5-2.4c-7.6-8.1-14.3-17.2-20.1-27.2s-10.3-20.4-13.5-31c-2.1-6.7 1.1-13.7 7.2-17.2l24.8-14.3c-.4-4.1-.7-8.2-.7-12.4s.2-8.3 .7-12.4L343.8 325c-6.1-3.5-9.2-10.5-7.2-17.2c3.3-10.6 7.7-21 13.5-31s12.5-19.1 20.1-27.2c4.8-5.1 12.4-5.9 18.5-2.4l24.8 14.3c6.9-5.1 14.5-9.4 22.5-12.9l0-30.5zm92.1 133.5a48.1 48.1 0 1 0 -96.1 0 48.1 48.1 0 1 0 96.1 0z"
                />
              </svg>
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
                <label class="form-label" for="modify_name">Tên:</label>
                <input class="form-input" type="text" name="userName" id="modify_name">
                <label class="form-label" for="modify_pwd">Mật Khẩu:</label>
                <input class="form-input" type="password" name="userPassword" id="modify_pwd">
                <div style="margin-bottom: 10px">
                  <label class="form-label">Khóa tài khoản:</label>
                  <label class="form-label" for="isBlocked">
                      <input type="radio" id="isBlocked" name="userIsBlocked" value="yes">
                      Có
                  </label>
                  <label class="form-label" for="not_isBlocked">
                      <input type="radio" id="not_isBlocked" name="userIsBlocked" value="no">
                      Không
                  </label>
                </div>
                <label class="form-label" for="modify_role">Chức vụ:</label>
                <select name="userRole" id="modify_role">
                  <option value="Admin">Admin</option>
                  <option value="Khach hang">Khách hàng</option>
                  <option value="Nhan vien">Nhân viên</option>
                </select>
                <div style="text-align: center;">
                  <button class="btn-submit" id="confirm_btn" type="submit">Xác Nhận</button>
                  <button class="btn-close" id="close_btn" type="button">Hủy</button>
                </div>
              </form>
            </div>
            <div class="remove">
              <h2 style="margin-bottom: 10px; border-bottom: 2px solid rgb(205, 183, 154);"><b>Thông báo</b></h2>
              <p style="font-size: 16px; margin-bottom: 80px;">Bạn có chắc chắn muốn gỡ bỏ người dùng?</p>
              <div class="yn_btn">
                <button class="cfm_btn">Xác nhận</button>
                <button class="deny_btn">Hủy</button>
              </div>
            </div>
          </div>
        </div>
        `;
    })
}

function displayUserRole(roles){
switch (roles){
    case "Admin":
      return `<div class="role admin">Admin</div>`
      break
    case "Khach hang":
      return `<div class="role customer">Khách hàng</div>`
      break
    case "Nhan vien":
      return `<div class="role staff">Nhân viên</div>`
      break;
}
}

{/* <div class="block">
              <?xml version="1.0" ?>
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">

              <defs>

              <style>.cls-1{fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style>

              </defs>

              <title/>

              <g data-name="60-lock" id="_60-lock">

              <rect class="cls-1" height="14" rx="2" ry="2" width="20" x="6" y="17"/>

              <path class="cls-1" d="M16,1h0a8,8,0,0,1,8,8v8a0,0,0,0,1,0,0H8a0,0,0,0,1,0,0V9A8,8,0,0,1,16,1Z"/>

              <path class="cls-1" d="M16,5h0a4,4,0,0,1,4,4v8a0,0,0,0,1,0,0H12a0,0,0,0,1,0,0V9A4,4,0,0,1,16,5Z"/>

              </g>

              </svg>
              <p>Khóa</p>
            </div> */}