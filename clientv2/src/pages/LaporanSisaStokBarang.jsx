import { useEffect, useState } from 'react';
import Title from '../components/Title';
import Sidebar from '../components/Sidebar';
import useAuth from '../utils/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import BackToMenu from '../components/BackToMenu';
import { loadDataStok } from '../features/laporanSisaStokSlice';
import TableRow from '../components/TableRow';
import Table from '../components/Table';
import Axios from '../utils/axios';
import { notifyError, notifySuccess } from '../utils/notify';
import ModalEditBarang from '../components/ModalEditBarang';

function LaporanPenjualanBarang() {
  const [auth, isAuthenticated] = useAuth();
  const dispatch = useDispatch();

  const initialModalState = {
    isOpened: false,
    id_barang: '',
    nama: '',
    supplier: '',
  };

  const [searchString, setSearchString] = useState('');
  const [editModalData, setEditModalData] = useState(initialModalState);

  const { isLoading, dataStok } = useSelector((state) => state.stok);

  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    auth();
    if (!isAuthenticated) return;
    dispatch(loadDataStok());
  }, [auth, isAuthenticated, dispatch]);

  const editHandler = (id_barang, nama, supplier) => {
    setEditModalData({
      isOpened: true,
      id_barang,
      nama,
      supplier,
    });
  };

  const deleteHandler = async (id) => {
    try {
      await Axios.delete(`/barang/stock/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      notifySuccess('Barang berhasil dihapus');
      dispatch(loadDataStok(searchString));
    } catch (error) {
      notifyError('Barang gagal dihapus');
    }
  };

  return (
    <>
      <Sidebar />
      <BackToMenu />
      <ModalEditBarang
        key={editModalData.isOpened}
        isOpened={editModalData.isOpened}
        id_barang={editModalData.id_barang}
        nama={editModalData.nama}
        supplier={editModalData.supplier}
        close={() => {
          setEditModalData(initialModalState);
          dispatch(loadDataStok(searchString));
        }}
      />
      <div className="flex flex-col items-center">
        <Title className="text-2xl text-black my-10">
          Laporan Sisa Stok Barang
        </Title>
        <div className="w-4/6 mb-6">
          <div className="w-full flex justify-between gap-6 mb-8">
            <input
              type="text"
              value={searchString}
              className="input-field flex-1"
              onChange={(e) => setSearchString(e.target.value)}
            />
            <button
              type="button"
              className="btn"
              onClick={() => dispatch(loadDataStok(searchString))}
            >
              Search
            </button>
          </div>
          {isLoading ? (
            <h1>loading data...</h1>
          ) : (
            <Table
              columnNames={[
                'Kode',
                'Nama',
                'Supplier',
                'Modal',
                'Jumlah',
                'Score',
                'Action',
              ]}
            >
              {dataStok.map((data, idx) => {
                const { id_barang, nama, supplier, jumlah, modal, score } = data;
                return (
                  <TableRow
                    key={idx}
                    data={[
                      id_barang,
                      nama,
                      supplier,
                      modal,
                      jumlah,
                      score,
                      <div className="flex justify-around">
                        <button
                          type="button"
                          className="bg-purple-600 py-1 px-2 text-sm text-white rounded hover:bg-purple-800"
                          onClick={() => editHandler(id_barang, nama, supplier)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="bg-purple-600 py-1 px-2 text-sm text-white rounded hover:bg-purple-800"
                          onClick={() => deleteHandler(id_barang)}
                        >
                          Hapus
                        </button>
                      </div>,
                    ]}
                  />
                );
              })}
            </Table>
          )}
        </div>
      </div>
    </>
  );
}

export default LaporanPenjualanBarang;
