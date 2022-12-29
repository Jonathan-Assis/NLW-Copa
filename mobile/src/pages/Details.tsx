import { useState, useEffect } from 'react'
import { Share } from 'react-native'
import { HStack, VStack, useToast } from "native-base";
import { useRoute } from '@react-navigation/native'
import { api } from '../services/api';

import { EmptyMyPollList, Header, Option, PollHeader, Guesses, Loading } from '../components'
import { PollCardPros } from '../components/PollCard'

interface RouteParams {
    id: string;
}

export function Details(){
    const route = useRoute();
    const [optionSelected, setOptionSelected] = useState<'Seus palpites' | 'Ranking do grupo'>('Seus palpites')
    const [isLoading, setIsLoading] = useState(true)
    const [pollDetails, setPollDetails] = useState<PollCardPros>({} as PollCardPros)
    const { id } = route.params as RouteParams;
    
    const toast = useToast();

    async function fetchPollDetails(){
        try {
            setIsLoading(true);

            const response = await api.get(`/polls/${id}`)
            setPollDetails(response.data.poll)

        } catch (error) {
            console.log(error)
            toast.show({
                title: 'Não foi possível carregar os detalhes do bolão',
                placement: 'top',
                bgColor: 'red.500'
              })
        } finally {
            setIsLoading(false)
        }
    }

    async function handleCodeShare() {
        await Share.share({
            message: pollDetails.code
        })
    }

    useEffect(() => {
        fetchPollDetails();
    },[id])

    if (isLoading) {
        return <Loading />
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header
                title={pollDetails.title}
                showBackButton
                showShareButton
                onShare={handleCodeShare}   
            />
 
            {
                pollDetails._count?.participants > 0 ?
                    <VStack flex={1} px={5}>
                        <PollHeader data={pollDetails} />
                        
                        <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
                            <Option
                                title="Seus palpites"
                                isSelected={optionSelected === 'Seus palpites'} 
                                onPress={()=> setOptionSelected('Seus palpites')}
                                />
                            <Option
                                title="Ranking do grupo"
                                isSelected={optionSelected === 'Ranking do grupo'} 
                                onPress={()=> setOptionSelected('Ranking do grupo')}
                            />
                        </HStack>

                        <Guesses pollId={pollDetails.id} code={pollDetails.code} />
                    </VStack>
                :
                    <EmptyMyPollList code={pollDetails.code} />
            }
        </VStack>
    )
} 