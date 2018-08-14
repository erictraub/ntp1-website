'use strict';
const router = require('express').Router();
module.exports = router;
const neblioApiBaseUrl = require('../../configure/variables').neblioApiBaseUrl;
const rp = require('request-promise');


// get token metadata by id
router.get('/token/:tokenId/metadata', function (req, res) {
    const tokenId = req.params.tokenId;
    const requestOptions = {
        uri: `${neblioApiBaseUrl}/tokenmetadata/${tokenId}`,
        method: 'GET',
        json: true
    };

    rp(requestOptions)
    .then(response => {
        res.json(response);
    });
});

// get UTXO metadata of token by id
router.get('/token/:tokenId/utxo/:utxo/metadata', function (req, res) {
    const tokenId = req.params.tokenId;
    const utxo = req.params.utxo;
    const requestOptions = {
        uri: `${neblioApiBaseUrl}/tokenmetadata/${tokenId}/${utxo}`,
        method: 'GET',
        json: true
    };

    rp(requestOptions)
    .then(response => {
        res.json(response);
    });
});

// get tokenId by token symbol
router.get('/token/:tokenSymbol/tokenId', function (req, res) {
    const tokenSymbol = req.params.tokenSymbol;
    const requestOptions = {
        uri: `${neblioApiBaseUrl}/tokenid/${tokenSymbol}`,
        method: 'GET',
        json: true
    };

    rp(requestOptions)
    .then(response => {
        res.json(response);
    });
});

// get token holders by tokenId
router.get('/token/:tokenId/holders', function (req, res) {
    const tokenId = req.params.tokenId;
    const requestOptions = {
        uri: `${neblioApiBaseUrl}/stakeholders/${tokenId}`,
        method: 'GET',
        json: true
    };

    rp(requestOptions)
    .then(response => {
        res.json(response);
    });
});




