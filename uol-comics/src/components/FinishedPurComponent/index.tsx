import { makeItRandom } from '../../types/random'
import { FaMapMarkerAlt, FaRegClock, FaDollarSign } from 'react-icons/fa'
import './style.css'

const FinishedPurComponent = () => {
  return (
    <div>
      <div>
        <h1>Compra realizada!</h1>
        <p>Agora é só aguardar que logo as suas comics chegam aí!</p>
      </div>
      <div className='mainPurInfo'>
        <div className='divInfo'>
          <FaMapMarkerAlt style={{ color: 'white', backgroundColor: 'orange', borderRadius: '50%', padding: '5px' }}/>
          <div>
            <p>Entrega em adress, extraInfo</p>
            <p>hood - city, uf</p>
          </div>
        </div>
        <div className='divInfo'>
          <FaRegClock style={{ color: 'white', backgroundColor: 'orange', borderRadius: '50%', padding: '5px' }}/>
          <div>
            <p>Previsão de entrega</p>
            <p>{ makeItRandom(2, 10, true) } dias</p>
          </div>
        </div>
        <div className='divInfo'>
          <FaDollarSign style={{ color: 'white', backgroundColor: 'orange', borderRadius: '50%', padding: '5px' }}/>
          <div>
            <p>Pagamento na entrega</p>
            <p>cartao</p>
          </div>
        </div>
        <button className='goToStart'><p>Voltar para o início</p></button>
      </div>
    </div>
  )
}

export default FinishedPurComponent
