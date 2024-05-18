import { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

function Slider() {
    const slides = [
        {
            url: 'https://images.pexels.com/photos/236705/pexels-photo-236705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Spacious and Modern Warehouses',
            description: 'Our state-of-the-art warehouses offer ample space and advanced infrastructure for efficient storage and operations.',
        },
        {
            url: 'https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'High-Tech Loading Docks',
            description: 'Our modern loading docks are designed for efficient and fast logistics operations, ensuring smooth and quick loading and unloading processes.',
        },
        {
            url: 'https://images.pexels.com/photos/236698/pexels-photo-236698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Versatile Warehouse Space',
            description: 'Our versatile warehouse space is designed to accommodate a variety of storage and operational needs, ensuring flexibility and efficiency for your business.',
        },
        {
            url: 'https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Efficient Container Storage',
            description: 'Our facility provides organized and secure container storage, ensuring easy access and streamlined logistics for your shipping needs.',
        },
        {
            url: 'https://images.pexels.com/photos/4484078/pexels-photo-4484078.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Dedicated Warehouse Staff',
            description: 'Our skilled and dedicated staff ensure efficient warehouse operations and accurate inventory management, providing top-notch service and support.',
        },
        {
            url: 'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Coordinated Teamwork',
            description: 'Our team works collaboratively to ensure seamless warehouse operations and efficient inventory handling, delivering superior service and accuracy.',
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <div className='max-w-[1600px] h-[780px] w-full m-auto py-16 px-4 relative'>
            <div
                style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
                className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
            ></div>
            {/* Left Arrow */}
            <div
                className='absolute top-[50%] left-8 transform -translate-y-1/2 text-3xl rounded-full p-3 bg-black/30 text-white cursor-pointer hover:bg-black/50 transition'
                onClick={prevSlide}
            >
                <BsChevronCompactLeft size={30} />
            </div>
            {/* Right Arrow */}
            <div
                className='absolute top-[50%] right-8 transform -translate-y-1/2 text-3xl rounded-full p-3 bg-black/30 text-white cursor-pointer hover:bg-black/50 transition'
                onClick={nextSlide}
            >
                <BsChevronCompactRight size={30} />
            </div>
            <div className='absolute bottom-[10%] w-full flex flex-col items-center justify-center text-center px-4'>
                <div className='bg-black/60 rounded-lg p-6'>
                    <h1 className='text-white text-3xl font-bold shadow-md'>{slides[currentIndex].title}</h1>
                    <h3 className='text-gray-300 text-lg mt-2 shadow-md'>{slides[currentIndex].description}</h3>
                </div>
            </div>
            <div className='flex top-4 justify-center py-2 mt-3'>
                {slides.map((slide, slideIndex) => (
                    <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className={`text-2xl cursor-pointer ${slideIndex === currentIndex ? 'text-black' : 'text-gray-400'}`}
                    >
                        <RxDotFilled />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Slider;
