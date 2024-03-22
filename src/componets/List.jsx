import React, {useEffect, useState} from 'react';
import axios from "axios";
import Present from "./Present.jsx";

const List = () => {
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([{name: 12313, isReserved: false, description: 12312312, imageUrl: 'https://pngicon.ru/file/uploads/chernaja-podarochnaja-korobka.png'},{name: 12313, isReserved: false, description: 12312312, imageUrl: 'https://pngicon.ru/file/uploads/chernaja-podarochnaja-korobka.png'},{name: 12313, isReserved: false, description: 12312312, imageUrl: 'https://pngicon.ru/file/uploads/chernaja-podarochnaja-korobka.png'}])
    const [notification, setNotification] = useState({
        error: false,
        message: ''
    })

    const doNotification = (message, error) => {
        setNotification({error, message})
        setTimeout(() => {
            setNotification({
                error: false,
                message: ''
            })
        }, 5000)
    }


    const handleAddReserve = async (id) => {
        try {
            await axios.put(`/gifts/${id}`, {isReserved: true})
            const newList = list.map(el => {
                if (el.id === id) {
                    return {
                        ...el,
                        isReserved: true
                    }
                }
                return el
            })
            setList(newList)
            doNotification('Успешно добавлено в бронь')
        } catch (e) {
            doNotification(e?.response.data.message, true)
            console.error(e)
        }
    }
    useEffect(() => {
        getList().catch(e => console.error('ошибка при получении списка подароков', e))
    }, [])

    const getList = async () => {
        setLoading(true)
        axios.get('/gifts')
            .then(({data}) => setList(data))
            .finally(() => setLoading(false))
    }
    return (
        <div className='max-w-[1230px] mx-auto pb-10 relative text-white'>
            <div className='text-5xl mb-4'>
                День рождение Полины
            </div>
            {
                loading
                    ? <h2 className='text-2xl text-gray-700 text-center animate-pulse'> Подождите идет загрузка (не
                        уходите пожалуйста) ...</h2>
                    : <div className='px-2 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-[40px]'>
                        {
                            list.length ? list.map(el =>
                                <Present key={el.id} item={el} handleAddReserve={handleAddReserve} loading={loading}/>
                            ) : <h2>Список пуст</h2>
                        }
                    </div>
            }
            {
                notification.message &&
                <div
                    className={`fixed top-5 right-5 lg:(top-10 right-10) w-[200px] py-3 text-white px-5 bg-green-300 rounded-md shadow-sm ${notification.error && 'bg-red-400'}`}>
                    {notification.message}
                </div>
            }

        </div>

    );
};

export default List;