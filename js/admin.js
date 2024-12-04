// Hàm mở popup
function openPopup() {
    document.getElementById('adminPopup').style.display = 'flex';
}

// Hàm đóng popup
function closePopup() {
    document.getElementById('adminPopup').style.display = 'none';
}

// Hàm đăng xuất
function logout() {
    alert("Đã đăng xuất!");
    window.location.href = '../admin/admin.html'; // Chuyển đến trang đăng nhập
}





// Function to load users from localStorage and display them in the table
function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = '';

    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.status}</td>
            <td>
                <button class="btn-primary" onclick="toggleUserStatus(${index})">${user.status === 'Active' ? 'Khóa' : 'Mở khóa'}</button>
                <button class="btn-primary" onclick="showAddUserPopup(${index})">Chỉnh Sửa</button>
            </td>
        `;
        userTableBody.appendChild(row);
    });
}

// Function to toggle (lock/unlock) a user status
function toggleUserStatus(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users[index].status = users[index].status === 'Active' ? 'Locked' : 'Active';
    localStorage.setItem('users', JSON.stringify(users));
    loadUsers();
}





// Function to show a popup for adding or editing a user
function showAddUserPopup(index = null) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const isEditing = index !== null;

    const user = isEditing ? users[index] : { username: '', name: '', email: '', password: '' };

    let username, name, email, password;

    // Hàm kiểm tra nếu người dùng nhấn hủy
    function promptWithCancel(message, defaultValue) {
        const input = prompt(message, defaultValue);
        return input === null ? 'cancel' : input; // Nếu nhấn Cancel, trả về 'cancel'
    }

    // Validate and prompt for username
    do {
        username = promptWithCancel('Nhập tên đăng nhập:', user.username);
        if (username === 'cancel') {
            return; // Nếu người dùng chọn Cancel, dừng lại
        }
        if (!username) {
            alert('Tên đăng nhập không được để trống!');
        } else if (!isEditing && users.some(user => user.username === username)) {
            alert('Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.');
            username = null; // Reset để buộc nhập lại
        }
    } while (!username);

    // Validate and prompt for name
    do {
        name = promptWithCancel('Nhập họ và tên:', user.name);
        if (name === 'cancel') {
            return; // Nếu người dùng chọn Cancel, dừng lại
        }
        const nameRegex = /^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+(\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$/;
        if (!name) {
            alert('Họ và tên không được để trống!');
        } else if (!nameRegex.test(name)) {
            alert('Họ và tên không hợp lệ. Vui lòng không chứa số hoặc ký tự đặc biệt.');
            name = null; // Reset để buộc nhập lại
        }
    } while (!name);

    // Validate and prompt for email
    do {
        email = promptWithCancel('Nhập email:', user.email);
        if (email === 'cancel') {
            return; // Nếu người dùng chọn Cancel, dừng lại
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            alert('Email không được để trống!');
        } else if (!emailRegex.test(email)) {
            alert('Email không hợp lệ. Vui lòng nhập lại.');
            email = null; // Reset để buộc nhập lại
        } else if (!isEditing && users.some(user => user.email === email)) {
            alert('Email đã tồn tại. Vui lòng sử dụng email khác.');
            email = null; // Reset để buộc nhập lại
        }
    } while (!email);

    // Validate and prompt for password (edit password only if editing)
    if (isEditing) {
        do {
            password = promptWithCancel('Nhập mật khẩu mới (để trống nếu không thay đổi):', user.password);
            if (password === 'cancel') {
                return; // Nếu người dùng chọn Cancel, dừng lại
            }
            // If password is provided, validate it (minimum 8 characters, 1 uppercase, 1 special character)
            const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
            if (password && !passwordRegex.test(password)) {
                alert('Mật khẩu phải có ít nhất 8 ký tự, bao gồm 1 ký tự đặc biệt và 1 chữ cái in hoa.');
                password = null; // Reset để buộc nhập lại
            }
        } while (password && !/^(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(password)); // Continue prompting until valid password
    } else {
        password = promptWithCancel('Nhập mật khẩu:', '');
        if (password === 'cancel') {
            return; // Nếu người dùng chọn Cancel, dừng lại
        }
        const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(password)) {
            alert('Mật khẩu phải có ít nhất 8 ký tự, bao gồm 1 ký tự đặc biệt và 1 chữ cái in hoa.');
            return;
        }
    }

    // Set status to 'Active' by default
    const status = 'Active';

    const newUser = { username, name, email, password, status };

    if (isEditing) {
        users[index] = newUser; // Cập nhật người dùng hiện tại
    } else {
        users.push(newUser); // Thêm người dùng mới
    }

    localStorage.setItem('users', JSON.stringify(users));
    loadUsers();
}

// Initial load of users when the page is loaded
document.addEventListener('DOMContentLoaded', loadUsers);










//
// Hàm để lưu sản phẩm vào localStorage
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Hàm để tải sản phẩm từ localStorage
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productTableBody = document.getElementById('productTableBody');
    productTableBody.innerHTML = ''; // Xóa bảng cũ

    products.forEach((product, index) => {
        const row = document.createElement('tr');

        const cellGiftFor = document.createElement('td');
        const cellName = document.createElement('td');
        const cellPrice = document.createElement('td');
        const cellImage = document.createElement('td');
        const cellActions = document.createElement('td');

        cellGiftFor.textContent = product.giftFor;
        cellName.textContent = product.name;
        cellPrice.textContent = product.price;  // Đã định dạng sẵn
        cellImage.innerHTML = `<img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px;">`;

        cellActions.innerHTML = `
            <button class="btn-primary" onclick="openEditModal(${index})">Chỉnh Sửa</button>
            <button class="btn-primary" onclick="deleteProduct(${index})">Xóa</button>
        `;

        row.appendChild(cellGiftFor);
        row.appendChild(cellName);
        row.appendChild(cellPrice);
        row.appendChild(cellImage);
        row.appendChild(cellActions);

        productTableBody.appendChild(row);
    });
}

