// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(product) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
        alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProductIndex = cart.findIndex(item => item.name === product.name);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += product.quantity;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    displayCart();
}

// Hàm hiển thị giỏ hàng
function displayCart() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
        document.getElementById('cart-container').innerHTML = "<p>Vui lòng đăng nhập để xem giỏ hàng.</p>";
        return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTableBody = document.getElementById('cart-tbody');
    const totalPriceElement = document.getElementById('totalPrice');
    let totalPrice = 0;

    cartTableBody.innerHTML = '';

    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;"></td>
            <td>${item.name}</td>
            <td>${item.price.toLocaleString()} VND</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
            </td>
            <td><button onclick="removeFromCart(${index})">Xóa</button></td>
        `;
        cartTableBody.appendChild(row);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.innerHTML = totalPrice.toLocaleString() + ' VND';
}

// Hàm cập nhật số lượng sản phẩm trong giỏ hàng
function updateQuantity(index, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem('cart', JSON.stringify(cart));

    displayCart();
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); 
    localStorage.setItem('cart', JSON.stringify(cart));

    displayCart();
}

// Hàm xóa tất cả sản phẩm trong giỏ hàng
function deleteAll() {
    localStorage.removeItem('cart');
    displayCart();
}

// Hàm xử lý thanh toán
function payAll() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
        alert("Vui lòng đăng nhập để thực hiện thanh toán.");
        return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert("Giỏ hàng trống. Vui lòng thêm sản phẩm!");
        return;
    }

    if (confirm("Bạn có chắc chắn muốn thanh toán?")) {
        // Lấy lịch sử thanh toán từ localStorage
        let paymentHistory = JSON.parse(localStorage.getItem("paymentHistory")) || [];

        // Thêm thông tin thanh toán vào lịch sử
        const customerHistory = {
            username: userInfo.username, // Tên tài khoản khách hàng
            name: userInfo.name, // Tên đầy đủ của khách hàng (nếu có)
            email: userInfo.email, // Email khách hàng (nếu có)
            date: new Date().toISOString(),
            products: cart.map(item => item.name).join(", "),
            totalAmount: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            status: "paid" // Trạng thái của đơn hàng là "paid"
        };

        paymentHistory.push(customerHistory);
        localStorage.setItem("paymentHistory", JSON.stringify(paymentHistory));

        // Xóa giỏ hàng sau khi thanh toán
        localStorage.removeItem("cart");

        alert("Thanh toán thành công!");

        // Hiển thị lại giỏ hàng và lịch sử thanh toán
        displayCart();
        displayPaymentHistory();
    }
}



// Hàm hiển thị lịch sử thanh toán
function displayPaymentHistory() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const paymentHistoryDiv = document.getElementById("payment-history");

    if (!userInfo) {
        paymentHistoryDiv.innerHTML = "<p>Vui lòng đăng nhập để xem lịch sử thanh toán.</p>";
        return;
    }

    const paymentHistory = JSON.parse(localStorage.getItem("paymentHistory")) || [];
    const userPaymentHistory = paymentHistory.filter(payment => payment.username === userInfo.username);

    if (userPaymentHistory.length === 0) {
        paymentHistoryDiv.innerHTML = "<p>Không có lịch sử thanh toán.</p>";
        return;
    }

    paymentHistoryDiv.innerHTML = "<h3>Lịch sử thanh toán</h3><ul></ul>";
    const ul = paymentHistoryDiv.querySelector("ul");

    userPaymentHistory.forEach((entry) => {
        const li = document.createElement("li");
        li.innerHTML = ` 
            <strong>Ngày thanh toán:</strong> <span class="payment-date">${new Date(entry.date).toLocaleString()}</span>
            <ul>
                ${entry.products
                    .split(", ")
                    .map(product => `<li class="payment-item">${product}</li>`)
                    .join("")}
            </ul>
            <strong>Tổng tiền:</strong> ${entry.totalAmount.toLocaleString()} VND
        `;
        ul.appendChild(li);
    });
}

// Khi tải trang, hiển thị giỏ hàng và lịch sử thanh toán nếu có
document.addEventListener("DOMContentLoaded", function () {
    displayCart();
    displayPaymentHistory();
});
