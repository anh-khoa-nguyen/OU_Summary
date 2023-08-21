//Nạp [Ngày - Tháng - Năm hiện tại]
function getToday(){ 
    let today = new Date();

    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    let insert = document.getElementById('today-is');
    insert.innerHTML = `Hôm nay là ngày: ${day}/${month}/${year}`
}

//Tính năng [Kết quả khoá học - Đậu/Rớt]
function coursesResult() {
    let result = false;

    fetch("./assets/json/courses-table.json")
        .then(res => res.json())
        .then(data => {
            const failedCourses = data.filter(course => course['subject_finish'] === 'fail');

            // if (failedCourses.length > 0) {
            //     // console.log("Rất tiếc, bạn đã rớt các môn sau:");
            //     failedCourses.forEach(course => {
            //         // console.log(course['subject_name']);
            //     });
            // } else {
            //     // console.log("Xin chúc mừng, bạn đã vượt qua tất cả các môn");
            // }

            let insert = document.getElementById('courses-result');
            if (insert != null) {
                result = failedCourses.length > 0
                    ? '<h3 style="color: red">Rất tiếc, bạn đã trượt các môn sau:</h3>' + 
                      '<ul>' + 
                      failedCourses.map(course => '<li class="main-area__course-table-result-list">' + course['subject_name'] + '</li>').join('') 
                      + '</ul>'
                    : '<h3 style="color: green">Xin chúc mừng, bạn đã vượt qua tất cả các môn</h3>';
                    
                insert.innerHTML = result;
            }
        });
}


//Tính năng [Mở các Navigation]
function openNav() {
    let openButtons = document.querySelectorAll('#open-nav-button');

    openButtons.forEach(function(openButton) {
        openButton.addEventListener('click', function (e) {
            if (openButton.classList.contains('sidebar__open-button')){                     //Nav bên trái
                document.querySelector('.sidebar-area__lists').classList.toggle('open');
            } else  {                                                                       //Nav bên trên
                var menuElement = openButton.querySelector('#navmenu-add-open')
                menuElement.classList.toggle('open'); 
            }
        });
    });
}

//Tính năng [Đóng tất cả Navigation đang mở - Khi bấm ra ngoài]
function outsideNav(){
    let menuElements = document.querySelectorAll('#navmenu-add-open');
    let container = document.querySelector('.container');

    menuElements.forEach(function(menuElement){
       menuElement.addEventListener('click', function(e){
                e.stopPropagation();
            }) 
    })

    container.addEventListener('click', function (e) {
        // console.log(menuElements);
        menuElements.forEach(function(menuElement){
            menuElement.classList.remove('open');
        })
    })
}

//Tính năng [Đóng modal-form]
function closeModal(){
    let modalElement = document.querySelector('.modal-form')
    let closeModalbtn = document.querySelector('.modal-form__close');


    closeModalbtn.addEventListener('click',function(){
        modalElement.classList.add('close');
    })
}

//Tính năng [Sắp xếp môn học]
function sortingCourses() {
    let courseOption = document.getElementById('courseOption');
    courseOption.addEventListener('change', function() {
        let courseChoose = parseInt(courseOption.value);

        fetch("./assets/json/courses-table.json")
            .then(res => res.json())
            .then(data => {
                let coursesHTML = "";
                let coursesList = [];

                switch (courseChoose) {
                    case 0:
                        loadSubject();
                        break;
                    case 1:
                        coursesList = data.sort((a, b) => a.subject_name.localeCompare(b.subject_name));
                        //A đứng trước B --> Trả về giá trị dương.
                        //A đứng sau chữ B --> Trả về giá giá trị âm
                        break;
                    case 2:
                        coursesList = data.sort((a, b) => parseFloat(b.subject_point_10) - parseFloat(a.subject_point_10));
                        //Nếu B > A --> Trả về giá trị dương --> Điểm số của B đang cao hơn A
                        //Nếu A > B --> Trả về giá trị âm.  --> Điểm số của B đang thấp hơn A
                        
                        //Giá trị âm được xếp trước --> A (cao hơn) mới đến B (thấp hơn)
                        break;
                    case 3:
                        coursesList = data.sort((a, b) => parseFloat(a.subject_point_10) - parseFloat(b.subject_point_10));
                        //Nếu A > B --> Trả về giá trị dương --> Điểm số của A đang cao hơn B
                        //Nếu B > A --> Trả về giá trị âm --> Điểm số của A đang thấp hơn B

                        //Giá trị âm được xếp trước --> A (thấp hơn) mới đến B (cao hơn)
                        break;
                    default:
                        // Trường hợp không hợp lệ
                        break;
                }

                let e = document.getElementById("subject-lists");
                if (e !== null) {
                    for (let c of coursesList) {
                        coursesHTML += `
                            <div class="main-area__course-table-row main-area__course-table-row--${c.subject_finish} flex">
                                <div class="main-area__course-table-row-col-1 flex">
                                    <div class="main-area__course-table-row-col-1-img">
                                        <img src="./assets/images/subject-image/${c.subject_image}" width="25px" height="25px" alt="">
                                    </div>
                                    <div>${c.subject_name}</div>
                                </div>
                                <div class="main-area__course-table-row-col-2">${c.subject_class}</div>
                                <div class="main-area__course-table-row-col-3">${c.subject_point_10}</div>
                                <div class="main-area__course-table-row-col-4">${c.subject_point_4}</div>
                                <div class="main-area__course-table-row-col-5">${c.subject_point_A}</div>
                                <div class="main-area__course-table-row-col-6">${c.subject_status}</div>
                            </div>
                        `;
                    }
                    e.innerHTML = coursesHTML;
                }
            });
    });
}


