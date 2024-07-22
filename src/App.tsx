import React, { useState, useEffect } from 'react';
import './App.css'; // Pastikan untuk mengimpor file CSS Anda
import cupImage from './assets/cup.png'; // Sesuaikan path sesuai struktur proyek Anda
import 'animate.css/animate.css'; // Sesuaikan path jika diperlukan

interface Mahasiswa {
  id: number;
  nama: string;
  jurusan: string;
}

const App: React.FC = () => {
  const [mahasiswas, setMahasiswas] = useState<Mahasiswa[]>([]);
  const [formData, setFormData] = useState<Mahasiswa>({
    id: 0,
    nama: '',
    jurusan: ''
  });

  useEffect(() => {
    fetchMahasiswas();
  }, []);

  const fetchMahasiswas = () => {
    fetch('http://localhost:3000/mahasiswa')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data mahasiswa:', data); // Pastikan struktur respons data sesuai yang diharapkan
        setMahasiswas(data.data); // Set data ke state
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Jika id ada, lakukan update; jika tidak, lakukan create
    const apiUrl = formData.id ? `http://localhost:3000/mahasiswa/${formData.id}` : 'http://localhost:3000/mahasiswa';
    const method = formData.id ? 'PUT' : 'POST';

    fetch(apiUrl, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data mahasiswa berhasil disimpan:', data);
        fetchMahasiswas(); // Ambil ulang data setelah berhasil disimpan
        setFormData({ id: 0, nama: '', jurusan: '' }); // Bersihkan form
      })
      .catch(error => {
        console.error('Error saat menyimpan data:', error);
      });
  };

  const handleDelete = (id: number) => {
    fetch(`http://localhost:3000/mahasiswa/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data mahasiswa berhasil dihapus:', data);
        fetchMahasiswas(); // Ambil ulang data setelah berhasil dihapus
      })
      .catch(error => {
        console.error('Error saat menghapus data:', error);
      });
  };

  const handleEdit = (mahasiswa: Mahasiswa) => {
    setFormData(mahasiswa); // Isi form dengan data mahasiswa yang akan di-edit
  };

  const githubUrl = "https://github.com/ucup007/tugas";
  const instagramUrl = "https://www.instagram.com/yusufhkll/";

  return (
    <div className="text-white">
      <header className="navbar bg-gray-800 mb-8 animate__animated animate__fadeInDown">
        <div className="flex-1">
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-lg">Muhammad Yusuf Haekal</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><a className="text-gray-300 hover:text-white" href={githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li>
              <details className="text-gray-300">
                <summary>More</summary>
                <ul className="bg-gray-800 rounded-t-none p-2">
                  <li><a href={instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </header>

      <div className="hero bg-black py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden">
                <img
                  src={cupImage}
                  alt="ucup"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="mt-6 sm:mt-0 sm:ml-4 text-center sm:text-left animate__animated animate__backInDown">
              <h2 className="text-4xl font-bold leading-tight">Muhammad Yusuf Haekal</h2>
              <p className="text-gray-400 text-lg mt-4">Saya adalah seorang pengembang frontend yang bersemangat dalam menciptakan pengalaman.</p>
              <div className="mt-6">
                <a href="" className="btn btn-primary px-8 py-3 rounded-full text-lg">Lihat Profile</a>
              </div>
            </div>
          </div>
        
          <div className="mt-20">
            <h3 className="text-2xl font-bold mb-4">Experience</h3>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <li className="bg-gray-900 p-4 rounded-md">HTML</li>
              <li className="bg-gray-900 p-4 rounded-md">JavaScript</li>
              <li className="bg-gray-900 p-4 rounded-md">Vue JS</li>
              <li className="bg-gray-900 p-4 rounded-md">CSS</li>
              <li className="bg-gray-900 p-4 rounded-md">Express JS</li>
              <li className="bg-gray-900 p-4 rounded-md">Bootstrap</li>
            </ul>
            <div className="mt-12 text-2xl font-bold">Academic Journey</div>
            <ul className="steps">
              <li className="step step-info">MIN 2 Kota Bandung</li>
              <li className="step step-info">MTSN 2 Kota Bandung</li>
              <li className="step step-info">SMKN 4 Kota Bandung</li>
            </ul>
          </div>

          <div className="mt-20">
            <h3 className="text-2xl font-bold mb-4">Data Mahasiswa</h3>
            <form onSubmit={handleSubmit}>
              <div className="flex items-center mb-4">
                <label htmlFor="nama" className="mr-2 w-24">Nama:</label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  className="rounded-md px-2 py-1 border text-black"
                  required
                />
              </div>
              <div className="flex items-center mb-4">
                <label htmlFor="jurusan" className="mr-2 w-24">Jurusan:</label>
                <input
                  type="text"
                  id="jurusan"
                  name="jurusan"
                  value={formData.jurusan}
                  onChange={handleInputChange}
                  className="rounded-md px-2 py-1 border text-black"
                  required
                />
              </div>
              <div>
                <button type="submit" className="btn btn-primary px-4 py-2 rounded-md">Simpan</button>
              </div>
            </form>

            <table className="table-auto mt-8 w-full border-sky-50">
              <thead className="text-center">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Nama</th>
                  <th className="px-4 py-2">Jurusan</th>
                  <th className="px-4 py-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {mahasiswas.length > 0 ? (
                  mahasiswas.map(mahasiswa => (
                    <tr key={mahasiswa.id}>
                      <td className="border px-4 py-2">{mahasiswa.id}</td>
                      <td className="border px-4 py-2">{mahasiswa.nama}</td>
                      <td className="border px-4 py-2">{mahasiswa.jurusan}</td>
                      <td className="border px-4 py-2 text-center">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleEdit(mahasiswa)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                          onClick={() => handleDelete(mahasiswa.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="border px-4 py-2 text-center">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
