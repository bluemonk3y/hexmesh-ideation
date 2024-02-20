// Define a function to create a hexagon with form and overlay panel
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

    const submitButton = document.getElementById(`${id}-submit`);
    submitButton.addEventListener("click", function(event) {
        event.preventDefault();
        const color = document.getElementById(`${id}-color`).value;
        const url = document.getElementById(`${id}-url`).value;
        const toggled = document.getElementById(`${id}-toggle`).checked;
        console.log(`Form submitted for hexagon "${id}":`, { color, url, toggled });
    });

    return hexagon;
}

// Function to arrange hexagons with overlay panels hierarchically
function arrangeHexagonsWithOverlays() {
    console.log("Arranging hexagons with overlays...");
    // Clear previous hexagons
    document.getElementById("hexContainer").innerHTML = "";

    // Example: Creating 10 hexagons with overlays in a hierarchical arrangement
    const hexagonCoordinates = [];
    for (let i = 0; i < 10; i++) {
        const hexagon = createHexagonWithOverlay("hex" + i);
        hexagon.style.left = i * 100 + "px"; // Adjust position as needed
        hexagon.style.top = i * 50 + "px"; // Adjust position as needed
        document.getElementById("hexContainer").appendChild(hexagon);

        // Store the coordinates of each hexagon
        hexagonCoordinates.push({ x: i * 100, y: i * 50 });
    }

    // Draw lines between specific hexagons
    drawLine(hexagonCoordinates[0], hexagonCoordinates[1], "Label 1");
    drawLine(hexagonCoordinates[2], hexagonCoordinates[3], "Label 2");
}

// Function to draw a line with label between two points
function drawLine(start, end, label) {
    console.log(`Drawing line from (${start.x}, ${start.y}) to (${end.x}, ${end.y}) with label "${label}"`);
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "line-svg");
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", start.x + 50); // Adjust for hexagon width
    line.setAttribute("y1", start.y + 25); // Adjust for hexagon height
    line.setAttribute("x2", end.x + 50); // Adjust for hexagon width
    line.setAttribute("y2", end.y + 25); // Adjust for hexagon height
    svg.appendChild(line);

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", (start.x + end.x) / 2);
    text.setAttribute("y", (start.y + end.y) / 2);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("alignment-baseline", "central");
    text.textContent = label;
    svg.appendChild(text);

    document.getElementById("hexContainer").appendChild(svg);
}

// Call the function to arrange hexagons with overlays when the page loads
window.onload = function() {
    console.log("Page loaded");
    arrangeHexagonsWithOverlays();
};
