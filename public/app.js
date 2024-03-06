document.addEventListener('DOMContentLoaded', function () {
    const appContainer = document.getElementById('app');
    const billingBtn = document.getElementById('billingBtn');
    const billingForm = document.getElementById('billingForm');
    const billResult = document.getElementById('billResult');

    billingBtn.addEventListener('click', showBillingModule);
    billingForm.addEventListener('submit', calculateBill);

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
                <button type="submit">Generate Bill</button>
            </form>
            <div id="billResult" class="hidden"></div>
        `;
        billingForm.addEventListener('submit', calculateBill);
    }

    function calculateBill(event) {
        event.preventDefault(); // Prevent the default form submission behavior
    
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
    
        displayBillResult(ownerName, houseNumber, consumption, billDate, dueDate, totalBill);
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

    function displayBillResult(ownerName, houseNumber, consumption, billDate, dueDate, totalBill) {
        billResult.innerHTML = `
            <p><strong>Owner Name:</strong> ${ownerName}</p>
            <p><strong>House Number:</strong> ${houseNumber}</p>
            <p><strong>Units Consumed (kWh):</strong> ${consumption}</p>
            <p><strong>Date Bill Generated:</strong> ${billDate.toLocaleDateString()}</p>
            <p><strong>Due Date:</strong> ${dueDate.toLocaleDateString()}</p>
            <p><strong>Total Bill:</strong> ₹${totalBill.toFixed(2)}</p>
            <button id="downloadPDF">Download as PDF</button>
        `;
        billResult.classList.remove('hidden');
    
        // Add event listener to the download button
        const downloadPDFBtn = document.getElementById('downloadPDF');
        downloadPDFBtn.addEventListener('click', function () {
            downloadPDF(ownerName, houseNumber, consumption, billDate, dueDate, totalBill);
        });
    }
    
    function downloadPDF(ownerName, houseNumber, consumption, billDate, dueDate, totalBill) {
        // Create a new jsPDF instance
        const pdf = new jsPDF();
    
        // Add the bill content to the PDF
        pdf.text(`Owner Name: ${ownerName}`, 15, 20);
        pdf.text(`House Number: ${houseNumber}`, 15, 30);
        pdf.text(`Units Consumed (kWh): ${consumption}`, 15, 40);
        pdf.text(`Date Bill Generated: ${billDate.toLocaleDateString()}`, 15, 50);
        pdf.text(`Due Date: ${dueDate.toLocaleDateString()}`, 15, 60);
        pdf.text(`Total Bill: ₹${totalBill.toFixed(2)}`, 15, 70);
    
        // Convert the PDF to a Blob
        const pdfBlob = pdf.output('blob');
    
        // Create an anchor element
        const anchor = document.createElement('a');
        anchor.href = URL.createObjectURL(pdfBlob);
        anchor.download = 'electric_bill.pdf';
    
        // Append the anchor to the body and trigger the click event
        document.body.appendChild(anchor);
        anchor.click();
    
        // Remove the anchor from the body
        document.body.removeChild(anchor);
    }
    
    

});
