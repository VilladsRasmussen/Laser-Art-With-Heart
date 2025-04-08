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
  prod2: ["1", "2", "3"],
  prod3: ["1", "2", ""],
};

productSelect.addEventListener("change", function () {
  const selectedProduct = this.value;
  subProductSelect.innerHTML =
    '<option value="">-- Select Sub-product --</option>';

  if (subProducts[selectedProduct]) {
    subProducts[selectedProduct].forEach(function (sub) {
      const option = document.createElement("option");
      option.value = sub.toLowerCase().replace(/\s+/g, "-");
      option.textContent = sub;
      subProductSelect.appendChild(option);
    });
  }
});
