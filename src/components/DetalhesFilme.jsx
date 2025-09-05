import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_KEY = 'db35a4ce'
const API_URL = 'https://api.themoviedb.org/3' 



const DetalhesFilme = ({ filmeId, onVoltar, favoritos, onAdicionar, onRemover }) => {
  const [detalhes, setDetalhes] = useState(null)
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    const fetchDetalhes = async () => {
      setLoading(true)
      setErro(null)
      try {
        const response = await axios.get(`${API_URL}/movie/${filmeId}`, {
          params: {
            api_key: API_KEY,
            language: 'pt-BR',
            append_to_response: 'credits'
          }
        })
        setDetalhes(response.data)
      } catch (error) {
        setErro('Não foi possível carregar os detalhes do filme.')
      } finally {
        setLoading(false)
      }
    }
    fetchDetalhes()
  }, [filmeId])
  
  if (loading) return <p>Carregando detalhes...</p>
  if (erro) return <p className="erro">{erro}</p>
  if (!detalhes) return null

  const diretor = detalhes.credits.crew.find(membro => membro.job === 'Director');
  const isFavorito = favoritos.some(fav => fav.id === detalhes.id);

  const handleFavoritoClick = () => {
    if (isFavorito) {
      onRemover(detalhes.id);
    } else {
      onAdicionar(detalhes);
    }
  }

  return (
    <div className="detalhes-filme">
      <button onClick={onVoltar} className="voltar-btn">Voltar</button>
      <div className="detalhes-conteudo">
        <img 
          src={`https://image.tmdb.org/t/p/w500${detalhes.poster_path}`} 
          alt={`Pôster de ${detalhes.title}`} 
        />
        <div>
          <h2>{detalhes.title}</h2>
          <p><strong>Sinopse:</strong> {detalhes.overview || "Não disponível."}</p>
          <p><strong>Avaliação:</strong> {detalhes.vote_average.toFixed(1)} / 10</p>
          <p><strong>Diretor:</strong> {diretor ? diretor.name : 'Não informado'}</p>
          <p><strong>Elenco Principal:</strong> {detalhes.credits.cast.slice(0, 5).map(ator => ator.name).join(', ')}</p>
          <button onClick={handleFavoritoClick} className="favorito-btn">
            {isFavorito ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DetalhesFilme