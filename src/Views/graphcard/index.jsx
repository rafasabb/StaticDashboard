/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react';

export default (props) => {
  const { name, children, setDimensions } = props;
  const divRef = useRef(null);
  let pastRef = null;

  useEffect(() => {
    setDimensions([divRef.current.scrollWidth - 40, divRef.current.scrollHeight - 40]);
  }, []);

  useEffect(() => {
    if (pastRef !== divRef) {
      pastRef = divRef;
      setDimensions([divRef.current.scrollWidth - 40, divRef.current.scrollHeight - 40]);
    }
  });

  return (
    <div className="w-full md:w-1/2 xl:w-1/3 p-6 h-96">
      <div className="bg-white border-transparent rounded-lg shadow-xl h-full">
        <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
          <h5 className="font-bold uppercase text-gray-600">{name}</h5>
        </div>
        <div ref={divRef} className="p-5 h-5/6">
          {children}
        </div>
      </div>
    </div>
  );
};
