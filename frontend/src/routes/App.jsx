import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-customDarkPurple p-4 sm:p-8 rounded-lg">
      <h1 className="text-2xl sm:text-3xl font-bold text-customGreen mb-6 text-center">
        Bienvenido al Sistema de Planificación de Recursos Empresariales (ERP)
      </h1>

      <div className="bg-customPurple shadow-md rounded-lg p-4 sm:p-6 mb-6 max-w-4xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-semibold text-customGreen mb-4">Presentación del Software</h2>
        <p className="text-customGreen mb-4">
          Nuestro sistema ERP está diseñado para mejorar la organización y gestión de los recursos de su empresa constructora, proporcionando una solución para la planificación de proyectos, gestión de personal y comunicación interna.
        </p>
        <p className="text-customGreen">
          Con nuestro software, podrá llevar un control detallado de sus proyectos, asignar tareas a su personal y mantener una comunicación fluida entre los diferentes departamentos de su empresa. Todo ello con una interfaz sencilla e intuitiva que facilitará la adopción de la herramienta por parte de sus empleados.
        </p>
      </div>

      <div className="bg-customPurple shadow-md rounded-lg p-4 sm:p-6 mb-6 max-w-4xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-semibold text-customGreen mb-4">Características Principales</h2>
        <ul className="list-disc list-inside text-customGreen">
          <li>Gestión de Proyectos: Planificación, seguimiento y finalización de proyectos.</li>
          <li>Recursos Humanos: Gestión de asistencia y asignaciones de personal.</li>
          <li>Comunicación Interna: Facilita la comunicación y coordinación interna.</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
