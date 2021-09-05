/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react';

export default (props) => {
  const { currentFight, setCurrentFight } = props;
  const aClass = `block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 ${currentFight === 0 ? 'border-green-600' : 'border-gray-800 hover:border-green-500'}`;
  const bClass = `block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 ${currentFight === 1 ? 'border-purple-600' : 'border-gray-800 hover:border-purple-500'}`;
  const cClass = `block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 ${currentFight === 2 ? 'border-blue-600' : 'border-gray-800 hover:border-blue-500'}`;
  const textSelected = 'pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block';
  const textNotSelected = 'pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block';
  return (
    <div className="bg-gray-800 shadow-xl h-16 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-48">

      <div className="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
        <ul className="list-reset flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left">
          <li className="mr-3 flex-1">
            <a onClick={(e) => { e.preventDefault(); setCurrentFight(1); }} href="" className={bClass}>
              <i className="fas fa-tasks pr-0 md:pr-3" />
              <span className={currentFight === 1 ? textSelected : textNotSelected}>UCOB</span>
            </a>
          </li>
          <li className="mr-3 flex-1">
            <a onClick={(e) => { e.preventDefault(); setCurrentFight(0); }} href="" className={aClass}>
              <i className="fa fa-envelope pr-0 md:pr-3" />
              <span className={currentFight === 0 ? textSelected : textNotSelected}>UWU</span>
            </a>
          </li>
          <li className="mr-3 flex-1">
            <a onClick={(e) => { e.preventDefault(); setCurrentFight(2); }} href="" className={cClass}>
              <i className="fas fa-chart-area pr-0 md:pr-3" />
              <span className={currentFight === 2 ? textSelected : textNotSelected}>TEA</span>
            </a>
          </li>
        </ul>
      </div>

    </div>
  );
};
