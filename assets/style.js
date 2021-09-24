document.addEventListener("DOMContentLoaded", function () {
  const input_fields = document.querySelectorAll(".input_icon input");
  const html = document.querySelector("html");

  let clearActiveClasses = function (elements) {
    elements.forEach(function (element) {
      element.closest(".input_icon").classList.remove("active");
    });
  };

  //* loop through each input fields and add event listener on them
  input_fields.forEach((field) => {
    field.addEventListener("click", function (e) {
      clearActiveClasses(input_fields);
      //* add 'active' css class on the parent of the input field
      const icon_field = this.closest(".input_icon");
      icon_field.classList.add("active");

      //* here we remove the 'active' css class on other input fields except for the current clicked one
    });
  });

  //* removed focused state styling on ALL input fields when clicked outside the input fields
  html.addEventListener("click", function (e) {
    e.stopPropagation();
    if (e.target.closest(".input_icon") == null) {
      input_fields.forEach(function (element) {
        element.closest(".input_icon").classList.remove("active");
      });
    }
  });
});
