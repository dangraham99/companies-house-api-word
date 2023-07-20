import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { setTextRange } from "typescript";
import Footer from "./Footer";
import CompanyInfo from "./CompanyInfo";
import Header from "./Header";





/* global Word, require */

const App = ({ title, isOfficeInitialized }) => {



  const [companyData, setCompanyData] = useState({})



  useEffect(() => {
    console.log(companyData)
  }, [companyData])








  if (!isOfficeInitialized) {
    return (
      <div>Please run this app within an Office application. If you are running this app within a Microsoft Office application, refresh this taskpane using the chevron at the top of the taskpane.</div>
    );
  }

  return (


    <div class="font-[Arial]">
      <Header propogateCompanyData={setCompanyData} />

      <div className="m-4 min-h-screen overflow-y-auto">
        <CompanyInfo companyData={companyData} />
      </div>




      <Footer />

    </div>


  );
};

App.propTypes = {
  title: PropTypes.string,
  isOfficeInitialized: PropTypes.bool,
};

export default App;
