"use strict";
exports.id = 624;
exports.ids = [624];
exports.modules = {

/***/ 843:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "aD": () => (/* reexport */ WalletMultiButton)
});

// UNUSED EXPORTS: WalletConnectButton, WalletDisconnectButton, WalletIcon, WalletModal, WalletModalButton, WalletModalContext, WalletModalProvider, useWalletModal

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/useWalletModal.js

const useWalletModal_WalletModalContext = /*#__PURE__*/ (0,external_react_.createContext)({});
function useWalletModal_useWalletModal() {
    return (0,external_react_.useContext)(useWalletModal_WalletModalContext);
} //# sourceMappingURL=useWalletModal.js.map

// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-react/lib/useWallet.js
var lib_useWallet = __webpack_require__(257);
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/Button.js

const Button_Button = (props)=>{
    const justifyContent = props.endIcon || props.startIcon ? "space-between" : "center";
    return /*#__PURE__*/ external_react_default().createElement("button", {
        className: `wallet-adapter-button ${props.className || ""}`,
        disabled: props.disabled,
        onClick: props.onClick,
        style: Object.assign({
            justifyContent
        }, props.style),
        tabIndex: props.tabIndex || 0
    }, props.startIcon && /*#__PURE__*/ external_react_default().createElement("i", {
        className: "wallet-adapter-button-start-icon"
    }, props.startIcon), props.children, props.endIcon && /*#__PURE__*/ external_react_default().createElement("i", {
        className: "wallet-adapter-button-end-icon"
    }, props.endIcon));
}; //# sourceMappingURL=Button.js.map

;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/WalletIcon.js
var __rest = undefined && undefined.__rest || function(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
};

const WalletIcon_WalletIcon = (_a)=>{
    var { wallet  } = _a, props = __rest(_a, [
        "wallet"
    ]);
    return wallet && /*#__PURE__*/ external_react_default().createElement("img", Object.assign({
        src: wallet.icon,
        alt: `${wallet.name} icon`
    }, props));
}; //# sourceMappingURL=WalletIcon.js.map

;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/WalletConnectButton.js
var WalletConnectButton_rest = undefined && undefined.__rest || function(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
};




const WalletConnectButton = (_a)=>{
    var { children , disabled , onClick  } = _a, props = WalletConnectButton_rest(_a, [
        "children",
        "disabled",
        "onClick"
    ]);
    const { wallet , connect , connecting , connected  } = (0,lib_useWallet/* useWallet */.O)();
    const handleClick = (0,external_react_.useCallback)((event)=>{
        if (onClick) onClick(event);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        if (!event.defaultPrevented) connect().catch(()=>{});
    }, [
        onClick,
        connect
    ]);
    const content = (0,external_react_.useMemo)(()=>{
        if (children) return children;
        if (connecting) return "Connecting ...";
        if (connected) return "Connected";
        if (wallet) return "Connect";
        return "Connect Wallet";
    }, [
        children,
        connecting,
        connected,
        wallet
    ]);
    return /*#__PURE__*/ external_react_default().createElement(Button_Button, Object.assign({
        className: "wallet-adapter-button-trigger",
        disabled: disabled || !wallet || connecting || connected,
        startIcon: wallet ? /*#__PURE__*/ external_react_default().createElement(WalletIcon_WalletIcon, {
            wallet: wallet
        }) : undefined,
        onClick: handleClick
    }, props), content);
}; //# sourceMappingURL=WalletConnectButton.js.map

// EXTERNAL MODULE: external "react-dom"
var external_react_dom_ = __webpack_require__(405);
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/Collapse.js

const Collapse_Collapse = ({ id , children , expanded =false  })=>{
    const ref = useRef(null);
    const instant = useRef(true);
    const transition = "height 250ms ease-out";
    const openCollapse = ()=>{
        const node = ref.current;
        if (!node) return;
        requestAnimationFrame(()=>{
            node.style.height = node.scrollHeight + "px";
        });
    };
    const closeCollapse = ()=>{
        const node = ref.current;
        if (!node) return;
        requestAnimationFrame(()=>{
            node.style.height = node.offsetHeight + "px";
            node.style.overflow = "hidden";
            requestAnimationFrame(()=>{
                node.style.height = "0";
            });
        });
    };
    useLayoutEffect(()=>{
        if (expanded) {
            openCollapse();
        } else {
            closeCollapse();
        }
    }, [
        expanded
    ]);
    useLayoutEffect(()=>{
        const node = ref.current;
        if (!node) return;
        function handleComplete() {
            if (!node) return;
            node.style.overflow = expanded ? "initial" : "hidden";
            if (expanded) {
                node.style.height = "auto";
            }
        }
        function handleTransitionEnd(event) {
            if (node && event.target === node && event.propertyName === "height") {
                handleComplete();
            }
        }
        if (instant.current) {
            handleComplete();
            instant.current = false;
        }
        node.addEventListener("transitionend", handleTransitionEnd);
        return ()=>node.removeEventListener("transitionend", handleTransitionEnd);
    }, [
        expanded
    ]);
    return /*#__PURE__*/ React.createElement("div", {
        children: children,
        className: "wallet-adapter-collapse",
        id: id,
        ref: ref,
        role: "region",
        style: {
            height: 0,
            transition: instant.current ? undefined : transition
        }
    });
}; //# sourceMappingURL=Collapse.js.map