// Hàm định dạng giá
function formatPrice(price) {
    return parseFloat(price).toLocaleString('en-US') + ' VND';
}

// Hàm để thêm hoặc cập nhật sản phẩm
function saveProductToLocalStorage(event) {
    event.preventDefault();

    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const formattedPrice = formatPrice(price);  // Định dạng giá
    const image = document.getElementById('productImage').files[0]
        ? URL.createObjectURL(document.getElementById('productImage').files[0])
        : '';
    const giftFor = document.getElementById('category').value;
    const productId = document.getElementById('productId').value;

    const products = JSON.parse(localStorage.getItem('products')) || [];

    if (productId) {
        // Cập nhật sản phẩm hiện tại
        const index = parseInt(productId);
        products[index] = { id: index, name, price: formattedPrice, image, giftFor };
    } else {
        // Thêm sản phẩm mới
        const newProduct = { id: products.length, name, price: formattedPrice, image, giftFor };
        products.push(newProduct);
    }

    saveProducts(products);
    loadProducts();
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = ''; // Reset form
}

// Hàm mở modal để chỉnh sửa sản phẩm
function openEditModal(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products[index];

    if (product) {
        document.getElementById('modalProductId').value = index;
        document.getElementById('modalProductName').value = product.name;
        document.getElementById('modalProductPrice').value = product.price.replace(/[^0-9]/g, '');  // Loại bỏ ký tự không phải là số
        document.getElementById('modalCategory').value = product.giftFor;
        document.getElementById('modalProductImage').setAttribute('data-image', product.image);

        document.getElementById('modalOverlay').classList.add('open');
        document.getElementById('editProductModal').classList.add('open');
    }
}

// Hàm đóng modal
function closeModal() {
    document.getElementById('modalOverlay').classList.remove('open');
    document.getElementById('editProductModal').classList.remove('open');
}

// Hàm lưu sản phẩm đã chỉnh sửa vào localStorage
function saveProductEditToLocalStorage(event) {
    event.preventDefault();

    const name = document.getElementById('modalProductName').value;
    const price = document.getElementById('modalProductPrice').value;
    const formattedPrice = formatPrice(price);  // Định dạng giá
    const image = document.getElementById('modalProductImage').files[0]
        ? URL.createObjectURL(document.getElementById('modalProductImage').files[0])
        : document.getElementById('modalProductImage').getAttribute('data-image');
    const giftFor = document.getElementById('modalCategory').value;
    const productId = document.getElementById('modalProductId').value;

    const products = JSON.parse(localStorage.getItem('products')) || [];

    const index = parseInt(productId);
    products[index] = { id: index, name, price: formattedPrice, image, giftFor };

    saveProducts(products);
    loadProducts();
    closeModal();
}

