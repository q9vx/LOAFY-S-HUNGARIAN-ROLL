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
    const roll = document.getElementById("roll");
    const qty = document.getElementById("qty");
    const totalDisplay = document.getElementById("total");

    if (form && roll && qty && totalDisplay) {

        function calculateTotal() {
            const price = Number(roll.value);
            const quantity = Number(qty.value);
            totalDisplay.textContent =
                price && quantity ? price * quantity : 0;
        }

        roll.addEventListener("change", calculateTotal);
        qty.addEventListener("input", calculateTotal);

        form.addEventListener("submit", e => {
            e.preventDefault();
            alert(`Thank you! Your total is ₱${totalDisplay.textContent}. Order received.`);
            form.reset();
            totalDisplay.textContent = 0;
        });

    }

});

const form = document.getElementById("orderForm");
const nameInput = document.getElementById("name");
const roll = document.getElementById("roll");
const qty = document.getElementById("qty");
const totalDisplay = document.getElementById("total");

const summaryBox = document.getElementById("orderSummary");
const summaryName = document.getElementById("summaryName");
const summaryRoll = document.getElementById("summaryRoll");
const summaryQty = document.getElementById("summaryQty");
const summaryTotal = document.getElementById("summaryTotal");

const confirmBtn = document.getElementById("confirmOrder");
const cancelBtn = document.getElementById("cancelOrder");

function calculateTotal() {
    const price = Number(roll.value);
    const quantity = Number(qty.value);
    totalDisplay.textContent = price && quantity ? price * quantity : 0;
}

roll.addEventListener("change", calculateTotal);
qty.addEventListener("input", calculateTotal);

form.addEventListener("submit", e => {
    e.preventDefault();

    summaryName.textContent = nameInput.value;
    summaryRoll.textContent = roll.options[roll.selectedIndex].text;
    summaryQty.textContent = qty.value;
    summaryTotal.textContent = totalDisplay.textContent;

    summaryBox.style.display = "block";
    summaryBox.scrollIntoView({ behavior: "smooth" });
});

confirmBtn.addEventListener("click", () => {
    alert("Order confirmed! Thank you for choosing Loafy’s Hungarian Roll.");
    summaryBox.style.display = "none";
    form.reset();
    totalDisplay.textContent = 0;
});

cancelBtn.addEventListener("click", () => {
    summaryBox.style.display = "none";
});
