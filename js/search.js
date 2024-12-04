const data = [
    { name: "Điều Ước", url: "page/product/me/dieu-uoc.html" },
    { name: "Hương Ngày Nắng", url: "page/product/ban/huong-ngay-nang.html" },
    { name: "My Princess", url: "page/product/ny/my-princess.html" },
    { name: "Peony", url: "page/product/sang/peony.html" },
    { name: "Simple", url: "page/product/re/simple.html" }
];
function showSuggestions() {
    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    const suggestionsContainer = document.getElementById("suggestions");
    suggestionsContainer.innerHTML = "";
    if (query) {
        const suggestions = data.filter(item => item.name.toLowerCase().includes(query));
        if (suggestions.length > 0) {
            suggestions.forEach(item => {
                const suggestionItem = document.createElement("div");
                suggestionItem.classList.add("suggestion-item");
                suggestionItem.innerHTML = `<a href="${item.url}" target="_blank">${item.name}</a>`;
                suggestionsContainer.appendChild(suggestionItem);
            });
            suggestionsContainer.style.display = "block"; 
        } else {
            suggestionsContainer.style.display = "none";
        }
    } else {
        suggestionsContainer.style.display = "none";
    }
}
document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-container")) {
        document.getElementById("suggestions").style.display = "none";
    }
});
