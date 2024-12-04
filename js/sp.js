document.addEventListener('DOMContentLoaded', function () {
    // Hàm lấy dữ liệu sản phẩm
    function getProductData() {
        const products = [];
        // Lấy tất cả các sản phẩm
        const productItems = document.querySelectorAll('.product-item');
        
        productItems.forEach(item => {
            const product = {
                name: item.querySelector('h3').innerText, // Tên sản phẩm
                price: item.dataset.price, // Lấy giá từ thuộc tính data-price
                image: item.querySelector('img').src, // URL hình ảnh sản phẩm
                link: item.querySelector('a').href, // Link sản phẩm
                giftFor: document.querySelector('h1.title').innerText // Thêm thông tin người nhận (hoa tặng ai)
            };
            products.push(product);
        });

        return products;
    }

    // Lưu dữ liệu sản phẩm vào localStorage
    function saveToLocalStorage() {
        const products = getProductData();
        // Lưu dữ liệu sản phẩm vào localStorage
        localStorage.setItem('products', JSON.stringify(products));
    }

    // Gọi hàm saveToLocalStorage để lưu dữ liệu khi trang được tải
    saveToLocalStorage();
});
