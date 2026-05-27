
import "./Setup.css"

const Setup = () => {
  return (
    <div className="Setup">
      <header className="SetupHeader">
        <h1>Setup</h1>
        <p>Configure valores e detalhes do evento.</p>
      </header>

      <section className="SetupCard">
        <h2>Evento</h2>
        <div className="SetupGrid">
          <label className="SetupField">
            <span>Nome do evento</span>
            <input className="SetupInput" name="nome" type="text" placeholder="Ex: Aniversario Vinicius" />
          </label>
          <label className="SetupField">
            <span>Data e hora</span>
            <input className="SetupInput" name="data" type="datetime-local" />
          </label>
          <label className="SetupField">
            <span>Local</span>
            <input className="SetupInput" name="local" type="text" placeholder="Ex: Habibs" />
          </label>
        </div>
      </section>

      <section className="SetupCard">
        <h2>Valores</h2>
        <div className="SetupGrid">
          <label className="SetupField">
            <span>Valor do rodizio</span>
            <input className="SetupInput" name="rodizio" type="number" min="0" step="0.01" placeholder="R$ 0,00" />
          </label>
        </div>
      </section>
      
      <div className="SetupActions">
        <button type="button" className="SetupButton SetupButtonGhost">Cancelar</button>
        <button type="button" className="SetupButton">Salvar configuracoes</button>
      </div>
    </div>
  )
}

export default Setup