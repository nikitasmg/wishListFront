import React, {useEffect, useState} from 'react';
import axios from "axios";
import Present from "./Present.jsx";

const List = () => {
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])
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

    useEffect(() => {
        getList()
    }, [])


    const handleAddReserve = async (id) => {
        try {
            await axios.put(`https://wishlistbacknest.onrender.com/gifts/${id}`, { isReserved: true})
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

    const getList = async () => {
        setLoading(true)
        axios.get('https://wishlistbacknest.onrender.com/gifts')
            .then(({data}) => setList(data) )
            .finally(() => setLoading(false))
    }
    return (
        <div className='max-w-[1230px] mx-auto pb-10 relative text-gray-800'>
            <div className='px-3'>
                <div className='flex items-center pt-[50px] lg:pt-[100px] mb-4 flex-col-reverse lg:flex-row'>
                    <div className=''>
                        <h2 className='animate-bounce my-2'>День рождения у Кочмана =)</h2>
                        <h2 className='text-gray-700 text-4xl leading-[1.4] lg:(text-[54px] leading-[64px]) font-bold text-neutral-800'>
                            Дорогие друзья, приглашаю вас на свой День рождения 18 февраля.
                        </h2>
                    </div>
                    {/*<video autoPlay muted loop className="max-w-full lg:max-w-[540px] mb-10 lg:mb-0">*/}
                    {/*    <source src="/giftsVideo.mp4" type="video/mp4"/>*/}
                    {/*    Sorry, your browser doesn't support videos.*/}
                    {/*</video>*/}
                    <img className='w-1/4' src="/sticker2.webp" alt="photo"/>
                </div>

                <div className='flex gap-4 lg:gap-1 flex-col mb-10 text-2xl text-gray-700 '>
                    <span className='underline underline-offset-auto cursor-pointer hover:no-underline'>
                        Место проведения - <br className='lg:hidden'/><a target='_blank' href="https://2gis.ru/tyumen/firm/70000001040419553?m=65.471489%2C57.116898%2F16">ресторан Дача, д. Дударева, Тюменская 9</a></span>
                    <span>Время проведения - <br className='lg:hidden'/> 18:00</span>
                </div>

            </div>


            <h2 className='text-2xl lg: text-4xl text-center mb-5 text-gray-700'>А вот и он - Wish List {loading}</h2>
            <span className='block mb-5 text-center text-red-300'>Важно! После нажатия кнопки "Беру себе", отменить выбор сможет только администратор. Если возникнут вопросы пишите <a
                className='underline text-blue-500 hover:animate-pulse' href="https://vk.com/smg72" target='_blank'>Никите Смагину</a></span>
            {
                loading
                    ? <h2 className='text-2xl text-gray-700 text-center animate-pulse'> Подождите идет загрузка (не уходите пожалуйста) ...</h2>
                    : <div className='px-2 grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-5'>
                        {
                            list.length ? list.map(el =>
                                <Present key={el.id} item={el} handleAddReserve={handleAddReserve} loading={loading} />
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