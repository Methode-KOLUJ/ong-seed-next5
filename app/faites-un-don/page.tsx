'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from "next/navigation";
import GoogleAd from '@/components/GoogleAd';


const Don = () => {
  const [amount, setAmount] = useState('');
  const router = useRouter();


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.submit();
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <div className="fixed top-4 right-6 z-50 flex space-x-3">
        <button
          onClick={() => router.back()}
          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Fermer
        </button>
      </div>
      
      <div className="w-full max-w-lg">
        {/* Texte d'incitation au don */}
        <div className="mb-10 text-center">
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Chaque contribution, aussi modeste soit-elle, nous permet de redonner espoir à des enfants vulnérables.
          </p>
        </div>
        <form
          action="https://marchand.maishapay.online/payment/vers1.0/merchant/checkout"
          method="POST"
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 shadow-xl rounded-xl border border-gray-300 dark:border-gray-600 p-8"
        >
          <input type="hidden" name="gatewayMode" value="0" />
          <input type="hidden" name="publicApiKey" value="MP-SBPK-5kDy1DaE0JIrYV$BOYG1VlIqkI$ecnIjvC0$TN8WO26.l2JZ/ro.T12qnLmGJ$b217$sDc5Jk00W0e2yoNCu7Gd7DqMVA3iThh0x9O2IAQbZoK043zZ/$yCO" />
          <input type="hidden" name="secretApiKey" value='MP-SBSK-vn7fOzFPSa$czJa/oQ$kw2de$bznFf1yu$Re$0Aprl9T60K1aoxSmocB$GYobie1yoa7Zo3zxTkVPlGNdHdogNZQuOcF/01AHrg3KUd2Hk17w0IfJL37LG5Q' />
          <input type="hidden" name="montant" value={amount} />
          <input type="hidden" name="devise" value="USD" />
          <input type="hidden" name="callbackUrl" value="" />

          <div className="mb-6">
            <label
              htmlFor="amount"
              className="block text-xl font-bold text-gray-700 dark:text-gray-200 mb-2 text-center uppercase"
            >
              Montant du don
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Montant en dollar"
              required
              className="w-full px-4 py-3 text-lg text-center bg-gray-100 dark:bg-gray-300 text-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-teal-600 hover:bg-teal-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-lg font-semibold rounded-lg shadow-md transition-colors duration-200"
          >
            Je fais un don
          </button>
        </form>
            <GoogleAd adSlot="8513366484" />
      </div>
    </div>
  );
};

export default Don;