//Tính năng [Tìm kiếm môn học]
function findCourses() {
    let searchInput = document.querySelector('.search-course__input');
    
    searchInput.addEventListener('blur', function () {
        if (searchInput.value == '') {
            this.classList.add('outlineX3');
            setTimeout(() => {
                this.classList.remove('outlineX3');
            }, 1500);
        } else 
        {
            //Tránh dính với ROW main.
            let coursesNames = document.querySelectorAll('.main-area__course-table-row-col-1 > div:nth-child(2)');
            
            for (let courseNameElement of coursesNames) {
                let courseName = courseNameElement.innerText;

                if (searchInput.value.toLowerCase() === courseName.toLowerCase()) {
                    courseNameElement.parentNode.parentNode.classList.add('outlineX3');
                    setTimeout(() => {
                        courseNameElement.parentNode.parentNode.classList.remove('outlineX3');
                    }, 1500);
                }
            }
        }

    });
}

// Nạp [Điểm TB hệ 10 / 4].
function caclPoint(){
    fetch("./assets/json/courses-table.json")
    .then(res => res.json())
    .then(data => {
        let totalPoint_10 = data.reduce(function(total, currentPoint){
            return total + parseFloat(currentPoint.subject_point_10);
        }, 0);

        let totalPoint_4 = data.reduce(function(total, currentPoint){
            return total + parseFloat(currentPoint.subject_point_4);
        }, 0);

        let averagePoint_10 = totalPoint_10 / data.length;
        let averagePoint_4 = totalPoint_4 / data.length;

        let roundAverage_10 = averagePoint_10.toFixed(1);
        let roundAverage_4 = averagePoint_4.toFixed(1);

        // console.log(roundAverage_10);
        // console.log(roundAverage_4);

        document.getElementById('totalPoint-10').innerText = roundAverage_10;
        document.getElementById('totalPoint-4').innerText = roundAverage_4;

    })
}

//Nạp [Buttons vào Slider].
function addButtons() {
    //--------Tạo ra các Buttons:
    let sliderIMGs = document.querySelectorAll('.main-area__news-function-slider > div');
    let num = sliderIMGs.length;
    let h = '';
    for (let i = 0; i < num; i++) {
        h += `
        <button class="main-area__news-function-slider-button"></button>
        `;
    }

    //Lấy ra vị trí chèn các Buttons:
    let sliderButtonsPlace = document.querySelector('.main-area__news-function-slider-button-place');
    // console.log(sliderButtonsPlace);
    sliderButtonsPlace.innerHTML = h;


    //--------Vì sử dụng thuộc tính absolute, phải set lại height cho Slider.
    let sliderElement = document.querySelector('.main-area__news-function-slider');
    let sliderImage = document.querySelector('.main-area__news-function-slider img');
    sliderElement.style.height = `${sliderImage.clientHeight}px`;  
    

    //--------Hiển thị các slider khi bấm vào Button:
    let sliderButtons = document.querySelectorAll('.main-area__news-function-slider-button');
    let sliderDivs = document.querySelectorAll('.main-area__news-function-slider > div');

    let current = -1;

    function showSlider(index) {
        //Set lại các sliders thành NONE
        sliderDivs.forEach(div => {
            div.style.display = 'none';
        });

        //Set lại các Active-Buttons thành NONE
        sliderButtons.forEach(btn => {
            btn.classList.remove('main-area__news-function-slider-button--active');
        });

        //Chỉ có slider[index] được hiện
        sliderDivs[index].style.display = 'block'; 

        //Chỉ có button[index] được hiện
        sliderButtons[index].classList.add('main-area__news-function-slider-button--active');
    }

    sliderButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            showSlider(index);
            clearInterval(timer);
            runSlider();
        });
    });

    let nextButton = document.querySelector('.main-area__news-function-slider-button-go--next');
    let prevButton = document.querySelector('.main-area__news-function-slider-button-go--prev');

    nextButton.addEventListener('click', function() {
        current++;
        if (current === num) {
            current = 0;
        }
        showSlider(current);
        clearInterval(timer);
        runSlider();
    });

    prevButton.addEventListener('click', function() {
        current--;
        if (current < 0) {
            current = num - 1;
        }
        showSlider(current);
        clearInterval(timer);
        runSlider();
    });

    //Set thời gian tự chuyển Slider.
    let timer = null;
    let runSlider = function(){
        timer = setInterval(() => {
            nextButton.click();
        }, 3000)
    }

    runSlider();
    showSlider(3);
}   

