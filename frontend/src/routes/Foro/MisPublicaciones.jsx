import { useState, useEffect } from 'react';
import { getMisPublicaciones, deleteForo, deleteComentario } from './../../services/foro.service.js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { toast } from 'react-toastify';

const MisPublicaciones = () => {
    const { user } = useAuth();
    const [publicacion, setpublicacion] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const [foroResponse] = await Promise.all([getMisPublicaciones(user.email)]);
            const reverseData = foroResponse.data.reverse(); 
            setpublicacion(reverseData);
        } catch (error) {
            console.error("Error al obtener datos", error);
            toast.error('Error al obtener datos');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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

    const handleDeletePublicacion = async (postId) => {
        try {
            await deleteForo(postId);
            toast.success('Publicación eliminada con éxito');
            setpublicacion(publicacion.filter(post => post._id !== postId));
        } catch (error) {
            toast.error('Error al eliminar la publicación');
        }
    };

    const handleDeleteComentario = async (postId, comentarioId) => {
        try {
            await deleteComentario(postId, comentarioId);
            toast.success('Comentario eliminado con éxito');
            const updatedPublicaciones = publicacion.map(post => {
                if (post._id === postId) {
                    post.comentarios = post.comentarios.filter(com => com._id !== comentarioId);
                }
                return post;
            });
            setpublicacion(updatedPublicaciones);
        } catch (error) {
            toast.error('Error al eliminar el comentario');
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="text-center mb-4 text-customGreen">
                <h2 className="text-lg font-bold">Mis publicaciones</h2>
            </div>
            <div className="flex justify-between p-4">
                <p></p>
                <button 
                    onClick={() => navigate("/foro/nuevo")} 
                    className="bg-customOrange px-2 py-2 rounded-md flex items-center justify-center hover:bg-customGreen"
                >
                    <img className="w-5 h-5" src={`${import.meta.env.VITE_BASE_URL}/uploads/addpost.png`} alt="Nueva publicación" />
                </button>
            </div>
            
            <div className="bg-customDPurple">
                {publicacion.map((post) => (
                    <div
                        key={post._id}
                        className="px-4 py-4 mb-6 ring-4 ring-customDarkGray rounded-lg shadow-sm bg-customDarkPurple"
                    >
                        <div className="flex justify-between items-start">
                            <h2 className="font-bold text-xl mb-2 text-customGreen uppercase flex-1">{post.titulo}</h2>
                            <div className="flex space-x-2">
                                <button 
                                    onClick={() => navigate(`/foro/editar/${post._id}`)} 
                                    className="bg-customOrange px-3 py-2 rounded-md hover:bg-customGreen"
                                >
                                    <img className="w-5 h-5" src={`${import.meta.env.VITE_BASE_URL}/uploads/editar.png`} alt="Editar" />
                                </button>
                                <button 
                                    onClick={() => handleDeletePublicacion(post._id)} 
                                    className="bg-customOrange px-3 py-2 rounded-md hover:bg-customGreen"
                                >
                                    <img className="w-5 h-5" src={`${import.meta.env.VITE_BASE_URL}/uploads/eliminar.png`} alt="Eliminar" />
                                </button>
                            </div>
                        </div>
                        
                        {post.imagen && (
                            <img 
                                src={getPhotoUrl(post.imagen.imageUrl)} 
                                alt="archivos"  
                                className="w-full max-w-lg max-h-lvh shadow-xl rounded-lg mx-auto mt-2"
                                onError={handlePhotoError}
                            />
                        )}
                        
                        <p className="text-customGreen text-base text-justify mt-4 p-2">{post.contenido}</p>
                        
                        <div className="flex justify-between items-center mt-4">
                            <p className="text-xs text-customGreen">{post.autor}</p>
                            <p className="text-xs text-customGreen">{formatearFecha(post.fechaCreacion)}</p>
                        </div>

                        {post.comentarios && post.comentarios.length > 0 && (
                            <p className="text-customGreen mt-2">Comentarios:</p>
                        )}

                        {post.comentarios && post.comentarios.map((comentario) => (
                            <div key={comentario._id} className="bg-customDarkGray p-4 mt-4 ring-1 ring-customOrange rounded-sm">
                                <p className="text-customGreen text-sm">{comentario.contenido}</p>
                                <div className="flex justify-between mt-2">
                                    <p className="text-xs text-customGreen">{comentario.usuario}</p>
                                    <p className="text-xs text-customGreen">{formatearFecha(comentario.fecha)}</p>
                                    {comentario.usuario === user.email && (
                                        <button 
                                            onClick={() => handleDeleteComentario(post._id, comentario._id)} 
                                            className="bg-customOrange px-3 py-2 rounded-md hover:bg-customGreen"
                                        >
                                            <img className="w-5 h-5" src={`${import.meta.env.VITE_BASE_URL}/uploads/eliminar.png`} alt="Eliminar comentario" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MisPublicaciones;
