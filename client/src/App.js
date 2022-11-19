import './App.css';
import React, { useState, useEffect } from 'react';

import io from 'socket.io-client';

let socket;
function App() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState('');
  useEffect(() => {
    setLoading(true);
    socket = io('ws://localhost:4000', {
      cors: { origin: '*' }
    });

    socket.on('connect', () => {
      setLoading(false);
    });

    return () => {
      socket.disconnect();
      socket.off('data');
    };
  }, []);

  useEffect(() => {
    socket.on('data', data => {
      const { type, cursor, key } = data;
      if(type === 'insertText'){
        setContent(content.slice(0, cursor-1) + key + content.slice(cursor-1));
      }
      else if(type === 'deleteContentBackward'){
        setContent(content.slice(0, cursor) + content.slice(cursor+1));
      }
      else if(type === 'deleteContentForward'){
        setContent(content.slice(0, cursor) + content.slice(cursor+1));
      }
      else if(type === 'historyUndo'){
        // console.log(cursor)
        // const ev2 = new Event('historyUndo', { bubbles: true});
        // textarea.dispatchEvent(ev2);

      }
    })

    return () => {
      socket.off('data');
    };

  }, [content])

  const onKeyDownHandler = (e) => {
    
  }
  const onChangeHandler = (e) => {
    console.log(e.nativeEvent);
    const data = {
      type: e.nativeEvent.inputType,
      cursor: e.target.selectionStart,
      key: e.nativeEvent.data,
    };
    socket.emit('data', data);
    setContent(e.target.value);
  }
  
  return (
    loading ? <div>로딩중..</div> : 
    <textarea onKeyDown={onKeyDownHandler} onChange={onChangeHandler} value={content}></textarea>
  );
}

export default App;