//Tính năng [Kiểm tra thông tin đăng nhập]
function Login() {
    //Khi User chủ động tìm nút Login
    let loginEnter = document.querySelector('.usermenu-function-name-login');
    let modalForm = document.querySelector('.modal-form');
    loginEnter.addEventListener('click', function () {
        modalForm.classList.remove('close');
        modalForm.classList.toggle('open-flex');
    });


    let usernameInput = document.getElementById('username-input');
    let passwordInput = document.getElementById('password-input');
    let loginButton = document.querySelector('.modal-form__login-button');

    loginButton.addEventListener('click', function () {
        let usernameTyping = usernameInput.value;
        let passwordTyping = passwordInput.value;

        if (usernameTyping == '' || passwordTyping == '') 
        {
            alert('Bạn chưa nhập thông tin')
        } else {

        fetch("./assets/json/user.json")
            .then(res => res.json())
            .then(data => {
                let validUser = data.find(user => user.username === usernameTyping && user.password === passwordTyping);

                if (validUser) {
                    alert('Đăng nhập thành công');
                    modalForm.classList.add('close');
                    changeToLogged();
                } else {
                    alert('Tài khoản hoặc mật khẩu bị sai');
                }
            })
            .catch(error => console.error("Dữ liệu từ Server bị lỗi", error));
        }
    });
}

function changeToLogged(){
    document.querySelector('.nav__navbar-user--non-logged')
    .classList.add('close');

    document.querySelector('.nav__navbar-user--logged')
    .classList.add('open-flex');
}

//Nạp [Danh sách Sidebar item đã chỉnh ActivePage cho trang hiện hành]
function activePage(currentPage) {
    fetch("./assets/json/sidebar-items.json")
    .then(res => res.json())
    .then(data => {
        data.forEach(function(page, index){
            if (page.access == currentPage) {
                page.checked = 'checked';
            }

            
            //Giới hạn tính năng in KQ học tập chỉ HĐ ở HomePage
            if (currentPage == 'homepage') {
                data[3].checked = 'none';
            }
        });
        

        let s = "";
        for (let c of data)
        s+=`
        <li class="sidebar-area__list-item sidebar-area__list-item--${c.checked} animate__animated animate__flipInX">
            <a href="${c.link}" class="sidebar-area__list-item-link-to">
                <div class="sidebar-area__list-item-circle-icon">
                    <i class="sidebar-area__list-item-icon ${c.icon}"></i>
                </div>
                <div class="sidebar-area__list-item-name">${c.name}</div>
            </a>
        </li>
        `;
    

        let e = document.getElementById("sidebar-menu-item");
        if (e !== null)
            e.innerHTML += s;
    })
}

//Tính năng [In kết quả khoá học]
function letPrint(){
    setTimeout(function(){
        let printButton = document.querySelector('.print-icon').parentNode.parentNode.parentNode;
   

        printButton.addEventListener('click', function(){
            // Hiển thị hộp thoại in
            window.print();
        });
    }, 500);
}

//Tính năng [Set chiều cao cho Top-Navigation]
//Do set Nav có Position = Fixed.
function setHeightNav(){
    let navHeight = document.querySelector('nav').clientHeight;
    let bodyElement = document.querySelector('body');

    bodyElement.style.marginTop = `${navHeight}px`;
}

