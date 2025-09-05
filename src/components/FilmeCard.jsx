import React from 'react'

const FilmeCard = ({ filme, onVerDetalhes }) => {
  const posterUrl = filme.poster_path
    ? `https://image.tmdb.org/t/p/w500${filme.poster_path}`
    : 'https://via.placeholder.com/500x750.png?text=Sem+Imagem'

  return (
    <div className="filme-card">
      <img src={posterUrl} alt={`Pôster de ${filme.title}`} />
      <h3>{filme.title}</h3>
      <p>Ano: {filme.release_date ? filme.release_date.substring(0, 4) : 'N/A'}</p>
      <button onClick={() => onVerDetalhes(filme.id)}>Ver Detalhes</button>
    </div>
  )
}

export default FilmeCard