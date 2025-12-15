# Conclusion Code Executor

A static web application for executing generated JavaScript code in a secure, sandboxed environment (client-side only).

## Setup
1. Simply open `index.html` in your web browser. 
2. Ensure you have an internet connection to load the external libraries (D3, Leaflet, Cytoscape, Fonts).

## Layout
The application follows a "Conclusion" style premium aesthetic.
- **Left Panel**: Configuration inputs (Code, Data, Parameters).
- **Right Panel**: Output display and controls.

## Usage

### 1. Function Code
Paste your JavaScript function body into the code area. 
The function signature is implicit: `function(data, param1, param2, param3)`

**Example (Simple Math):**
```javascript
return Number(param1) + Number(param2);
```

**Example (Visual - D3):**
```javascript
// Get the visual container popup
const container = window.getVisualContainer();

// Use D3 to draw
const svg = d3.select(container)
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%");

svg.append("circle")
    .attr("cx", 100)
    .attr("cy", 100)
    .attr("r", 50)
    .style("fill", "blue");

return "Drawing circle...";
```

### 2. Data Parameter
You can paste text/JSON directly or load a file. This is passed as the `data` argument to your function.

### 3. Parameters
Optional string inputs passed as `param1`, `param2`, `param3`.

### 4. Output
- Text/JSON output appears in the right panel.
- Visual output (via `window.getVisualContainer()`) appears in a modal popup.

## Libraries Available
The following libraries are available in the global scope:
- **D3.js** (v7) `d3`
- **Leaflet** (v1.9.4) `L`
- **Cytoscape.js** (v3.28.1) `cytoscape`

## Examples
See [EXAMPLES.md](EXAMPLES.md) for copy-pasteable sample functions, including:
- Simple Output (Time Check)
- Visual D3 Generations
- Cytoscape Graphs
- Interactive Leaflet Maps
- D3 Line Chart with Data Input
