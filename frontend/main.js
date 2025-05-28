import apiMetadata from './utils/apiMetadata.js';
import {generateStaticParamFields} from "./components/paramGenerator.js";
import {buildRequestBody} from "./components/requestBuilder.js";

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

function getSelectedMethod(selectedService){
    const methodNames = Object.keys(apiMetadata[selectedService].methods);
    if (methodNames.length === 1) {
        return methodNames[0];
    }else{
        return paramFieldsContainer.querySelector('select').value;
    }
}

function handleFieldGeneration(){
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
        createMethodSelector(methods, service, inputContainer);
    }
}

function createMethodSelector(methods, service, container) {
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
        paramFieldsContainer.appendChild(container);
        generateStaticParamFields(methodParams, container);
    });
}

runBtn.addEventListener('click', async () => {
    const useRaw = toggleRawInput.checked
    const selectedService = apiSelect.value;
    const jsonInputValue = jsonInput.value;
    let selectedMethod;
    let paramMetadata;

    if (!useRaw){
        selectedMethod = getSelectedMethod(selectedService);
        paramMetadata = apiMetadata[selectedService].methods[selectedMethod].params;
    }
    
    const body = buildRequestBody({
        useRaw: useRaw,
        rawInput: jsonInputValue,
        selectedService: selectedService,
        selectedMethod: selectedMethod,
        paramContainer: paramFieldsContainer,
        paramMetadata: paramMetadata
    })

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
    jsonInput.style.display = toggleRawInput.checked ? 'block' : 'none';
    paramFieldsContainer.style.display = toggleRawInput.checked ? 'none'  : 'block';
    toggleRawInput ? handleFieldGeneration() : null;
});

apiSelect.addEventListener('change', () => {
    handleFieldGeneration();
});

jsonInput.style.display = 'none';
paramFieldsContainer.style.display = 'block';