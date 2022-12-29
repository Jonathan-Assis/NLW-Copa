import { useState, useCallback } from 'react';
import { Icon, VStack, useToast, FlatList } from 'native-base'
import { Octicons } from '@expo/vector-icons'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { Button, Header, PollCard, Loading, EmptyPollList } from '../components'
import { PollCardPros } from '../components/PollCard'
import { api } from '../services/api';

export function Polls(){
    const { navigate } = useNavigation();
    const [isLoading, setIsLoading] = useState(true)
    const [polls, setPolls] = useState<PollCardPros[]>([])
    const toast = useToast();
    
    async function fetchPolls(){
        try {
            setIsLoading(true);

            const response = await api.get('/polls');
            setPolls(response.data.polls)
        } catch (error) {
            console.log(error)

            toast.show({
                title: 'Não foi possível carregar os bolões',
                placement: 'top',
                bgColor: 'red.500'
              })
        } finally {
            setIsLoading(false)
        }
    }

    useFocusEffect(useCallback(() => {
        fetchPolls();
    },[]));

    return(
        <VStack flex={1} bgColor="gray.900">
            <Header title="Meus bolões" />

            <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
                <Button
                    title="BUSCAR BOLÃO POR CÓDIGO"
                    leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
                    onPress={() => navigate('FindPoll')}
                />
            </VStack>

            {
                isLoading ?
                    <Loading /> 
                :
                    <FlatList 
                        data={polls}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        px={5}
                        _contentContainerStyle={{ pb: 20 }}
                        ListEmptyComponent={()=> <EmptyPollList />}
                        renderItem={({ item }) => <PollCard data={item} />}
                    />
            }
        </VStack>
    )
}