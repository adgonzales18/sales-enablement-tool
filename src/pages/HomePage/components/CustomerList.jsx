import React from 'react'
import customerData from '../../../data/customerData'
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

function CustomerList() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customerData.filter(customer => `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
     <Card className="w-full max-w-3xl mx-auto max-h-[720px] bg-gray-50 flex flex-col">
      <CardHeader>
            <CardTitle className="text-3xl font-bold">Customers</CardTitle>
      </CardHeader>
      <CardContent>
      <div className="search-bar">
        <form className="max-w-md mx-auto">   
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
              <input type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Name" required />
              <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
          </div>
        </form>
      </div>
      <div className="customer-list">
        <ul>
          {filteredCustomers.map(customer => (
            <li key={customer._id} className="mt-3 ml-5 border-b border-gray-200 pb-2 dark:border-gray-600">
              <h1 className="text-sm text-black">{customer.firstName} {customer.lastName}</h1>
              <p className="text-xs text-gray-400">{customer.email}</p>
            </li>
          ))}
          {filteredCustomers.length === 0 && (
            <li className="text-sm text-gray-400">No matching customers found.</li>
          )}
        </ul>
      </div>
      </CardContent>
     </Card>
  )
}

export default CustomerList