import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Login from './pages/Login';
import PengaturanAkunPegawai from './pages/PengaturanAkunPegawai';
import InputBarangBaru from './pages/InputBarangBaru';
import InputBarangTerjual from './pages/InputBarangTerjual';
import InputBiayaOperasional from './pages/InputBiayaOperasional';
import LaporanSisaStokBarang from './pages/LaporanSisaStokBarang';
import LaporanPenjualanBarang from './pages/LaporanPenjualanBarang';
import LaporanKeuntungan from './pages/LaporanKeuntungan';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<PengaturanAkunPegawai />} />
          <Route path="/input-barang-baru" element={<InputBarangBaru />} />
          <Route path="/input-barang-jual" element={<InputBarangTerjual />} />
          <Route path="/input-biaya-operasional" element={<InputBiayaOperasional />} />
          <Route path="/laporan-sisa-stok" element={<LaporanSisaStokBarang />} />
          <Route path="/laporan-penjualan" element={<LaporanPenjualanBarang />} />
          <Route path="/laporan-keuntungan" element={<LaporanKeuntungan />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
