import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { syncBuiltinESMExports } from 'module'
import React from 'react'
import styles from "./index.module.css"



  
const Header = () => {
    return (
        <div className="navbar w-full mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
            <div className="flex-1 px-2 mx-2">
                <span className={styles.nora}>NORA SWAP</span>
            </div>
            <div className={styles.box}>
                <WalletMultiButton className="btn btn-ghost" />
            </div>
        </div>
    )
    }


export default Header

/*const Header = () => {
    return (
        <div className="navbar w-full mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
            <div className="flex-1 px-2 mx-2">
                <span className="text-lg font-bold">NORA SWAP</span>
            </div>
            <div className={styles.box}>
                <WalletMultiButton className="btn btn-ghost" />
            </div>
        </div>
    )
}*/