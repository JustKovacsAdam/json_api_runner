const apiMetadata = {
    userService: {
        methods: {
            getUserProfile: {
                params: [
                    {Title: 'ID', Type: 'number' }
                ] 
            }
        }
    },
    imageService: {
        methods: {
            getImageByName: {
                params: [
                    {Title: 'Name', Type: 'text' },
                    {Title: 'Type', Type: 'text' }
                ]
            }
        }
    },
    mathService: {
        methods: {
            fibonacci: {
                params: [
                    {Title: 'nth Number', Type: 'number' },
                ]
            },
            multiplyMatrices: {
                params: [
                    {Title: 'Matrix A', Type: 'number' },
                    {Title: 'Matrix B', Type: 'number' }
                ]
            }
        }
    }
};

export default apiMetadata;