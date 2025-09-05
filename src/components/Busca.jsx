import React, { useState } from 'react'

const Busca = ({ onBuscar }) => {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onBuscar(input)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Digite o nome do filme..."
      />
      <button type="submit">Buscar</button>
    </form>
  )
}

export default Busca