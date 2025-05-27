export function generateStaticParamFields(paramList = [], container) {
    container.innerHTML = '';

    paramList.forEach(({ Title, Type }) => {
        const input = document.createElement('input');
        input.type  = Type || 'text';
        input.name  = Title;
        input.placeholder = Title;
        input.className   = 'form-control param-input';
        container.appendChild(input);
    });
}