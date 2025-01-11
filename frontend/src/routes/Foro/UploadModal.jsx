import { useState } from 'react';
import Modal from 'react-modal';
import { createImgForo } from '../../services/imgForo.service.js';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        maxWidth: '90%', 
        width: '400px', 
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        overflowY: 'auto',
        backgroundColor: 'rgb(19, 0, 61)' // Fondo morado oscuro
    }
};

const UploadModal = ({ isOpen, onClose, onFileUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        let formData = new FormData();
        formData.append('files', selectedFile);
        const responce = await createImgForo(formData);
        onFileUpload(responce.data._id);
        onClose();
    };

    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Subir Archivo"
            style={customStyles}
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-customGreen">Subir Archivo</h2>
                <button
                    onClick={onClose}
                    className="text-customOrange hover:text-customGreen focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
            
            <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                className="hidden" 
            />
            
            <div className="mt-4 text-center">
                <button
                    onClick={handleButtonClick}
                    className="bg-customOrange hover:bg-customGreen text-white py-2 px-4 rounded-md"
                >
                    Seleccionar archivo
                </button>
                {selectedFile && (
                    <div className="mt-4 text-customGreen">
                        <p>Archivo seleccionado: {selectedFile.name}</p>
                        <p>Tamaño: {selectedFile.size} bytes</p>
                        <p>Tipo: {selectedFile.type}</p>
                    </div>
                )}
            </div>

            {/* Contenedor para centrar los botones */}
            <div className="flex justify-center mt-4 space-x-4">
                <button
                    onClick={handleSubmit}
                    className="bg-customPurple hover:bg-customOrange text-white py-2 px-4 rounded-md"
                >
                    Subir
                </button>
                <button
                    onClick={onClose}
                    className="bg-customPurple hover:bg-customOrange py-2 px-4 rounded-md text-white"
                >
                    Cancelar
                </button>
            </div>
        </Modal>
    );
};

export default UploadModal;
