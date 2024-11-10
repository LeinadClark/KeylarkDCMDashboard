const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item => {
    const li = item.parentElement;

    item.addEventListener('click', function () {
        allSideMenu.forEach(i => {
            i.parentElement.classList.remove('active');
        })
        li.classList.add('active');
    })
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
    sidebar.classList.toggle('hide');
});

const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
    if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
            searchButtonIcon.classList.replace('bx-search', 'bx-x');
        } else {
            searchButtonIcon.classList.replace('bx-x', 'bx-search');
        }
    }
});

if (window.innerWidth < 768) {
    sidebar.classList.add('hide');
} else if (window.innerWidth > 576) {
    searchButtonIcon.classList.replace('bx-x', 'bx-search');
    searchForm.classList.remove('show');
}

window.addEventListener('resize', function () {
    if (this.innerWidth > 576) {
        searchButtonIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
});

const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
});

// Data for Order Status Bar Chart
const orderStatusData = {
    labels: ['Completed', 'Pending', 'Process'],
    datasets: [{
        label: 'Order Status Count',
        data: [2, 2, 1], // Based on the table data (Completed: 2, Pending: 2, Process: 1)
        backgroundColor: ['#4caf50', '#ff9800', '#2196f3'],
        borderColor: ['#388e3c', '#f57c00', '#1976d2'],
        borderWidth: 1
    }]
};

// Order Status Bar Chart
const ctxOrderStatus = document.getElementById('orderStatusChart').getContext('2d');
new Chart(ctxOrderStatus, {
    type: 'bar',
    data: orderStatusData,
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Function to generate a random color in HEX format
const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

// Generate Random Sales Data (ranging from 0 to 25,543)
const generateRandomSalesData = () => {
    const salesData = [];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    for (let i = 0; i < months.length; i++) {
        salesData.push(Math.floor(Math.random() * 50000)); // Random number between 0 and 50,000
    }

    return salesData;
};

// Generate Random Colors for each month in the sales chart
const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
        colors.push(generateRandomColor()); // Generate a random color for each month
    }
    return colors;
};

// Generate Sales Data and Calculate the Average
const salesData = generateRandomSalesData(); // Get the random sales data for 12 months

// Calculate the Total Sales
const totalSales = salesData.reduce((acc, current) => acc + current, 0);

// Calculate the Average Sales per Month
const averageSalesPerMonth = totalSales / salesData.length;

// Update the Total Sales per Month on the HTML
const totalSalesElement = document.getElementById('total-sales');
totalSalesElement.textContent = `₱${averageSalesPerMonth.toFixed(2)}`; // Update the value with average sales

// Sales Chart Data with Random Colors
const chartSalesData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [{
        label: 'Monthly Sales (₱)',
        data: salesData, // Using the generated random sales data
        backgroundColor: generateRandomColors(12), // Random colors for each month
        borderColor: generateRandomColors(12), // Random border colors for each month
        borderWidth: 1
    }]
};

// Sales Bar Chart
const ctxSales = document.getElementById('salesChart').getContext('2d');
new Chart(ctxSales, {
    type: 'bar',
    data: chartSalesData,
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