// Hàm để xóa sản phẩm
function deleteProduct(index) {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.splice(index, 1); // Xóa sản phẩm tại chỉ số index
        saveProducts(products);
        loadProducts();
    }
}

// Chạy hàm khi trang được tải
window.onload = function() {
    
    loadProducts();

    // Lắng nghe sự kiện submit form
    document.getElementById('productForm').addEventListener('submit', saveProductToLocalStorage);
    document.getElementById('editProductForm').addEventListener('submit', saveProductEditToLocalStorage);
};







//
// Hàm hiển thị danh sách đơn hàng
function displayOrders() {
    const orders = JSON.parse(localStorage.getItem("paymentHistory")) || [];
    const orderTableBody = document.getElementById("orderTableBody");

    orderTableBody.innerHTML = ""; // Xóa dữ liệu cũ

    orders.forEach((order, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${order.name || order.username}</td>
            <td>${new Date(order.date).toLocaleDateString()}</td>
            <td>${order.email || "Không có địa chỉ"}</td>
            <td>${order.status === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}</td>
            <td>
                <button class="btn-primary" onclick="viewOrderDetails(${index})">Thông tin chi tiết đơn hàng</button>
            </td>
        `;
        orderTableBody.appendChild(row);
    });
}

// Hàm xem chi tiết đơn hàng
function viewOrderDetails(index) {
    const orders = JSON.parse(localStorage.getItem("paymentHistory")) || [];
    const order = orders[index];
    
    if (order) {
        // Hiển thị thông tin chi tiết đơn hàng trong một cửa sổ hoặc phần nội dung mới
        let orderDetails = `
            Thông tin chi tiết đơn hàng
            Tên khách hàng: ${order.name || order.username}
            Email: ${order.email || "Không có email"}
            
            Ngày thanh toán: ${new Date(order.date).toLocaleString()}
            Sản phẩm: ${order.products.split(", ").join(", ")}
            Tổng tiền: ${order.totalAmount.toLocaleString()} VND
            Trạng thái: ${order.status === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
        `;
        alert(orderDetails);  // Hoặc bạn có thể hiển thị trong một modal hoặc phần riêng
    } else {
        alert("Không tìm thấy đơn hàng.");
    }
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
        displayOrders();  // Hiển thị lại danh sách đơn hàng sau khi thanh toán
    }
}

// Hiển thị danh sách đơn hàng khi tải trang
document.addEventListener("DOMContentLoaded", function () {
    displayOrders();
});









//
// Hàm để lấy dữ liệu lịch sử thanh toán từ localStorage
function getPaymentHistory() {
    try {
        return JSON.parse(localStorage.getItem('paymentHistory')) || [];
    } catch (e) {
        console.error("Lỗi khi đọc lịch sử thanh toán từ localStorage:", e);
        return [];
    }
}

// Hàm để định dạng thời gian (ngày/tháng/năm)
function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}

// Hàm thống kê doanh thu theo mặt hàng
function generateItemStatistics(paymentHistory, startDate, endDate) {
    const itemStats = {};

    paymentHistory.forEach(order => {
        // Kiểm tra ngày đơn hàng có trong khoảng lọc không
        const orderDate = new Date(order.date);
        if (orderDate >= new Date(startDate) && orderDate <= new Date(endDate)) {
            order.products.forEach(product => {
                const { name, quantity, price } = product;
                if (!itemStats[name]) {
                    itemStats[name] = { totalQuantity: 0, totalAmount: 0, orderIds: [] };
                }
                itemStats[name].totalQuantity += quantity;
                itemStats[name].totalAmount += quantity * price;
                itemStats[name].orderIds.push(order.id);
            });
        }
    });

    return itemStats;
}

// Hàm thống kê doanh thu theo khách hàng
function generateCustomerStatistics(paymentHistory, startDate, endDate) {
    const customerStats = {};

    paymentHistory.forEach(order => {
        // Kiểm tra ngày đơn hàng có trong khoảng lọc không
        const orderDate = new Date(order.date);
        if (orderDate >= new Date(startDate) && orderDate <= new Date(endDate)) {
            const customerUsername = order.customerUsername;
            const totalAmount = order.totalAmount;

            if (!customerStats[customerUsername]) {
                customerStats[customerUsername] = { totalAmount: 0, orderIds: [] };
            }
            customerStats[customerUsername].totalAmount += totalAmount;
            customerStats[customerUsername].orderIds.push(order.id);
        }
    });

    // Sắp xếp khách hàng theo tổng doanh thu giảm dần
    const sortedCustomers = Object.entries(customerStats)
        .sort((a, b) => b[1].totalAmount - a[1].totalAmount)
        .slice(0, 5); // Chỉ lấy 5 khách hàng có doanh thu cao nhất

    return sortedCustomers;
}

// Hàm tạo thống kê
function generateStatistics() {
    const startDate = document.getElementById("statsStartDate").value;
    const endDate = document.getElementById("statsEndDate").value;

    const paymentHistory = getPaymentHistory();

    if (!startDate || !endDate) {
        alert("Vui lòng chọn khoảng thời gian.");
        return;
    }

    // Tính thống kê mặt hàng
    const itemStats = generateItemStatistics(paymentHistory, startDate, endDate);
    let itemStatsHTML = "<h3>Thống kê mặt hàng</h3><table><tr><th>Mặt hàng</th><th>Số lượng bán</th><th>Tổng tiền thu được</th><th>Hóa đơn</th></tr>";

    let totalRevenueItems = 0;
    let bestSellingItem = { name: "", quantity: 0, totalAmount: 0 };
    let worstSellingItem = { name: "", quantity: 0, totalAmount: Infinity };

    Object.entries(itemStats).forEach(([itemName, stats]) => {
        const { totalQuantity, totalAmount, orderIds } = stats;
        totalRevenueItems += totalAmount;

        // Cập nhật mặt hàng bán chạy nhất và ế nhất
        if (totalQuantity > bestSellingItem.quantity) {
            bestSellingItem = { name: itemName, quantity: totalQuantity, totalAmount };
        }
        if (totalQuantity < worstSellingItem.quantity) {
            worstSellingItem = { name: itemName, quantity: totalQuantity, totalAmount };
        }

        // Tạo dòng cho mỗi mặt hàng
        itemStatsHTML += `<tr><td>${itemName}</td><td>${totalQuantity}</td><td>${totalAmount.toFixed(2)} VND</td><td><button onclick="viewItemOrders(${JSON.stringify(orderIds)})">Xem hóa đơn</button></td></tr>`;
    });

    itemStatsHTML += "</table>";
    itemStatsHTML += `<h4>Tổng doanh thu từ mặt hàng: ${totalRevenueItems.toFixed(2)} VND</h4>`;
    itemStatsHTML += `<h4>Mặt hàng bán chạy nhất: ${bestSellingItem.name} (${bestSellingItem.quantity} bán, ${bestSellingItem.totalAmount.toFixed(2)} VND)</h4>`;
    itemStatsHTML += `<h4>Mặt hàng ế nhất: ${worstSellingItem.name} (${worstSellingItem.quantity} bán, ${worstSellingItem.totalAmount.toFixed(2)} VND)</h4>`;

    // Tính thống kê khách hàng
    const customerStats = generateCustomerStatistics(paymentHistory, startDate, endDate);
    let customerStatsHTML = "<h3>5 khách hàng chi tiêu nhiều nhất</h3><table><tr><th>Khách hàng</th><th>Tổng doanh thu</th><th>Hóa đơn</th></tr>";

    customerStats.forEach(([username, stats]) => {
        const { totalAmount, orderIds } = stats;

        // Tạo dòng cho mỗi khách hàng
        customerStatsHTML += `<tr><td>${username}</td><td>${totalAmount.toFixed(2)} VND</td><td><button onclick="viewCustomerOrders(${JSON.stringify(orderIds)})">Xem hóa đơn</button></td></tr>`;
    });

    customerStatsHTML += "</table>";

    // Hiển thị kết quả thống kê
    document.getElementById("statisticsResult").innerHTML = itemStatsHTML + customerStatsHTML;
}

// Hàm hiển thị các hóa đơn của mặt hàng
function viewItemOrders(orderIds) {
    alert(`Các hóa đơn của mặt hàng: ${orderIds.join(", ")}`);
}

// Hàm hiển thị các hóa đơn của khách hàng
function viewCustomerOrders(orderIds) {
    alert(`Các hóa đơn của khách hàng: ${orderIds.join(", ")}`);
}
