const popularTokens = [];

const NDEX = {
	"tokenId": "LaAHPkQRtb9AFKkACMhEPR58STgCirv7RheEfk",
	"divisibility": 7,
	"lockStatus": true,
	"aggregationPolicy": "aggregatable",
	"someUtxo": "0065479738be3a1581b87861d4e75ae84b0f22a79dc4555f962a71fb391adc52:0",
	"numOfHolders": 347,
	"totalSupply": 105000000,
	"numOfTransfers": 1348,
	"numOfIssuance": 1,
	"numOfBurns": 0,
	"firstBlock": 159273,
	"issuanceTxid": "cf4065cfdc7b02081b86e0718896177d315e29864c3d4f53588c675bc1310bd0",
	"issueAddress": "NY3SoJkB6tPxa2JfrTj3QDMpKgRtkgSbSb",
	"sha2Issue": "9b2a31fc91d8599306e9b82514445c1fc6f3bfd3f84952ff03c860662c47aadc",
	"tokenName": "NDEX",
	"description": "NebliDex Token",
	"issuer": "NebliDex",
	"iconImage": "https://ntp1-icons.ams3.digitaloceanspaces.com/2e111397fe0c4fa77b3da03f29521e765cc5c45e.png",
};

const PTN = {
	"tokenId": "La5NtFaP8EB6ozdqXWdWvzxuZuk3Q3VLic8sQJ",
	"divisibility": 7,
	"lockStatus": true,
	"aggregationPolicy": "aggregatable",
	"someUtxo": "0079497e5123c0bda296d5fac77cc48ad7917370891542e8c06f168684a79eb9:0",
	"numOfHolders": 250,
	"totalSupply": 50000000,
	"numOfTransfers": 734,
	"numOfIssuance": 1,
	"numOfBurns": 0,
	"firstBlock": 159299,
	"issuanceTxid": "62a4ee0363d8c6713c10d5d9ad61a29a39ca646ead3273156665a8070b4c183c",
	"issueAddress": "nHJcWVrFwtbaB3eFupVTEsLyEEHwPDhGV9",
	"sha2Issue": "10093756c392e61abc54d2082b8c4eabc0025a4427dc74582e45b1040cdc30f6",
	"tokenName": "PTN",
	"description": "Potion Owl",
	"issuer": "Potion Owl",
	"iconImage": "https://ntp1-icons.ams3.digitaloceanspaces.com/f6fcc648a2ace7bfee050b6d6fa29919404f41d5.png",
};


const SCENE = {
	"tokenId": "LaA9KbCQbrrvmPGk79Vt6aAwk4K5mJW1XUjpAq",
	"divisibility": 7,
	"lockStatus": true,
	"aggregationPolicy": "aggregatable",
	"someUtxo": "05a545f0dc90b723a0767dff234349f6ca844b61094ea172151084514cb6b17a:0",
	"numOfHolders": 157,
	"totalSupply": 10000000,
	"numOfTransfers": 321,
	"numOfIssuance": 1,
	"numOfBurns": 0,
	"firstBlock": 198608,
	"issuanceTxid": "898557167021992ec70ef728f8f0e61063e8b2e60c937407fe4901b0bf157b9a",
	"issueAddress": "NVE1To9n6Ef8yhPpcrPkS3YfJo56mtHccH",
	"sha2Issue": "0b3862308f6ee4590b65bb29ec0d80ddf3983bf9fbdec5a88cbc95d0d8943b90",
	"tokenName": "SCENE",
	"description": "Cryptoscene",
	"issuer": "Cryptoscene",
	"iconImage": "https://ntp1-icons.ams3.digitaloceanspaces.com/bb91f8de992d9b31d5d6ede42951449a9b665090.png",
};

const TRIF = {
	"tokenId": "La3QxvUgFwKz2jjQR2HSrwaKcRgotf4tGVkMJx",
	"divisibility": 7,
	"lockStatus": true,
	"aggregationPolicy": "aggregatable",
	"someUtxo": "0001e26e6b5e98d1b4e96987f1e010f351f4fa2d6d0bacfafc7f501787bbf4f6:9",
	"numOfHolders": 7641,
	"totalSupply": 1607509562,
	"numOfTransfers": 2360,
	"numOfIssuance": 1,
	"numOfBurns": 1,
	"firstBlock": 159746,
	"issuanceTxid": "578a788a8a86ccc7fa0c045ee63ff1dd9c05ae38b08ef10ac62d18ff9783ee56",
	"issueAddress": "NMi41ze2XnxJrMNGtSGheGqLR3h4dabREW",
	"sha2Issue": "c5f374b0f087cd3ebba03c0046123459e5e8adb2071af6cbae840e1f778cc113",
	"tokenName": "TRIF",
	"description": "Trifid",
	"issuer": "TrifidTeam",
	"iconImage": "https://ntp1-icons.ams3.digitaloceanspaces.com/24d000d478d72d6a43b89bbabbe41a45acde9ba0.png",
};

popularTokens.push(NDEX);
popularTokens.push(PTN);
popularTokens.push(SCENE);
popularTokens.push(TRIF);

popularTokens.sort((a, b) => b.numOfHolders - a.numOfHolders);

module.exports = popularTokens;