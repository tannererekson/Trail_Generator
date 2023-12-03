function getRandomTrail() {
    const type = document.getElementById("type").value; // Get selected trail type
    const difficulty = document.getElementById("difficulty").value; // Get selected difficulty
  
    let url = 'http://localhost:3000/trails/random';
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(trail => {
        console.log(trail);
        displayTrail(trail);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
  
  
  
  function getAllTrails() {
    const type = document.getElementById("type").value; // Get selected trail type
    const difficulty = document.getElementById("difficulty").value; // Get selected difficulty
  
    let url = 'http://localhost:3000/trails';
  
    // Construct the URL based on selected parameters
    if (type !== 'any' && difficulty !== 'any') {
      url += `?type=${type}&difficulty=${difficulty}`;
    } else if (type !== 'any') {
      url += `?type=${type}`;
    } else if (difficulty !== 'any') {
      url += `?difficulty=${difficulty}`;
    }
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(trails => {
        displayTrails(trails);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
  
  function displayTrails(trails) {
    const trailDetails = document.getElementById("trailDetails");
    trailDetails.innerHTML = ''; // Clear previous content
  
    if (trails.length === 0) {
      trailDetails.textContent = 'No trails found.';
      return;
    }
  
    // Create the table element
    const trailTable = document.createElement('table');
    trailTable.classList.add('trail-table'); // Add a class for styling if needed
  
    // Create the table headers for trail details
    const headerRow = document.createElement('tr');
    const details = Object.keys(trails[0]); // Assuming all trails have the same structure
    details.forEach(detail => {
      const headerCell = document.createElement('th');
      headerCell.textContent = detail.charAt(0).toUpperCase() + detail.slice(1); // Capitalize first letter
      headerRow.appendChild(headerCell);
    });
    trailTable.appendChild(headerRow);
  
    // Add each trail as a row in the table
    trails.forEach(trail => {
      const row = document.createElement('tr');
      details.forEach(detail => {
        const cell = document.createElement('td');
        cell.textContent = trail[detail];
        row.appendChild(cell);
      });
      trailTable.appendChild(row);
    });
  
    trailDetails.appendChild(trailTable);
  }
  
  
  
  // Function to display a single trail
  function displayTrail(trail) {
    const trailDetails = document.getElementById("trailDetails");
    trailDetails.innerHTML = `
      <h2>${trail.TrailName}</h2>
      <p>Parking: ${trail.Parking}</p>
      <p>Difficulty: ${trail.Difficulty}</p>
      <p>Type: ${trail.Type}</p>
      <p>Distance: ${trail.Distance}</p>
    `;
  }


  
  // Call getRandomTrail when the page loads or when needed
  getRandomTrail();
  