;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/WalletListItem.js



const WalletListItem_WalletListItem = ({ handleClick , tabIndex , wallet  })=>{
    return /*#__PURE__*/ React.createElement("li", null, /*#__PURE__*/ React.createElement(Button, {
        onClick: handleClick,
        endIcon: /*#__PURE__*/ React.createElement(WalletIcon, {
            wallet: wallet
        }),
        tabIndex: tabIndex
    }, wallet.name));
}; //# sourceMappingURL=WalletListItem.js.map

;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/WalletModal.js







const WalletModal_WalletModal = ({ className ="" , logo , featuredWallets =3 , container ="body" ,  })=>{
    const ref = useRef(null);
    const { wallets , select  } = useWallet();
    const { setVisible  } = useWalletModal();
    const { 0: expanded , 1: setExpanded  } = useState(false);
    const { 0: fadeIn , 1: setFadeIn  } = useState(false);
    const { 0: portal , 1: setPortal  } = useState(null);
    const { 0: featured , 1: more  } = useMemo(()=>[
            wallets.slice(0, featuredWallets),
            wallets.slice(featuredWallets)
        ], [
        wallets,
        featuredWallets
    ]);
    const hideModal = useCallback(()=>{
        setFadeIn(false);
        setTimeout(()=>setVisible(false), 150);
    }, [
        setFadeIn,
        setVisible
    ]);
    const handleClose = useCallback((event)=>{
        event.preventDefault();
        hideModal();
    }, [
        hideModal
    ]);
    const handleWalletClick = useCallback((event, walletName)=>{
        select(walletName);
        handleClose(event);
    }, [
        select,
        handleClose
    ]);
    const handleCollapseClick = useCallback(()=>setExpanded(!expanded), [
        setExpanded,
        expanded
    ]);
    const handleTabKey = useCallback((event)=>{
        const node = ref.current;
        if (!node) return;
        // here we query all focusable elements
        const focusableElements = node.querySelectorAll("button");
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (event.shiftKey) {
            // if going backward by pressing tab and firstElement is active, shift focus to last focusable element
            if (document.activeElement === firstElement) {
                lastElement.focus();
                event.preventDefault();
            }
        } else {
            // if going forward by pressing tab and lastElement is active, shift focus to first focusable element
            if (document.activeElement === lastElement) {
                firstElement.focus();
                event.preventDefault();
            }
        }
    }, [
        ref
    ]);
    useLayoutEffect(()=>{
        const handleKeyDown = (event)=>{
            if (event.key === "Escape") {
                hideModal();
            } else if (event.key === "Tab") {
                handleTabKey(event);
            }
        };
        // Get original overflow
        const { overflow  } = window.getComputedStyle(document.body);
        // Hack to enable fade in animation after mount
        setTimeout(()=>setFadeIn(true), 0);
        // Prevent scrolling on mount
        document.body.style.overflow = "hidden";
        // Listen for keydown events
        window.addEventListener("keydown", handleKeyDown, false);
        return ()=>{
            // Re-enable scrolling when component unmounts
            document.body.style.overflow = overflow;
            window.removeEventListener("keydown", handleKeyDown, false);
        };
    }, [
        hideModal,
        handleTabKey
    ]);
    useLayoutEffect(()=>setPortal(document.querySelector(container)), [
        setPortal,
        container
    ]);
    return portal && /*#__PURE__*/ createPortal(/*#__PURE__*/ React.createElement("div", {
        "aria-labelledby": "wallet-adapter-modal-title",
        "aria-modal": "true",
        className: `wallet-adapter-modal ${fadeIn && "wallet-adapter-modal-fade-in"} ${className}`,
        ref: ref,
        role: "dialog"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "wallet-adapter-modal-container"
    }, /*#__PURE__*/ React.createElement("div", {
        className: `wallet-adapter-modal-wrapper ${!logo && "wallet-adapter-modal-wrapper-no-logo"}`
    }, logo && /*#__PURE__*/ React.createElement("div", {
        className: "wallet-adapter-modal-logo-wrapper"
    }, typeof logo === "string" ? /*#__PURE__*/ React.createElement("img", {
        alt: "logo",
        className: "wallet-adapter-modal-logo",
        src: logo
    }) : logo), /*#__PURE__*/ React.createElement("h1", {
        className: "wallet-adapter-modal-title",
        id: "wallet-adapter-modal-title"
    }, "Connect Wallet"), /*#__PURE__*/ React.createElement("button", {
        onClick: handleClose,
        className: "wallet-adapter-modal-button-close"
    }, /*#__PURE__*/ React.createElement("svg", {
        width: "14",
        height: "14"
    }, /*#__PURE__*/ React.createElement("path", {
        d: "M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z"
    }))), /*#__PURE__*/ React.createElement("ul", {
        className: "wallet-adapter-modal-list"
    }, featured.map((wallet)=>/*#__PURE__*/ React.createElement(WalletListItem, {
            key: wallet.name,
            handleClick: (event)=>handleWalletClick(event, wallet.name),
            wallet: wallet
        }))), more.length ? /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Collapse, {
        expanded: expanded,
        id: "wallet-adapter-modal-collapse"
    }, /*#__PURE__*/ React.createElement("ul", {
        className: "wallet-adapter-modal-list"
    }, more.map((wallet)=>/*#__PURE__*/ React.createElement(WalletListItem, {
            key: wallet.name,
            handleClick: (event)=>handleWalletClick(event, wallet.name),
            tabIndex: expanded ? 0 : -1,
            wallet: wallet
        })))), /*#__PURE__*/ React.createElement(Button, {
        "aria-controls": "wallet-adapter-modal-collapse",
        "aria-expanded": expanded,
        className: `wallet-adapter-modal-collapse-button ${expanded && "wallet-adapter-modal-collapse-button-active"}`,
        endIcon: /*#__PURE__*/ React.createElement("svg", {
            width: "11",
            height: "6",
            xmlns: "http://www.w3.org/2000/svg"
        }, /*#__PURE__*/ React.createElement("path", {
            d: "m5.938 5.73 4.28-4.126a.915.915 0 0 0 0-1.322 1 1 0 0 0-1.371 0L5.253 3.736 1.659.272a1 1 0 0 0-1.371 0A.93.93 0 0 0 0 .932c0 .246.1.48.288.662l4.28 4.125a.99.99 0 0 0 1.37.01z"
        })),
        onClick: handleCollapseClick
    }, expanded ? "Less" : "More", " options")) : null)), /*#__PURE__*/ React.createElement("div", {
        className: "wallet-adapter-modal-overlay",
        onMouseDown: handleClose
    })), portal);
}; //# sourceMappingURL=WalletModal.js.map

