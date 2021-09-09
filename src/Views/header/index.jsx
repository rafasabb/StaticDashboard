/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react';
import Br from '../../svg/br';
import Ffxiv from '../../svg/ffxiv';
import Gb from '../../svg/gb';

export default (props) => {
  const { setCurrentLanguage } = props;
  return (
    <nav className="bg-gray-800 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0">
      <div className="flex flex-wrap item-center">
        <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
          <span className="inline-block text-xl py-4 px-6 relative">
            <Ffxiv />
          </span>
        </div>
        <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2" />
        <div className="flex w-1/6 pt-2 content-center justify-between md:w-1/3 md:justify-end">
          <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
            <li className="flex-1 md:flex-none md:mr-1">
              <a className="inline-block py-2 px-4 text-white no-underline relative" href="" onClick={(e) => { e.preventDefault(); setCurrentLanguage('br'); }}>
                <Br />
              </a>
            </li>
            <li className="flex-1 md:flex-none md:mr-3">
              <a className="inline-block py-2 px-4 text-white no-underline relative" href="" onClick={(e) => { e.preventDefault(); setCurrentLanguage('en'); }}>
                <Gb />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
