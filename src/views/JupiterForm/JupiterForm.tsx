import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import { INPUT_MINT_ADDRESS, OUTPUT_MINT_ADDRESS } from "../../constants";

import styles from "./JupiterForm.module.css";
import { useJupiterApiContext } from "../../contexts/JupiterApiProvider";


// custom-select-box
import CustomSelect from "../../../components/CustomSelect";




const style = {
  wrapper: `w-screen flex items-center justify-center mt-14`,
  content: `bg-[#191B1F] w-[30rem] rounded-2xl p-4`,
  formHeader: `px-2 flex items-center justify-between font-semibold text-xl`,
  transferPropContainer: `block w-5/12 bg-transparent px-2 py-3 text-[1.1rem] mx-1 font-bold cursor-pointer uppercase hover:bg-secondary-100 rounded-lg hover:rounded-lg outline-none border-none focus:border-none focus:ring-transparent font-montserrat hover:hover:bg-secondary-100  cursor-pointer`,
  transferPropInput: `bg-transparent placeholder:text-[#B2B9D2] outline-none mb-6 w-full text-2xl font-montserrat`,
  currencySelector: `flex w-1/4`,
  currencySelectorContent: `w-full h-min flex justify-between items-center bg-[#2D2F36] hover:bg-[#41444F] rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem]`,
  currencySelectorIcon: `flex items-center`,
  currencySelectorTicker: `mx-2`,
  currencySelectorArrow: `text-lg`,
  confirmButton: `bg-[#2172E5] my-2 rounded-2xl py-6 px-8 text-xl font-semibold flex items-center justify-center cursor-pointer border border-[#2172E5] hover:border-[#234169]`,
  optionSelector: `bg-secondary-100 font-montserrat py-4 my-6 hover:bg-gray-300 text-[1rem] cursor-pointer`,
}

interface IJupiterFormProps {}
interface IState {
  amount: number;
  inputMint: PublicKey;
  outputMint: PublicKey;
  slippage: number;
}

interface EachInput {
    value: string;
    error: string;
  
}

interface FormInputData {
  selectOne: EachInput;
  selectTwo: EachInput;
}

interface FormDataUser  {
  [key: number]: FormInputData;
}

interface errors {}