;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/WalletModalButton.js
var WalletModalButton_rest = undefined && undefined.__rest || function(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
};



const WalletModalButton = (_a)=>{
    var { children ="Select Wallet" , onClick  } = _a, props = WalletModalButton_rest(_a, [
        "children",
        "onClick"
    ]);
    const { visible , setVisible  } = useWalletModal_useWalletModal();
    const handleClick = (0,external_react_.useCallback)((event)=>{
        if (onClick) onClick(event);
        if (!event.defaultPrevented) setVisible(!visible);
    }, [
        onClick,
        setVisible,
        visible
    ]);
    return /*#__PURE__*/ external_react_default().createElement(Button_Button, Object.assign({
        className: "wallet-adapter-button-trigger",
        onClick: handleClick
    }, props), children);
}; //# sourceMappingURL=WalletModalButton.js.map

;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/WalletModalProvider.js
var WalletModalProvider_rest = undefined && undefined.__rest || function(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
};



const WalletModalProvider = (_a)=>{
    var { children  } = _a, props = WalletModalProvider_rest(_a, [
        "children"
    ]);
    const { 0: visible , 1: setVisible  } = useState(false);
    return /*#__PURE__*/ React.createElement(WalletModalContext.Provider, {
        value: {
            visible,
            setVisible
        }
    }, children, visible && /*#__PURE__*/ React.createElement(WalletModal, Object.assign({}, props)));
}; //# sourceMappingURL=WalletModalProvider.js.map

;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/WalletDisconnectButton.js
var WalletDisconnectButton_rest = undefined && undefined.__rest || function(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
};




const WalletDisconnectButton = (_a)=>{
    var { children , disabled , onClick  } = _a, props = WalletDisconnectButton_rest(_a, [
        "children",
        "disabled",
        "onClick"
    ]);
    const { wallet , disconnect , disconnecting  } = useWallet();
    const handleClick = useCallback((event)=>{
        if (onClick) onClick(event);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        if (!event.defaultPrevented) disconnect().catch(()=>{});
    }, [
        onClick,
        disconnect
    ]);
    const content = useMemo(()=>{
        if (children) return children;
        if (disconnecting) return "Disconnecting ...";
        if (wallet) return "Disconnect";
        return "Disconnect Wallet";
    }, [
        children,
        disconnecting,
        wallet
    ]);
    return /*#__PURE__*/ React.createElement(Button, Object.assign({
        className: "wallet-adapter-button-trigger",
        disabled: disabled || !wallet,
        startIcon: wallet ? /*#__PURE__*/ React.createElement(WalletIcon, {
            wallet: wallet
        }) : undefined,
        onClick: handleClick
    }, props), content);
}; //# sourceMappingURL=WalletDisconnectButton.js.map

