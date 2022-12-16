import React, { useEffect, useState } from 'react';

const MyContacts = () => {
    const [contacts, setContacts] = useState([]);

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetch(`https://my-contacts-server-rakibul58.vercel.app/contacts?page=${page}&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setCount(data.count)
                setContacts(data.products)
                console.log(data.products);
            });
    }, [page,size]);

    const pages = Math.ceil(count / size);

    return (
        <div className='text-white'>
            <h4 className='text-2xl font-bold'>My Contacts</h4>
            <div className='mt-4'>
                {
                    contacts.map((contact, i) => <div className='flex items-center justify-around mb-3' key={contact._id}>
                        <div className='font-semibold text-lg'>{page*size+ i + 1}) {contact.first_name} {contact.last_name}</div>
                        <div className='flex flex-wrap gap-2'>
                            <button className='btn btn-info btn-xs hover:bg-opacity-50'>Details</button>
                            <button className='btn btn-success btn-xs hover:bg-opacity-50'>Update</button>
                            <button className='btn btn-error btn-xs hover:bg-opacity-50'>Delete</button>
                        </div>
                    </div>)
                }

            </div>
            <div className="pagination">
                <p className='mb-3'>Currently selected Page: {page+1} and {pages}</p>
                {
                    [...Array(pages).keys()].map(number => <button
                        key={number}
                        className={`btn btn-xs px-4 mr-2 ${page === number && 'btn-disabled'}`}
                        onClick={() => setPage(number)}
                    >{number + 1}</button>)
                }
            </div>
        </div>
    );
};

export default MyContacts;