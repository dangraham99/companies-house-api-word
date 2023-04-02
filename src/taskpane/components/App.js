import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getCompanyInfo } from "../../api/companies-house";




/* global Word, require */

const App = ({ title, isOfficeInitialized }) => {


  const [companyNumber, setCompanyNumber] = useState('')
  const [formValid, setFormValid] = useState(false)
  const [companyData, setCompanyData] = useState({})
  const [companyFormattedAddress, setCompanyFormattedAddress] = useState('')

  useEffect(() => {
    if (companyNumber.trim().length > 0) {

      setFormValid(true)

    }

    else {
      setFormValid(false)
    }
  }, [companyNumber])


  useEffect(() => {
    setCompanyFormattedAddress(
      `${companyData.registered_office_address?.po_box ? `${companyData.registered_office_address.po_box},` : ''} 
  ${companyData.registered_office_address?.premises ? `${companyData.registered_office_address.premises},` : ''} 
  ${companyData.registered_office_address?.address_line_1 ? `${companyData.registered_office_address.address_line_1},` : ''} 
  ${companyData.registered_office_address?.address_line_2 ? `${companyData.registered_office_address.address_line_2},` : ''}
  ${companyData.registered_office_address?.locality ? `${companyData.registered_office_address.locality},` : ''}  
  ${companyData.registered_office_address?.region ? `${companyData.registered_office_address.region},` : ''} 
  ${companyData.registered_office_address?.country ? `${companyData.registered_office_address.country},` : ''}
  ${companyData.registered_office_address?.postal_code ? `${companyData.registered_office_address.postal_code}` : ''} `.trim()
    )
  }, [companyData])


  const click = async () => {
    return Word.run(async (context) => {
      /**
       * Insert your Word code here
       */
      if (formValid) {
        // insert a paragraph at the end of the document.
        const paragraph = context.document.body.insertParagraph(companyNumber, Word.InsertLocation.end);

        // change the paragraph color to blue.
        paragraph.font.color = "blue";

        await getCompanyInfo(companyNumber).then(result => {
          console.log(result);
          setCompanyData(result)

          console.log(companyFormattedAddress)

        }).catch(e => console.log(e.message));



        await context.sync();
      }
    });
  };

  if (!isOfficeInitialized) {
    return (
      <div>Please run this app within an Office application.</div>
    );
  }

  return (


    <div>
      <div class="bg-gray-100 border-b shadow-sm">
        <div className="mx-4 py-4">
          <div class="select-none mb-8 text-center">
            <h1 className="text-xl pt-4 font-bold">Companies House API</h1>
            <h1 className="text-xs pt-4 font-medium tracking-widest uppercase">INTERNAL USE ONLY</h1>
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

      <div className="m-4 py-4">
        {companyData && <>
          <div className="flex-col md:flex md:space-x-2 pb-2 border-b">
            <h1 className="text-2xl font-bold tracking-tight">{companyData.company_name}</h1>
            <h1 className="text-md font-medium">Company number: <span className="font-mono font-bold">{companyData.company_number}</span></h1>
            <div className="flex cursor-pointer text-blue-400 underline text-xs w-max">
              <a href={`https://find-and-update.company-information.service.gov.uk/company/${companyData.company_number}`}>View on Companies House</a>
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

            <div>
              <h1>Company type:</h1>
              <p className=" font-bold">{companyData.type}</p>
            </div>

            <div>
              <h1>Incorporated on</h1>
              <p className=" font-bold">{companyData.date_of_creation}</p>
            </div>

            <div>
              <h1>Status</h1>
              <p className="font-bold uppercase">{companyData.company_status}</p>
            </div>


          </div>

          <div className="text-blue-400 mt-8 text-blue-400 underline flex space-x-2">
            <div className="cursor-pointer">
              <p>Insert all company info</p>
            </div>

            <div className="cursor-pointer">
              <p>Insert company name</p>
            </div>

            <div className="cursor-pointer">
              <p>Insert company number</p>
            </div>

            <div className="cursor-pointer">
              <p>Insert company designation</p>
            </div>
          </div>
        </>
        }
      </div>


    </div>


  );
};

App.propTypes = {
  title: PropTypes.string,
  isOfficeInitialized: PropTypes.bool,
};

export default App;
