const inputBill = document.querySelector(".input-bill");
const inputPeople = document.querySelector(".input-people");
const inputCustom = document.querySelector(".input-custom");
const btn5 = document.querySelector(".btn-5");
const btn10 = document.querySelector(".btn-10");
const btn15 = document.querySelector(".btn-15");
const btn25 = document.querySelector(".btn-25");
const btn50 = document.querySelector(".btn-50");
const btnReset = document.querySelector(".btn-reset");
const showTip = document.querySelector(".show-tip");
const showTotal = document.querySelector(".show-total");
const showWarning = document.querySelector("label span");

let billAmount, customPercent, numPeople, tipTotal, tipPerson, totalPerson;
let percent = 0;

const btnsPercent = [btn5, btn10, btn15, btn25, btn50, inputCustom];

function resetBtn() {
  inputBill.value = "";
  inputPeople.value = "";
  inputPeople.classList.remove("empty");
  inputCustom.value = "";
  btnsPercent.forEach(function (btn) {
    btn.classList.remove("click");
  });
  showTip.textContent = "$0.00";
  showTotal.textContent = "$0.00";
  showWarning.classList.remove("empty");
}

inputBill.addEventListener("change", function () {
  billAmount = Number(inputBill.value);
  console.log(billAmount);
  numPeople = Number(inputPeople.value);

  if (billAmount !== 0) {
    btnReset.removeAttribute("disabled");
  }

  if (numPeople === 0) {
    showWarning.classList.add("empty");
    inputPeople.classList.add("empty");
  }
});

btnsPercent.forEach(function (btn) {
  btn.addEventListener("pointerdown", function () {
    btn.classList.add("click");
    btnsPercent.forEach(function (btnInner) {
      if (btnInner !== btn) btnInner.classList.remove("click");
    });
    if (btn.id !== "custom") percent = Number(btn.innerHTML);
  });
});

inputPeople.addEventListener("change", function () {
  numPeople = Number(inputPeople.value);
  if (numPeople !== 0) {
    showWarning.classList.remove("empty");
    inputPeople.classList.remove("empty");
  } else if (numPeople === 0) {
    showWarning.classList.add("empty");
    inputPeople.classList.add("empty");
  }
});

btnReset.addEventListener("click", resetBtn);

document.querySelectorAll("input").forEach(function (input) {
  input.addEventListener("change", function () {
    billAmount = Number(inputBill.value);
    customPercent = Number(inputCustom.value);
    numPeople = Number(inputPeople.value);

    if (customPercent > 100) {
      alert("percentage cannot be greater than 100!");
      resetBtn();
    }

    if (percent === 0) {
      percent = customPercent;
    }

    if (billAmount !== 0 && percent !== 0 && numPeople !== 0) {
      tipTotal = billAmount * (percent / 100);
      tipPerson = tipTotal / numPeople;
      totalPerson = billAmount / numPeople + tipPerson;

      showTip.textContent = `$${tipPerson.toFixed(2)}`;
      showTotal.textContent = `$${totalPerson.toFixed(2)}`;
    }
  });
});
