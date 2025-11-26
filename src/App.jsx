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

export default function App() {
  // const [json, setJson] = useState({})
  const [page, setPage] = useState(<Home read={read}/>)
  let json = null

  // useEffect(() => {
  //   fetch(`/api/read/product/${product.id}`).then(res => res.json()).then(data => {
  //     setProduct(data);
  //   });
  // }, [product]);

  function home() {
    setPage(<Home read={read}/>)
  }

  async function read(entity, id = 0) {
    

    await fetch(`/api/read/${entity}/${id}`, {method: "GET"}).then(res => res.json()).then(data => {
      json = data
    })

    console.log(json)
    
    // if (id == 0){
    //   // console.log("here 1")
    //   // setJson([{id: 1, name: "platform"},{id: 2, name: "jig"}])
    //   // json = [{id: 1, name: "platform"},{id: 2, name: "jig"}]
    // }else{
    //   console.log("here 2")
    //   // setJson({id: 1, name: "platform"})
    //   // json = {id: 1, name: "platform"}
    // }
    setPage(<Read entity={entity} json={json} read={read} create={create}/>)
  }

  async function create(entity, from) {
    if (from == "read")
      setPage(<Create />)
    else {
      await fetch(`/api/create/${entity}`, {method: "POST"}).then(res => res.json()).then(data => {
        json = data
      })
    }
  }

  // function read(formData) {
  //   fetch(`/api/read/product/${formData.get("productId")}`, {method: "GET"}).then(res => res.json()).then(data => {
  //     setProduct(data)
  //   })
  // }

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

  // async function getProductList() {
  //   return await fetch(`/api/read/products`, {method: "GET"}).then(res => res.json())
  // }

  // const [products, setProducts] = useState([])

  // function ProductList() {
  //   useEffect(() => {
  //     getProductList().then(products => setProducts(products))
  //   }, [])

  //   let productList = products.map(p => <p>ID: {p.id} | NAME: {p.name}</p>)

  //   return (
  //     <>
  //       <p>Product List</p>
  //       {productList}
  //     </>
  //   )
  // }

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
      </form> */}
      </div>
      </div>
      </div>
      </div>
    </>
  )
}

export default App
