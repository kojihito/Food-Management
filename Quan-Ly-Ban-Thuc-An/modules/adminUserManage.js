import { users, 
    // setUsers
 } from "./informationalObjects.js";
import { setLocalStorage } from "./informationalObjects.js";
import { getLocalStorage } from "./informationalObjects.js";
import { adminUserBoardDisplay } from "./adminUserBoard.js";
import { isPasswordValid } from "./signCode.js";

export function adminUserManage(){

    let userED = null;

    function updateUser(){
        // if(getLocalStorage('users')){
        //     setUsers(getLocalStorage('users'));
        // }
        if(userED != null){
            let userN = document.querySelector('.adminUserBoard .pop-ups .modify #modify_name').value;
            let userP = document.querySelector('.adminUserBoard .pop-ups .modify #modify_pwd').value;
            let userR = document.querySelector('.adminUserBoard .pop-ups .modify #modify_role').value;
            if(isPasswordValid(userP)){
                for(let i = 0; i < users.length; i++){
                    if(userED === users[i].email){
                        users[i].userName = userN;
                        users[i].password = userP;
                        users[i].roles = userR;
                        if(document.querySelector('.adminUserBoard .pop-ups .modify #isBlocked').checked){
                            users[i].isBlocked = true;
                        } else{
                            users[i].isBlocked = false;
                        }
                        break;
                    }
                }
                alert('Cập nhật người dùng thành công');
                setLocalStorage('users', users);
                document.querySelector(".adminUserBoard .pop-ups .modify").style.display = 'none';
                document.querySelector(".adminUserBoard .pop-ups").style.display = 'none';
                document.querySelector('.adminUserPage .top-section .adminUserSearch .search-box input').value = '';
                adminUserBoardDisplay();
                reattachEventListenerAdminUserBoard();
            } else{
                if(userR === 'Admin'){
                    for(let i = 0; i < users.length; i++){
                        if(userED === users[i].email){
                            users[i].userName = userN;
                            users[i].password = userP;
                            users[i].roles = userR;
                            if(document.querySelector('.adminUserBoard .pop-ups .modify #isBlocked').checked){
                                users[i].isBlocked = true;
                            } else{
                                users[i].isBlocked = false;
                            }
                            break;
                        }
                    }
                    alert('Cập nhật người dùng thành công');
                    setLocalStorage('users', users);
                    document.querySelector(".adminUserBoard .pop-ups .modify").style.display = 'none';
                    document.querySelector(".adminUserBoard .pop-ups").style.display = 'none';
                    document.querySelector('.adminUserPage .top-section .adminUserSearch .search-box input').value = '';
                    adminUserBoardDisplay();
                    reattachEventListenerAdminUserBoard();
                } else{
                    alert('Mật khẩu phải có ít nhất 6 ký tự');
                    document.querySelector('.adminUserBoard .pop-ups .modify #modify_pwd').value ='';
                }
            }
        }
    }

    function reattachEventListenerAdminUserBoard(){
        document.querySelectorAll(".adminUserBoard .actions .modify").forEach((button) => {
         
            if(!button.hasAttribute('data-listener')){
                button.addEventListener('click', (event) =>{
                    document.querySelector(".adminUserBoard .pop-ups").style.display = 'flex';
                    document.querySelector(".adminUserBoard .pop-ups .modify").style.display = 'flex';
                    userED = event.target.closest(".user").querySelector(".info .email").textContent;
                    for(let i = 0; i < users.length; i++){
                        if(userED === users[i].email){
                            document.querySelector('.adminUserBoard .pop-ups .modify #modify_name').value = users[i].userName;
                            document.querySelector('.adminUserBoard .pop-ups .modify #modify_pwd').value = users[i].password;
                            document.querySelector('.adminUserBoard .pop-ups .modify #modify_role').value = users[i].roles;
                            if(users[i].isBlocked){
                                document.querySelector('.adminUserBoard .pop-ups .modify #isBlocked').checked = true;
                            } else{
                                document.querySelector('.adminUserBoard .pop-ups .modify #not_isBlocked').checked = true;
                            }
                            break;
                        }
                    }
                })
                button.setAttribute('data-listener', 'true');
            }
        })
    
        if(document.querySelector('.adminUserBoard .pop-ups .modify .form-container')){
            if(!document.querySelector('.adminUserBoard .pop-ups .modify .form-container').hasAttribute('data-listener')){
                document.querySelector('.adminUserBoard .pop-ups .modify .form-container').addEventListener('submit', (event) =>{
                    event.preventDefault();
                    updateUser();
                })
                document.querySelector('.adminUserBoard .pop-ups .modify .form-container').setAttribute('data-listener', 'true');
            }
        }

        if(document.querySelector(".adminUserBoard .btn-close")){

            if(!document.querySelector(".adminUserBoard .btn-close").hasAttribute('data-listener')){
                document.querySelector(".adminUserBoard .btn-close").addEventListener('click', () =>{
                    document.querySelector(".adminUserBoard .pop-ups .modify").style.display = 'none';
                    document.querySelector(".adminUserBoard .pop-ups").style.display = 'none';
                })
                document.querySelector(".adminUserBoard .btn-close").setAttribute('data-listener', 'true');
            }
        }

        document.querySelectorAll(".adminUserBoard .actions .remove").forEach((button) => {
            if(!button.hasAttribute('data-listener')){
                button.addEventListener('click', (event) =>{
                    document.querySelector(".adminUserBoard .pop-ups").style.display = 'flex';
                    document.querySelector(".adminUserBoard .pop-ups .remove").style.display = 'block';
                    userED = event.target.closest(".user").querySelector(".info .email").textContent;
                })
                button.setAttribute('data-listener', 'true');
            }
        })

        if(document.querySelector('.adminUserBoard .pop-ups .remove .cfm_btn')){

            if(!document.querySelector('.adminUserBoard .pop-ups .remove .cfm_btn').hasAttribute('data-listener')){
                document.querySelector('.adminUserBoard .pop-ups .remove .cfm_btn').addEventListener('click', () =>{
                    if(userED != null){
                        // if(getLocalStorage('users')){
                        //     setUsers(getLocalStorage('users'));
                        //   }
                        for(let i = 0; i < users.length; i++){
                            if(userED === users[i].email){
                                users.splice(i, 1);
                                break;
                            }
                        }
                        alert('Xóa người dùng thành công');
                        setLocalStorage('users', users);
                        document.querySelector(".adminUserBoard .pop-ups .remove").style.display = 'none';
                        document.querySelector(".adminUserBoard .pop-ups").style.display = 'none';
                        document.querySelector('.adminUserPage .top-section .adminUserSearch .search-box input').value = '';
                        adminUserBoardDisplay();
                        reattachEventListenerAdminUserBoard();
                    }
                })
                document.querySelector('.adminUserBoard .pop-ups .remove .cfm_btn').setAttribute('data-listener', 'true');
            }
        }

        if(document.querySelector(".adminUserBoard .deny_btn")){

            if(!document.querySelector(".adminUserBoard .deny_btn").hasAttribute('data-listener')){
                document.querySelector(".adminUserBoard .deny_btn").addEventListener('click', () => {
                    document.querySelector(".adminUserBoard .pop-ups .remove").style.display = 'none';
                    document.querySelector(".adminUserBoard .pop-ups").style.display = 'none';
                })
                document.querySelector(".adminUserBoard .deny_btn").setAttribute('data-listener', 'true');
            }
        }
    }
    function checkEmail(userE){
        // if(getLocalStorage('users')){
        //     setUsers(getLocalStorage('users'));
        //   }
        for(let i = 0; i < users.length; i++){
          if(userE === users[i].email){
            return false;
          }
        }
        return true;
      }

    function adminAddUser(){
        // if(getLocalStorage('users')){
        //     setUsers(getLocalStorage('users'));
        //   }
        let userE = document.querySelector('.adminUserPage .top-section .add-user #added_email').value;
        let userN = document.querySelector('.adminUserPage .top-section .add-user #added_name').value;
        let userP = document.querySelector('.adminUserPage .top-section .add-user #added_pwd').value;
        let userR = document.querySelector('.adminUserPage .top-section .add-user #added_role').value;
        if(!checkEmail(userE)){
            alert('Tài khoản gmail đã tồn tại!');
            return 0;
        }

        if(!isPasswordValid(userP) && userR !== 'Admin'){
            alert('Mật khẩu phải có ít nhất 6 kí tự');
            return 0;
        }

        const user = {
            avt: null,
            email: userE,
            userName: userN,
            password: userP,
            roles: userR,
            address: null,
            isBlocked: false
        }
        users.push(user);
        setLocalStorage('users', users);
        alert('Thêm Người Dùng Thành Công');
        document.querySelector('.adminUserPage .top-section .add-user #added_email').value ='';
        document.querySelector('.adminUserPage .top-section .add-user #added_name').value ='';
        document.querySelector('.adminUserPage .top-section .add-user #added_pwd').value = '';
        document.querySelector('.adminUserPage .top-section .pop-ups').style.display = 'none';
        document.querySelector('.adminUserPage .top-section .adminUserSearch .search-box input').value = '';
        adminUserBoardDisplay();
        reattachEventListenerAdminUserBoard();
    }
    
    reattachEventListenerAdminUserBoard();

    if(!document.querySelector('.adminUserPage .top-section .addUser_btn').hasAttribute('data-listener')){
        document.querySelector('.adminUserPage .top-section .addUser_btn').addEventListener('click', () =>{
            document.querySelector('.adminUserPage .top-section .pop-ups').style.display = 'flex';
        })
        document.querySelector('.adminUserPage .top-section .addUser_btn').setAttribute('data-listener', 'true');
    }
   
    if(!document.querySelector('.adminUserPage .top-section .pop-ups .add-user .btn-close').hasAttribute('data-listener')){
        document.querySelector('.adminUserPage .top-section .pop-ups .add-user .btn-close').addEventListener('click', () =>{
            document.querySelector('.adminUserPage .top-section .pop-ups .add-user #added_email').value ='';
            document.querySelector('.adminUserPage .top-section .pop-ups .add-user #added_name').value ='';
            document.querySelector('.adminUserPage .top-section .pop-ups .add-user #added_pwd').value ='';
            document.querySelector('.adminUserPage .top-section .pop-ups').style.display = 'none';
        })
        document.querySelector('.adminUserPage .top-section .pop-ups .add-user .btn-close').setAttribute('data-listener', 'true');
    }

    if(!document.querySelector('.adminUserPage .top-section .add-user .form-container').hasAttribute('data-listener')){
        document.querySelector('.adminUserPage .top-section .add-user .form-container').addEventListener('submit', (event) =>{
            event.preventDefault();
            adminAddUser();
        })
        document.querySelector('.adminUserPage .top-section .add-user .form-container').setAttribute('data-listener', 'true');
    }

    document.querySelector('.adminUserPage .top-section .adminUserSearch .search-box input').addEventListener('input', (event) =>{
        // if(getLocalStorage('users')){
        //     setUsers(getLocalStorage('users'));
        //   }
        let userArr = [];
        let searchInput = document.querySelector('.adminUserPage .top-section .adminUserSearch .search-box input').value;
        if(searchInput == ''){
            adminUserBoardDisplay();
            reattachEventListenerAdminUserBoard();
            return 0;
        }

        for(let i = 0; i < users.length; i++){
            if(users[i].userName.toLocaleLowerCase().includes(searchInput.toLowerCase())
            || users[i].email.split('@')[0].toLocaleLowerCase().includes(searchInput.toLowerCase())){
                userArr.push(users[i]);
            }
        }
        adminUserBoardDisplay(userArr);
        reattachEventListenerAdminUserBoard();
        
    })
}