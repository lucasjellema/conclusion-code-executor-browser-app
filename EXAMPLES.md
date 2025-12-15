# Sample Functions

Here are some sample functions to demonstrate the capabilities of the Conclusion Code Executor.

## 1. Simple Output: Digital Clock
This function requires no input parameters. It simply calculates the current time and returns it as a formatted string.

**Instructions:**
1. Copy the code below.
2. Paste it into the **Function Code** text area.
3. Click **RUN CODE**.
4. Observe the current time in the Output panel.

```javascript
const now = new Date();
return `Current Time: ${now.toLocaleTimeString()} (Date: ${now.toLocaleDateString()})`;
```

## 2. Visual Output: Random D3 Pattern
This function generates a random visual pattern using D3.js. It does not use any input parameters.

**Instructions:**
1. Copy the code below.
2. Paste it into the **Function Code** text area.
3. Click **RUN CODE**.
4. A popup window will appear showing the generated art.

```javascript
// Get container
const container = window.getVisualContainer();

// Setup dimensions
const width = container.clientWidth || 800;
const height = container.clientHeight || 600;

// Create SVG
const svg = d3.select(container)
  .append("svg")
  .attr("width", "100%")
  .attr("height", "100%")
  .attr("viewBox", `0 0 ${width} ${height}`);

// Generate 50 random circles
for (let i = 0; i < 50; i++) {
  const cx = Math.random() * width;
  const cy = Math.random() * height;
  const r = Math.random() * 50 + 10;
  const hue = Math.random() * 360;
  
  svg.append("circle")
    .attr("cx", cx)
    .attr("cy", cy)
    .attr("r", 0) // Start at 0 for animation
    .style("fill", `hsla(${hue}, 70%, 50%, 0.6)`)
    .style("stroke", "#fff")
    .style("stroke-width", 2)
    .transition()
    .duration(1000 + Math.random() * 1000)
    .attr("r", r);
}

return "Generated 50 random bubbles.";
```

## 3. Visual Output: Solar System Graph (Cytoscape)
Display a static graph representing part of the solar system.

**Instructions:**
1. Copy the code below.
2. Paste it into the **Function Code** text area.
3. Click **RUN CODE**.
4. Explore the graph in the popup.

```javascript
const container = window.getVisualContainer();

// Style the container for Cytoscape
container.style.width = '100%';
container.style.height = '100%';

const cy = cytoscape({
  container: container,
  
  elements: [ // list of graph elements to start with
    { data: { id: 'sun', label: 'Sun' } },
    { data: { id: 'earth', label: 'Earth' } },
    { data: { id: 'mars', label: 'Mars' } },
    { data: { id: 'jupiter', label: 'Jupiter' } },
    { data: { source: 'sun', target: 'earth' } },
    { data: { source: 'sun', target: 'mars' } },
    { data: { source: 'sun', target: 'jupiter' } }
  ],

  style: [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        'background-color': '#FFD200',
        'label': 'data(label)',
        'color': '#000',
        'font-weight': 'bold'
      }
    },
    {
      selector: '#sun',
      style: {
        'background-color': '#FF6B00',
        'width': 60,
        'height': 60
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 2,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle'
      }
    }
  ],

  layout: {
    name: 'circle'
  }
});

return "Solar system graph rendered.";
```

## 4. Visual Output: Interactive Map (Leaflet)
Display an interactive map centered on London using OpenStreetMap tiles.

**Instructions:**
1. Copy the code below.
2. Paste it into the **Function Code** text area.
3. Click **RUN CODE**.
4. An interactive map will appear in the popup.

```javascript
const container = window.getVisualContainer();

// Create a div for the map
const mapDiv = document.createElement('div');
mapDiv.style.width = '100%';
mapDiv.style.height = '100%';
container.appendChild(mapDiv);

// Initialize Map
const map = L.map(mapDiv);

// Add Tiles (OpenStreetMap)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Define Locations
const locations = [
    { title: "Conclusion Utrecht", lat: 52.0792, lon: 5.1467, address: "Herculesplein 80, Utrecht" },
    { title: "Conclusion Nieuwegein", lat: 52.0292, lon: 5.0806, address: "Edisonbaan 15, Nieuwegein" },
    { title: "Conclusion Amsterdam", lat: 52.3360, lon: 4.9280, address: "Spaklerweg 52c, Amsterdam" }
];

// Add Markers
const markerArray = [];
locations.forEach(loc => {
    const marker = L.marker([loc.lat, loc.lon]).addTo(map)
        .bindPopup(`<b>${loc.title}</b><br>${loc.address}`);
    markerArray.push(marker);
});

// Fit map to show all markers
const group = L.featureGroup(markerArray);
map.fitBounds(group.getBounds().pad(0.1));

// Force map to invalidate size after a slight delay to render correctly in modal
setTimeout(() => {
    map.invalidateSize();
}, 200);

return "Map showing Conclusion offices.";
```

