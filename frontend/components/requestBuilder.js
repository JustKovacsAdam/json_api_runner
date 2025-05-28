export function buildRequestBody({ useRaw, rawInput, selectedService, selectedMethod, paramContainer, paramMetadata = [] }) {
    if (useRaw) {
        try {
            const parsed = JSON.parse(rawInput.trim() || '{}');

            if (Array.isArray(parsed)) {
                return { error: 'Invalid input: expected an object with a method name key.' };
            }

            const methods = Object.keys(parsed);
            if (!methods.length) {
                return { error: 'Missing method name in JSON input.' };
            }

            const requestBody = [];

            Object.entries(parsed).forEach(([methodName, paramList]) => {
                if (!Array.isArray(paramList)) {
                    return { error: `Expected an array of params for method '${methodName}'` };
                }

                paramList.forEach(params => {
                    requestBody.push({
                        module: selectedService,
                        method: methodName,
                        params
                    });
                });
            });

            return requestBody;
        } catch (err) {
            return { error: 'Invalid JSON: ' + err.message };
        }
    } else {
        const inputs = paramContainer.querySelectorAll('input');
        const params = {};

        inputs.forEach(input => {
            const name = input.name;
            const value = input.value;
            const type = input.type;
            
            const metadata = paramMetadata.find(p => p.FieldName === name);
            const format = metadata?.Format;
            
            if (format === 'json') {
                try {
                    params[name] = JSON.parse(value);
                } catch (err) {
                    throw new Error(`Invalid JSON in field "${name}": ${err.message}`);
                }
            } else if (type === 'number') {
                params[name] = Number(value);
            } else {
                params[name] = value;
            }
        });

        return [{
            module: selectedService,
            method: selectedMethod,
            params
        }];
    }
}