document.addEventListener("DOMContentLoaded", () => {

    /* ================= FADE-IN ANIMATION ================= */
    const faders = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    });

    faders.forEach(el => observer.observe(el));


    /* ================= ORDER FORM ================= */
    const form = document.getElementById("orderForm");
    const rollSelect = document.getElementById("roll");
    const qtyInput = document.getElementById("qty");
    const totalDisplay = document.getElementById("total");
    const nameInput = document.getElementById("name");

    // Order Modal Elements
    const orderModal = document.getElementById("orderModal");
    const modalClose = document.querySelector(".modal-close");
    const confirmBtn = document.getElementById("confirmOrder");
    const cancelBtn = document.getElementById("cancelOrder");

    // Summary Elements
    const summaryName = document.getElementById("summaryName");
    const summaryRoll = document.getElementById("summaryRoll");
    const summaryQty = document.getElementById("summaryQty");
    const summaryTotal = document.getElementById("summaryTotal");

    // Toast notification
    const toast = document.getElementById("toast");

    // Function to show toast notification
    function showToast(message, type = "success") {
        const toastMessage = toast.querySelector(".toast-message");
        toast.className = "toast " + type;
        toastMessage.textContent = message;
        toast.classList.add("show");
        
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }

    // Function to parse price from dropdown value (e.g., "Classic-45" → 45)
    function parsePrice(value) {
        if (!value) return 0;
        // Split by "-" and get the last part (the price)
        const parts = value.split("-");
        const price = parseInt(parts[parts.length - 1], 10);
        return isNaN(price) ? 0 : price;
    }

    // Function to calculate total
    function calculateTotal() {
        const price = parsePrice(rollSelect.value);
        const quantity = Number(qtyInput.value) || 0;
        const total = price * quantity;
        totalDisplay.textContent = total;
        return total;
    }

    // Event listeners for total calculation
    if (rollSelect && qtyInput && totalDisplay) {
        rollSelect.addEventListener("change", calculateTotal);
        qtyInput.addEventListener("input", calculateTotal);
    }

    // ================= MENU "ADD TO ORDER" BUTTONS =================
    const addToOrderButtons = document.querySelectorAll(".btn-add");
    
    addToOrderButtons.forEach(button => {
        button.addEventListener("click", () => {
            const rollName = button.getAttribute("data-roll");
            const rollPrice = button.getAttribute("data-price");
            
            // Find the matching option in the dropdown
            const options = rollSelect.options;
            for (let i = 0; i < options.length; i++) {
                if (options[i].value.startsWith(rollName + "-")) {
                    rollSelect.selectedIndex = i;
                    break;
                }
            }
            
            // Set quantity to 1
            qtyInput.value = 1;
            
            // Calculate total
            calculateTotal();
            
            // Scroll to order form
            const orderSection = document.getElementById("order");
            orderSection.scrollIntoView({ behavior: "smooth" });
            
            // Focus on name input
            setTimeout(() => {
                nameInput.focus();
            }, 500);
            
            // Show toast notification
            showToast(`${rollName} roll added to order!`);
        });
    });

    // ================= FORM SUBMISSION =================
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Validate form
            const name = nameInput.value.trim();
            const roll = rollSelect.value;
            const qty = qtyInput.value;
            
            if (!name) {
                showToast("Please enter your name", "error");
                nameInput.focus();
                return;
            }
            
            if (!roll) {
                showToast("Please select a roll", "error");
                rollSelect.focus();
                return;
            }
            
            if (!qty || qty < 1) {
                showToast("Please enter a valid quantity", "error");
                qtyInput.focus();
                return;
            }
            
            // Update modal with order details
            summaryName.textContent = name;
            summaryRoll.textContent = rollSelect.options[rollSelect.selectedIndex].text;
            summaryQty.textContent = qty;
            summaryTotal.textContent = calculateTotal();
            
            // Show modal
            if (orderModal) {
                orderModal.classList.add("active");
                orderModal.setAttribute("aria-hidden", "false");
            }
        });
    }

    // ================= MODAL FUNCTIONALITY =================
    // Close modal
    if (modalClose) {
        modalClose.addEventListener("click", () => {
            if (orderModal) {
                orderModal.classList.remove("active");
                orderModal.setAttribute("aria-hidden", "true");
            }
        });
    }

    // Close modal when clicking overlay
    if (orderModal) {
        orderModal.addEventListener("click", (e) => {
            if (e.target === orderModal) {
                orderModal.classList.remove("active");
                orderModal.setAttribute("aria-hidden", "true");
            }
        });
    }

    // Confirm order
    if (confirmBtn) {
        confirmBtn.addEventListener("click", () => {
            // Close modal
            if (orderModal) {
                orderModal.classList.remove("active");
                orderModal.setAttribute("aria-hidden", "true");
            }
            
            // Show success message
            showToast("Order confirmed! Thank you for choosing Loafy's Hungarian Roll.", "success");
            
            // Reset form
            form.reset();
            totalDisplay.textContent = "0";
        });
    }

    // Cancel order
    if (cancelBtn) {
        cancelBtn.addEventListener("click", () => {
            if (orderModal) {
                orderModal.classList.remove("active");
                orderModal.setAttribute("aria-hidden", "true");
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && orderModal && orderModal.classList.contains("active")) {
            orderModal.classList.remove("active");
            orderModal.setAttribute("aria-hidden", "true");
        }
    });

});
