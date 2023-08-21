//Nạp [Danh sách thông báo]
function loadNotify(){
    fetch("./assets/json/notifications.json")
    .then(res => res.json())
    .then(data =>{
        let h = "";
        for (let c of data)
        h+= `
        <li class="navmenu-list flex navmenu-list--important-${c.important}">
            <div class="navmenu-list__image">
                <img src="./assets/images/notify-images/${c.image}" alt="desc-image">
            </div>

            <div class="navmenu-list__body">
                <div class="navmenu-list_body-title">
                    ${c.title}
                </div>
                <div class="navmenu-list_body-content">
                    ${c.content}
                </div>
                <div class="navmenu-list_body-timepass">
                    ${c.timepass}
                </div>
            </div>
        </li>
        `;

        let e = document.getElementById("notification-lists");
        if (e !== null){
            e.innerHTML += h;
        }
    })
}

//Nạp [Danh sách môn học]
function loadSubject(){
    fetch("./assets/json/courses-table.json")
    .then(res => res.json())
    .then(data =>{
        let s = "";
        for (let c of data)
        s+=`
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

        let e = document.getElementById("subject-lists");
        if (e !== null)
            e.innerHTML += s;
    })  
}

// function loadSidebar(){
//     fetch("./assets/json/sidebar-items.json")
//     .then(res => res.json())
//     .then(data =>{
//         let s = "";
//         for (let c of data)
//         s+=`
//         <li class="sidebar-area__list-item sidebar-area__list-item--${c.checked} animate__animated animate__flipInX">
//             <a href="${c.link}" class="sidebar-area__list-item-link-to">
//                 <div class="sidebar-area__list-item-circle-icon">
//                     <i class="sidebar-area__list-item-icon ${c.icon}"></i>
//                 </div>
//                 <div class="sidebar-area__list-item-name">${c.name}</div>
//             </a>
//         </li>
//         `;
    

//         let e = document.getElementById("sidebar-menu-item");
//         if (e !== null)
//             e.innerHTML += s;
//     })
// }


//Nạp [BXH thành tích]
function loadTopStu(){
    fetch("./assets/json/top-student.json")
    .then(res => res.json())
    .then(data =>{
        let h = '';
        for (let s of data){
            h += 
            `
            <div class="main-area__top-student-table-row flex al-it-ct">
                <div class="main-area__top-student-table-col-1">
                    <img src="./assets/images/user-avatar/${s.avatar}" alt="" class="main-area__top-student-table-col-1-img">
                </div>
                <div class="main-area__top-student-table-col-2 flex clm">
                    <div class="main-area__top-student-table-col-2-name">
                            ${s.name}
                    </div>
                    <div class="main-area__top-student-table-col-2-email">
                            ${s.email}
                    </div>
                </div>
                <div class="main-area__top-student-table-col-3">
                    ${s.congrat}
                </div>
            </div>
            `
        }

        let insertPlace = document.querySelector('.main-area__top-student-table-padding');
        // console.log(insertPlace);
        insertPlace.innerHTML = h;
    })
}

//Nạp [Danh hiệu hiện có]
function loadLable() {
    function insertTable() {
        return new Promise(function(resolve) {
            let LeftTable = document.querySelector('.main-area__label-own-table-half:nth-child(1)');
            let RightTable = document.querySelector('.main-area__label-own-table-half:nth-child(2)');

            for (let i = 0; i < 4; i++) {
                LeftTable.innerHTML += `
                    <div class="main-area__lable-own-table-row flex al-it-ct">
                        <div class="main-area__lable-own-table-col-1">
                            <img class="animate__animated animate__pulse" alt="">
                        </div>
                        <div class="main-area__lable-own-table-col-2">
                            <p></p>
                        </div>
                        <div class="main-area__lable-own-table-col-3">
                            <p></p>
                        </div>
                    </div>
                `;

                RightTable.innerHTML += `
                    <div class="main-area__lable-own-table-row flex al-it-ct">
                        <div class="main-area__lable-own-table-col-1">
                            <img class="animate__animated animate__pulse" alt="">
                        </div>
                        <div class="main-area__lable-own-table-col-2">
                            <p></p>
                        </div>
                        <div class="main-area__lable-own-table-col-3">
                            <p></p>
                        </div>
                    </div>
                `;
            }

            setTimeout(resolve, 500); // Đảm bảo promise đã hoàn thành sau khi đã thêm nội dung vào bảng
        });
    }

    insertTable().then(function() {
        fetch("./assets/json/lable-table.json")
            .then(res => res.json())
            .then(data => {
                let lableImages = document.querySelectorAll('.main-area__lable-own-table-col-1 img');
                let lableNames = document.querySelectorAll('.main-area__lable-own-table-col-2');
                let lableQuantitys = document.querySelectorAll('.main-area__lable-own-table-col-3');

                for (let i = 0; i < lableNames.length; i++) {
                    lableImages[i].setAttribute('src', `./assets/images/label-image/${data[i].image}`);
                    lableNames[i].innerText = `${data[i].name}`;
                    lableQuantitys[i].innerText = `${data[i].quantity}`;
                }
            });
    });
}

//Nạp [Danh hiệu hiện có]
function loadColLable(){
    fetch("./assets/json/lable-table.json")
    .then(res => res.json())
    .then(data =>{
        let h = '';
        for (let one of data){
            h+=
            `
            <div class="main-area__lable-own-table-row flex al-it-ct">
                <div class="main-area__lable-own-table-col-1">
                    <img src="./assets/images/label-image/${one.image}" alt="">
                </div>
                <div class="main-area__lable-own-table-col-2">
                    <p>${one.name}</p>
                </div>
                <div class="main-area__lable-own-table-col-3">
                    <p>${one.quantity}</p>
                </div>
            </div>
            `
        }
        let insertPlace = document.querySelector('.main-area__label-own-table-padding');
        insertPlace.innerHTML += h; 
    })
}

//Nạp [Danh sách đổi thưởng]
function loadGifts(){
    let insertPlace = document.querySelector('.main-area__gift-lists');
    let h = '';

    fetch("./assets/json/gift-lists.json")
    .then(res => res.json())
    .then(data => {
        var promise = new Promise(function(resolve){
            for (let i = 0; i < data.length; i++){
                h+=
                `
                <div class="main-area__gift-list animate__animated animate__flash">
                    <div class="main-area__gift-list-image"></div>
                    
                    <div class="main-area__gift-list-text">
                        <div class="main-area__gift-list-gift-list-name">
                            ...
                        </div>
                        <div class="main-area__gift-list-need">
                            ...
                        </div>
                        <div class="main-area__gift-list-quantity">
                            <p class="main-area__gift-list-quantity-desc">
                                Bạn muốn đổi:
                            </p>
                            <input class="main-area__gift-list-quantity-set" type="number">
                            <p class="main-area__gift-list-quantity-desc">
                                huy hiệu
                            </p>
                        </div>
                        <div class="main-area__gift-list-get-button">
                            <button>Đổi</button>
                        </div>
                        <div class="main-area__gift-list-count">
                        </div>
                    </div>
                </div>
                `
            }
    
            insertPlace.innerHTML= h;
            setTimeout(resolve, 1000);
        })

        .then(function(){
            data.forEach(function(gift, index){
                let insertGiftInfo = document.querySelector(`.main-area__gift-list:nth-child(${index + 1})`);

                insertGiftInfo.querySelector('.main-area__gift-list-image').setAttribute('style',`background-image: url(./assets/images/gift-image/${gift.image}`)
                insertGiftInfo.querySelector('.main-area__gift-list-gift-list-name').innerText = `${gift.name}`;
                insertGiftInfo.querySelector('.main-area__gift-list-need').innerText = `${gift.need} huy hiệu ${gift.needIs}`;

            })
        })
        
    })
}