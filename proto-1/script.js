// Function to create a hexagon with form and overlay panel
function createHexagonWithOverlay(id) {
    const hexagon = document.createElement("div");
    hexagon.classList.add("hexagon");
    hexagon.id = id;

    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.innerHTML = `
        <div class="overlay-content">
            <h2>${id}</h2>
            <label for="${id}-color">Color:</label>
            <select id="${id}-color">
                <option value="red">Red</option>
                <option value="amber">Amber</option>
                <option value="green">Green</option>
            </select><br>
            <label for="${id}-url">URL:</label>
            <input type="text" id="${id}-url" placeholder="Enter URL"><br>
            <label for="${id}-toggle">Toggle:</label>
            <input type="checkbox" id="${id}-toggle"><br>
            <button id="${id}-submit">Submit</button>
        </div>
    `;

    overlay.style.display = "none";
    hexagon.appendChild(overlay);

    hexagon.addEventListener("click", function() {
        overlay.style.display = "block";
        console.log(`Hexagon "${id}" clicked`);
    });

    overlay.addEventListener("click", function(event) {
        event.stopPropagation(); // Prevent clicks inside the overlay from closing it
    });

    const submitButton = overlay.querySelector(`#${id}-submit`);
    submitButton.addEventListener("click", function(event) {
        event.preventDefault();
        const color = document.getElementById(`${id}-color`).value;
        const url = document.getElementById(`${id}-url`).value;
        const toggled = document.getElementById(`${id}-toggle`).checked;
        console.log(`Form submitted for hexagon "${id}":`, { color, url, toggled });
    });

    return hexagon;
}

// Function to arrange hexagons with overlay panels in a circle
function arrangeHexagonsInCircle(centerX, centerY, radius, numHexagons) {
    console.log("Arranging hexagons in a circle...");

    const hexagonCoordinates = [];
    const angleIncrement = (2 * Math.PI) / numHexagons;
    // Create and append the center hexagon
    const centerHexagon = createHexagonWithOverlay("centerHex");
    centerHexagon.style.left = centerX - 75 + "px"; // Adjust for hexagon width
    centerHexagon.style.top = centerY - 43.3 + "px"; // Adjust for hexagon height
    document.getElementById("hexContainer").appendChild(centerHexagon);

    for (let i = 0; i < numHexagons - 1; i++) {
        const angle = i * angleIncrement;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        const hexagon = createHexagonWithOverlay("hex" + i);
        hexagon.style.left = x - 75 + "px"; // Adjust for hexagon width
        hexagon.style.top = y - 43.3 + "px"; // Adjust for hexagon height
        document.getElementById("hexContainer").appendChild(hexagon);
        hexagonCoordinates.push({ x, y });

        // Add outer class to hexagons that are beyond the center circle
        if (radius > 200) { // Adjust as needed for the circle size
            hexagon.classList.add("hexagon-outer");
        }
    }
}

// Function to calculate and set the height of the hex container
function setHexContainerHeight() {
    const hexContainer = document.getElementById("hexContainer");
    const hexagons = hexContainer.querySelectorAll(".hexagon");

    let maxHeight = 0;
    hexagons.forEach(hexagon => {
        const rect = hexagon.getBoundingClientRect();
        const height = rect.top + rect.height; // Calculate the total height including top position
        if (height > maxHeight) {
            maxHeight = height;
        }
    });

    hexContainer.style.height = maxHeight + "px";
}

// Call the function to arrange hexagons in a circle when the page loads
window.onload = function() {
    console.log("Page loaded");
    const centerX = 300; // Adjust as needed
    const centerY = 300; // Adjust as needed
    const radius = 250; // Adjusted size
    const numHexagons = 12; // Number of hexagons around the circle
    arrangeHexagonsInCircle(centerX, centerY, radius, numHexagons);
    setHexContainerHeight(); // Set the height of the hex container
};