//Tính năng [Đổi tab]
function changeTab(){
    let tabItems = document.querySelectorAll('.main-area-left-tab-item');
    let tabPanes = document.querySelectorAll('.main-area-left-tab-pane');
    
    let tabActive = document.querySelector('.main-area-left-tab-item--active')
    let line = document.querySelector('.main-area-left-tab-line');
    

    line.style.left = `${tabActive.offsetLeft}px`;
    line.style.width = `${tabActive.offsetWidth}px`;

    tabItems.forEach(function(tab, index){
        const pane = tabPanes[index]
        tab.onclick = function (){
            document.querySelector('.main-area-left-tab-item--active')
            .classList.remove('main-area-left-tab-item--active')
            this.classList.add('main-area-left-tab-item--active')


            line.style.left = `${this.offsetLeft}px`;
            line.style.width = `${this.offsetWidth}px`;


            document.querySelector('.main-area-left-tab-pane--active')
            .classList.remove('main-area-left-tab-pane--active')
            pane.classList.add('main-area-left-tab-pane--active')

        }
    })
}

//Cấu trúc 1 object trade
class Trade {
    constructor(name, howMany, code) {
        this.name = name;
        this.howMany = howMany;
        this.code = code;
    }
}
let tradeHistory = [];

//Tính năng [Đổi quà, lưu LS giao dịch]
function clickExchange() {
    setTimeout(function() {
        let exchangeButtons = document.querySelectorAll('.main-area__gift-list-get-button');
        let quantityInputs = document.querySelectorAll('.main-area__gift-list-quantity-set');

        fetch("./assets/json/gift-lists.json")
        .then(res => res.json())
        .then(data => {
            exchangeButtons.forEach(function(button, index){
                button.addEventListener('click', function(){
                    let valueInput = parseInt(quantityInputs[index].value); 
                    if (!isNaN(valueInput) && valueInput >= data[index].need) {
                        let howMany = Math.floor(valueInput / data[index].need);
                        let code = Math.floor(Math.random() * 10e8);
                        
                        let tradeObj = new Trade(data[index].name, howMany, code);
                        
                        alert(`
                        Bạn đã đổi thành công ${howMany} ${data[index].name}
                        Mã giao dịch: ${code}
                        `);
                        
                        tradeHistory.push(tradeObj);

                        let insertPlace = document.querySelector('#insertPlace');
                    
                        let h = '';
                        for (let p of tradeHistory){
                            h += 
                            `
                            <div class="main-area__gift-history-row flex">
                                <div class="main-area__gift-history-col-1">
                                    ${p.name}
                                </div>
                                <div class="main-area__gift-history-col-2">${p.howMany}</div>
                                <div class="main-area__gift-history-col-3">${p.code}</div>
                            </div>
                            `
                        }


                        insertPlace.innerHTML = h;
                    }
                    else alert('Số lượng nhập vào không hợp lệ');
                });
            });
        });

    }, 1000); //Phòng trường hợp DS quà chưa được nạp lên Page
}

//Tính năng [Trượt lên top trang]
function gotoTop() {
    let toTopbtn = document.querySelector('.go-to-top');
    
    window.addEventListener("scroll", function() {
        if (window.scrollY > 100) {
            toTopbtn.classList.add('show');
            toTopbtn.onclick = function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            };
        } else {
            toTopbtn.classList.remove('show');
        }
    });
}

//Tính năng [Mở list NAV]
function openNewsList() {
    let NewsListElements = document.querySelectorAll('.main-area-news-list');
    let Lists = document.querySelectorAll('.news-small-lists');

    NewsListElements.forEach(function(newList, index) {
        newList.addEventListener('click', function() {
            let openList = document.querySelector('.open-list');
            if (openList) {
                openList.classList.remove('open-list');
            } else
            Lists[index].classList.toggle('open-list');
        });
    });
}

//Tính năng [Nhận các tin nhỏ và đổi chỗ]
function changeNews() {
    let mainTitle = document.querySelector('.main-area__news-top-desc > h3 > a');
    let mainContent = document.querySelector('.main-area__news-top-desc > p > a');
    let mainPicture = document.querySelector('.main-area__news-top-img img');

    let childNews = document.querySelectorAll('.main-area__news-bottom-1-3');

    childNews.forEach(function (news, index) {
        news.addEventListener('click', function () {
            let childTitle = news.querySelector('h3').textContent;
            let childContent = news.querySelector('p').textContent;
            let childPicture = news.querySelector('img').getAttribute('src');

            mainTitle.textContent = childTitle;
            mainContent.textContent = childContent;
            mainPicture.setAttribute('src', childPicture);
        });
    });
}


