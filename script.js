document.addEventListener("DOMContentLoaded", () => {


    const faders = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    });

    faders.forEach(el => observer.observe(el));



    const form = document.getElementById("orderForm");
    const rollSelect = document.getElementById("roll");
    const qtyInput = document.getElementById("qty");
    const totalDisplay = document.getElementById("total");
    const nameInput = document.getElementById("name");


    const orderModal = document.getElementById("orderModal");
    const modalClose = document.querySelector(".modal-close");
    const confirmBtn = document.getElementById("confirmOrder");
    const cancelBtn = document.getElementById("cancelOrder");


    const summaryName = document.getElementById("summaryName");
    const summaryRoll = document.getElementById("summaryRoll");
    const summaryQty = document.getElementById("summaryQty");
    const summaryTotal = document.getElementById("summaryTotal");


    const toast = document.getElementById("toast");


    function showToast(message, type = "success") {
        const toastMessage = toast.querySelector(".toast-message");
        toast.className = "toast " + type;
        toastMessage.textContent = message;
        toast.classList.add("show");
        
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }


    function parsePrice(value) {
        if (!value) return 0;

        const parts = value.split("-");
        const price = parseInt(parts[parts.length - 1], 10);
        return isNaN(price) ? 0 : price;
    }

  
    function calculateTotal() {
        const price = parsePrice(rollSelect.value);
        const quantity = Number(qtyInput.value) || 0;
        const total = price * quantity;
        totalDisplay.textContent = total;
        return total;
    }


    if (rollSelect && qtyInput && totalDisplay) {
        rollSelect.addEventListener("change", calculateTotal);
        qtyInput.addEventListener("input", calculateTotal);
    }


    const addToOrderButtons = document.querySelectorAll(".btn-add");
    
    addToOrderButtons.forEach(button => {
        button.addEventListener("click", () => {
            const rollName = button.getAttribute("data-roll");
            const rollPrice = button.getAttribute("data-price");
            

            const options = rollSelect.options;
            for (let i = 0; i < options.length; i++) {
                if (options[i].value.startsWith(rollName + "-")) {
                    rollSelect.selectedIndex = i;
                    break;
                }
            }
            

            qtyInput.value = 1;
            

            calculateTotal();
            

            const orderSection = document.getElementById("order");
            orderSection.scrollIntoView({ behavior: "smooth" });
            

            setTimeout(() => {
                nameInput.focus();
            }, 500);
            

            showToast(`${rollName} roll added to order!`);
        });
    });


    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            

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
            

            summaryName.textContent = name;
            summaryRoll.textContent = rollSelect.options[rollSelect.selectedIndex].text;
            summaryQty.textContent = qty;
            summaryTotal.textContent = calculateTotal();
            

            if (orderModal) {
                orderModal.classList.add("active");
                orderModal.setAttribute("aria-hidden", "false");
            }
        });
    }


    if (modalClose) {
        modalClose.addEventListener("click", () => {
            if (orderModal) {
                orderModal.classList.remove("active");
                orderModal.setAttribute("aria-hidden", "true");
            }
        });
    }

    if (orderModal) {
        orderModal.addEventListener("click", (e) => {
            if (e.target === orderModal) {
                orderModal.classList.remove("active");
                orderModal.setAttribute("aria-hidden", "true");
            }
        });
    }

    if (confirmBtn) {
        confirmBtn.addEventListener("click", () => {
            if (orderModal) {
                orderModal.classList.remove("active");
                orderModal.setAttribute("aria-hidden", "true");
            }

            showToast("Order confirmed! Thank you for choosing Loafy's Hungarian Roll.", "success");

            form.reset();
            totalDisplay.textContent = "0";
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener("click", () => {
            if (orderModal) {
                orderModal.classList.remove("active");
                orderModal.setAttribute("aria-hidden", "true");
            }
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && orderModal && orderModal.classList.contains("active")) {
            orderModal.classList.remove("active");
            orderModal.setAttribute("aria-hidden", "true");
        }
    });

});
