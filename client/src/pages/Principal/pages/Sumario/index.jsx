import "./Sumario.css"
import { Check } from 'lucide-react'
import SumarioItem from '../../../../components/SumarioItem'
const Sumario = () => {
  const pessoas = [
    {
      id: 1,
      nome: 'Maria S. (Voce)',
      iniciais: 'MS',
      total: 'R$ 97,50',
      status: 'pendente',
      isVoce: true,
      itens: [
        { label: 'Rodizio', valor: 'R$ 45,00' },
        { label: '2x Caipirinha', valor: 'R$ 20,00' },
        { label: '1x Sobremesa', valor: 'R$ 10,00' },
        { label: 'Valor do Aniversariante', valor: 'R$ 22,50', isShared: true },
        // { label: 'Itens Compartilhados', valor: 'R$ 20,00', isShared: true },
        // { label: 'Taxa de Servico (10%)', valor: 'R$ 7,50', isShared: true },
      ],
    },
    {
      id: 2,
      nome: 'Joao P.',
      iniciais: 'J',
      total: 'R$ 123,90',
      status: 'pago',
      isAniversariante: true,
      itens: [
        { label: 'Rodizio', valor: 'R$ 45,00' },
        { label: '4x Cerveja', valor: 'R$ 40,00' },
        { label: 'Valor do Aniversariante', valor: 'R$ 22,50', isShared: true },
        // { label: 'Itens Compartilhados', valor: 'R$ 20,00', isShared: true },
        // { label: 'Taxa de Servico (10%)', valor: 'R$ 9,90', isShared: true },
      ],
    },
    {
      id: 3,
      nome: 'Lucas C.',
      iniciais: 'LC',
      total: 'R$ 68,40',
      status: 'pendente',
      itens: [
        { label: 'Rodizio', valor: 'R$ 45,00' },
        { label: '1x Suco', valor: 'R$ 8,40' },
        { label: 'Valor do Aniversariante', valor: 'R$ 22,50', isShared: true },
        // { label: 'Itens Compartilhados', valor: 'R$ 10,00', isShared: true },
        // { label: 'Taxa de Servico (10%)', valor: 'R$ 5,00', isShared: true },
      ],
    },
    {
      id: 4,
      nome: 'Marina R.',
      iniciais: 'MR',
      total: 'R$ 112,00',
      status: 'pago',
      itens: [
        { label: 'Rodizio', valor: 'R$ 45,00' },
        { label: '2x Caipiroska', valor: 'R$ 32,00' },
        { label: '1x Sobremesa', valor: 'R$ 15,00' },
        { label: 'Valor do Aniversariante', valor: 'R$ 22,50', isShared: true },
        // { label: 'Itens Compartilhados', valor: 'R$ 12,00', isShared: true },
        // { label: 'Taxa de Servico (10%)', valor: 'R$ 8,00', isShared: true },
      ],
    },
    {
      id: 5,
      nome: 'Bruna L.',
      iniciais: 'BL',
      total: 'R$ 54,30',
      status: 'pendente',
      itens: [
        { label: 'Rodizio', valor: 'R$ 45,00' },
        { label: '1x Agua', valor: 'R$ 4,30' },
        { label: 'Valor do Aniversariante', valor: 'R$ 22,50', isShared: true },
        // { label: 'Itens Compartilhados', valor: 'R$ 5,00', isShared: true },
      ],
    },
  ]

  return (
    <div className="Sumario">
      <div className="SumarioTotal">
        <h4>Total da Mesa</h4>
        <span className="SumarioTotalValorContainer">
          <div className="SumarioTotalSifra">R$</div>
          <div className="SumarioTotalValor">485</div>
          <div className="SumarioTotalCentavos">,50</div>
        </span>
        <span className="SumarioTotalPago">
          <div className="SumarioTotalPagoIcon">
            <Check size={16} />
          </div>
          <p>Totalmente Pago { /* Ou: Ainda Não Pago */ }</p>
        </span>
      </div>
      <div className="SumarioHeader">
        <h1>Lista Geral</h1>
      </div>
      <div className="SumarioLista">
        {pessoas.map((pessoa) => (
          <SumarioItem
            key={pessoa.id}
            nome={pessoa.nome}
            iniciais={pessoa.iniciais}
            total={pessoa.total}
            status={pessoa.status}
            itens={pessoa.itens}
            isVoce={pessoa.isVoce}
            isAniversariante={pessoa.isAniversariante}
          />
        ))}
      </div>
    </div>
  )
}

export default Sumario