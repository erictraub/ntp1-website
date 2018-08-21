'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    tokenId: {
        type: String,
        required: true
    },
    divisibility: {
        type: Number
    },
    lockStatus: {
        type: Boolean
    },
    aggregationPolicy: {
        type: String
    },
    someUtxo: {
        type: String
    },
    numOfHolders: {
        type: Number
    },
    totalSupply: {
        type: Number
    },
    numOfTransfers: {
        type: Number
    },
    numOfIssuance: {
        type: Number
    },
    numOfBurns: {
        type: Number
    },
    firstBlock: {
        type: Number
    },
    // data from utxoMetadata call starts here
    issuanceTxid: {
        type: String
    },
    issueAddress: {
        type: String
    },
    sha2Issue: {
        type: String
    },
    tokenName: {
        type: String
    },
    description: {
        type: String
    },
    issuer: {
        type: String
    },
    iconImage: {
        type: String
    }
});

mongoose.model('Token', schema);
