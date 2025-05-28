const apiMetadata = {
    userService: {
        methods: {
            getUserProfile: {
                params: [
                    {FieldName: 'id',  Title: 'ID', Type: 'number', Format: 'value' }
                ] 
            }
        }
    },
    imageService: {
        methods: {
            getImageByName: {
                params: [
                    {FieldName: 'name', Title: 'Name', Type: 'text', Format: 'value' },
                    {FieldName: 'type', Title: 'Type', Type: 'text', Format: 'value' }
                ]
            }
        }
    },
    mathService: {
        methods: {
            getFibonacci: {
                params: [
                    {FieldName: 'n', Title: 'nth Number', Type: 'number', Format: 'value' },
                ]
            },
            multiplyMatrices: {
                params: [
                    {FieldName: 'A', Title: 'Matrix A', Type: 'text', Format: 'json' },
                    {FieldName: 'B', Title: 'Matrix B', Type: 'text', Format: 'json' }
                ],
            }
        }
    }
};

export default apiMetadata;