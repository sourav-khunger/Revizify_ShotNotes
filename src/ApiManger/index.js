import RNFetchBlob from 'rn-fetch-blob';

import NetInfo from '@react-native-community/netinfo';

// import axios from 'axios'
const axios = require('axios');

class RequestManager {
  //--------------------------------------------------
  //GET REQUEST WITH PARAMS
  static async getParamsRequest(url, token, parameters) {
    const instance = axios.create({
      baseURL: url,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('API: ', url);

    console.log('\n API Parameters: ', parameters);

    return new Promise(function (resolve, reject) {
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          console.log('start >> ' + 'net connected');
          instance
            .get(url, {
              params: parameters,
            })
            .then(function (response) {
              resolve(response);
            })
            .catch(function (error) {
              console.log('Error2: ', error.response);
              if (error.response != null || error.response != undefined) {
                if (error.response.data.message != undefined) {
                  reject({error: error.response.data.message});
                } else {
                  reject(error.response.data);
                }
              } else {
                reject({message: 'Internet not found'});
              }
            })
            .finally(function () {
              console.log('Error: 0');
              reject('Something went wrong. Please try again later.');
            });
        } else {
          console.log('Internet not Conencted');
          reject({message: 'Internet not found'});
        }
      });
    });
  }
  //--------------------------------------------------
  //GET REQUEST WITHOUT PARAMS
  static async getRequest(url, headers) {
    const instance = axios.create({
      baseURL: url,
      headers: headers,
    });

    console.log('API: ', url);

    return new Promise(function (resolve, reject) {
      NetInfo.fetch().then((state) => {
        console.log('start >> ' + state.isConnected);
        if (state.isConnected) {
          console.log('start >> ' + 'net connected');
          console.log('API: ', url);
          instance
            .get(url)
            .then(function (response) {
              resolve(response.data);
            })
            .catch(function (error) {
              console.log('Error1: ', error);
              if (error.response != null || error.response != undefined) {
                if (error.response.data.message != undefined) {
                  reject({error: error.response.data.message});
                } else {
                  reject(error.response);
                }
              } else {
                reject({message: 'Internet not found'});
              }
            })
            .finally(function () {
              console.log('Error: 0');
              reject('Something went wrong. Please try again later.');
            });
        } else {
          console.log('Net not Conencted');
          reject({message: 'Internet not found'});
        }
      });
    });
  }
  //--------------------------------------------------
  //POST REQUEST
  static async postRequest(url, params, headers) {
    const instance = axios.create({
      baseURL: url,
      headers: headers,
    });

    console.log('API: ', url);
    console.log('\nHeader Parameters: ', headers);
    console.log('\nAPI Parameters: ', params);
    console.log('\ninstance: ', instance);
    return await new Promise(function (resolve, reject) {
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          instance
            .post(url, params)
            .then(function (response) {
              resolve(response.data);
            })
            .catch(function (error) {
              console.log('Post API Error: ', error.response);
              if (error.response != null || error.response != undefined) {
                if (error.response.data == undefined) {
                  reject({
                    error: 'Something went wrong. Please try again later.',
                  });
                } else {
                  if (error.response.data.message != undefined) {
                    reject({error: error.response});
                  } else {
                    reject(error.response);
                  }
                }
              } else {
                reject({message: 'Internet not found'});
              }
            });
        } else {
          console.log('Net not Conencted');
          reject({message: 'Internet not found'});
        }
      });
    });
  }
  //--------------------------------------------------
  //PUT REQUEST
  static async putRequest(url, params, header) {
    const instance = axios.create({
      baseURL: url,
      headers: header,
    });

    console.log('API Headers: ', header);
    console.log('API: ', `${url}`);
    console.log('\nAPI Parameters: ', params);
    return await new Promise(function (resolve, reject) {
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          instance
            .put(url, params)
            .then(function (response) {
              console.log('POST API Response: ', response);
              resolve(response.data);
            })
            .catch(function (error) {
              if (error.response != null || error.response != undefined) {
                console.log('Post API Error: ', error);
                reject(error);
              } else {
                reject({message: 'Internet not found'});
              }
            });
        } else {
          console.log('Net not Conencted');
          reject({message: 'Internet not found'});
        }
      });
    });
  }
  //--------------------------------------------------
  //DELETE REQUEST
  static async deleteRequest(url, params, token) {
    console.log('start>> url', JSON.stringify(url));
    const instance = axios.create({
      baseURL: url,
      headers: {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      },
    });

    console.log('API Headers: ', {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    });

    console.log('API: ', url);
    console.log('\nAPI Parameters: ', params);
    return await new Promise(function (resolve, reject) {
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          instance
            .delete(url, params)
            .then(function (response) {
              console.log('DELETE API Response: ', response);
              resolve(response.data);
            })
            .catch(function (error) {
              if (error.response != null || error.response != undefined) {
                console.log('DELETE API Error: ', error.response);
                reject(error.response.data.error);
              } else {
                reject({message: 'Internet not found'});
              }
            });
        } else {
          console.log('Net not Conencted');
          reject({message: 'Internet not found'});
        }
      });
    });
  }
  //--------------------------------------------------
  static async uploadImage(url, token, params) {
    console.log('API: ', url);
    console.log('PARAMS: ', params);

    console.log('HEADERS: ', {
      Authorization: token != '' ? 'Bearer ' + token : '',
      'Content-Type': 'multipart/form-data',
    });

    return await new Promise(function (resolve, reject) {
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          RNFetchBlob.config({timeout: 7000})
            .fetch(
              'POST',
              url,
              {
                Authorization: token != '' ? 'Bearer ' + token : '',
                'Content-Type': 'multipart/form-data',
              },
              params,
            )
            .then((res) => {
              console.log('UPLOAD RESPONSE: ', JSON.stringify(res));
              resolve(res);
            })
            .catch((err) => {
              if (err.response != null || err.response != undefined) {
                reject(err);
                console.log('Upload Error: ', JSON.stringify(err));
              } else {
                reject({message: 'Internet not found'});
              }
            });
        } else {
          console.log('Net not Conencted');
          reject({message: 'Internet not found'});
        }
      });
    });
  }
}

export default RequestManager;
