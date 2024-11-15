import React, { useState } from 'react';

const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setMessages([...messages, input]);
      setInput('');
    }
  };

  return (

      <div className='max-w-[1340px] mt-[40px] mx-auto w-full bg-[#141414] flex flex-row text-white md:flex-row items-center md:items-start p-4 rounded-xl shadow-lg'>
        <div className=' rounded-xl px-[30px] py-[20px] w-full'>
          <h1 className='text-[32px] text-logoColor font-bold font-inter mb-2'>Can't Decide what to eat?</h1>
          <h2 className='text-[20px] font-inter font-medium mt-[10px] mb-[20px]'>Tell BiteBot how you feel and let it decide for you!</h2>
          <div className="w-full  bg-black rounded-xl shadow-xl p-4 border-2 border-logoColor items-center">
          <div className="h-64 overflow-y-auto p-2">
            {messages.map((msg, index) => (
              <div key={index} className="flex">
                <span className="text-green-500 font-mono font-semibold">user@bitebot:~$</span>
                <span className="ml-2 font-mono font-medium">{msg}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center mt-4">
            <span className="text-green-500 font-mono font-semibold">user@bitebot:~$</span>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyUp={handleKeyPress}
              className="bg-black text-white ml-2 flex-1 outline-none font-mono font-medium"
              autoFocus
              />
          </div>
        </div>
        <p className='text-sm font-inter font-bold mt-[20px] text-gray-500 text-center'>BiteBot can make mistakes, consider checking sensitive information</p>
        </div>
        <div className='w-full md:w-1/2 mt-8 p-4 rounded-lg shadow-lg hidden lg:flex items-center'>
        <img
          src='/thinking-robot.svg'
          alt='robot'
          className='w-full h-full mt-4'
        />
      </div>
      
       
      </div>
  );
};

export default Chat;