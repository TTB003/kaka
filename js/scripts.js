function updateItemsPerPage() {
  const itemsPerPage = parseInt(document.getElementById("itemsPerPage").value);

  // Lấy tên file hiện tại (không bao gồm phần mở rộng .html)
  let currentPage = window.location.pathname
    .split("/")
    .pop()
    .replace(".html", "");

  // Kiểm tra số lượng và chuyển hướng
  if (itemsPerPage === 12) {
    // Chuyển đến trang có 12 sản phẩm (file "4", ví dụ: me2 -> me4)
    if (
      currentPage.startsWith("me") ||
      currentPage.startsWith("ban") ||
      currentPage.startsWith("re") ||
      currentPage.startsWith("sang") ||
      currentPage.startsWith("ny")
    ) {
      const baseName = currentPage.replace(/[1-3]$/, ""); // Xóa số 1, 2 hoặc 3 ở cuối
      window.location.href = `${baseName}4.html`;
    } else {
      console.error(
        "File hiện tại không đúng định dạng (ví dụ: me1, ban2, re3)."
      );
    }
  } else if (itemsPerPage === 4) {
    // Chuyển về các trang 4 sản phẩm (file "1", "2", "3", tùy theo logic của bạn)
    if (currentPage.endsWith("4")) {
      const baseName = currentPage.replace("4", "1"); // Quay về trang đầu tiên (ví dụ: me4 -> me1)
      window.location.href = `${baseName}.html`;
    } else {
      console.error("File hiện tại không hỗ trợ quay về trang 4 sản phẩm.");
    }
  }
}
