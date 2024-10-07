import { makeItRandom } from '../../types/random'
import { FaMapMarkerAlt, FaRegClock, FaDollarSign } from 'react-icons/fa'
import './style.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { InfoToFinish } from '../CardPurchaseComponent'
// import Header from '../header'

const FinishedPurComponent = () => {
  const location = useLocation()
  const infoToFinish = location.state as InfoToFinish
  const navigate = useNavigate()

  console.log(infoToFinish)

  const backHome = () => {
    navigate('/')
  }

  return (
    <div>
      {/* <Header showFilter={false}/> */}
      {infoToFinish ? 
      (
        <div className='main'>
          <div className='title'>
            <h2>Compra realizada!</h2>
            <p>Agora é só aguardar que logo as suas comics chegam aí!</p>
          </div>
          <div className='mainPurInfo'>
              <div className='divInfo'>
                <FaMapMarkerAlt className='iconFF1' />
                <div>
                  <p>Entrega em <b>{infoToFinish.getAdress}, {infoToFinish.getUnity}</b></p>
                  <p>{infoToFinish.getHood} - {infoToFinish.getCity}, {infoToFinish.getUfs}</p>
                </div>
              </div>
              <div className='divInfo'>
                <FaRegClock className='iconFF' />
                <div>
                  <p>Previsão de entrega</p>
                  <p><b>{ makeItRandom(2, 10, true) } dias</b></p>
                </div>
              </div>
              <div className='divInfo'>
                <FaDollarSign className='iconFF' />
                <div>
                  <p>Pagamento na entrega</p>
                  <p><b>{infoToFinish.getChoice}</b></p>
                </div>
              </div>
            </div>
          <div className='divGoToStart'>
              <button className='goToStart' onClick={backHome}><p>Voltar para o início</p></button>
          </div>
        </div>
      ):
      (
        <div className='misteryDiv'><h1>Você não devia estar aqui...</h1></div>
      )}
      
    </div>
  )
}

export default FinishedPurComponent
