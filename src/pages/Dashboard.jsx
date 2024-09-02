import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [usage, setUsage] = useState({
    Beef: 0,
    Chicken: 0,
    Egg: 0,
    Cheese: 0,
    GratedCheese: 0,
    Bread: 0
  });
  const [cash, setCash] = useState(0);
  const [onlineBalance, setOnlineBalance] = useState(0);
  const [totalBreadSold, setTotalBreadSold] = useState(0);

  useEffect(() => {
    // Muat data penggunaan dari localStorage
    const storedUsage = JSON.parse(localStorage.getItem('usage')) || {};
    setUsage({
      Beef: storedUsage.Beef || 0,
      Chicken: storedUsage.Chicken || 0,
      Egg: storedUsage.Egg || 0,
      Cheese: storedUsage.Cheese || 0,
      GratedCheese: storedUsage.GratedCheese || 0,
      Bread: storedUsage.Bread || 0
    });

    // Muat transaksi dari localStorage
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    let totalCash = 0;
    let totalOnline = 0;
    let totalBread = 0;

    transactions.forEach(transaction => {
      if (transaction.paymentMethod === 'cash') {
        totalCash += transaction.total;
      } else if (transaction.paymentMethod === 'online') {
        totalOnline += transaction.total;
      }
      totalBread += transaction.details.reduce((sum, item) => sum + item.quantity, 0);
    });

    setCash(totalCash);
    setOnlineBalance(totalOnline);
    setTotalBreadSold(totalBread);

  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className='grid grid-cols-2 gap-2'>
        <div className="card bg-green-900 text-white ">
          <div className="card-body">
            <h4 className="card-title">Uang Cash</h4>
            <div className="card-actions justify-center">
              <h5>Rp. {cash.toLocaleString()}</h5>
            </div>
          </div>
        </div>
        <div className="card bg-cyan-900 text-white ">
          <div className="card-body">
            <h4 className="card-title">Uang Saldo</h4>
            <div className="card-actions justify-center">
              <h5>Rp. {onlineBalance.toLocaleString()}</h5>
            </div>
          </div>
        </div>
        <div className="card bg-sky-700 text-white ">
          <div className="card-body">
            <h4 className="card-title">Terjual</h4>
            <div className="card-actions justify-center">
              <h5>{totalBreadSold} Roti</h5>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-4 mt-8">Catatan Penggunaan Bahan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-16">
        <div>
          <label className="block text-sm font-medium text-gray-700">Beef</label>
          <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm">
            {usage.Beef} Potong
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Chicken</label>
          <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm">
            {usage.Chicken} Potong
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Egg</label>
          <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm">
            {usage.Egg} butir
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Cheese</label>
          <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm">
            {usage.Cheese} Lembar
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Grated Cheese</label>
          <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm">
            {usage.GratedCheese} gram
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Bread/ Roti</label>
          <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm">
            {usage.Bread} Pcs
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
