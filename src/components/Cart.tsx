import React from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, change: number) => void;
  onRemoveItem: (id: number) => void;
  onClose: () => void;
}

export function Cart({ items, onUpdateQuantity, onRemoveItem, onClose }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <p className="text-gray-500 text-center mt-8">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Cart</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 border-b pb-4">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => onUpdateQuantity(item.id, -1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Minus size={16} />
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, 1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="ml-auto text-red-500 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">Total:</span>
          <span className="text-xl font-bold">${total.toFixed(2)}</span>
        </div>
        <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
          Checkout
        </button>
      </div>
    </div>
  );
}