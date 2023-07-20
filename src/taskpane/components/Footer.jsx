import React from 'react'

function Footer() {
    return (
        <footer class="fixed bottom-0 left-0 z-20 w-full p-4 border-t  shadow-sm md:flex md:items-center md:justify-between md:p-6 bg-gray-100">
            <span class="text-xs sm:text-center">Data accessed using <a className="underline" href="https://developer.company-information.service.gov.uk/">Companies House API</a>. The most up to date version of content will always be on GOV.UK
            </span>
        </footer>
    )
}

export default Footer