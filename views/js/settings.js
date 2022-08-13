function passwordToggleCurrent() {
  var input = document.getElementById("current-password");
  var eyeOpen = document.getElementById("eye-open1");
  var eyeClosed = document.getElementById("eye-closed1");

  if (input.type === "password") {
    input.type = "text";
    eyeClosed.style.display = "none";
    eyeOpen.style.display = "block";
  } else {
    input.type = "password";
    eyeOpen.style.display = "none";
    eyeClosed.style.display = "block";
  }
}

function passwordToggleNew() {
  var input = document.getElementById("new-password");
  var eyeOpen = document.getElementById("eye-open2");
  var eyeClosed = document.getElementById("eye-closed2");

  if (input.type === "password") {
    input.type = "text";
    eyeClosed.style.display = "none";
    eyeOpen.style.display = "block";
  } else {
    input.type = "password";
    eyeOpen.style.display = "none";
    eyeClosed.style.display = "block";
  }
}

function passwordToggleConfirm() {
  var input = document.getElementById("confirm-password");
  var eyeOpen = document.getElementById("eye-open3");
  var eyeClosed = document.getElementById("eye-closed3");

  if (input.type === "password") {
    input.type = "text";
    eyeClosed.style.display = "none";
    eyeOpen.style.display = "block";
  } else {
    input.type = "password";
    eyeOpen.style.display = "none";
    eyeClosed.style.display = "block";
  }
}

let position = document.querySelector('#position');
let department = document.querySelector('#department');
console.log(position)
console.log(department)
position.addEventListener("change", () => {
  console.log(position.value)
  if (position.value == "Guard") {
    department.setAttribute("value", "Security");
  } else if (position.value == "Receptionist") {
    department.setAttribute("value", "Hospitality");
  } else if (position.value == "Driver") {
    department.setAttribute("value", "Logistics");
  } else if (position.value == "Chef") {
    department.setAttribute("value", "Services");
  } else if (position.value == "Room Attendant") {
    department.setAttribute("value", "Hospitality");
  } else if (position.value == "Maintenance Technician") {
    department.setAttribute("value", "Services");
  } else if (position.value == "Janitor") {
    department.setAttribute("value", "Services");
  } else if (position.value == "Valet") {
    department.setAttribute("value", "Hospitality");
  } else if (position.value == "Concierge") {
    department.setAttribute("value", "Hospitality");
  } else if (position.value == "Manager") {
    department.setAttribute("value", "Admin");
  }
})

let settingsTabBtns = document.querySelectorAll(".settings-tab-btn");
let settingsTabPages = document.querySelectorAll(".settings-tab-page");
let editProfilePage = document.querySelector("#edit-profile");
let mobilePictureBtnWrap = document.querySelector(".mobile-picture-btn-wrap");

settingsTabBtns.forEach((tabBtn) => {
  tabBtn.addEventListener("click", function () {
    for (let i = 0; i < settingsTabBtns.length; i++) {
      settingsTabBtns[i].classList.remove("current");
      settingsTabPages[i].classList.add("hide");
    }

    let pageTarget = document.querySelector(`${tabBtn.dataset.page}`);

    tabBtn.classList.add("current");
    pageTarget.classList.remove("hide");

    if (tabBtn.dataset.page === "#edit-profile") {
      mobilePictureBtnWrap.classList.remove("hide");
    } else {
      mobilePictureBtnWrap.classList.add("hide");
    }
  });
});

let input = document.querySelector("#profile-picture");
let pictureName = document.querySelector("#image-name");
let image = document.querySelector("#profile-img-desktop");

input.addEventListener("change", updateImageNameDesk);

function updateImageNameDesk() {
  const curFiles = input.files;

  if (curFiles.length === 0) {
    pictureName.textContent = "No files currently selected for upload";
  } else {
    for (const file of curFiles) {
      if (validFileType(file)) {
        if (file.name.length > 25) {
          pictureName.textContent = `${file.name.slice(
            0,
            25
          )}..., ${returnFileSize(file.size)}.`;
        } else {
          pictureName.textContent = `${file.name}, ${returnFileSize(
            file.size
          )}.`;
        }
        image.src = URL.createObjectURL(file);
      } else {
        pictureName.textContent = `Not a valid file type. Update your selection.`;
      }
    }
  }
}

let mobileInput = document.querySelector("#profile-picture-mobile");
let mobilePictureName = document.querySelector("#image-name-mobile");
let mobileImage = document.querySelector("#profile-img-mobile");

mobileInput.addEventListener("change", updateImageName);

function updateImageName() {
  const curFiles = mobileInput.files;

  if (curFiles.length === 0) {
    mobilePictureName.textContent = "No files currently selected for upload";
  } else {
    for (const file of curFiles) {
      if (validFileType(file)) {
        if (file.name.length > 15) {
          mobilePictureName.textContent = `${file.name.slice(
            0,
            15
          )}..., ${returnFileSize(file.size)}.`;
        } else {
          mobilePictureName.textContent = `${file.name}, ${returnFileSize(
            file.size
          )}.`;
        }
        mobileImage.src = URL.createObjectURL(file);
      } else {
        mobilePictureName.textContent = `Not a valid file type. Update your selection.`;
      }
    }
  }
}

const fileTypes = ["image/jpeg", "image/jpg", "image/png"];

function validFileType(file) {
  return fileTypes.includes(file.type);
}

function returnFileSize(number) {
  if (number < 1024) {
    return number + "bytes";
  } else if (number >= 1024 && number < 1048576) {
    return (number / 1024).toFixed(1) + "KB";
  } else if (number >= 1048576) {
    return (number / 1048576).toFixed(1) + "MB";
  }
}
