// Hàm xử lý thêm sản phẩm vào giỏ hàng
function addToCart() {
    // Lấy thông tin sản phẩm
    const productName = document.querySelector(".product-info .title").textContent;
    const productPrice = document.querySelector(".product-info .price").textContent;
    const productImage = document.querySelector(".carousel-item.active img").src;
    const productQuantity = document.getElementById("qty").value;

    // Làm sạch giá (xóa "VND" và dấu phẩy)
    const cleanedPrice = productPrice.replace(' VND', '').replace(',', '').trim();

    // Tạo đối tượng sản phẩm
    const product = {
        name: productName,
        price: parseInt(cleanedPrice), // Lưu giá dưới dạng số
        image: productImage,
        quantity: parseInt(productQuantity),
        timestamp: new Date().toISOString() // Thêm thời gian cho lịch sử thanh toán
    };

    // Kiểm tra xem giỏ hàng có trong localStorage không, nếu không tạo mới
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Thêm sản phẩm vào giỏ hàng
    cart.push(product);

    // Lưu giỏ hàng đã cập nhật vào localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Hiển thị thông báo
    alert("Đã thêm sản phẩm vào giỏ hàng!");
}

// Gán hàm addToCart cho nút "Đặt hoa"
document.getElementById("add-to-cart").addEventListener("click", addToCart);

// Hàm xử lý thanh toán
function payAll() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Giỏ hàng trống. Vui lòng thêm sản phẩm!");
        return;
    }

    const username = localStorage.getItem("username");
    if (!username) {
        alert("Vui lòng đăng nhập để thực hiện thanh toán.");
        return;
    }

    if (confirm("Bạn có chắc chắn muốn thanh toán?")) {
        let paymentHistory = JSON.parse(localStorage.getItem("paymentHistory")) || [];

        // Lưu thông tin thanh toán vào lịch sử
        const customerHistory = {
            date: new Date().toISOString(),
            products: cart.map(item => item.name).join(", "), // Các sản phẩm thanh toán
            totalAmount: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        };

        paymentHistory.push({
            username: username,
            timestamp: new Date().toISOString(),
            items: cart,
        });

        // Lưu lại lịch sử thanh toán
        localStorage.setItem("paymentHistory", JSON.stringify(paymentHistory));

        // Xóa giỏ hàng sau khi thanh toán
        localStorage.removeItem("cart");

        alert("Thanh toán thành công!");

        // Cập nhật giỏ hàng và lịch sử thanh toán
        displayPaymentHistory();
    }
}

// Hàm hiển thị lịch sử thanh toán
function displayPaymentHistory() {
    const username = localStorage.getItem("username");
    if (!username) {
        document.getElementById("payment-history").innerHTML = "<p>Vui lòng đăng nhập để xem lịch sử thanh toán.</p>";
        return;
    }

    const paymentHistory = JSON.parse(localStorage.getItem("paymentHistory")) || [];
    const paymentHistoryDiv = document.getElementById("payment-history");

    const userPaymentHistory = paymentHistory.filter(payment => payment.username === username);

    if (userPaymentHistory.length === 0) {
        paymentHistoryDiv.innerHTML = "<p>Không có lịch sử thanh toán.</p>";
        return;
    }

    paymentHistoryDiv.innerHTML = "<h3>Lịch sử thanh toán</h3><ul></ul>";
    const ul = paymentHistoryDiv.querySelector("ul");

    userPaymentHistory.forEach((entry) => {
        const li = document.createElement("li");
        li.innerHTML = ` 
            <strong>Ngày thanh toán:</strong> <span class="payment-date">${new Date(entry.timestamp).toLocaleString()}</span>
            <ul>
                ${entry.items.map(item =>
                    `<li class="payment-item">${item.name} - <span class="payment-amount">${item.price.toLocaleString()} VND</span> x ${item.quantity}</li>`
                ).join("")}
            </ul>
        `;
        ul.appendChild(li);
    });
}
