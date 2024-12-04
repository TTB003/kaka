// Kiểm tra trạng thái đăng nhập khi trang được tải lại
window.onload = function () {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const accountLink = document.getElementById('accountLink');

    if (userInfo) {
        accountLink.textContent = 'Tài khoản'; // Đổi liên kết thành "Thông tin tài khoản"
    } else {
        accountLink.textContent = 'Tài khoản'; // Nếu chưa đăng nhập, hiển thị "Tài khoản"
    }
};

// Hiển thị popup đăng nhập
function showLoginPopup() {
    document.getElementById('loginPopup').style.display = 'flex';
    closePopup('signupPopup'); // Đóng popup đăng ký nếu đang mở
    closePopup('accountPopup'); // Đảm bảo popup tài khoản bị ẩn khi mở popup đăng nhập
}

// Hiển thị popup đăng ký
function showSignupPopup() {
    document.getElementById('signupPopup').style.display = 'flex';
    closePopup('loginPopup'); // Đóng popup đăng nhập nếu đang mở
    closePopup('accountPopup'); // Đảm bảo popup tài khoản bị ẩn khi mở popup đăng ký
}

// Hiển thị popup thông tin tài khoản
function showAccountPopup() {
    const accountPopup = document.getElementById('accountPopup');
    const accountDetails = document.getElementById('accountDetails');

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (userInfo) {
        // Hiển thị thông tin tài khoản
        accountDetails.innerHTML = `
            <p><strong>Họ tên:</strong> ${userInfo.name}</p>
            <p><strong>Email:</strong> ${userInfo.email}</p>
            <p><strong>Số điện thoại:</strong> ${userInfo.phone}</p>
            <p><strong>Địa chỉ:</strong> ${userInfo.address}</p>
            <p><strong>Tên đăng nhập:</strong> ${userInfo.username}</p>
        `;
        accountPopup.style.display = 'flex'; // Hiển thị popup thông tin tài khoản
    } else {
        alert('Bạn chưa đăng nhập!');
        closePopup('accountPopup'); // Ẩn popup tài khoản nếu chưa đăng nhập
        showLoginPopup(); // Hiển thị popup đăng nhập
    }
}

// Đăng nhập
function handleLogin() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const users = JSON.parse(localStorage.getItem('users')) || []; // Lấy danh sách người dùng từ localStorage

    const account = users.find(user => user.username === username && user.password === password);
    if (account) {
        // Kiểm tra trạng thái tài khoản
        if (account.status === 'Locked') {
            alert('Tài khoản của bạn đã bị khóa. Vui lòng liên hệ với quản trị viên.');
            return; // Ngừng quá trình đăng nhập nếu tài khoản bị khóa
        }

        // Đăng nhập thành công
        alert('Đăng nhập thành công!');
        localStorage.setItem('userInfo', JSON.stringify(account)); // Lưu thông tin người dùng vào localStorage

        closePopup('loginPopup');
        showAccountPopup(); // Hiển thị popup tài khoản
        document.getElementById('accountLink').textContent = 'Tài khoản'; // Cập nhật lại liên kết tài khoản
        
        // Tải lại trang sau khi đăng nhập
        location.reload();
    } else {
        alert('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
}

// Đăng ký tài khoản mới
function saveAccountData() {
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const address = document.getElementById('address').value; // Lấy giá trị địa chỉ
    const passwordError = document.getElementById('passwordError');

    // Kiểm tra tên khách hàng (không chứa số)
    const nameRegex = /^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+(\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$/;
    if (!nameRegex.test(name)) {
        alert("Tên khách hàng không được chứa số.");
        return false;
    }

    // Kiểm tra số điện thoại (bắt đầu bằng số 0 và có 10 số)
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(phone)) {
        alert("Số điện thoại phải bắt đầu bằng số 0 và có 10 chữ số.");
        return false;
    }

    // Kiểm tra mật khẩu có ít nhất 1 ký tự đặc biệt và 1 chữ cái in hoa
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
        passwordError.textContent = 'Mật khẩu phải có ít nhất 8 ký tự, 1 chữ cái in hoa và 1 ký tự đặc biệt.';
        return false;
    }

    // Kiểm tra mật khẩu nhập lại
    if (password !== confirmPassword) {
        passwordError.textContent = 'Mật khẩu nhập lại không khớp.';
        return false;
    }

    // Kiểm tra tên đăng nhập và email đã tồn tại chưa
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.username === username)) {
        alert("Tên đăng nhập đã tồn tại.");
        return false;
    }

    if (users.some(user => user.email === email)) {
        alert("Email đã được đăng ký.");
        return false;
    }

    // Xóa thông báo lỗi nếu hợp lệ
    passwordError.textContent = '';

    // Lưu thông tin tài khoản
    const userAccount = { name, username, email, phone, address, password, status: 'Active' };
    users.push(userAccount);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('userInfo', JSON.stringify(userAccount));

    alert("Đăng ký thành công!");
    closePopup('signupPopup');
    showAccountPopup(); // Hiển thị popup thông tin tài khoản
    document.getElementById('accountLink').textContent = 'Tài khoản';
    
    // Tải lại trang sau khi đăng ký thành công
    location.reload();

    return false; // Ngăn chặn form gửi lại và tải lại trang
}

// Đăng xuất
function logout() {
    // Xóa thông tin người dùng khỏi localStorage
    localStorage.removeItem("userInfo");

    // Đóng popup tài khoản (nếu có)
    closePopup('accountPopup');

    // Thông báo đăng xuất thành công
    alert('Bạn đã đăng xuất thành công!');

    // Cập nhật lại giao diện
    document.getElementById('accountLink').textContent = 'Tài khoản'; // Cập nhật liên kết tài khoản
    showLoginPopup(); // Hiển thị popup đăng nhập
    
    // Tải lại trang sau khi đăng xuất
    location.reload();
}

// Đóng popup
function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}