const JupiterForm: FunctionComponent<IJupiterFormProps> = (props) => {

  //Custom-SelectBox
  // const FormDataUserSelect: FormDataUser = [
  //    {  
  //     value: '',
  //     error: ''
  //   },

  //    {  
  //     value: '',
  //     error: ''
  //   }
  // ]
  
  // const [FormDataUserSelect, setFormData ] = useState({
      
  //   selectOne: {
  //       value: '',
  //       error: ''
  //     },

  //     selectTwo: {
  //       value: '',
  //       error: ''
  //     }

  // });


  // const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   let errors = useState<errors>({})

  //   for(let key in formData) {
  //     if(formData[key].value === ''){
  //       errors[key] = 'Please select one Token';
  //     }
  //   }

  //   if(Object.keys(errors).length === 0){
  //     console.log(formData.selectOne.value, formData.selectTwo.value);
  //     console.log('submit form');
     
  // } else {
  //    setFormData(prev => {
  //       let data = {};
  //       for(let key in errors){
  //         data[key] = {
  //           ...prev[key],
  //           error: errors[key]
  //         }
  
  //       }

  //       return {
  //         ...prev,
  //         ...data,

  //       }

  //     });

  //   }
  // }

  // const changeHandler = (value, name) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]:{
  //       value,
  //       error: value !== '' ? '' : prev[name].error
  //     }
  //   }));
  // }


  // </-CustomSelectBox
  const wallet = useWallet();
  const { connection } = useConnection();
  const { tokenMap, routeMap, loaded, api } = useJupiterApiContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValue, setFormValue] = useState<IState>({
    amount: 1 * 10 ** 6, // unit in lamports (Decimals)
    inputMint: new PublicKey(INPUT_MINT_ADDRESS),
    outputMint: new PublicKey(OUTPUT_MINT_ADDRESS),
    slippage: 1, // 0.1%
  });
  const [routes, setRoutes] = useState<
    Awaited<ReturnType<typeof api.v1QuoteGet>>["data"]
  >([]);

  const [inputTokenInfo, outputTokenInfo] = useMemo(() => {
    return [
      tokenMap.get(formValue.inputMint?.toBase58() || ""),
      tokenMap.get(formValue.outputMint?.toBase58() || ""),
    ];
  }, [
    tokenMap,
    formValue.inputMint?.toBase58(),
    formValue.outputMint?.toBase58(),
  ]);

  // Good to add debounce here to avoid multiple calls
  const fetchRoute = React.useCallback(() => {
    setIsLoading(true);
    api
      .v1QuoteGet({
        amount: formValue.amount,
        inputMint: formValue.inputMint.toBase58(),
        outputMint: formValue.outputMint.toBase58(),
        slippage: formValue.slippage,
      })
      .then(({ data }) => {
        if (data) {
          setRoutes(data);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [api, formValue]);

  useEffect(() => {
    fetchRoute();
  }, [fetchRoute]);

  const validOutputMints = useMemo(
    () => routeMap.get(formValue.inputMint?.toBase58() || "") || [],
    [routeMap, formValue.inputMint?.toBase58()]
  );

  // ensure outputMint can be swapable to inputMint
  useEffect(() => {
    if (formValue.inputMint) {
      const possibleOutputs = routeMap.get(formValue.inputMint.toBase58());

      if (
        possibleOutputs &&
        !possibleOutputs?.includes(formValue.outputMint?.toBase58() || "")
      ) {
        setFormValue((val) => ({
          ...val,
          outputMint: new PublicKey(possibleOutputs[0]),
        }));
      }
    }
  }, [formValue.inputMint?.toBase58(), formValue.outputMint?.toBase58()]);

  if (!loaded) {
    return <div className="my-16 flex flex-col justify-center items-center">
      <img src="img/noralogo.png" className="animate-spin w-4/12 lg:w-40 mx-1"/>
      <span className="my-4 text-lg font-semibold text-[0.9rem]">Loading Noraswap...</span>
      </div>;
  }

  return (
    <main className="my-20 bg-secondary-100 mx-3 rounded-2xl p-7 md:w-10/12 md:mx-auto lg:w-5/12 lg:mx-auto shadow-md relative">
    <section className="my-1">
      {/* Top Action */}
      <div className="shadow-sm my-6 flex justify-between items-center">
        <a className="action-btn flex justify-between items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-5 w-5 text-white font-bold" fill="none" viewBox="0 0 24 24"   stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <span className="mx-1.5 font-montserrat text-xs">0.1%</span>
        </a>
        <button className={`${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          } action-btn`}
          type="button"
          onClick={fetchRoute}
          disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`${ isLoading && ( "animate-spin") } inline-block h-5 w-5 text-white font-bold `}fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
        </button>
      </div>

      {/* /Top Action */}

      {/* Token Exchanges */}
       {/* Input token exchaneg*/}
        <div className="my-1">
            <div className="flex justify-between items-center my-2 mx-2 font-montserrat">
                <h4 className="font-bold text-white">You pay:</h4>
                <h4 className="flex justify-between items-center font-bold text-white">Balance: <span className="font-bold text-lg ml-2 text-gray-600 ">0</span></h4>
            </div>
          </div>

            <div className="my-1">
                <label className="w-full my-2 py-4 px-2  bg-primary flex justify-between items-center rounded-md">
                    
                    <select
                        id="inputMint"
                        name="inputMint"
                        className={style.transferPropContainer}
                        value={formValue.inputMint?.toBase58()}
                        onChange={(e) => {
                          const pbKey = new PublicKey(e.currentTarget.value);
                          if (pbKey) {
                            setFormValue((val) => ({
                              ...val,
                              inputMint: pbKey,
                            }));
                          }
                        }}
                      >
                        {Array.from(routeMap.keys()).map((tokenMint) => {
                          return (
                            <option key={tokenMint} value={tokenMint}>
                              {tokenMap.get(tokenMint)?.name || "unknown"}
                            </option>
                          );
                        })}
                      </select>

                    <input type="text" 
                    className="w-8/12 text-right bg-transparent border-none outline-none focus:outline-none  focus:border-none focus:ring-transparent text-gray-500 font-bold text-xl px-4 font-montserrat"
                    name="amount"
                    id="amount"
                    value={formValue.amount} 
                    placeholder="1"
                    pattern="[0-9]*"
                    onInput={(e: any) => {
                      let newValue = Number(e.target?.value || 0);
                      newValue = Number.isNaN(newValue) ? 0 : newValue;
                      setFormValue((val) => ({
                        ...val,
                        amount: Math.max(newValue, 0),
                      }));
                    }}
                    />
                </label>
            </div>

          {/* /Input token exchange */}

          
          {/* Refresh Rate */}
            
          <div className="flex justify-center items-center">

              <button
          className={`${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          } text-white py-4 `}
          type="button"
          onClick={fetchRoute}
          disabled={isLoading}
        >
          

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className={`${ isLoading && ( "animate-bounce") } "w-10 h-10 font-bold cursor-pointer  motion-safe:animate-bounce" `}><path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z"></path></svg> 

          
        </button>
                
        </div>
              


          {/* /Refresh Rate */}


          {/* Output Token exchange */}

          <div className="my-1">
                <div className="flex justify-between items-center mx-2 font-montserrat">
                    <h4 className="font-bold text-white">You recieve:</h4>
                    <h4 className="flex justify-between items-center font-bold text-white ">Balance: <span className="font-bold text-lg text-gray-600 ml-2">0</span></h4>
                </div>
            </div>

        {routes?.[0] &&
        (() => {
          const route = routes[0];
          if (route) {
            return (
              <div>
                <div className="my-1 font-montserrat">
                <label className="w-full my-2 py-4 px-2  bg-primary flex justify-between items-center rounded-md">
                    
                    <select
                      id="outputMint"
                      name="outputMint"
                      className={style.transferPropContainer}
                      value={formValue.outputMint?.toBase58()}
                      onChange={(e) => {
                        const pbKey = new PublicKey(e.currentTarget.value);
                        if (pbKey) {
                          setFormValue((val) => ({
                            ...val,
                            outputMint: pbKey,
                          }));
                        }
                      }}
                    >
                      {validOutputMints.map((tokenMint) => {
                        return (
                          <option key={tokenMint} value={tokenMint}>
                            {tokenMap.get(tokenMint)?.name || "unknown"}
                          </option>
                        );
                      })}
                    </select>
                    
                  <div className="w-8/12 text-right bg-transparent font-montserrat outline-none  text-gray-500 font-bold text-xl px-4">
                    {" "}
                    {(route.outAmount || 0) /
                      10 ** (outputTokenInfo?.decimals || 1)}{" "}
                    {outputTokenInfo?.symbol}
                </div>
                </label>
            </div>


          </div>
            );
          }
        })()}
            

          {/* /Output Token exchange */}

      
      {/* Wallet Button */}

      {/* This is the wallet Button  */}

      <div className="my-6 flex justify-center items-center">
          <WalletMultiButton className="wallet-adapter-button wallet-adapter-button-trigger"/>
      </div>
      
        {/* The Swap Button */}
      {routes?.[0] &&
        (() => {
          const route = routes[0];
          if (route) {
            return (
            <div>   
              <div className="my-10 font-montserrat">
              <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={async () => {
            try {
              if (
                !isLoading &&
                routes?.[0] && 
                wallet.publicKey &&
                wallet.signAllTransactions
              ) {
                setIsSubmitting(true);

                const {
                  swapTransaction,
                  setupTransaction,
                  cleanupTransaction,
                } = await api.v1SwapPost({
                  body: {
                    route: routes[0],
                    userPublicKey: wallet.publicKey.toBase58(),
                  },
                });
                const transactions = (
                  [
                    setupTransaction,
                    swapTransaction,
                    cleanupTransaction,
                  ].filter(Boolean) as string[]
                ).map((tx) => {
                  return Transaction.from(Buffer.from(tx, "base64"));
                });

                await wallet.signAllTransactions(transactions);
                for (let transaction of transactions) {
                  // get transaction object from serialized transaction

                  // perform the swap
                  const txid = await connection.sendRawTransaction(
                    transaction.serialize()
                  );

                  await connection.confirmTransaction(txid);
                  console.log(`https://solscan.io/tx/${txid}`);
                }
              }
            } catch (e) {
              console.error(e);
            }
            setIsSubmitting(false);
          }}
          className="swap-btn"
        >
          {isSubmitting ? "Swapping.." : "Swap Best Route"}
        </button>
        </div>

        </div>

          );}
        })()}

         {/* /The Swap Button */}

      {/* /Token Exchanges */}














      {/* /Wallet Button*/}

      {routes?.[0] &&
        (() => {
          const route = routes[0];
          if (route) {
            return (
            <div>   
              <div className="my-10 relative font-montserrat">
                <ul className="list-none my-14">
                    <a className="bg-sitepurple  absolute top-1.5 z-10 right-0 py-1 px-2 rounded-md text-white text-[0.9rem] font-semibold">Best Price</a>

              <button  type="button" className="w-full px-4 py-4  focus:ring-indigo-500 selling-list  border-2 border-sky-600 ">

              <div className="my-1 font-montserrat">
              <h4 className="flex justify- items-center text-white font-bold text-lg">
                {" "}
                  {route.marketInfos?.map((info) => info.label)}</h4>
          </div>

          <div className="flex justify-start items-center font-montserrat">
              <span className="selling-text">Total routes:  {routes?.length}</span>
          </div>

        </button>

          </ul>
        </div>
              
        </div>
            );
          }
        })()}

      {/* /Wallet Button*/}

      

     
    </section>
    </main>
  );
};

export default JupiterForm;
