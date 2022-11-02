import Image from 'next/image'
import * as Img from '../assets'

export default function Home() {
  return (
   <div>
    <main>
      <Image src={Img.logo} alt="Logo NLW Copa" />
      <h1>Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>
      
      <div>
        <Image src={Img.usersAvatarExample} alt="Avatares" />

        <strong>
          <span>+12.592</span> pessoas já estão usando
        </strong>
      </div>

      <form>
        <input type="text" required placeholder="Qual nome do seu bolão?" />
        <button type="submit">Criar meu bolão</button>
      </form>

      <p>Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>

      <div>
        <div>
          <Image src={Img.iconCheck} alt="" />
          <div>
            <span>+2.034</span>
            <span>Bolões criados</span>
          </div>
        </div>
        <div>
          <Image src={Img.iconCheck} alt="" />
          <div>
            <span>+192.847</span>
            <span>Palpites enviados</span>
          </div>
        </div>
      </div>
    </main>

    <Image 
      src={Img.appPreview} 
      alt="Dois celulares exibindo uma prévia da aplicação móvel do NLW Copa"
      quality={100}
    />
   </div>
  )
}

/* export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:3333/pools/count')
  const data = await response.json()

  console.log(data)

  return{
    props:{
      count: data.count
    }
  }
} */