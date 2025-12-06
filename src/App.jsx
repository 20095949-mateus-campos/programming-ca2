// React Docs referenced: https://react.dev/reference/react/useState.
// Bulma Docs referenced: https://bulma.io/documentation/layout/hero/.

import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Read from './components/Read'
import Create from './components/Create'

// ENUM to facilitate sharing of model properties between functions
const ModelProps = Object.freeze({
  PRODUCT: ['name', 'blueprint', 'process', 'material'],
  WORKORDER: ['client', 'product', 'start', 'end', 'cost'],
  CLIENT: ['name', 'email', 'phone', 'address'],
  PROCESS: ['name', 'description', 'tool'],
  MATERIAL: ['name'],
  TOOL: ['name'],
})

// App component renders container and calls all other components
export default function App() {
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(<Home read={read}/>)
  
  let json = null

  // set page to Home component
  function home() {
    setPage(<Home read={read}/>)
  }

  // POST request to create model and set page to Create component
  async function create(entity, post = null) {
    if (post == null)
      setPage(<Create entity={entity} create={create} read={read} props={ModelProps[entity.toUpperCase()]}/>)
    else {
      await fetch(`/api/create/${entity}`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      })
    }
  }

  // GET request to read list of models or model details and set page to Read component
  async function read(entity, id = 0) {
    await fetch(`/api/read/${entity}/${id}`, {method: "GET"}).then(res => res.json()).then(data => {
      json = data
      setPage(<Read entity={entity} json={json} read={read} create={create} update={update} delete_row={delete_row} home={home}/>)
      setLoading(false)
    })
  }

  // PATCH request to update model and set page to Read component
  async function update(entity, patch, id) {
    setLoading(true)

    await fetch(`/api/update/${entity}/${id}`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patch)
    })
    .then(res => res.json())
    .then(data => {
      json = data
      setPage(<Read entity={entity} json={json} read={read} create={create} update={update}/>)
      setLoading(false)
    })
  }

  // DELETE request to delete model and set page to Read component
  async function delete_row(entity, id) {
    setLoading(true)
    
    await fetch(`/api/delete/${entity}/${id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
      setPage(<Read entity={entity} json={data} read={read} create={create} update={update} delete_row={delete_row}/>)
      setLoading(false)
    })
  }

  // render app's main page
  return (
    <>
      <Navbar home={home} read={read} />
      
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="column is-4 is-offset-4">
            <div className="box">
              {loading ? 
                "Loading..."
              :
                page
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
