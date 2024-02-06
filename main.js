import bitcoin from "bitcoinjs-lib"
import {ECPairFactory} from 'ecpair';
import * as ecc from 'tiny-secp256k1';

// Function to generate redeem script
function generateRedeemScript(preImage) {
    const hex = Buffer.from(preImage).toString('hex');
    const lockHex = bitcoin.crypto.sha256(Buffer.from(hex, 'hex')).toString('hex');
    return bitcoin.script.compile([bitcoin.opcodes.OP_SHA256, Buffer.from(lockHex, 'hex'), bitcoin.opcodes.OP_EQUAL]);
    
}

// Function to derive address from redeem script
function deriveAddress(redeemScript) {
    const p2sh = bitcoin.payments.p2sh({ redeem: { output: redeemScript } });
    return p2sh.address;
}

// Function to construct transaction sending bitcoins to address
function constructTransaction(address, amount) {
    const ECPair = ECPairFactory(ecc)
    const network = bitcoin.networks.testnet;
    const keypair = ECPair.makeRandom({network});
    const p2pkh = bitcoin.payments.p2pkh({ pubkey: keypair.publicKey });
    


// Test function
function testFunctions() {
    const preImage = "427472757374204275696c64657273";
    const redeemScript = generateRedeemScript(preImage);
    console.log("Redeem Script:", redeemScript.toString('hex'));

    const address = deriveAddress(redeemScript);
    console.log("Derived Address:", address);

    
}
testFunctions();
}
