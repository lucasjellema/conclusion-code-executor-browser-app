
// DOM Elements
const codeInput = document.getElementById('code-input');
const dataInput = document.getElementById('data-input');
const dataFile = document.getElementById('data-file');
const param1Input = document.getElementById('param1');
const param2Input = document.getElementById('param2');
const param3Input = document.getElementById('param3');
const runBtn = document.getElementById('run-btn');
const outputDisplay = document.getElementById('output-display');
const copyBtn = document.getElementById('copy-btn');
const downloadBtn = document.getElementById('download-btn');
const visualModal = document.getElementById('visual-modal');
const closeModalBtn = document.getElementById('close-modal');
const visualContainer = document.getElementById('visual-container');

// State
let executionResult = null;

// Event Listeners
runBtn.addEventListener('click', executeCode);
copyBtn.addEventListener('click', copyOutput);
downloadBtn.addEventListener('click', downloadOutput);
closeModalBtn.addEventListener('click', closePopup);
visualModal.addEventListener('click', (e) => {
    if(e.target === visualModal) closePopup();
});

dataFile.addEventListener('change', handleFileUpload);

function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        dataInput.value = event.target.result;
    };
    reader.readAsText(file);
}

function executeCode() {
    outputDisplay.textContent = 'Executing...';
    outputDisplay.classList.remove('empty-state');
    
    const code = codeInput.value;
    const dataStr = dataInput.value;
    const p1 = param1Input.value;
    const p2 = param2Input.value;
    const p3 = param3Input.value;

    let data;
    try {
        // Try parsing data as JSON, otherwise keep as string
        if (dataStr.trim().startsWith('{') || dataStr.trim().startsWith('[')) {
             try {
                data = JSON.parse(dataStr);
             } catch(e) {
                console.warn("Data looked like JSON but failed to parse. Using as string.");
                data = dataStr;
             }
        } else {
            data = dataStr;
        }
    } catch (e) {
        data = dataStr;
    }

    try {
        // Prepare Function
        // We wrap it to ensure it returns something or handles the visual output
        
        // Helper for Visual Output
        const openVisualPopup = () => {
             visualModal.classList.remove('hidden');
             visualContainer.innerHTML = ''; // Clear previous
             return visualContainer; // Return the DIV element
        };

        // Make libraries available in local scope explicitly if needed (they are global, but safe to reference)
        // const d3 = window.d3;
        // const L = window.L;
        // const cytoscape = window.cytoscape;

        // Create the function
        // Arguments: data, param1, param2, param3, openVisualPopup
        // NOTE: The user's code might not expect openVisualPopup as an argument if they just strictly follow "data, p1, p2, p3".
        // However, to allow them to write to the popup, they need a reference to it.
        // We can expose `visualContainer` globally or attach it to `window`.
        // Better approach: Expose a helper in the `this` context or just global scope.
        window.getVisualContainer = openVisualPopup;

        const userFunction = new Function('data', 'param1', 'param2', 'param3', code);
        
        // Execute
        const result = userFunction(data, p1, p2, p3);

        // Handle Result
        if (result !== undefined && result !== null) {
            executionResult = result;
            if (typeof result === 'object') {
                outputDisplay.textContent = JSON.stringify(result, null, 2);
            } else {
                outputDisplay.textContent = String(result);
            }
        } else {
            executionResult = "Code executed successfully. No return value.";
            outputDisplay.textContent = executionResult;
        }

    } catch (err) {
        executionResult = err.toString();
        outputDisplay.textContent = "Error during execution:\n" + err.toString();
        console.error(err);
    }
}

function copyOutput() {
    if (!outputDisplay.textContent) return;
    navigator.clipboard.writeText(outputDisplay.textContent).then(() => {
        const originalText = copyBtn.innerText;
        copyBtn.innerText = "Copied!";
        setTimeout(() => copyBtn.innerText = originalText, 2000);
    });
}

function downloadOutput() {
    if (!outputDisplay.textContent) return;
    const blob = new Blob([outputDisplay.textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'execution_result.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function closePopup() {
    visualModal.classList.add('hidden');
}

// Global helper for the user code to find the visual container easily if they don't use the window helper
/* User code example for D3:
   const container = window.getVisualContainer();
   const svg = d3.select(container).append('svg')...
*/
