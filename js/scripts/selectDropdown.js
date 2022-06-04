{
  function btnDropdown() {
    btnDropdownSelect.parentElement.classList.toggle("active");
  }

  const btnDropdownSelect = document.getElementById("js-open-select-custom");

  if (btnDropdownSelect) {
    btnDropdownSelect.addEventListener("click", btnDropdown);
  }
}
