import React from 'react';

const Present = ({item, handleAddReserve, loading}) => {

    const buttonType = () => {
        if (!item.isReserved) {
             return <button
                        onClick={() => handleAddReserve(item.id)}
                        className={`w-full border-2 py-2 px-5 rounded-md font-semibold border-pink-600 text-pink-500 mt-auto hover:bg-pink-600 hover:text-white ${loading && 'animate-bounce'}`}>
                {loading ? 'Подождите' : 'Беру себе'}
                    </button>

        } else {
            return <button
                disabled
                className='text-xl p-2 text-white rounded-md cursor-not-allowed bg-red-200 mt-auto'>
                Уже забрали
            </button>
        }
    }
    return (
        <div className='flex flex-col p-5 bg-pink-200 rounded-xl shadow-xl'>
            <img className='w-full max-h-[200px] min-h-[200px] object-contain rounded-t-2xl mb-5' src={item.imageUrl} alt={item.name}/>
            <div className='flex flex-col px-5 pb-3 grow'>
                <h2 className='text-2xl text-black mb-4 font-bold'> {item.name} </h2>
                <p className='text-neutral-700 text-lg mb-3'>{item.description}</p>
                {item.url && <a className='block text-xl text-blue-400 underline hover:no-underline mb-3' href={item.url} target='_blank'>Ссылка на пример</a>}
                { buttonType() }
            </div>
        </div>
    );
};

export default Present;