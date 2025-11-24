import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [product, setProduct] = useState({})

  // useEffect(() => {
  //   fetch(`/api/read/product/${product.id}`).then(res => res.json()).then(data => {
  //     setProduct(data);
  //   });
  // }, [product]);

  function create(formData) {
    fetch(`/api/create/product/${formData.get("productName")}`, {method: "POST"}).then(res => res.json()).then(data => {
      setProduct(data)
    })
  }

  function read(formData) {
    fetch(`/api/read/product/${formData.get("productId")}`, {method: "GET"}).then(res => res.json()).then(data => {
      setProduct(data)
    })
  }

  function update(formData) {
    fetch(`/api/update/product/${formData.get("productId")}/${formData.get("productName")}`, {method: "PATCH"}).then(res => res.json()).then(data => {
      setProduct(data)
    })
  }

  function deleteProduct(formData) {
    fetch(`/api/delete/product/${formData.get("productId")}`, {method: "DELETE"}).then(res => res.json()).then(data => {
      setProduct(data)
    })
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>The current time is {new Date(currentTime * 1000).toLocaleString()}.</p>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
