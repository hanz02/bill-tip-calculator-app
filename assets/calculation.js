document.addEventListener("DOMContentLoaded", function () {
  const icon_inputs = document.querySelectorAll(".input_icon input");

  const input_bill = document.querySelector("#bill_amount");
  const input_person = document.querySelector("#num_people");
  const input_tips = document.querySelectorAll(".opt_btn");
  let selected_tip = document.querySelector(".opt_btn.active");
  let custom_tip = document.querySelector("#custom_tip");

  const out_tip = document.querySelector("#out_tip");
  const out_total = document.querySelector("#out_total");

  const reset_btn = document.querySelector("#reset_btn");

  reset_btn.addEventListener("click", function () {
    input_bill.value = "";
    input_person.value = "";
    selected_tip.classList.remove("active");
    custom_tip.value = "";
    out_tip.innerHTML = "$0.00";
    out_total.innerHTML = "$0.00";

    reset_btn.setAttribute("disabled", "disabled");
  });

  let clearActiveClasses = function (elements) {
    elements.forEach(function (element) {
      element.classList.remove("active");
    });
  };

  let calcOutputAmount = function () {
    let verifyResult = true;
    icon_inputs.forEach(function (input) {
      if (
        input.value == null ||
        input.value == 0 ||
        input.value === "" ||
        selected_tip == null
      ) {
        return (verifyResult = false);
      } else if (selected_tip.value == "") {
        return (verifyResult = false);
      }
    });

    if (verifyResult == true) {
      let tip =
        (input_bill.value * (selected_tip.value / 100)) / input_person.value;
      out_tip.innerHTML = "$" + tip.toFixed(2);

      let bill =
        (input_bill.value * (1 + selected_tip.value / 100)) /
        input_person.value;
      out_total.innerHTML = "$" + bill.toFixed(2);

      reset_btn.removeAttribute("disabled");
    } else {
      out_tip.innerHTML = "$0.00";
      out_total.innerHTML = "$0.00";

      reset_btn.setAttribute("disabled", "disabled");
    }
  };

  let displayWarningInput = function (e) {
    if (e.target.value == 0 && e.target.value !== "") {
      e.target
        .closest(".input_group")
        .querySelector(".warning_msg")
        .classList.add("warning");
      e.target.closest(".input_icon").classList.add("warning");
    } else {
      e.target
        .closest(".input_group")
        .querySelector(".warning_msg")
        .classList.remove("warning");
      e.target.closest(".input_icon").classList.remove("warning");
    }
  };

  //* attach keypress event on all input fields
  icon_inputs.forEach(function (input) {
    input.addEventListener("keyup", function (e) {
      displayWarningInput(e);
      calcOutputAmount();
    });
  });

  //* attach click event on all tip selection
  input_tips.forEach(function (input) {
    input.addEventListener("click", function (e) {
      clearActiveClasses(input_tips);
      e.target.classList.add("active");
      selected_tip = e.target;

      calcOutputAmount();
    });
  });

  custom_tip.addEventListener("keyup", function (e) {
    calcOutputAmount();
  });
});
