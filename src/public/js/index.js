//Socket del lado del Cliente
const socketClient = io();

const form = document.getElementById("form");
const inputTitle = document.getElementById("inputTitle");
const inputDescription = document.getElementById("inputDescription");
const inputCode = document.getElementById("inputCode");
const inputPrice = document.getElementById("inputPrice");
const inputStatus = document.getElementById("inputStatus");
const inputStock = document.getElementById("inputStock");
const inputCategory = document.getElementById("inputCategory");
const inputThumbnails = document.getElementById("inputThumbnails");
const table = document.getElementById("table");
const tableBody = document.getElementById("tableBody");

form.onsubmit = (e) => {
  e.preventDefault();
  const product = {
        "title": inputTitle.value,
        "description": inputDescription.value,
        "code": inputCode.value,
        "price": inputPrice.value,
        "status": inputStatus.value,
        "stock": inputStock.value,
        "category": inputCategory.value,
        "thumbnails": inputThumbnails.value,
    };
  socketClient.emit("crearProducto", product);
  inputTitle.value = ""
  inputDescription.value = ""
  inputCode.value = ""
  inputPrice.value = ""
  inputStatus.value = ""
  inputStock.value = ""
  inputCategory.value = ""
  inputThumbnails.value = ""
};

socketClient.on("productoCreado", (product) => {
  const { id, title, description, code, price, status, stock, category, thumbnails } = product;
  const row = `
    <tr>
        <td>${id}</td>
        <td>${title}</td>
        <td>${description}</td>
        <td>${code}</td>
        <td>${price}</td>
        <td>${status}</td>
        <td>${stock}</td>
        <td>${category}</td>
        <td>${thumbnails}</td>
    </tr>`;
  table.innerHTML += row;
  console.log(title)
  Toastify({
    text:`Producto ${title} agregado con éxito.`,
    duration: 5000,
    style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
  }).showToast()
});