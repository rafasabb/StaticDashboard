/* eslint-disable react/prop-types */
import React from 'react';

export default (props) => {
  const {
    title, data, color, children,
  } = props;
  return (
    <div className="w-full md:w-1/2 xl:w-1/4 p-6">
      <div className={`bg-gradient-to-b from-${color}-200 to-${color}-100 border-b-4 border-${color}-600 rounded-lg shadow-xl p-5`}>
        <div className="flex flex-row items-center">
          <div className="flex-shrink pr-4">
            <div className={`rounded-full p-3 bg-${color}-600`}>
              {children}
            </div>
          </div>
          <div className="flex-1 text-right md:text-center">
            <h5 className="font-bold uppercase text-gray-600">{title}</h5>
            <h3 className="font-bold text-3xl">
              {data}
              {' '}
              <span className={`text-${color}-500`}>
                <i className="fas fa-caret-up" />
              </span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};
