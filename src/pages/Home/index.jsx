import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.scss';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProduct] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    const response = await axios.get("http://localhost:3010/products")
    setProduct(response.data)
  }

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3010/products/${id}`)
      getProducts()
    }catch (error) {
      console.log(error);
    }
  }

  return(
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">Tambah Produk</Link>
      <div className="search">
        <input type="text" onChange={(e) => setSearchTerm(e.target.value)} placeholder="Masukan kata kunci..."/>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.filter((product) => {
            const nameMatch = product.nama.toLowerCase().includes(searchTerm)
            const priceMatch = product.harga.toString().includes(searchTerm)
            return nameMatch || priceMatch
          }).map((product, index) => (
          <tr key={product._id}>
            <td>{index + 1}</td>
            <td>{product.nama}</td>
            <td className="text-right">{product.harga}</td>
            <td className="text-center">
              <Link to={`/detail/${product._id}`} className="btn btn-sm btn-info">Detail</Link>
              <Link to={`/edit/${product._id}`} className="btn btn-sm btn-warning">Edit</Link>
              <Link to="#" onClick={() => deleteProduct(product._id)} className="btn btn-sm btn-danger">Delete</Link>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Home;