'use strict'

const axios = require('axios'),
    qs = require('querystring');

require('dotenv').config();

/**
 * function main
 * @param {*} event 
 * @param {*} context 
 * @param {*} callback 
 */
exports.handler = async (event, context, callback) => {
    // Request
    // const body = event.body || event;

    await getToken()
        .then(function (result) {
            console.info(result);
            return result;
            // callback(null, result);
        }, function (err) {
            console.info(err);
            return err;
            // callback(null, err);
        });
    return;
}

/**
 * Get Token - Cognito
 */
var getToken = async () => {
    return new Promise(function (resolve, reject) {
        try {
            let clientId = process.env.AppClientId;
            let clientSecret = process.env.AppClientSecret;

            const encode = Buffer.from(clientId + ':' + clientSecret, 'utf-8').toString('base64');
            const authorizer = 'Basic ' + encode;
            const requestBody = {
                grant_type: 'client_credentials',
                client_id: clientId
            };
            const url = process.env.UrlCognitoOauth2Token;
            const params = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': authorizer
                }
            };
            const token = axios.post(url, qs.stringify(requestBody), params);
            // return token.data.access_token;
            resolve(token)
        } catch (err) {
            reject(err);
        }
    });
}