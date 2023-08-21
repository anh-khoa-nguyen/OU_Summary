function allNeeded(){
    loadNotify();   //Nạp [Danh sách thông báo]
    Login()         //Tính năng [Kiểm tra thông tin đăng nhập]
    closeModal();   //Tính năng [Đóng modal-form]
    openNav();      //Tính năng [Mở các Navigation]
    gotoTop()       //Tính năng [Trượt lên top trang]
    setHeightNav()  //Tính năng [Set chiều cao cho Top-Navigation]
}


window.onload = function(){
    const currentPage = document.querySelector('body').getAttribute('data-page');
    activePage(currentPage); //Nạp [Danh sách Sidebar item đã chỉnh ActivePage cho trang hiện hành]
    lightUp() //Nạp [Animation Snowfall]
    switch(currentPage) {
        case 'homepage':
            
            allNeeded();
            getToday();     //Nạp [Ngày - Tháng - Năm hiện tại]
            addButtons();   //Nạp [Buttons vào Slider].
            caclPoint();    // Nạp [Điểm TB hệ 10 / 4].

            findCourses();      //Tính năng [Tìm kiếm môn học]
            sortingCourses();   //Tính năng [Sắp xếp môn học]
            coursesResult();    //Tính năng [Kết quả khoá học - Đậu/Rớt]
            letPrint()          //Tính năng [In kết quả khoá học]

            loadSubject();      //Nạp [Danh sách môn học]
            loadLable();        //Nạp [Danh hiệu hiện có]
            loadTopStu()        //Nạp [BXH thành tích]

            autoComplete();
            clickOnSuggest();
            openSearch();
            loadMusicPlayer();
            break;
        case 'news-page':
            allNeeded();
            openNewsList()      //Tính năng [Mở list NAV]
            changeNews()        //Tính năng [Nhận các tin nhỏ và đổi chỗ]
            outsideNav();       //Tính năng [Đóng tất cả Navigation đang mở - Khi bấm ra ngoài]
            
            break;
        case 'news-detail-page':
            allNeeded();
            openNewsList()  //Tính năng [Mở list NAV]

            outsideNav();
            break;
        case 'gift-page':
            allNeeded();
            
            loadColLable();  //Nạp [Danh hiệu hiện có]
            changeTab();     //Tính năng [Đổi tab]
            loadGifts();     //Nạp [Danh sách đổi thưởng]
            clickExchange();    //Tính năng [Đổi quà, lưu LS giao dịch]
            // unsetFunction();

            outsideNav();
            break;
        default:
            break;
    }
};


// checkHTMLpage();
// loadNotify();
// 
// loadSidebar();
// 
// 
// getToday();
// 
// openNav();
// 
// 
// 
// closeModal();
// 
// Login()



// }