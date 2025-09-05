import React, { useState } from 'react'
import axios from 'axios'
import Busca from './components/Busca.jsx'
import ListaFilmes from './components/ListaFilmes.jsx'
import Paginacao from './components/Paginacao.jsx'
import DetalhesFilme from './components/DetalhesFilme.jsx' 
import useLocalStorage from './hooks/useLocalStorage.js'
import './App.css'

const API_KEY = 'db35a4ce' 
const API_URL = 'https://api.themoviedb.org/3'

function App() {
  const [filmes, setFilmes] = useState([])
  const [termo, setTermo] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState(null)
  const [paginaAtual, setPaginaAtual] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(0)
  const [filmeSelecionado, setFilmeSelecionado] = useState(null)
  const [favoritos, setFavoritos] = useLocalStorage('favoritos', [])

  const buscarFilmes = async (termoBusca, pagina = 1) => {
    if (termoBusca.trim() === '') return
    setLoading(true)
    setErro(null)
    setFilmeSelecionado(null) // Limpa detalhes ao fazer nova busca
    try {
      const response = await axios.get(`${API_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query: termoBusca,
          page: pagina,
          language: 'pt-BR'
        }
      })
      if (response.data.results.length === 0) {
        setErro('Nenhum filme encontrado para este termo.')
      }
      setFilmes(response.data.results)
      setTotalPaginas(response.data.total_pages)
      setTermo(termoBusca)
    } catch (error) {
      setErro('Erro ao buscar filmes. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const mudarPagina = (pagina) => {
    setPaginaAtual(pagina)
    buscarFilmes(termo, pagina)
  }

  const adicionarFavorito = (filme) => {
    setFavoritos(prevFavoritos => [...prevFavoritos, filme]);
  }

  const removerFavorito = (filmeId) => {
    setFavoritos(prevFavoritos => prevFavoritos.filter(filme => filme.id !== filmeId));
  }
  
  return (
    <div className="App">
      <header>
        <h1>Busca de Filmes</h1>
        <Busca onBuscar={buscarFilmes} />
      </header>
      <main>
        {loading && <p>Carregando...</p>}
        {erro && <p className="erro">{erro}</p>}

        {filmeSelecionado ? (
          <DetalhesFilme 
            filmeId={filmeSelecionado} 
            onVoltar={() => setFilmeSelecionado(null)}
            favoritos={favoritos}
            onAdicionar={adicionarFavorito}
            onRemover={removerFavorito}
          />
        ) : (
          <>
            <ListaFilmes filmes={filmes} onVerDetalhes={setFilmeSelecionado} />
            {filmes.length > 0 && (
              <Paginacao
                paginaAtual={paginaAtual}
                totalPaginas={totalPaginas}
                onMudarPagina={mudarPagina}
              />
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default App