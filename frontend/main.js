const apiSelect    = document.getElementById('apiSelect');
const jsonInput    = document.getElementById('jsonInput');
const resultBlock  = document.getElementById('resultBlock');
const runBtn       = document.getElementById('runBtn');
const toggleTheme  = document.getElementById('toggleTheme');
const toggleAlign  = document.getElementById('toggleAlign');

function showResult(obj) {
    resultBlock.textContent = JSON.stringify(obj, null, 2);
    resultBlock.classList.add('json-output');
}

function getRequestBody() {
    let body;
    try {
        const parsed = JSON.parse(jsonInput.value.trim() || '{}');
        body = [{
            module : apiSelect.value,
            method : Object.keys(parsed)[0] || 'methodName',
            params : parsed[Object.keys(parsed)[0]] ?? parsed
        }];
    } catch (err) {
        return { error: 'Invalid JSON: ' + err.message };
    }
    return body;
}

runBtn.addEventListener('click', async () => {
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
    const bodyClassList = document.body.classList;
    const isDark = bodyClassList.contains('theme-dark');
    
    bodyClassList.toggle('theme-dark');
    bodyClassList.toggle('theme-light');
    
    toggleTheme.textContent = isDark ? 'Switch to Dark Mode' : 'Switch to Light Mode';
});

toggleAlign.addEventListener('click', () => {
    const bodyClassList = document.body.classList;
    
    if (bodyClassList.contains('align-left')) {
        bodyClassList.remove('align-left');
        bodyClassList.add('align-center');
        toggleAlign.textContent = 'Align Right';
        
    } else if (bodyClassList.contains('align-center')) {
        bodyClassList.remove('align-center');
        bodyClassList.add('align-right');
        toggleAlign.textContent = 'Align Left';
        
    } else {
        bodyClassList.remove('align-right');
        bodyClassList.add('align-left');
        toggleAlign.textContent = 'Align Center';
    }
});

jsonInput.value =
    `{
  "getUserProfile": { "id": 1 }
}`;
