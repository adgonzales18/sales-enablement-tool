import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

function Quote({items, onUpdateQuantity, onDeleteItem  }) {
    
    const grandTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
 
    return (
      <Card className="w-full max-w-3xl mx-auto max-h-[720px] bg-gray-50 flex flex-col">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">New Quote</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="customer-quote mb-4">
            <h2 className="text-xl font-semibold">Customer Name</h2>
          </div>
  
          <div className="items-quote">
            {items.length === 0 ? (
              <p className="text-gray-500">No items added to the quote.</p>
            ) : (
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b font-semibold">
                    <th className="py-2">Item</th>
                    <th className="py-2">Quantity</th>
                    <th className="py-2">Cost</th>
                    <th className="py-2">Total</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-2">{item.name}</td>
                      <td className="py-2">{item.quantity}</td>
                      <td className="py-2">${(item.price / 100).toFixed(2)}</td>
                      <td className="py-2">
                        ${(item.price * item.quantity / 100).toFixed(2)}
                      </td>
                      <td className="py-2 space-x-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-1 bg-teal-500 rounded"
                        >
                          +
                        </button>
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-1 bg-teal-500 rounded"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <button
                          onClick={() => onDeleteItem(item.id)}
                          className="px-2 py-1 bg-red-300 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="font-bold">
                    <td colSpan="4" className="py-3 text-right">
                      Total:
                    </td>
                    <td className="py-3">
                      ${(grandTotal / 100).toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

export default Quote
