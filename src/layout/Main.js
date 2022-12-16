import React from 'react';
import { Outlet } from 'react-router-dom';
import Toggle from '../components/Toggle';
import bg from '../images/contactus.jpg';

const Main = () => {
    return (
        <div style={{background: `url(${"https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000"})` , backgroundPosition: "center" , backgroundSize: "cover"}} className='lg:h-[100vh] flex justify-center items-center px-6'>
            <div className='bg-black pb-10 px-10 text-white bg-opacity-50 rounded-lg my-10'>
                <Toggle></Toggle>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Main;