import { useState } from 'react' 
import { useNavigation } from '@react-navigation/native';
import { Heading, VStack, useToast } from 'native-base'
import { Header, Input, Button } from '../components'
import { api } from '../services/api';

export function FindPoll(){
  const { navigate } = useNavigation()
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast();
  
  async function handleJoinPoll(){
    try {
      setIsLoading(true)

      if(!code.trim()){
        toast.show({
          title: 'Informe o código.',
          placement: 'top',
          bgColor: 'red.500'
        })
        setIsLoading(false);
      }

      await api.post('/polls/join', { code })

      toast.show({
        title: 'Você entrou no bolão com sucesso.',
        placement: 'top',
        bgColor: 'green.500'
      })
      setCode('')
      setIsLoading(false);

      navigate('Polls')

    } catch (error) {
      console.log(error);
      setIsLoading(false);

      if(error.response?.data?.message === 'Poll not found.'){
        return toast.show({
          title: 'Bolão não encontrado!',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      if(error.response?.data?.message === 'You already joined this poll.'){
        return toast.show({
          title: 'Você já está nesse bolão!',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      toast.show({
        title: 'Não foi possível encontrar o bolão.',
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  return(
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por Código" showBackButton={true} />

      <VStack mt={8}mx={5} alignItems="center">
        <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
          Encontre um bolão através de seu código único
        </Heading>

        <Input 
          mb={2}
          placeholder="Qual o código do bolão?"
          autoCapitalize="characters"
          onChangeText={setCode}
          value={code}
        />

        <Button
          type="PRIMARY"
          title="BUSCAR BOLÃO"
          onPress={handleJoinPoll}
          isLoading={isLoading}
        />
      </VStack>
    </VStack>
  )
}

