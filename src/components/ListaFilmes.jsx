import React from 'react'
import FilmeCard from './FilmeCard.jsx'

const ListaFilmes = ({ filmes, onVerDetalhes }) => {
  return (
    <div className="lista-filmes">
      {filmes.map((filme) => (
        <FilmeCard key={filme.id} filme={filme} onVerDetalhes={onVerDetalhes} />
      ))}
    </div>
  )
}

export default ListaFilmes