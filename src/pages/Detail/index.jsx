import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './index.scss';

const Detail = () => {
  const [productData, setProductData] = useState({
    nama: "",
    harga: "",
    stock: ""
  });
  const {id} = useParams()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
      const res = await axios.get(`http://localhost:3010/products/${id}`)
      setProductData(res.data)
  }
  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">Kembali</Link>

      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>: {id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>: {productData.nama}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: {productData.harga}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {productData.stock}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Detail;