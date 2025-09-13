// script.js

function calculateEMI() {
    const lamount = Number(document.getElementById("loan").value);
    const annual_interest = Number(document.getElementById("interest").value);
    const time = Number(document.getElementById("duration").value);

    if (lamount <= 0 || annual_interest <= 0 || time <= 0) {
        alert("Please enter valid positive values.");
        return;
    }

    const monthlyrate = annual_interest / 12 / 100;
    const emi = (lamount * monthlyrate * Math.pow(1 + monthlyrate, time)) /
                (Math.pow(1 + monthlyrate, time) - 1);

    const totalPayment = emi * time;
    const totalInterest = totalPayment - lamount;

    document.getElementById("Loan-Amount").innerText = "₹" + lamount.toFixed(2);
    document.getElementById("monthly-emi").innerText = "₹" + emi.toFixed(2);
    document.getElementById("total-payment").innerText = "₹" + totalPayment.toFixed(2);
    document.getElementById("total-interest").innerText = "₹" + totalInterest.toFixed(2);
}

function calculateSIP() {
    const amountInvested = Number(document.getElementById("sip-amount").value);
    const rateofReturn = Number(document.getElementById("sip-rate").value);
    const years = Number(document.getElementById("sip-years").value);

    if (amountInvested <= 0 || rateofReturn <= 0 || years <= 0) {
        alert("Please enter valid positive values.");
        return;
    }

    const monthlyRate = rateofReturn / 12 / 100;
    const months = years * 12;
    const futureValue = amountInvested * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
    const totalInvested = amountInvested * months;
    const estReturn = futureValue - totalInvested;

    document.getElementById("amountI").innerText = "₹" + totalInvested.toFixed(2);
    document.getElementById("futureValue").innerText = "₹" + Math.round(futureValue);
    document.getElementById("est-return").innerText = "₹" + Math.round(estReturn);

    // Draw chart
    const ctx = document.getElementById('sipChart').getContext('2d');
    if(window.sipChartInstance) window.sipChartInstance.destroy();
    window.sipChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Invested Amount', 'Estimated Returns'],
            datasets: [{
                data: [totalInvested, estReturn],
                backgroundColor: ['#007bff', '#28a745']
            }]
        },
        options: {
            plugins: {
                legend: {position: 'bottom', labels: {color: 'white'}}
            }
        }
    });
}
