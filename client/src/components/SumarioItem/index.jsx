import './SumarioItem.css'
import EditConsumo from '../EditConsumo'

const SumarioItem = ({ nome, iniciais, total, status, itens, isVoce, isAniversariante, onUpdated }) => {
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
        {itens.map((item, idx) => (
          <div
            key={item.id || `item-${idx}`}
            className={`SumarioItemLinha ${item.isShared ? 'SumarioItemLinhaCompartilhado' : ''}`.trim()}
          >
            <div className="SumarioItemLinhaEsquerda">
              <span>{item.label}</span>
              {isVoce && item.isEditable && (
                <EditConsumo item={item} onUpdated={onUpdated}>
                  <button className="SumarioItemEditBtn" type="button">
                    Editar
                  </button>
                </EditConsumo>
              )}
            </div>
            <strong>{item.valor}</strong>
          </div>
        ))}
      </div>
    </article>
  )
}

export default SumarioItem
