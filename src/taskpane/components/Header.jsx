import React, { useState, useEffect } from "react";
import { getCompanyInfo } from "../../api/companies-house";

function Header(props) {



    const [companyNumber, setCompanyNumber] = useState('')
    const [formValid, setFormValid] = useState(false)
    const [companyData, setCompanyData] = useState()

    useEffect(() => {
        if (companyNumber.trim().length > 0) {

            setFormValid(true)

        }

        else {
            setFormValid(false)
        }
    }, [companyNumber])


    useEffect(() => {
        props.propogateCompanyData(companyData)
    }, [companyData])



    const click = async () => {
        return Word.run(async (context) => {
            /**
             * Insert your Word code here
             */
            if (formValid) {





                await getCompanyInfo(companyNumber).then(result => {
                    console.log(result);
                    setCompanyData(result)

                }).catch(e => console.log(e.message));



                await context.sync();
            }
        });
    };

    return (
        <div class="bg-gray-100 border-b shadow-sm">
            <div className="mx-4 py-4">
                <div class="select-none mb-8 text-center">
                    <h1 className="text-xs pt-4 font-bold text-red-500 uppercase">INTERNAL USE ONLY</h1>
                    <h1 className="text-xl pt-4 font-bold">Companies House API</h1>

                </div>
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Company number
                </label>
                <div className=" mb-4">
                    <div class="flex">
                        <input
                            onChange={(e) => setCompanyNumber(e.target.value)}
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="mb-2 block w-full max-w-100 rounded-l-md border-0 p-1.5 text-gray-900 shadow-sn ring-1 ring-inset ring-gray-300 focus:outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-200 sm:text-sm sm:leading-6"
                        />
                        <div class="">
                            <button
                                onClick={click}
                                type="submit"
                                className={formValid ? "rounded-r-md bg-blue-600 p-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" : "rounded-r-md bg-gray-300 p-1.5 text-sm font-semibold text-white shadow-sm cursor-not-allowed"}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </button>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    )
}

export default Header