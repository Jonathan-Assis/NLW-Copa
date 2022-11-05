import { Heading, VStack } from 'native-base'
import { Header, Input, Button } from '../components'

export function FindPool(){
  return(
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por Código" />

      <VStack mt={8}mx={5} alignItems="center">
        <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
          Encontre um bolão através de seu código único
        </Heading>

        <Input 
          mb={2}
          placeholder="Qual o código do bolão?"
        />

        <Button
          type="PRIMARY"
          title="BUSCAR BOLÃO"
        />
      </VStack>
    </VStack>
  )
}

