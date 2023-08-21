var darkModeModification = 
`<style class="dark-mode-mod">
.nav__navbar-image img,
.modal-form__form-name,
.sidebar-area__list-item-name {
    filter: brightness(30.0);
}

.nav__navbar-icons,
.main-area__function-name-right,
.sidebar-area__open,
.sidebar-area__list-item-icon{
    filter: contrast(6.5);
}

.navbar__user-below,{
    font-weight: 900;
}

.sidebar-area__list-item-name{
    font-weight: 500;
}

.main-area__total-function{
    border: 2px solid #fff;
    border-color: unset;
}

.sidebar-area__list-item--checked{
    filter: brightness(1.0);
}

.modal-form__typing-input{
    filter: brightness(1.5);
}

.modal-form__socials-option{
    filter: brightness(3.5);
}

.modal-form__login-button{
    filter: contrast(1.5);
}

.main-area__total-function-what,
.main-area__function-name-left{
    font-weight: 500;
}

.today_is{
    font-size: 1.5rem;
}

.sidebar-area__lists{
    filter: drop-shadow(2px 4px 6px black);
}
</style>`



function toggleDarkMode(newState){
    if (newState == "on"){
        DarkReader.enable({contrast: 95, sepia: 0, brightness: 125});
        document.head.insertAdjacentHTML("beforeend", darkModeModification);
        setCookie("darkmode", "on", 9999);
    }
    else{
        DarkReader.disable();
        var cssMod = document.getElementsByClassName("dark-mode-mod")[0];
        if (cssMod){    //Nếu như có sự thay đổi [Style] trong head
            cssMod.parentElement.removeChild(cssMod);   //cssMod.parentElement --> Lấy được head --> Xoá bỏ [Style]
        }
        setCookie("darkmode", "off", 9999)          //Lưu vào cookie để web ghi nhớ lịch sử thay đổi
    }
}

document.querySelector('.navmenu-list--setting').addEventListener('click',function(){
    if (document.querySelector(".darkreader")) { //Khi bật DarkReader, class:darkreader được thêm ở head.
        toggleDarkMode("off");
    } else{
        toggleDarkMode("on");
    }
})
























toggleDarkMode(getCookie("darkmode"));


















function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}