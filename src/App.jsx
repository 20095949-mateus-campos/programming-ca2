import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Read from './components/Read'
import Create from './components/Create'

// function Create() {
//   return (
//     <>
//       <form action={}>

//       </form>
//     </>
//   )
// }

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
    <Navbar home={home} read={read}/>
    <div class="hero-body">
        <div class="container has-text-centered">
      <div class="column is-4 is-offset-4">
        <div class="box">
      
      {page}

      {/* <Read /> */}

      {/* <ProductList /> */}

      {/* <p>CREATE:</p>
      <form action={create}>
        <input placeholder="prodcut name" name="productName"></input>
        <button type="submit" name="button" value="submit">Create</button>
      </form>

      <p>READ:</p>
      <form action={read}>
        <input placeholder="prodcut id" name="productId"></input>
        <button type="submit" name="button" value="submit">Read</button>
      </form>
      {Object.keys(product) != 0 ? <p>ID: {product.id} - Name: {product.name}</p> : <p>Not Found</p>}

      <p>UPDATE:</p>
      <form action={update}>
        <input placeholder="prodcut id" name="productId"></input>
        <input placeholder="new prodcut name" name="productName"></input>
        <button type="submit" name="button" value="submit">Update</button>
      </form>

      <p>DELETE:</p>
      <form action={deleteProduct}>
        <input placeholder="prodcut id" name="productId"></input>
        <button type="submit" name="button" value="submit">Delete</button>
      </form>
    </>
  )
}

export default App
