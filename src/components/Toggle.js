import React from 'react';
import { Link } from 'react-router-dom';

const Toggle = () => {
    return (
        <div className='font-bold mb-10 flex flex-wrap -mt-5 justify-center'>
            <Link className='px-10 rounded-lg py-3 hover:bg-gradient-to-br bg-gradient-to-tr from-black to-gray-400 mr-3' to='/'>My Contacts</Link>
            <Link className='px-10 rounded-lg py-3 hover:bg-gradient-to-br bg-gradient-to-tr from-blue-900 to-gray-400' to='/addcontact'>Add Contact</Link>
        </div>
    );
};

export default Toggle;