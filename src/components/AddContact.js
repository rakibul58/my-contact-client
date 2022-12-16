import React, { useState, CSSProperties } from 'react';
import { toast } from 'react-hot-toast';

import {
    useCSVReader,
    lightenDarkenColor,
    formatFileSize,
} from 'react-papaparse';
import { useNavigate } from 'react-router-dom';

const GREY = '#CCC';
const GREY_LIGHT = 'rgba(255, 255, 255, 0.4)';
const DEFAULT_REMOVE_HOVER_COLOR = '#A01919';
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
    DEFAULT_REMOVE_HOVER_COLOR,
    40
);
const GREY_DIM = '#686868';

const styles = {
    zone: {
        alignItems: 'center',
        border: `2px dashed ${GREY}`,
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        padding: 20,
    },
    file: {
        background: 'linear-gradient(to bottom, #EEE, #DDD)',
        borderRadius: 20,
        display: 'flex',
        height: 120,
        width: 120,
        position: 'relative',
        zIndex: 10,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    info: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
    },
    size: {
        backgroundColor: GREY_LIGHT,
        borderRadius: 3,
        marginBottom: '0.5em',
        justifyContent: 'center',
        display: 'flex',
    },
    name: {
        backgroundColor: GREY_LIGHT,
        borderRadius: 3,
        fontSize: 12,
        marginBottom: '0.5em',
    },
    progressBar: {
        bottom: 14,
        position: 'absolute',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
    },
    zoneHover: {
        borderColor: GREY_DIM,
    },
    default: {
        borderColor: GREY,
    },
    remove: {
        height: 23,
        position: 'absolute',
        right: 6,
        top: 6,
        width: 23,
    },
};

function AddContact() {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState({});
    const { CSVReader } = useCSVReader();
    const [zoneHover, setZoneHover] = useState(false);
    const [removeHoverColor, setRemoveHoverColor] = useState(
        DEFAULT_REMOVE_HOVER_COLOR
    );

    const handleSingleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const contact = {
            first_name: form.fname.value,
            last_name: form.lname.value,
            phone: form.phone.value,
            email: form.email.value
        }

        fetch('https://my-contacts-server-rakibul58.vercel.app/contact', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(contact)
        })
            .then(res => res.json())
            .then(result => {
                toast.success(`Contact Added Successfully`);
                navigate('/')
            });

    }

    const handleCSVSubmit = event => {
        event.preventDefault();
        let newContacts = [];

        for (const i of contacts) {
            const contact = {
                first_name: i[0],
                last_name: i[1],
                phone: i[2],
                email: i[3],
            }

            newContacts = [...newContacts, contact];
        }

        fetch('https://my-contacts-server-rakibul58.vercel.app/contacts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newContacts)
        })
            .then(res => res.json())
            .then(result => {
                toast.success(`Contacts Added Successfully`);
                navigate('/')
            });
    }

    return (
        <div className='text-white'>

            <h4 className='text-2xl font-bold mb-3'>Add Contact</h4>

            <form onSubmit={handleSingleSubmit} className='flex flex-col gap-3'>
                <div className="form-control">
                    <input name='fname' type="text" placeholder="First Name" className="rounded-lg font-semibold border bg-black bg-opacity-10 pl-3 py-2 w-full" />
                </div>
                <div className="form-control">
                    <input name='lname' type="text" placeholder="Last Name" className="rounded-lg font-semibold border bg-black bg-opacity-10 pl-3 py-2 w-full" />
                </div>
                <div className="form-control">
                    <input name='phone' type="text" placeholder="Phone Number" className="rounded-lg font-semibold border bg-black bg-opacity-10 pl-3 py-2 w-full" />
                </div>
                <div className="form-control">
                    <input name='email' type="text" placeholder="email" className="rounded-lg font-semibold border bg-black bg-opacity-10 pl-3 py-2 w-full" />
                </div>

                <input className='px-10 text-white font-bold mt-3 rounded-lg py-3 hover:bg-gradient-to-br bg-gradient-to-tr from-blue-900 to-gray-400' type="submit" value='Add Contact' />
            </form>

            <div className="flex items-center pt-4 space-x-1">
                <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                <p className="px-3 text-lg">Import as CSV</p>
                <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
            </div>
            <form onSubmit={handleCSVSubmit} className='text-black'>
                <CSVReader
                    onUploadAccepted={(results) => {
                        setContacts(results.data);
                        setZoneHover(false);
                    }}
                    onDragOver={(event) => {
                        event.preventDefault();
                        setZoneHover(true);
                    }}
                    onDragLeave={(event) => {
                        event.preventDefault();
                        setZoneHover(false);
                    }}
                >
                    {({
                        getRootProps,
                        acceptedFile,
                        ProgressBar,
                        getRemoveFileProps,
                        Remove,
                    }) => (
                        <>
                            <div
                                {...getRootProps()}
                                style={Object.assign(
                                    {},
                                    styles.zone,
                                    zoneHover && styles.zoneHover
                                )}
                            >
                                {acceptedFile ? (
                                    <>
                                        <div style={styles.file}>
                                            <div style={styles.info}>
                                                <span style={styles.size}>
                                                    {formatFileSize(acceptedFile.size)}
                                                </span>
                                                <span style={styles.name}>{acceptedFile.name}</span>
                                            </div>
                                            <div style={styles.progressBar}>
                                                <ProgressBar />
                                            </div>
                                            <div
                                                {...getRemoveFileProps()}
                                                style={styles.remove}
                                                onMouseOver={(event) => {
                                                    event.preventDefault();
                                                    setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                                                }}
                                                onMouseOut={(event) => {
                                                    event.preventDefault();
                                                    setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                                                }}
                                            >
                                                <Remove color={removeHoverColor} />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    'Drop CSV file here or click to upload'
                                )}
                            </div>
                        </>
                    )}
                </CSVReader>
                <input className='px-10 text-white font-bold mt-3 rounded-lg py-3 hover:bg-gradient-to-br bg-gradient-to-tr from-blue-900 to-gray-400' type="submit" value='Add Contacts' />
            </form>

        </div>
    );
};

export default AddContact;