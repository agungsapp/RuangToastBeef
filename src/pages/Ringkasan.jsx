import { useState } from 'react';

function Ringkasan() {
  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem('transactions')) || []
  );
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
  };

  return (
    <div className="bg-white h-screen p-5">
      <h1 className="text-3xl text-slate-900 font-bold mb-5">Ringkasan Transaksi</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {transactions.map((transaction, index) => (
          <div
            key={`${transaction.date}-${index}`} // Menggunakan kombinasi date dan index sebagai key
            className="card bg-base-100 shadow-md p-4 cursor-pointer"
            onClick={() => handleTransactionClick(transaction)}
          >
            <div className="card-body">
              <h2 className="card-title text-lg font-semibold">Total: Rp. {transaction.total.toLocaleString()}</h2>
              <span
                className={`badge text-white ${transaction.paymentMethod === 'online' ? 'badge-success bg-yellow-500' : ' bg-green-500 badge-warning'}`}
              >
                {transaction.paymentMethod === 'online' ? 'Online' : 'Cash'}
              </span>
              <p className="text-sm mt-2">Tanggal: {transaction.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal untuk menampilkan detail transaksi */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Detail Transaksi</h2>
            <p className="text-lg font-bold">Total: Rp. {selectedTransaction.total.toLocaleString()}</p>
            <p className="text-sm mt-2">Metode Pembayaran: {selectedTransaction.paymentMethod}</p>
            <p className="text-sm mt-2">Tanggal: {selectedTransaction.date}</p>

            <h3 className="mt-4 mb-2 font-semibold">Detail Produk:</h3>
            <ul className="list-disc list-inside">
              {selectedTransaction.details.map((item, index) => (
                <li key={`${item.name}-${index}`}>
                  {item.name} - Rp. {item.price.toLocaleString()} x {item.quantity} {item.toppings.cheese && '+ Keju'}{' '}
                  {item.toppings.egg && '+ Telur'}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex justify-end">
              <button onClick={closeModal} className="btn btn-outline">Tutup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Ringkasan;
