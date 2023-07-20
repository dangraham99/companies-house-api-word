import React, { useState, useEffect } from "react";
import constants from "../../../constants";
function CompanyInfo(props) {

    const [companyFormattedAddress, setCompanyFormattedAddress] = useState('')
    const [companyDescription, setCompanyDescription] = useState('')

    const insertCompanyInfo = async (information) => {
        return Word.run(async (context) => {
            if (props.companyData) {
                const currentSelection = context.document.getSelection();
                const text = currentSelection.insertText(information, 'End');
                text.select('End');



            }
            await context.sync();
        });
    };



    useEffect(() => {
        if (props.companyData?.type) {
            setCompanyDescription(constants.company_summary[props.companyData.type])
        }
    }, [props.companyData])


    useEffect(() => {

        if (props.companyData?.registered_office_address) {
            setCompanyFormattedAddress(
                `${props.companyData.registered_office_address?.po_box ? `${props.companyData.registered_office_address.po_box},` : ''} 
      ${props.companyData.registered_office_address?.premises ? `${props.companyData.registered_office_address.premises},` : ''} 
      ${props.companyData.registered_office_address?.address_line_1 ? `${props.companyData.registered_office_address.address_line_1},` : ''} 
      ${props.companyData.registered_office_address?.address_line_2 ? `${props.companyData.registered_office_address.address_line_2},` : ''}
      ${props.companyData.registered_office_address?.locality ? `${props.companyData.registered_office_address.locality},` : ''}  
      ${props.companyData.registered_office_address?.region ? `${props.companyData.registered_office_address.region},` : ''} 
      ${props.companyData.registered_office_address?.country ? `${props.companyData.registered_office_address.country},` : ''}
      ${props.companyData.registered_office_address?.postal_code ? `${props.companyData.registered_office_address.postal_code}` : ''} `.trim().replace(/\s+/g, ' ')
            )
        }
        console.log(companyFormattedAddress)
    }, [props.companyData])


    return (
        <div>
            {props.companyData?.company_number && <>
                <div className="flex-col md:flex md:space-x-2 pb-4 border-b">
                    <h1 className="text-2xl font-bold pb-2 tracking-tight">{props.companyData.company_name}</h1>
                    <h1 className="text-md font-medium">Company number: <span className="font-mono font-bold">{props.companyData.company_number}</span></h1>
                    <div className="flex cursor-pointer text-blue-400 underline text-xs w-max">
                        <a href={`https://find-and-update.company-information.service.gov.uk/company/${props.companyData.company_number}`}>View on Companies House</a>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                    </div>
                </div>
                <div className="border-b pb-4 mt-4 flex-col md:flex space-y-4 text-md ">
                    <div>
                        <h1 >Registered office address:</h1>
                        <p className=" font-bold">{companyFormattedAddress}</p>
                    </div>
                    <div class="flex justify-between ">
                        <div>
                            <h1>Company type:</h1>
                            <p className=" font-bold">{companyDescription}</p>
                        </div>
                        <div>
                            <h1>{constants.company_birth_type[props.companyData.type]}:</h1>
                            <p className=" font-bold">{props.companyData.date_of_creation}</p>
                        </div>
                    </div>
                    <div>
                        <h1>Status</h1>
                        <p className="font-bold uppercase">{props.companyData.company_status}</p>
                    </div>
                </div>
                <div className="text-blue-400 mt-4 mb-4 text-blue-400 underline flex-col space-y-2">
                    <div onClick={() => insertCompanyInfo("Feature not yet implemented")} className="cursor-pointer">
                        <p>Insert all company info</p>
                    </div>
                    <div onClick={() => insertCompanyInfo(props.companyData.company_name)} className="cursor-pointer">
                        <p>Insert company name</p>
                    </div>
                    <div onClick={() => insertCompanyInfo(props.companyData.company_number)} className="cursor-pointer">
                        <p>Insert company number</p>
                    </div>
                    <div onClick={() => insertCompanyInfo(companyFormattedAddress.trim())} className="cursor-pointer">
                        <p>Insert company address</p>
                    </div>
                    <div className="cursor-pointer">
                        <p>Insert company designation</p>
                    </div>
                </div>
            </>
            }
        </div>
    )
}

export default CompanyInfo