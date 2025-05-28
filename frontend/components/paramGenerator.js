export function generateStaticParamFields(paramList = [], container) {
    container.innerHTML = '';

    paramList.forEach(({ FieldName, Title, Type }) => {
        const input = document.createElement('input');
        input.type  = Type || 'text';
        input.name  = FieldName;
        input.placeholder = Title;
        input.className   = 'form-control';
        container.appendChild(input);
    });
}