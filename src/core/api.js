import axios from 'axios';
import Cookies from 'universal-cookie';
import { addCommentAction } from '../app/common/crud/comments/actions/comment-actions';

var qs = require('qs');

export const baseUrl = 'http://localhost:62403/'

//export const baseUrl = 'http://0aa27dbbcd4f.ngrok.io/'


const tokenK = () => {
    // Add a request interceptor
    axios.interceptors.request.use(function (config) {

        const cookies = new Cookies();
        var token = cookies.get('authToken')

      //  console.log(token);
        config.headers.Authorization = "Bearer " + token;
     //   console.log(config.headers.Authorization);

        return config;
    });
}

export const uploadAvatarApi = (url = baseUrl) => {

    tokenK()

    return formData => axios.post(url + "user/uploadAvatar", formData,
    {
        headers: { 'Content-Type': 'multipart/form-data' },
    })
}

export const uploadProductPhotoApi = (url = baseUrl) => {

    tokenK()

    return formData => axios.post(url + "product/uploadProductPhoto", formData,
    {
        headers: { 'Content-Type': 'multipart/form-data' },
    })
}

export const authApi = (url = baseUrl) => {

    // Add a request interceptor
    axios.interceptors.request.use(function (config) {

        const cookies = new Cookies();
        var token = cookies.get('authToken')

      //  console.log(token);
        config.headers.Authorization = "Bearer " + token;
     //   console.log(config.headers.Authorization);

        return config;
    });

    return {
        login: (model) => axios.post(url + "auth/loginClient", model),
        register: registerModel => axios.post(url + "auth/registerClient", registerModel),

        getMeUser: () => axios.get(url + "user/getMeUser"),

        getUser: (userId) => {

            const config = {
                params: {
                    userId: userId
                }
            }

            return axios.get(url + "user/getUser", config)
        },

        updateUser: updatedUser => axios.post(url + "user/updateUser", updatedUser),

        getUsers: (paginationFilter, userFilter) => {
            
            const config = {
                params: {
                    ...paginationFilter,
                    ...userFilter
                },

                paramsSerializer: params => {
                    return qs.stringify(params)
                }
            }

            
            return axios.get(url + "user/getUsers", config)
        },

        uploadAvatar: formData => axios.post(url + "user/uploadAvatar", formData,
        {
            headers: { 'Content-Type': 'multipart/form-data' },
        }),

        downloadAvatar: pathModel => axios.post(url + "file/downloadProfileFile", pathModel,
            {
             //   headers: { 'responseType': 'multipart/form-data' },
                responseType: 'blob'
            }),

        downloadProfileFile: pathModel => axios.post(url + "file/downloadProfileFile", pathModel,
            {
                responseType: 'blob'
            })

          //  downloadAvatar: axios.request({url + "file/downloadProfileFile", method : "POST", , //important})
    }

}

export const chatApi = (url = baseUrl) => {
    // Add a request interceptor
    axios.interceptors.request.use(function (config) {

        const cookies = new Cookies();
        var token = cookies.get('authToken')

      //  console.log(token);
        config.headers.Authorization = "Bearer " + token;
     //   console.log(config.headers.Authorization);

        return config;
    });
    

    return {
        getMyContact: (user) => axios.post(url + "chat/getMyContact", user),
        getMyContacts: () => axios.get(url + "chat/getMyContacts"),
        getMessages: (getMessagesInfo) => axios.post(url + "chat/getMessages", getMessagesInfo)
    }

}

export const commonApi = (url = baseUrl) => {
    return {
        downloadFile: pathModel => axios.post(url + "file/downloadFile", pathModel,
            {
                responseType: 'blob'
            }
        )
    }
}

export const crudApi = (url = baseUrl) => consoleMarketApi(url)

export const consoleMarketApi = (url = baseUrl) => {
    axios.interceptors.request.use(function (config) {

        const cookies = new Cookies();
        var token = cookies.get('authToken')

      //  console.log(token);
        config.headers.Authorization = "Bearer " + token;
     //   console.log(config.headers.Authorization);

        return config;
    });

    return {

        // category

        getCategories: () => axios.get(url + "category/getCategories"),
        addCategory: category => axios.post(url + "category/addCategory", category),
        updateCategory: category => axios.post(url + "category/updateCategory", category),
        removeCategory: category => axios.post(url + "category/removeCategory", category),
        getCategory: categoryId => axios.get(url + "category/getCategory", { categoryId : categoryId }),

        // manufacturer

        getManufacturers: () => axios.get(url + "manufacturer/getManufacturers"),
        addManufacturer: manufacturer => axios.post(url + "manufacturer/addManufacturer", manufacturer),
        updateManufacturer: manufacturer => axios.post(url + "manufacturer/updateManufacturer", manufacturer),
        removeManufacturer: manufacturer => axios.post(url + "manufacturer/removeManufacturer", manufacturer),
        getManufacturer: manufacturerId => axios.get(url + "manufacturer/getManufacturer", { manufacturerId : manufacturerId }),


        // characteristic

        getCharacteristics: () => axios.get(url + "characteristic/getCharacteristics"),
        addCharacteristic: characteristic => axios.post(url + "characteristic/addCharacteristic", characteristic),
        updateCharacteristic: characteristic => axios.post(url + "characteristic/updateCharacteristic", characteristic),
        removeCharacteristic: characteristic => axios.post(url + "characteristic/removeCharacteristic", characteristic),
        getCharacteristic: characteristicId => axios.get(url + "characteristic/getCharacteristic", { params: { characteristicId : characteristicId }  }),


        // characteristc value

        addCharacteristicValue: chacteristicValue => axios.post(url + "characteristicValue/addCharacteristicValue", chacteristicValue),
        updateCharacteristicValue: chacteristicValue => axios.post(url + "characteristicValue/updateCharacteristicValue", chacteristicValue),
        removeCharacteristicValue: chacteristicValue => axios.post(url + "characteristicValue/removeCharacteristicValue", chacteristicValue),
        getCharacteristicValue: characteristicValueId => axios.get(url + "characteristicValue/getCharacteristicValue", { characteristicValueId : characteristicValueId }),


        // product
        addProduct: product => axios.post(url + "product/addProduct", product),
        removeProduct: product => axios.post(url + "product/removeProduct", product),
        getProducts: (paginationFilter, filtrationFilter) => {
            
            const config = {
                params: {
                    ...paginationFilter,
                    ...filtrationFilter
                },

                paramsSerializer: params => {
                    return qs.stringify(params)
                }
            }

          // console.log(config)

            const serialized = qs.stringify(filtrationFilter)

          //  console.log(serialized)

            const deserialized = qs.parse(serialized)
         //   console.log(deserialized)

            
            return axios.get(url + "product/getProducts", config)
        },

        getProduct: (productId) => {

            const config = {
                params: {
                    productId: productId
                }
            }

            return axios.get(url + "product/getProduct", config)
        },
        updateProduct: product => axios.post(url + "product/updateProduct", product),


        // comment
        addComment: (productComment) => axios.post(url + "productComment/addProductComment", productComment),
        removeComment: (productComment) => axios.post(url + "productComment/removeProductComment", productComment),
        getComments: (filter) => {

            const config = {
                params: {
                    ...filter
                }
            }

            return axios.get(url + "productComment/getProductComments", config)
        },


        likeProduct: (product) =>  axios.post(url + "productLike/likeProduct", product),
        dislikeProduct: (product) =>  axios.post(url + "productLike/dislikeProduct", product),
        takeReactionBack: (product) =>  axios.post(url + "productLike/takeReactionBack", product),


    }
}
