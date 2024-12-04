
// <>Tăng số lượng
document.querySelector(".qtyplus").addEventListener("click", function () {
  var qtyInput = document.getElementById("qty");
  var currentValue = parseInt(qtyInput.value);
  if (currentValue < 20) {
    qtyInput.value = currentValue + 1; // Tăng số lượng
  }
});

// Giảm số lượng
document.querySelector(".qtyminus").addEventListener("click", function () {
  var qtyInput = document.getElementById("qty");
  var currentValue = parseInt(qtyInput.value);
  if (currentValue > 1) {
    qtyInput.value = currentValue - 1; // Giảm số lượng
  }
});

//read more
function toggleDescription() {
  const description = document.getElementById("product-description");
  const button = document.getElementById("toggle-description");

  if (description.classList.contains("expanded")) {
    description.classList.remove("expanded");
    button.textContent = "Xem thêm"; // Chuyển lại thành "Xem thêm"
  } else {
    description.classList.add("expanded");
    button.textContent = "Thu gọn"; // Thay đổi thành "Thu gọn"
  }
}

// Chức năng cuộn ngang
const scrollContainer = document.querySelector(".related-products-list");
const scrollLeftButton = document.querySelector(".scroll-left");
const scrollRightButton = document.querySelector(".scroll-right");

// Tính toán số lượng sản phẩm hiển thị
const productWidth = 300; // Kích thước mỗi sản phẩm (bao gồm margin/padding)
const visibleProducts = 5; // Số sản phẩm hiển thị trong khung
let currentScroll = 0; // Vị trí cuộn hiện tại

scrollLeftButton.addEventListener("click", () => {
  if (currentScroll > 0) {
    currentScroll--;
    scrollContainer.style.transform = `translateX(-${
      currentScroll * productWidth
    }px)`;
  }
});

scrollRightButton.addEventListener("click", () => {
  const maxScroll =
    document.querySelectorAll(".product-card").length - visibleProducts;
  if (currentScroll < maxScroll) {
    currentScroll++;
    scrollContainer.style.transform = `translateX(-${
      currentScroll * productWidth
    }px)`;
  }
});
