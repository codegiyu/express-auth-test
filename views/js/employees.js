let employeesDropdownBtn1 = document.querySelector('#sort-btn-employees-1');
let employeesDropdown1 = document.querySelector('#sort-dropdown-employees-1');

employeesDropdownBtn1.addEventListener("click", function () {
  employeesDropdown1.classList.toggle("hide");
});

let employeeDropdowns = document.querySelectorAll('.btn-dropdown');
let employeeDropdownItems = document.querySelectorAll('.dropdown-item');

employeeDropdownItems.forEach(dropdownItem => {
  dropdownItem.addEventListener("click", function() {
    for (let i = 0; i < employeeDropdowns.length; i++) {
      employeeDropdowns[i].classList.add("hide");
    }
  });
});

window.onclick = function(event) {
  if (!event.target.matches('.dropdown-button') && !event.target.matches('.dropdown-button-text') && !event.target.matches('.dropdown-button-span') && !event.target.matches('.dropdown-button-icon')) {
    for (let i = 0; i < employeeDropdowns.length; i++) {
      let openDropdown = employeeDropdowns[i];
      if (!openDropdown.classList.contains('hide')) {
        openDropdown.classList.add('hide');
      }
    }
  }
}

let employeeTabBtns = document.querySelectorAll('.employee-tab-btn');
let mobileEmployeeTabBtns = document.querySelectorAll('.employee-tab-btn-mobile');
let employeeTabPages = document.querySelectorAll('.employee-tab-page');

employeeTabBtns.forEach(tabBtn => {
  tabBtn.addEventListener("click",function() {
    for (let i = 0; i < employeeTabBtns.length; i++) {
      employeeTabBtns[i].classList.remove('active');
      employeeTabPages[i].classList.add('hide');
      employeeTabPages[i].classList.remove('show');
      
    }

    let pageTarget = document.querySelector(`${tabBtn.dataset.page}`);

    setTimeout(() => {  
        tabBtn.classList.add('active');
        pageTarget.classList.remove('hide');
        pageTarget.classList.add('show');
        
    }, 100);
    
  });
});

mobileEmployeeTabBtns.forEach(tabBtn => {
    tabBtn.addEventListener("click",function() {
    for (let i = 0; i < mobileEmployeeTabBtns.length; i++) {
        mobileEmployeeTabBtns[i].classList.remove('active');
        employeeTabPages[i].classList.add('hide');
        employeeTabPages[i].classList.remove('show');
        
    }
  
    let pageTarget = document.querySelector(`${tabBtn.dataset.page}`);

    setTimeout(() => {  
        tabBtn.classList.add('active');
        pageTarget.classList.remove('hide');
        pageTarget.classList.add('show');
        
    }, 100);
      
    });
  });