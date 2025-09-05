import React from 'react'

const Paginacao = ({ paginaAtual, totalPaginas, onMudarPagina }) => {
  const handleAnterior = () => {
    if (paginaAtual > 1) {
      onMudarPagina(paginaAtual - 1)
    }
  }

  const handleProxima = () => {
    if (paginaAtual < totalPaginas) {
      onMudarPagina(paginaAtual + 1)
    }
  }

  return (
    <div className="paginacao">
      <button onClick={handleAnterior} disabled={paginaAtual === 1}>
        Anterior
      </button>
      <span>Página {paginaAtual} de {totalPaginas}</span>
      <button onClick={handleProxima} disabled={paginaAtual === totalPaginas}>
        Próxima
      </button>
    </div>
  )
}

export default Paginacao