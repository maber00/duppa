
import React, { useState } from 'react';

const MostrarMasTexto = ({
  texto,
  textoAdicional,
  mostrarInicial = false,
  mostrarTextoBtnAbierto = '- Mostrar más -',
  mostrarTextoBtnCerrado = '- Ocultar -',
}) => {
  const [mostrarTexto, setMostrarTexto] = useState(mostrarInicial);

  const toggleTexto = () => {
    setMostrarTexto(!mostrarTexto);
  };

  return (
    <div>
      <p className="text-xl">
        {texto}{' '}
        {mostrarTexto && (
          <span>
            {textoAdicional}{' '}
            <span className="cursor-pointer text-blue-500 text-base" onClick={toggleTexto}>
              {mostrarTextoBtnCerrado}
            </span>
          </span>
        )}
        {!mostrarTexto && (
          <span className="cursor-pointer text-blue-500 text-base" onClick={toggleTexto}>
            {mostrarTextoBtnAbierto}
          </span>
        )}
      </p>
    </div>
  );
};

export default MostrarMasTexto;
