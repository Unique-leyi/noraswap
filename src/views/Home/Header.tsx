import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { syncBuiltinESMExports } from 'module'
import React from 'react'




  
const Header = () => {
    return (
        

        <header className="flex justify-between items-center mx-5 my-5 md:mx-16">
        <div>
            <a className="xs:hidden md:block text-white lg:text-3xl font-bold bg-gradient-to-r bg-clip-text  text-transparent from-siteblue  via-sky-500  to-sitepurple animate-text  xs:text-[1.65rem] sm:text-[0.8rem] md:text-2xl" href="#">Nora Swap</a>

            <a href="#" className="md:hidden">
                <img src="img/noralogo.png" className="w-12 mx-1"/>
            </a>
        </div>
        <div>
            <WalletMultiButton className="bg-gradient-to-r from-sky-500 to-indigo-500  cursor-pointer uppercase text-white py-3 px-3 md:py-3 md:px-10 rounded-md font-bold text-[1rem] hover:shadow-md lg:text-lg xs:text-[0.9rem] font-montserrat" />
        </div>
    </header>
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