;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/WalletMultiButton.js
var __awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var WalletMultiButton_rest = undefined && undefined.__rest || function(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
};







const WalletMultiButton = (_a)=>{
    var { children  } = _a, props = WalletMultiButton_rest(_a, [
        "children"
    ]);
    const { publicKey , wallet , disconnect  } = (0,lib_useWallet/* useWallet */.O)();
    const { setVisible  } = useWalletModal_useWalletModal();
    const { 0: copied , 1: setCopied  } = (0,external_react_.useState)(false);
    const { 0: active , 1: setActive  } = (0,external_react_.useState)(false);
    const ref = (0,external_react_.useRef)(null);
    const base58 = (0,external_react_.useMemo)(()=>publicKey === null || publicKey === void 0 ? void 0 : publicKey.toBase58(), [
        publicKey
    ]);
    const content = (0,external_react_.useMemo)(()=>{
        if (children) return children;
        if (!wallet || !base58) return null;
        return base58.slice(0, 4) + ".." + base58.slice(-4);
    }, [
        children,
        wallet,
        base58
    ]);
    const copyAddress = (0,external_react_.useCallback)(()=>__awaiter(void 0, void 0, void 0, function*() {
            if (base58) {
                yield navigator.clipboard.writeText(base58);
                setCopied(true);
                setTimeout(()=>setCopied(false), 400);
            }
        }), [
        base58
    ]);
    const openDropdown = (0,external_react_.useCallback)(()=>setActive(true), [
        setActive
    ]);
    const closeDropdown = (0,external_react_.useCallback)(()=>setActive(false), [
        setActive
    ]);
    const openModal = (0,external_react_.useCallback)(()=>{
        setVisible(true);
        closeDropdown();
    }, [
        setVisible,
        closeDropdown
    ]);
    (0,external_react_.useEffect)(()=>{
        const listener = (event)=>{
            const node = ref.current;
            // Do nothing if clicking dropdown or its descendants
            if (!node || node.contains(event.target)) return;
            closeDropdown();
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return ()=>{
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [
        ref,
        closeDropdown
    ]);
    if (!wallet) return /*#__PURE__*/ external_react_default().createElement(WalletModalButton, Object.assign({}, props), children);
    if (!base58) return /*#__PURE__*/ external_react_default().createElement(WalletConnectButton, Object.assign({}, props), children);
    return /*#__PURE__*/ external_react_default().createElement("div", {
        className: "wallet-adapter-dropdown"
    }, /*#__PURE__*/ external_react_default().createElement(Button_Button, Object.assign({
        "aria-expanded": active,
        className: "wallet-adapter-button-trigger",
        style: Object.assign({
            pointerEvents: active ? "none" : "auto"
        }, props.style),
        onClick: openDropdown,
        startIcon: /*#__PURE__*/ external_react_default().createElement(WalletIcon_WalletIcon, {
            wallet: wallet
        })
    }, props), content), /*#__PURE__*/ external_react_default().createElement("ul", {
        "aria-label": "dropdown-list",
        className: `wallet-adapter-dropdown-list ${active && "wallet-adapter-dropdown-list-active"}`,
        ref: ref,
        role: "menu"
    }, /*#__PURE__*/ external_react_default().createElement("li", {
        onClick: copyAddress,
        className: "wallet-adapter-dropdown-list-item",
        role: "menuitem"
    }, copied ? "Copied" : "Copy address"), /*#__PURE__*/ external_react_default().createElement("li", {
        onClick: openModal,
        className: "wallet-adapter-dropdown-list-item",
        role: "menuitem"
    }, "Connect a different wallet"), /*#__PURE__*/ external_react_default().createElement("li", {
        onClick: disconnect,
        className: "wallet-adapter-dropdown-list-item",
        role: "menuitem"
    }, "Disconnect")));
}; //# sourceMappingURL=WalletMultiButton.js.map

;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/index.js







 //# sourceMappingURL=index.js.map


/***/ }),

/***/ 669:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "R": () => (/* binding */ useConnection),
/* harmony export */   "h": () => (/* binding */ ConnectionContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const ConnectionContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});
function useConnection() {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ConnectionContext);
} //# sourceMappingURL=useConnection.js.map


/***/ }),

/***/ 257:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "O": () => (/* binding */ useWallet)
/* harmony export */ });
/* unused harmony export WalletContext */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const WalletContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});
function useWallet() {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(WalletContext);
} //# sourceMappingURL=useWallet.js.map


/***/ })

};
;