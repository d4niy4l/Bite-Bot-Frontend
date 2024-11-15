'use client';
import { useState, useRef, useEffect, useCallback } from 'react';


import styles from './input-select.module.css';
const Select = ({
  onChange,
  options,
  lblText,
  showSelectedOption,
  defaultSelected,
  openOnTop,
  required,
}) => {
  const nullFunc = useCallback(() => {}, []);
  if (lblText == undefined) lblText = 'Label Text Here';
  if (onChange == undefined) onChange = nullFunc;
  if (options == undefined) options = ['Please add options'];
  if (showSelectedOption == undefined) showSelectedOption = true;
  if (openOnTop == undefined) openOnTop = false;
  if (required == undefined) required = false;

  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const divRef = useRef(null);
  const containerRef = useRef(null);
  useEffect(() => {
    if (defaultSelected != undefined) {
      setSelectedOption(defaultSelected);
    }
  }, [defaultSelected]);

  useEffect(() => {
    onChange(selectedOption);
  }, [selectedOption]);

  const toggleSelectModal = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  // Hide the div if clicking outside of it
  const handleClickOutside = (event) => {
    if (
      divRef.current &&
      !divRef.current.contains(event.target) &&
      containerRef.current &&
      !containerRef.current.contains(event.target)
    ) {
      setIsSelectOpen(false);
    }
  };

  // Attach and clean up the event listener
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const changeHandler = (item) => {
    setSelectedOption(item);
    setIsSelectOpen(false);
  };
  return (
    <div className="flex-1 flex flex-col gap-3 relative">
      <div className={`${required == true ? styles.required : ''} text-logoColor font-inter text-[16px]`}>
        {lblText}
      </div>
      <div
        ref={containerRef}
        onClick={toggleSelectModal}
        className="mt-auto max-h-[33px]  py-5 px-6 flex flex-row items-center bg-[#333333] text-[14px] rounded-[12px]"
      >
        <div className="text-[#ffff] text-ellipsis">
          {showSelectedOption
            ? selectedOption
              ? selectedOption
              : 'Please select an option'
            : ''}
        </div>
        <div className="ml-auto flex flex-col ">
          <img
            src={
              isSelectOpen
                ? '/icons/arrow-up-select.svg'
                : '/icons/arrow-down-select.svg'
            }
            width={18.97}
            height={7.98}
            alt={'arrow down icon'}
          />
        </div>
      </div>
      {openOnTop ? (
        <div
          ref={divRef}
          className={`${
            isSelectOpen ? 'flex' : 'hidden'
          } absolute bottom-[0px] left-1/2 -translate-x-1/2 -translate-y-[42px] max-h-[220px] h-[max-content] overflow-y-auto z-50 py-3 px-2 w-full flex-col gap-2  bg-[#2A2A2A] rounded-[12px] `}
        >
          {options &&
            options.map((item, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => {
                    changeHandler(item);
                  }}
                  className={` cursor-pointer text-[#ffff] text-xs py-2 font-inter text-center rounded-[12px] hover:bg-[#414142] ${
                    selectedOption == item ? 'bg-[#373738]' : 'bg-[#202020]'
                  }`}
                >
                  {item}
                </div>
              );
            })}
        </div>
      ) : (
        <div
          ref={divRef}
          className={`${
            isSelectOpen ? 'flex' : 'hidden'
          } max-h-[220px] overflow-y-auto z-50 py-3 px-2 w-full flex-col gap-2 absolute bottom-[-5px] left-1/2 -translate-x-1/2 bg-[#2A2A2A] rounded-[12px] translate-y-[100%]`}
        >
          {options &&
            options.map((item, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => {
                    changeHandler(item);
                  }}
                  className={` cursor-pointer text-[#ffff] text-xs py-2 font-inter text-center rounded-[12px] hover:bg-[#414142] ${
                    selectedOption == item ? 'bg-[#373738]' : 'bg-[#202020]'
                  }`}
                >
                  {item}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Select;