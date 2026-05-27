import './SumarioItem.css'

const SumarioItem = ({ nome, iniciais, total, status, itens, isVoce, isAniversariante }) => {
  const statusLabel = isAniversariante ? 'Presente' : status === 'pago' ? 'Pago' : 'Pendente'
  const statusClass = isAniversariante
    ? 'SumarioItemStatusPresente'
    : status === 'pago'
      ? 'SumarioItemStatusPago'
      : 'SumarioItemStatusPendente'

  return (
    <article className={`SumarioItem ${isVoce ? 'SumarioItemVoce' : ''} ${isAniversariante ? 'SumarioItemAniversariante' : ''}`.trim()}>
      <header className="SumarioItemHeader">
        <div className="SumarioItemAvatar">
          <span>{iniciais}</span>
        </div>
        <div className="SumarioItemInfo">
          <div className="SumarioItemNome">{nome}</div>
          <div className={`SumarioItemStatus ${statusClass}`.trim()}>
            <span className="SumarioItemStatusDot" />
            <span>{statusLabel}</span>
          </div>
        </div>
        <div className="SumarioItemTotal">
          <div className="SumarioItemTotalValor">{total}</div>
        </div>
      </header>
      <div className="SumarioItemDetalhes">
        {itens.map((item) => (
          <div
            key={item.label}
            className={`SumarioItemLinha ${item.isShared ? 'SumarioItemLinhaCompartilhado' : ''}`.trim()}
          >
            <span>{item.label}</span>
            <strong>{item.valor}</strong>
          </div>
        ))}
      </div>
    </article>
  )
}

export default SumarioItem
