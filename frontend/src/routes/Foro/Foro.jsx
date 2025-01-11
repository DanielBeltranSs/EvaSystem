import { useState, useEffect } from 'react';
import { getForo } from './../../services/foro.service.js';
import { useNavigate } from 'react-router-dom';
import ComentarModal from './ComentarModal';
import { toast } from 'react-toastify';

const Foro = () => {
    const [publicacion, setPublicacion] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [id, setId] = useState('');
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const [foroResponse] = await Promise.all([getForo()]);
            const reverseData = foroResponse.data.reverse(); 
            setPublicacion(reverseData);
        } catch (error) {
            console.error("Error al obtener datos", error);
            toast.error('Error al obtener datos');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const openModal = (id) => {
        setModalIsOpen(true);
        setId(id);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        fetchData();
    };

    const formatearFecha = (fecha) => {
        const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(fecha).toLocaleDateString('es-ES', opciones);
    };

    const getPhotoUrl = (url) => {
        return url.startsWith('http') ? url : `${import.meta.env.VITE_BASE_URL}/${url}`;
    };

    const handlePhotoError = (e) => {
        e.target.src = `${import.meta.env.VITE_BASE_URL}/uploads/imagesNotFound.png`;
    };

    return (
        <div className='max-w-6xl mx-auto p-4'>
            <div className="text-center mb-4 text-customGreen">
                <h2 className="text-lg font-bold bg-customDarkGray rounded-lg ">Foro Empresa</h2>
            </div>
            <div className='flex justify-between p-4'>
                <p className='text-customGreen uppercase'>Últimas publicaciones</p>
                <button onClick={() => navigate("/foro/nuevo")} className='bg-customOrange px-2 py-2 rounded-md hover:bg-customGreen'>
                    <img className='w-5 h-5' src={`${import.meta.env.VITE_BASE_URL}/uploads/addpost.png`} alt="Agregar publicación" />
                </button>
            </div>
            
            <div className='bg-customPurple'>
                {publicacion.map((post) => (
                    <div key={post._id} className='bg-customDarkPurple p-6 mb-4 ring-4 ring-customDarkGray rounded-lg'>
                        <h2 className='font-bold text-xl mb-2 text-customGreen uppercase'>{post.titulo}</h2>

                        {/* Imágen del post */}
                        {post.imagen && (
                            <img
                                src={getPhotoUrl(post.imagen.imageUrl)}
                                alt="archivos"
                                className='max-w-full max-h-64 object-cover shadow-xl rounded-xl mb-4'
                                onError={handlePhotoError}
                            />
                        )}

                        {/* Contenido del post */}
                        <p className='text-customGreen leading-snug bg-customPurple rounded-lg overflow-auto whitespace-pre-line mb-4'>
                            {post.contenido}
                        </p>

                        {/* Autor y Fecha */}
                        <div className='flex flex-col md:flex-row justify-between items-start text-xs md:text-sm text-customGreen mb-2'>
                            <p className='text-left'>{post.autor}</p>
                            <p className='text-left md:text-right'>{formatearFecha(post.fechaCreacion)}</p>
                        </div>

                        {/* Comentarios */}
                        {post.comentarios && post.comentarios.length > 0 && (
                            <div className='mt-4'>
                                <p className='text-customGreen'>Comentarios:</p>
                                {post.comentarios.map((comentario) => (
                                    <div key={comentario._id} className='bg-customDarkGray p-4 mt-4 ring-1 ring-customOrange rounded-sm'>
                                        <p className='text-customGreen text-sm mb-2'>{comentario.contenido}</p>
                                        <div className='flex flex-col md:flex-row justify-between items-start text-xs md:text-sm text-customGreen'>
                                            <p className='text-left'>{comentario.usuario}</p>
                                            <p className='text-left md:text-right'>{formatearFecha(comentario.fecha)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Botón para comentar */}
                        <div className='flex justify-end mt-2'>
                            <button onClick={() => openModal(post._id)} className='bg-customPurple hover:bg-customGreen rounded-lg p-1'>
                                <img className='w-5 h-5' src={`${import.meta.env.VITE_BASE_URL}/uploads/addcomentar.png`} alt="Agregar comentario" />
                            </button>
                        </div>

                    </div>
                ))}
            </div>

            <ComentarModal isOpen={modalIsOpen} onClose={closeModal} id={id} />
        </div>
    );
};

export default Foro;
