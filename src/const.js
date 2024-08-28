import { Wax } from "@eosdacio/ual-wax";
import React from "react";
import { Anchor } from "ual-anchor";

const MAINNET = {
  CHAIN: "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
  API_ENDPOINT: "wax.eosphere.io",
  ATOMIC_ENDPOINT: "wax-atomic-api.eosphere.io",
  AUTHENTICATORS: [],
  API_BASE_URL: "https://wax.cryptolions.io/v1/chain",
};

export const BANANO = {
  API_BASE_URL: "https://api.spyglass.pw/banano",
};

export const ENDPOINTS = {
  ATOMIC: [
    "api.wax.liquidstudios.io",
    "atomic.tokengamer.io",
    "api-wax-aa.eosarabia.net",
    "aa-api-wax.eosauthority.com",
    "atomic.3dkrender.com",
    "atomic.ledgerwise.io",
    "atomic.hivebp.io",
    "wax-atomic.eosiomadrid.io",
    "aa.dapplica.io",
    "wax-aa.eu.eosamsterdam.net",
    "api.wax-aa.bountyblok.io",
    "wax-atomic-api.eosphere.io",
    "wax-atomic.wizardsguild.one",
    "wax-aa.eosdublin.io",
    "atomic.wax.eosrio.io",
    "api.atomic.greeneosio.com",
  ],
  API: [
    "api-wax.eosarabia.net",
    "waxapi.ledgerwise.io",
    "api.wax.liquidstudios.io",
    "wax.pink.gg",
    "wax.greymass.com",
    "wax.eosdublin.io",
    "wax.eu.eosamsterdam.net",
    "wax.blacklusion.io",
    "wax.cryptolions.io",
    "api-wax.eosauthority.com",
    "api.wax.greeneosio.com",
    "api.waxsweden.org",
    "api.hivebp.io",
    "apiwax.3dkrender.com",
    "wax.eosdac.io",
    "wax.blokcrafters.io",
    "wax.eosn.io",
    "api.wax.eosdetroit.io",
    "wax-bp.wizardsguild.one",
    "api.wax.alohaeos.com",
    "wax.eoseoul.io",
    "wax.eosphere.io",
    "wax.dapplica.io",
  ],
};

export const WAX_CHAIN = {
  chainId: MAINNET.CHAIN,
  rpcEndpoints: [{ protocol: "https", host: MAINNET.API_ENDPOINT, port: 443 }],
};
export const DAPP_NAME = "appCheck";

export const MAINNET_AUTHENTICATORS = [
  new Anchor([WAX_CHAIN], { appName: DAPP_NAME }),
  new Wax([WAX_CHAIN], {}),
];
export const TESTNET_AUTHENTICATORS = [
  new Anchor([WAX_CHAIN], { appName: DAPP_NAME }),
];

export const BLOCKCHAIN = { ...MAINNET };
export const coins = [
  "bitcoin",
  "solana",
  "ethereum",
  "bitcoin-cash",
  "wax",
  "polygon",
];
export const initialWallets = [
  "p2wti.wam",
  "t.keg.wam",
  "nicotinamide",
  "bananamonkey",
  "plsdontrugme",
];
export const myWallet = ["p2wti.wam"];
export const BANWALLET = [
  "ban_1igof5isd3xxn7yen8owx1m9cje68mt3n3cpyp8kqkzkcr5x6hwcxwy1pzmq",
];
export const BOOMPOW = [
  "ban_1boompow14irck1yauquqypt7afqrh8b6bbu5r93pc6hgbqs7z6o99frcuym",
];
export const SLOTS = [
  "ban_1s1hot8adygxuj96f35dicnmd47cctazoaiia9uduk731nqt6fuenfax9ckt",
];
