import { useState } from 'react';
import products from '../data/produk.json';
import { useNavigate } from 'react-router-dom';

function Transaksi() {
  const [quantities, setQuantities] = useState(Array(products.length).fill(0));
  const [toppings, setToppings] = useState(
    products.map(() => ({ cheese: false, egg: false }))
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();

  const incrementQuantity = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
  };

  const decrementQuantity = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 0) {
      newQuantities[index] -= 1;
    }
    setQuantities(newQuantities);
  };

  const handleToppingChange = (index, topping) => {
    const newToppings = [...toppings];
    newToppings[index][topping] = !newToppings[index][topping];
    setToppings(newToppings);
  };

  const calculateTotal = () => {
    return products.reduce((total, product, index) => {
      let productTotal = product.price * quantities[index];
      if (toppings[index].cheese) productTotal += 3000 * quantities[index];
      if (toppings[index].egg) productTotal += 2000 * quantities[index];
      return total + productTotal;
    }, 0);
  };

  const handleCheckOut = () => {
    setIsModalOpen(true);
  };

  const confirmTransaction = () => {
    const orderSummary = products.map((product, index) => ({
      name: product.name,
      price: product.price,
      quantity: quantities[index],
      toppings: toppings[index],
    }));

    const transaction = {
      total: calculateTotal(),
      paymentMethod: paymentMethod,
      details: orderSummary.filter(item => item.quantity > 0),
      date: new Date().toLocaleString()
    };

    // Simpan transaksi ke localStorage
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // Redirect ke halaman ringkasan
    navigate('/ringkasan');
  };

  return (
    <>
      <main className="bg-white h-screen flex flex-col">
        <h1 className="text-3xl text-slate-900 font-bold p-5">Menu</h1>

        {/* Kontainer yang bisa digulir */}
        <div className="flex-1 overflow-y-auto p-5 pb-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product, index) => (
              <div key={product.id} className="card bg-base-100 shadow-md">
                <div className="card-body p-4">
                  <h2 className="card-title text-lg font-semibold">{product.name}</h2>
                  <p className="text-slate-600">Rp. {product.price.toLocaleString()}</p>

                  {/* Opsi Topping */}
                  <div className="mt-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={toppings[index].cheese}
                        onChange={() => handleToppingChange(index, 'cheese')}
                      />
                      <span className="ml-2">Tambah Keju (+Rp. 3.000)</span>
                    </label>
                    <label className="flex items-center mt-2">
                      <input
                        type="checkbox"
                        checked={toppings[index].egg}
                        onChange={() => handleToppingChange(index, 'egg')}
                      />
                      <span className="ml-2">Tambah Telur (+Rp. 2.000)</span>
                    </label>
                  </div>

                  {/* Tambah-kurang barang */}
                  <div className="flex items-center justify-between mt-4">
                    <button className="btn btn-sm btn-outline" onClick={() => decrementQuantity(index)}>-</button>
                    <span className="mx-2 text-lg">{quantities[index]}</span>
                    <button className="btn btn-sm btn-outline" onClick={() => incrementQuantity(index)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Keranjang total */}
      <div className="fixed bottom-16 left-0 right-0 mx-5 card bg-orange-700 shadow-lg">
        <div className="card-body p-3 text-white text-lg">
          <div className='flex justify-between'>
            <div>
              Total: Rp. {calculateTotal().toLocaleString()}
            </div>
            <div>
              <button onClick={handleCheckOut} className="btn">OK</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal untuk memilih metode pembayaran */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Pilih Metode Pembayaran</h2>
            <div className="flex flex-col">
              <label className="mb-2">
                <input
                  type="radio"
                  value="online"
                  checked={paymentMethod === 'online'}
                  onChange={() => setPaymentMethod('online')}
                />
                <span className="ml-2">Pembayaran Online</span>
              </label>
              <label>
                <input
                  type="radio"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={() => setPaymentMethod('cash')}
                />
                <span className="ml-2">Bayar di Tempat (Cash)</span>
              </label>
            </div>
            <div className="mt-4 flex justify-end">
              <button onClick={confirmTransaction} className="btn btn-primary mr-2">Konfirmasi</button>
              <button onClick={() => setIsModalOpen(false)} className="btn btn-outline">Batal</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Transaksi;