//Tính năng [AUTO COMPLETE SEARCH]
function autoComplete() {
    
    fetch("./assets/json/suggest-lists.json")
        .then(res => res.json())
        .then(data => {
            let inputBox = document.getElementById('search-input');
            let suggestListAdd = document.getElementById('search-suggest-lists');
        
        
            inputBox.addEventListener('keyup', handleInputEvent);
            inputBox.addEventListener('focus', handleInputEvent);
            
            function handleInputEvent(event) {
                let inputValue = this.value;
                let htmlAdd = '';
        
                // suggestListAdd.innerHTML = ''; 
        
                for (let list of data) {
                    if (list.suggestName.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0) {
                        htmlAdd += `<li class = "search-suggest-list"><a href="${list.suggestLink}">${list.suggestName}</a></li>`;
                    }
                }
        
                suggestListAdd.innerHTML = htmlAdd;
            }
        })
}

function clickOnSuggest(){
    let inputBox = document.getElementById('search-input');
    let navHeight = document.querySelector('nav').clientHeight;

    inputBox.addEventListener('focus', function(){
        setTimeout(function(){
            document.querySelectorAll('.search-suggest-list').forEach(function(item){
                item.addEventListener('click', function(){
                    setTimeout(function(){
                        let currentY = window.scrollY;
                       
                        window.scrollTo({
                            top: currentY - navHeight,
                            behavior: 'smooth'
                        });
                        let hrefValue = item.querySelector('a').getAttribute('href');

                        let targetElement = document.getElementById(hrefValue.substring(1));
                        targetElement.classList.add('colorX3');
                        
                        setTimeout(function(){
                            targetElement.classList.remove('colorX3')
                        }, 3000);

                    }, 50);
               });
            });
        }, 500);
    });
}



function openSearch(){
    let searchButton = document.querySelector('.fa-magnifying-glass')
    let searchInput = document.getElementById('search-input'); // Use getElementById on the document object


    searchButton.addEventListener('click', function(e){
        let searchInput = document.getElementById('search-input'); // Use getElementById on the document object
        searchInput.classList.toggle('close');
    })

    searchInput.addEventListener('focus', function(){
        document.getElementById('search-suggest-lists').classList.remove('close');
    })
    searchInput.addEventListener('blur', function(){
        setTimeout(function(){
            document.getElementById('search-suggest-lists').classList.add('close');
        },700)
    })
}

function lightUp(){
    let main = document.querySelector('.animation');

    let bordersArray = ['50%', '0'];
    let blursArray = ['0', '5px'];
    let colorsArray = ['#9256F9', '#6ACDE7', '#DB5FED', '#88E5D2'];

    //Lấy chiều cao, chiều rộng của Document
    let width = document.documentElement.clientWidth;
    let height = document.documentElement.clientHeight;
    //Số lượng bông tuyết
    var count = 40;

    function createElementRandom(){
        for (let i = 0; i < count; i++){
            let randomLeft = Math.floor(Math.random()*width);   //Random vị trí LEFT cách một khoảng = [0; width];
            let randomTop = Math.floor(Math.random()*height);   //Random vị trí TOP cách một khoảng = [0; top];
            let color = Math.floor(Math.random()*colorsArray.length) //Random một màu ngẫu nhiên trong DS
            let border = Math.floor(Math.random()*2)                
            let blur = Math.floor(Math.random()*2)  
            let widthElement = Math.floor(Math.random()*5) + 5; //Random chiều rộng của bông tuyết: 5 - 9
            let timeAnimation = Math.floor(Math.random()*12) + 8; //Random thời gian chạy animation: 8 - 19 


            let div = document.createElement("div");
            div.style.position = 'absolute';
            div.style.backgroundColor = colorsArray[color];
            div.style.width = widthElement + 'px';
            div.style.height = widthElement + 'px';

            div.style.marginLeft = randomLeft + 'px';
            div.style.marginTop = randomTop + 'px';
            div.style.borderRadius = bordersArray[border];
            div.style.filter = `blur(${blursArray[blur]})`;
            div.style.animation = `moveDown ${timeAnimation}s ease-in infinite`
            
            main.appendChild(div);
        }
    }
    createElementRandom()
}
