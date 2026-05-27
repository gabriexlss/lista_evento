import './ParticipanteCard.css'

const ParticipanteCard = ({ nome, iniciais, status, isVoce }) => {
  const statusLabel = status === 'pago' ? 'Pago' : 'Pendente'
  const statusClass = status === 'pago' ? 'ParticipanteCardStatusPago' : 'ParticipanteCardStatusPendente'

  return (
    <div className={`ParticipanteCard ${isVoce ? 'ParticipanteCardVoce' : ''}`.trim()}>
      <div className="ParticipanteCardAvatar">
        <span>{iniciais}</span>
      </div>
      <div className="ParticipanteCardInfo">
        <div className="ParticipanteCardNome">
          {nome}
        </div>
        <div className={`ParticipanteCardStatus ${statusClass}`.trim()}>
          <span className="ParticipanteCardStatusDot" />
          <span>{statusLabel}</span>
        </div>
      </div>
    </div>
  )
}

export default ParticipanteCard