## 5. Visual Output: D3 Line Chart with Data Input
This example demonstrates how to process external JSON data to create a line chart.

**Instructions:**
1. Copy the **JSON Data** content below.
2. Paste it into the **Data Parameter** text area (left panel).
3. Copy the **Function Code** below.
4. Paste it into the **Function Code** text area.
5. Click **RUN CODE**.

**JSON Data:**
```json
[
  {"date": "2023-01-01", "value": 10},
  {"date": "2023-02-01", "value": 45},
  {"date": "2023-03-01", "value": 30},
  {"date": "2023-04-01", "value": 60},
  {"date": "2023-05-01", "value": 55},
  {"date": "2023-06-01", "value": 80},
  {"date": "2023-07-01", "value": 70},
  {"date": "2023-08-01", "value": 90},
  {"date": "2023-09-01", "value": 100},
  {"date": "2023-10-01", "value": 85}
]
```

**Function Code:**
```javascript
const container = window.getVisualContainer();
const containerWidth = container.clientWidth || 800;
const containerHeight = container.clientHeight || 500;

// Parse the input data
// Note: 'data' is provided as a variable in the scope. Assumes it was parsed as JSON by app.js logic or is a string.
let chartData = data;
if (typeof chartData === 'string') {
    try {
        chartData = JSON.parse(chartData);
    } catch(e) {
        return "Error parsing JSON data: " + e.message;
    }
}

if (!Array.isArray(chartData)) {
    return "Error: Data must be a JSON array.";
}

// Check if valid
if (chartData.length === 0) return "No data provided.";

// Setup margins
const margin = {top: 20, right: 30, bottom: 40, left: 50};
const width = containerWidth - margin.left - margin.right;
const height = containerHeight - margin.top - margin.bottom;

// Clear container
container.innerHTML = '';

// Create SVG
const svg = d3.select(container)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Parsers
const parseTime = d3.timeParse("%Y-%m-%d");
const formattedData = chartData.map(d => {
    return { date: parseTime(d.date), value: +d.value };
});

// X Axis
const x = d3.scaleTime()
    .domain(d3.extent(formattedData, d => d.date))
    .range([0, width]);
svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

// Y Axis
const y = d3.scaleLinear()
    .domain([0, d3.max(formattedData, d => d.value)])
    .range([height, 0]);
svg.append("g")
    .call(d3.axisLeft(y));

// Add Line
svg.append("path")
    .datum(formattedData)
    .attr("fill", "none")
    .attr("stroke", "#FF6B00")
    .attr("stroke-width", 2.5)
    .attr("d", d3.line()
        .x(d => x(d.date))
        .y(d => y(d.value))
    );

// Add dots
svg.selectAll("dot")
    .data(formattedData)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.date))
    .attr("cy", d => y(d.value))
    .attr("r", 5)
    .attr("fill", "#002D5A");

return "Line chart rendered successfully.";
```

# How to Prompt Gen AI

To generate code that works in this application, you can use the following context in your prompt to an AI (like ChatGPT, Claude, or Gemini).

### Context to provide:
> I need a JavaScript function body that runs in a specific browser environment.
> - **Inputs:** I have access to variables: `data` (can be JSON/text), `param1`, `param2`, `param3` (strings).
> - **Libraries:** `d3` (v7), `L` (Leaflet v1.9), and `cytoscape` (v3.28) are available globally.
> - **Visual Output:** If creating a visualization, I must use `const container = window.getVisualContainer();` and append elements to it.
> - **Text Output:** Use `return` to output text or JSON.

---

### Example Prompts

#### 1. Analyze Data (Text Output)
> "Write a JavaScript function body that takes a JSON array of numbers from the `data` variable. Calculate the average, min, and max values. Return the result as a formatted string. Use `param1` as a label prefix for the output."

#### 2. Create a Chart (D3 Visualization)
> "Write a JavaScript function body using D3.js. The `data` variable contains a JSON array of objects with `name` and `value` properties. Create a bar chart in the visual container (`window.getVisualContainer()`). Use `param1` to set the color of the bars. Ensure the chart fits the container."

#### 3. Map a Location (Leaflet Visualization)
> "Write a JavaScript function body using Leaflet. Create a map inside `window.getVisualContainer()`. Center the map on coordinates provided in `param1` (latitude) and `param2` (longitude). Place a marker at that location with a popup text provided in `param3`. Ensure you call `map.invalidateSize()` after a short timeout."

