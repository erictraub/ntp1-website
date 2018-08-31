'use strict';
const router = require('express').Router();
module.exports = router;
const neblioApiBaseUrl = require('../../configure/variables').neblioApiBaseUrl;
const rp = require('request-promise');
const mongoose = require('mongoose');
const Token = mongoose.model('Token');
const helperFuncs = require('../../helperFunctions');

// get token metadata by id
router.get('/token/:tokenId/metadata', function (req, res) {
    const tokenId = req.params.tokenId;
    
    Token.findOne({ tokenId: tokenId })
    .then(token => {
        if (token) {  // if token is already in mongodb
            console.log('Token present in mongodb.')
            return new Promise((resolve, reject) => resolve(token));
        }
        else {  // if token is not yet in mongodb
            console.log('Token not present in mongodb. Calling Neblio API.')
            return helperFuncs.getAllMetadataForToken(tokenId);
        }
    })
    .then(formattedMetadata => {
        res.send(formattedMetadata);
        if (!formattedMetadata.tokenId) return;
        return Token.create(formattedMetadata);
    }).catch(err => {
        console.error('Handled Error', err);
        res.send({ error: true, errorMessage: 'No data for token searched.' });
    });
});

// get tokenId by token symbol
router.get('/token/:tokenSymbol/tokenId', function (req, res) {
    const tokenSymbol = req.params.tokenSymbol;
    const requestOptions = {
        uri: `${neblioApiBaseUrl}/ntp1/tokenid/${tokenSymbol}`,
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
        uri: `${neblioApiBaseUrl}/ntp1/stakeholders/${tokenId}`,
        method: 'GET',
        json: true
    };

    rp(requestOptions)
    .then(response => {
        res.json(response);
    });
});

// get ntp1 addressinfo for an address
router.get('/address/:address/ntp1/info', function (req, res) {
    const address = req.params.address;
    const requestOptions = {
        uri: `${neblioApiBaseUrl}/ntp1/addressinfo/${address}`,
        method: 'GET',
        json: true
    };

    rp(requestOptions)
    .then(response => {
        res.json(response);
    });
});

// get neblio insights address object
router.get('/ins/address/:address', function (req, res) {
    const address = req.params.address;
    const requestOptions = {
        uri: `${neblioApiBaseUrl}/ins/addr/${address}`,
        method: 'GET',
        json: true
    };

    rp(requestOptions)
    .then(response => {
        res.json(response);
    })
    .catch(err => {
        console.error('Handled Error', err);
        res.send({ error: true, errorMessage: 'No data for address searched.' });
    });
});

// get ntp1 transaction info by txId
router.get('/ntp1/tx/:txId', function (req, res) {
    const txId = req.params.txId;
    const requestOptions = {
        uri: `${neblioApiBaseUrl}/ntp1/transactioninfo/${txId}`,
        method: 'GET',
        json: true
    };

    rp(requestOptions)
    .then(response => {
        res.json(response);
    });
});

// get block by blockhash
router.get('/ins/block/:blockHash', function (req, res) {
    const blockHash = req.params.blockHash;
    const requestOptions = {
        uri: `${neblioApiBaseUrl}/ins/block/${blockHash}`,
        method: 'GET',
        json: true
    };

    rp(requestOptions)
    .then(response => {
        res.json(response);
    })
    .catch(err => {
        console.error('Handled Error', err);
        res.send({ error: true, errorMessage: 'No data for block searched.' });
    });
});

// get blockHash by block-index
router.get('/ins/block/index/:blockIndex', function (req, res) {
    const blockIndex = req.params.blockIndex;
    const requestOptions = {
        uri: `${neblioApiBaseUrl}/ins/block-index/${blockIndex}`,
        method: 'GET',
        json: true
    };

    rp(requestOptions)
    .then(response => {
        res.json(response);
    });
});

// get all transactions for address
router.get('/ins/address/:address/transactions', function (req, res) {
    const address = req.params.address;
    const requestOptions = {
        uri: `${neblioApiBaseUrl}/ins/txs?address=${address}`,
        method: 'GET',
        json: true
    };

    rp(requestOptions)
    .then(response => {
        res.json(response);
    });
});







