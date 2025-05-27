import apiMetadata from './utils/apiMetadata.js';
import {generateStaticParamFields} from "./components/paramGenerator.js";

const apiSelect      = document.getElementById('apiSelect');
const toggleTheme    = document.getElementById('toggleTheme');
const toggleAlign    = document.getElementById('toggleAlign');
const runBtn         = document.getElementById('runBtn');

const toggleRawInput = document.getElementById('toggleRawInput');
const jsonInput      = document.getElementById('jsonInput');

const paramFieldsContainer = document.getElementById('paramFields');
const resultBlock    = document.getElementById('resultBlock');

function showResult(obj) {
    resultBlock.textContent = JSON.stringify(obj, null, 2);
    resultBlock.classList.add('json-output');
}

function getRequestBody() {
    let parsed;
    try {
        parsed = JSON.parse(jsonInput.value.trim() || '{}');
    } catch (err) {
        return { error: 'Invalid JSON: ' + err.message };
    }

    const module = apiSelect.value || 'unknownService';
    
    if (Array.isArray(parsed)) {
        return { error: 'Invalid input: expected an object with a method name key.' };
    }

    const method = Object.keys(parsed)[0];
    if (!method) {
        return { error: 'Missing method name in JSON input.' };
    }

    const params = parsed[method];
    
    if (Array.isArray(params)) {
        return params.map(p => ({
            module,
            method,
            params: p
        }));
    }
    
    return [{
        module,
        method,
        params
    }];
}

runBtn.addEventListener('click', async () => {
    //TODO Change this to allow non raw inputs
    if (!toggleRawInput.checked) return;
    
    //TODO Implement a request body formatter component
    const body = getRequestBody();

    if (body.error) return showResult(body);

    try {
        const res = await fetch('http://localhost:3000/dispatch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        const json = await res.json();
        showResult(json);
    } catch (err) {
        showResult({ error: err.message });
    }
});

toggleTheme.addEventListener('click', () => {
    const dark = document.body.classList.toggle('theme-dark');
    document.body.classList.toggle('theme-light', !dark);
    toggleTheme.textContent = dark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
});

toggleAlign.addEventListener('click', () => {
    const bodyCls = document.body.classList;
    if (bodyCls.contains('align-left')) {
        bodyCls.replace('align-left', 'align-center');
        toggleAlign.textContent = 'Align Right';
    } else if (bodyCls.contains('align-center')) {
        bodyCls.replace('align-center', 'align-right');
        toggleAlign.textContent = 'Align Left';
    } else {
        bodyCls.replace('align-right', 'align-left');
        toggleAlign.textContent = 'Align Center';
    }
});

toggleRawInput.addEventListener('change', () => {
    jsonInput.style.display   = toggleRawInput.checked ? 'block' : 'none';
    paramFieldsContainer.style.display = toggleRawInput.checked ? 'none'  : 'block';
});

apiSelect.addEventListener('change', () => {
    if (toggleRawInput.checked) return;
    
    const selectedService = apiSelect.value;

    const service = apiMetadata[selectedService];
    const methods = Object.keys(service.methods);
    
    paramFieldsContainer.innerHTML = '';

    const inputContainer = document.createElement('div');
    inputContainer.id = 'inputContainer';
    inputContainer.className = 'controls-row';

    if (methods.length === 1) {
        const methodName = methods[0];
        paramFieldsContainer.appendChild(inputContainer);
        generateStaticParamFields(service.methods[methodName].params, inputContainer);
    } else {
        const methodSelectContainer = document.createElement('div');
        methodSelectContainer.id = 'methodSelectContainer';
        methodSelectContainer.className = 'controls-row';
        paramFieldsContainer.appendChild(methodSelectContainer);
        
        const methodSelect = document.createElement('select');
        methodSelect.id = 'methodSelect';
        methodSelect.className = 'form-control';
        methodSelect.innerHTML =
            '<option disabled selected>Select method</option>' +
            methods.map(method => `<option value="${method}">${method}</option>`).join('');
        methodSelectContainer.appendChild(methodSelect);

        methodSelect.addEventListener('change',  (event) => {
            const selectedMethod = event.target.value;
            const methodParams = service.methods[selectedMethod].params;
            paramFieldsContainer.appendChild(inputContainer);
            if (selectedMethod === 'multiplyMatrices') {
                
            }else{
                generateStaticParamFields(methodParams, inputContainer);
            }

        });
    }
});

jsonInput.value = `{\n  "getUserProfile": { "id": 1 }\n}`;
jsonInput.style.display = 'none';
paramFieldsContainer.style.display = 'block';