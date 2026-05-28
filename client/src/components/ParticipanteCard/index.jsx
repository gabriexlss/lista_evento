import './ParticipanteCard.css'

const ParticipanteCard = ({ nome, iniciais, status, isVoce, isAniversariante }) => {
  const statusLabel = isAniversariante ? 'Presente' : status === 'pago' ? 'Pago' : 'Pendente'
  const statusClass = isAniversariante
    ? 'ParticipanteCardStatusPresente'
    : status === 'pago'
      ? 'ParticipanteCardStatusPago'
      : 'ParticipanteCardStatusPendente'

  return (
    <div className={`ParticipanteCard ${isVoce ? 'ParticipanteCardVoce' : ''} ${isAniversariante ? 'ParticipanteCardAniversariante' : ''}`.trim()}>
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
