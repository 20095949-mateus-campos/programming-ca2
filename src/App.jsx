import { useState, useEffect } from 'react'
import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Read from './components/Read'
import Create from './components/Create'

const ModelProps = Object.freeze({
  PRODUCT: ['name', 'blueprint', 'process', 'material'],
  WORKORDER: ['client', 'product', 'start', 'end', 'cost'],
  CLIENT: ['name', 'email', 'phone', 'address'],
  PROCESS: ['name', 'description', 'tool'],
  MATERIAL: ['name'],
  TOOL: ['name'],
})

export default function App() {

  // const [json, setJson] = useState({})
  const [loading, setLoading] = useState(false)
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
      // json = JSON.parse(data)
          setPage(<Read entity={entity} json={json} read={read} create={create} update={update} delete_row={delete_row}/>)
    setLoading(false)
    })

    // console.log(json)
    
    // if (id == 0){
    //   // console.log("here 1")
    //   // setJson([{id: 1, name: "platform"},{id: 2, name: "jig"}])
    //   // json = [{id: 1, name: "platform"},{id: 2, name: "jig"}]
    // }else{
    //   console.log("here 2")
    //   // setJson({id: 1, name: "platform"})
    //   // json = {id: 1, name: "platform"}
    // }

  }

  async function create(entity, post = null) {
    // let props = []
    // switch (entity) {
    //   case "client":
    //     props = ['name', 'email', 'phone', 'address']
    //     break
    // }

    console.log(entity.toUpperCase())

    if (post == null)
      setPage(<Create entity={entity} create={create} read={read} props={props}/>)
    else {
      console.log('post')
      console.log(post)

      await fetch(`/api/create/${entity}`, {method: "POST",headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, body: JSON.stringify(post)})
    
    // .then(res => res.json()).then(data => {
    //     json = data
    //   })
    }
  }

  // function read(formData) {
  //   fetch(`/api/read/product/${formData.get("productId")}`, {method: "GET"}).then(res => res.json()).then(data => {
  //     setProduct(data)
  //   })
  // }

  async function update(entity, patch, id) {
    setLoading(true)

    await fetch(`/api/update/${entity}/${id}`, {method: "PATCH",headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, body: JSON.stringify(patch)}).then(res => res.json()).then(data => {
        json = data
        console.log("json")
        console.log(data)
        setPage(<Read entity={entity} json={json} read={read} create={create} update={update}/>)
        setLoading(false)
      })

    
  }

  function delete_row(entity, id) {
    setLoading(true)
    fetch(`/api/delete/${entity}/${id}`, {method: "DELETE"}).then(res => res.json()).then(data => {
      setPage(<Read entity={entity} json={data} read={read} create={create} update={update} delete_row={delete_row}/>)
        setLoading(false)
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
      
      {loading ? 
        "Loading..."
      :
        page

      }

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
