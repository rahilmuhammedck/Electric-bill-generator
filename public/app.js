document.addEventListener('DOMContentLoaded', function () {
    const appContainer = document.getElementById('app');
    const billingBtn = document.getElementById('billingBtn');

    billingBtn.addEventListener('click', showBillingModule);

    function showBillingModule(event) {
        event.preventDefault();
        appContainer.innerHTML = `
            <h1>Welcome to the Billing Module</h1>
            <form id="billingForm">
                <label for="ownerName">Owner Name:</label>
                <input type="text" id="ownerName" required>
                <label for="houseNumber">House Number:</label>
                <input type="text" id="houseNumber" required>
                <label for="consumption">Units Consumed (kWh):</label>
                <input type="number" id="consumption" required>
                <label for="billDate">Date Bill Generated:</label>
                <input type="date" id="billDate" required>
                <button type="button" id="generateBillBtn">Generate Bill</button>
            </form>
            <div id="billResult" class="hidden"></div>
        `;

        // Add event listener to the new "Generate Bill" button
        const generateBillBtn = document.getElementById('generateBillBtn');
        generateBillBtn.addEventListener('click', displayBillResult);
    }

    function displayBillResult() {
        const ownerName = document.getElementById('ownerName').value;
        const houseNumber = document.getElementById('houseNumber').value;
        const consumption = parseFloat(document.getElementById('consumption').value);
        const billDate = document.getElementById('billDate').valueAsDate;

        if (isNaN(consumption) || !billDate) {
            alert('Invalid input. Please fill in all fields with valid data.');
            return;
        }

        const dueDate = new Date(billDate);
        dueDate.setDate(dueDate.getDate() + 20);

        const totalBill = calculateTotalBill(consumption);

        // Create a new HTML page to display the bill details
        const billPageContent = `
            <html>
            <head>
                <title>Electric Bill Details</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        text-align: center;
                        margin: 20px;
                    }
                    h1, p {
                        margin: 10px 0;
                    }
                    button {
                        background-color: #4CAF50;
                        color: white;
                        padding: 10px 20px;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                    button:hover {
                        background-color: #45a049;
                    }
                </style>
            </head>
            <body>
                <h1>Electric Bill Details</h1>
                <p><strong>Owner Name:</strong> ${ownerName}</p>
                <p><strong>House Number:</strong> ${houseNumber}</p>
                <p><strong>Units Consumed (kWh):</strong> ${consumption}</p>
                <p><strong>Date Bill Generated:</strong> ${billDate.toLocaleDateString()}</p>
                <p><strong>Due Date:</strong> ${dueDate.toLocaleDateString()}</p>
                <p><strong>Total Bill:</strong> ₹${totalBill.toFixed(2)}</p>
                <button onclick="window.print()">Print</button>
            </body>
            </html>
        `;

        const newPage = window.open();
        newPage.document.write(billPageContent);
    }

    function calculateTotalBill(consumption) {
        let totalBill = 0;

        if (consumption <= 40) {
            totalBill = consumption * 1.50;
        } else if (consumption <= 50) {
            totalBill = consumption * 3.25;
        } else if (consumption <= 100) {
            totalBill = consumption * 4.05;
        } else if (consumption <= 150) {
            totalBill = consumption * 5.10;
        } else if (consumption <= 200) {
            totalBill = consumption * 6.95;
        } else if (consumption <= 250) {
            totalBill = consumption * 8.20;
        } else if (consumption <= 300) {
            totalBill = consumption * 6.40;
        } else if (consumption <= 350) {
            totalBill = consumption * 7.25;
        } else if (consumption <= 400) {
            totalBill = consumption * 7.60;
        } else if (consumption <= 500) {
            totalBill = consumption * 7.90;
        } else {
            totalBill = consumption * 8.80;
        }

        return totalBill;
    }
});
