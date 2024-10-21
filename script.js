function filterData(event) {
    event.preventDefault();
    var startdate = new Date(document.getElementById("startdate").value);
    var enddate = new Date(document.getElementById("enddate").value);
    
    console.log("Starting date: " + startdate);
    console.log("Ending date: " + enddate);
    
    const rows = document.querySelectorAll("#data-table tr:not(:first-child)"); // Select all rows except the header

    rows.forEach(row => {
        const dateCell = row.cells[3]; // Assuming the date is in the fourth column (index 3)
        const rowDate = new Date(dateCell.textContent); // Convert the date string to a Date object

        // Check if the row date is within the specified range
        if (rowDate >= startdate && rowDate <= enddate) {
            row.style.display = ""; // Show the row
        } else {
            row.style.display = "none"; // Hide the row
        }
    });
}


async function fetchData() {
    try {
        const response = await fetch('https://compute.samford.edu/zohauth/clients/datajson');
        const data = await response.json();
        populateTable(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function populateTable(data) {
    const table = document.getElementById('data-table');

    data.forEach(item => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.innerHTML = `<a href="details.html?id=${item.id}">Pitch ${item.id}</a>`;
        row.appendChild(idCell);

        const speedCell = document.createElement('td');
        speedCell.textContent = item.speed;
        row.appendChild(speedCell);

        const resultCell = document.createElement('td');
        resultCell.textContent = item.result || '--';
        row.appendChild(resultCell);

        const datetimeCell = document.createElement('td');
        datetimeCell.textContent = item.datetime || '--';
        row.appendChild(datetimeCell);

        table.appendChild(row);
    });
}

// Fetch data on page load
fetchData();