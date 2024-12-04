// Hàm mở popup và hiển thị thông tin tài khoản
function openPopup() {
    const accountData = JSON.parse(localStorage.getItem('accountInfo')); // Lấy dữ liệu tài khoản từ localStorage
    if (accountData) {
        // Điền dữ liệu vào popup từ localStorage
        document.getElementById('popup-name').textContent = accountData.name || 'Chưa có thông tin';
        document.getElementById('popup-email').textContent = accountData.email || 'Chưa có thông tin';
        document.getElementById('popup-phone').textContent = accountData.phone || 'Chưa có thông tin';
        document.getElementById('popup-address').textContent = accountData.address || 'Chưa có thông tin';
    } else {
        alert('Chưa có thông tin tài khoản.');
    }

    // Hiển thị popup
    document.getElementById('accountPopup').style.display = 'flex';
}

// Hàm đóng popup
function closePopup() {
    document.getElementById('accountPopup').style.display = 'none';
}

// Thêm sự kiện click vào liên kết "Tài khoản" để mở popup
document.querySelector('a[href="Account.html"]').addEventListener('click', function(event) {
    event.preventDefault(); // Ngừng hành động mặc định của liên kết
    openPopup(); // Mở popup hiển thị thông tin tài khoản
});
