"use strict";
exports.id = 241;
exports.ids = [241];
exports.modules = {

/***/ 151:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Kj": () => (/* binding */ CHAIN_ID),
/* harmony export */   "rV": () => (/* binding */ INPUT_MINT_ADDRESS),
/* harmony export */   "vW": () => (/* binding */ OUTPUT_MINT_ADDRESS)
/* harmony export */ });
/* unused harmony exports ENV, SOLANA_RPC_ENDPOINT */
/* harmony import */ var _solana_spl_token_registry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(263);
/* harmony import */ var _solana_spl_token_registry__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_solana_spl_token_registry__WEBPACK_IMPORTED_MODULE_0__);

(__webpack_require__(142).config)();
// Endpoints, connection
const ENV = process.env.NEXT_PUBLIC_CLUSTER || "mainnet-beta";
const CHAIN_ID = ENV === "mainnet-beta" ? _solana_spl_token_registry__WEBPACK_IMPORTED_MODULE_0__.ENV.MainnetBeta : ENV === "devnet" ? _solana_spl_token_registry__WEBPACK_IMPORTED_MODULE_0__.ENV.Devnet : ENV === "testnet" ? _solana_spl_token_registry__WEBPACK_IMPORTED_MODULE_0__.ENV.Testnet : _solana_spl_token_registry__WEBPACK_IMPORTED_MODULE_0__.ENV.MainnetBeta;
const SOLANA_RPC_ENDPOINT = ENV === "devnet" ? "https://api.devnet.solana.com" : "https://solana-api.projectserum.com";
// Token Mints
const INPUT_MINT_ADDRESS = ENV === "devnet" ? "So11111111111111111111111111111111111111112" // SOL
 : "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"; // USDC
const OUTPUT_MINT_ADDRESS = ENV === "devnet" ? "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt" // SRM
 : "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"; // USDT


/***/ }),

/***/ 241:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "h": () => (/* binding */ useJupiterApiContext),
/* harmony export */   "s": () => (/* binding */ JupiterApiProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jup_ag_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(474);
/* harmony import */ var _jup_ag_api__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jup_ag_api__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _solana_spl_token_registry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(263);
/* harmony import */ var _solana_spl_token_registry__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_solana_spl_token_registry__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(151);





const JupiterApiContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createContext(null);
const JupiterApiProvider = ({ children  })=>{
    const { 0: tokenMap , 1: setTokenMap  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(new Map());
    const { 0: routeMap , 1: setRouteMap  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(new Map());
    const { 0: loaded , 1: setLoaded  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const api = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const config = new _jup_ag_api__WEBPACK_IMPORTED_MODULE_2__.Configuration({
            basePath: "https://quote-api.jup.ag"
        });
        return new _jup_ag_api__WEBPACK_IMPORTED_MODULE_2__.DefaultApi(config);
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        (async ()=>{
            const [tokens, indexedRouteMapResult] = await Promise.all([
                new _solana_spl_token_registry__WEBPACK_IMPORTED_MODULE_3__.TokenListProvider().resolve(),
                api.v1IndexedRouteMapGet(), 
            ]);
            const tokenList = tokens.filterByChainId(_constants__WEBPACK_IMPORTED_MODULE_4__/* .CHAIN_ID */ .Kj).getList();
            const { indexedRouteMap ={} , mintKeys =[]  } = indexedRouteMapResult;
            const routeMap = Object.keys(indexedRouteMap).reduce((routeMap, key)=>{
                routeMap.set(mintKeys[Number(key)], indexedRouteMap[key].map((index)=>mintKeys[index]));
                return routeMap;
            }, new Map());
            setTokenMap(tokenList.reduce((map, item)=>{
                map.set(item.address, item);
                return map;
            }, new Map()));
            setRouteMap(routeMap);
            setLoaded(true);
        })();
    }, []);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(JupiterApiContext.Provider, {
        value: {
            api,
            routeMap,
            tokenMap,
            loaded
        },
        children: children
    });
};
const useJupiterApiContext = ()=>{
    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(JupiterApiContext);
    if (!context) {
        throw new Error("useJupiterApiContext must be used within a JupiterApiProvider");
    }
    return context;
};


/***/ })

};
;