export default async function dispatcher(calls = []) {
    const results = [];

    for (const call of calls) {
        const { module, method, params } = call;

        try {
            const mod = await import(`./apis/${module}.js`);
            
            if (typeof mod[method] !== 'function') {
                throw new Error(`Method ${method} not found in ${module}`);
            }
            
            const result = await mod[method](params);
            results.push({ success: true, result });
        } catch (err) {
            results.push({ success: false, error: err.message });
        }
    }

    return results;
}