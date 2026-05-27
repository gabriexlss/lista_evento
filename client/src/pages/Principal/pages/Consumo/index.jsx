import { Calendar, MapPin, Cake, Users, Plus } from 'lucide-react'
import ParticipanteCard from '../../../../components/ParticipanteCard'
import "./Consumo.css"
const Consumo = () => {
  const participantes = [
    { id: 1, nome: 'Thiago (Voce)', iniciais: 'VC', status: 'pago', isVoce: true },
    { id: 2, nome: 'Marina R.', iniciais: 'MR', status: 'pago', isVoce: false },
    { id: 3, nome: 'Lucas C.', iniciais: 'LC', status: 'pendente', isVoce: false },
    { id: 4, nome: 'Joao P.', iniciais: 'JP', status: 'pendente', isVoce: false },
  ]

  return (
    <div className="Consumo">
      
      <h1 className="ConsumoTitle">Aniversario Vinicius</h1>

      <div className="ConsumoHorarioeLocal">
        <Calendar size={20} />
        <p>15:00h</p>
        <p> - </p>
        <MapPin size={20} />
        <p>Habibs</p>
      </div>

      <div className="ConsumoAniversariante">
        <Cake size={16} />
        <p>Aniversariante do dia: Carlos Vinicius</p>
      </div>

      <div className="ConsumoTotal">
        <h4>Total da Mesa</h4>
        <span className="ConsumoTotalValorContainer">
          <div className="ConsumoTotalSifra">R$</div>
          <div className="ConsumoTotalValor">485</div>
          <div className="ConsumoTotalCentavos">,50</div>
        </span>
        <span className="ConsumoTotalPorcentagem">
          <div className="ConsumoTotalPorcentagemInfo">
            <p>Pago</p>
            <p>45%</p>
          </div>
          <div className="ConsumoTotalPorcentagemBarra">
            <div className="ConsumoTotalPorcentagemBarraPreenchida" style={{ width: '45%' }}></div>
          </div>
        </span>
      </div>

      <div className="ConsumoPessoas">
        <span>
          <Users size={28} />
        </span>
        <p>10</p>
        <p>Pessoas</p>
      </div>

      <div className="ConsumoParticipantes">
        <h2>Participantes</h2>
      </div>
      <div className="ConsumoParticipantesGrid">
        {participantes.map((participante) => (
          <ParticipanteCard
            key={participante.id}
            nome={participante.nome}
            iniciais={participante.iniciais}
            status={participante.status}
            isVoce={participante.isVoce}
          />
        ))}
      </div>
      <div className="ConsumoLancar">
        <button>
          <div className="ConsumoLancarIcon">
            <Plus size={20} />
          </div>
          <p>Registrar Novo Consumo</p>
        </button>
      </div>
    </div>
  )
}

export default Consumo