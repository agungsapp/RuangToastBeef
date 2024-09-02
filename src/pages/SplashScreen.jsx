
import toastLogo from '../assets/toast.png'; // Adjust the path according to your file structure

const SplashScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center px-10">
        <h1
          className="text-4xl text-start font-bold text-slate-900"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          Ruang
        </h1>
        <img src={toastLogo} alt="logo" className="mx-auto my-4" />
        <h1
          className="text-4xl text-end font-bold text-slate-900"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          Beef
        </h1>
        <h3
          className="text-2xl font-medium text-slate-900 mt-2"
          style={{ fontFamily: 'Merriweather, serif' }}
        >
          Mini POS
        </h3>
        <p
          className="text-sm font-light mt-4 text-slate-900"
          style={{ fontFamily: 'Open Sans, sans-serif' }}
        >
          Licensed by Agung Dev
        </p>
        <p
          className="text-sm font-light mt-4 text-slate-900"
          style={{ fontFamily: 'Open Sans, sans-serif' }}
        >
          Ruang Toast v.1.0.0 (demo version)
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
