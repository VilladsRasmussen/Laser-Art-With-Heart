const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const formStep = document.getElementById("formStep");

nextBtn.addEventListener("click", () => {
  const product = document.getElementById("product");
  const subproduct = document.getElementById("subproduct");
  const customization = document.getElementById("customization");

  if (product.value && subproduct.value && customization.value.trim()) {
    formStep.classList.add("slide-step-2");
  } else {
    alert("Please fill out all fields in Step 1 before continuing.");
  }
});

backBtn.addEventListener("click", () => {
  formStep.classList.remove("slide-step-2");
});

const productSelect = document.getElementById("product");
const subProductSelect = document.getElementById("subproduct");

const subProducts = {
  prod1: [
    "Vandbærer",
    "Fisken",
    "Vædderen",
    "Tyren",
    "Tvillingen",
    "Krebsen",
    "Løven",
    "Jomfruen",
    "Vægten",
    "Skorpionen",
    "Skytten",
    "Stenbukken",
  ],
  prod2: ["Times New Roman", "Comic Sans", "Arial"],
  prod3: [
    "Giraf, Fisk, Kanin, Hund",
    "Frø, Hval, Fisk, Krabbe",
    "Løve, Flodhest, Elefant, Flamingo",
  ],
};

productSelect.addEventListener("change", function () {
  const selectedProduct = this.value;
  subProductSelect.innerHTML =
    '<option value="">-- Vælg Sub-produkt --</option>';

  if (subProducts[selectedProduct]) {
    subProducts[selectedProduct].forEach(function (sub) {
      const option = document.createElement("option");
      option.value = sub.toLowerCase().replace(/\s+/g, "-");
      option.textContent = sub;
      subProductSelect.appendChild(option);
    });
  }
});
