import React, { useEffect, useState } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repos, setRepo] = useState([])

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepo(res.data)
    })
  }, [])

  async function handleAddRepository() {
    const reponse = await api.post('repositories', {
      title: 'Web',
      url: 'http://github.com/adilsondjr/web',
      techs: ['HTML', 'Javascript', 'CSS']
    })

    setRepo([ ...repos, reponse.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    setRepo(repos.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(repo => (
          <li key={repo.id}>
          {repo.title}

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
