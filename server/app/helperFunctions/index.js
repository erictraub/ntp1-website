let helperFuncs = {};
module.exports = helperFuncs;
const rp = require('request-promise');
const neblioApiBaseUrl = require('../configure/variables').neblioApiBaseUrl;


helperFuncs.formatTokenMetadata = function(tokenMetadataObj) {
    let result = tokenMetadataObj.metadata;
    result.issuanceTxid = tokenMetadataObj.utxoMetadata.issuanceTxid;
    result.issueAddress = tokenMetadataObj.utxoMetadata.issueAddress;
    result.sha2Issue = tokenMetadataObj.utxoMetadata.sha2Issue;
    result.tokenName = tokenMetadataObj.utxoMetadata.metadataOfIssuence.data.tokenName;
    result.description = tokenMetadataObj.utxoMetadata.metadataOfIssuence.data.description;
    result.issuer = tokenMetadataObj.utxoMetadata.metadataOfIssuence.data.issuer;
    result.iconImage = null;
    tokenMetadataObj.utxoMetadata.metadataOfIssuence.data.urls.forEach(urlObj => {
        if (urlObj.name === 'icon') result.iconImage = urlObj.url;
    });
    return result;
};

helperFuncs.getAllMetadataForToken = function(tokenId) {
    const requestOptions = {
        uri: `${neblioApiBaseUrl}/ntp1/tokenmetadata/${tokenId}`,
        method: 'GET',
        json: true
    };

    let tokenData = {};

    return rp(requestOptions)
    .then(tokenMetadataObj => {
        tokenData.metadata = tokenMetadataObj;
        const requestOptions = {
            uri: `${neblioApiBaseUrl}/ntp1/tokenmetadata/${tokenId}/${tokenData.metadata.someUtxo}`,
            method: 'GET',
            json: true
        };
        return rp(requestOptions)
        .then(utxoMetadata => {
            tokenData.utxoMetadata = utxoMetadata;
            return helperFuncs.formatTokenMetadata(tokenData);
        });
    });
};