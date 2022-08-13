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