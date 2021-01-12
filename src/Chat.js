import { Avatar, IconButton } from '@material-ui/core';
import React, {useEffect,useState} from 'react';
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import "./Chat.css";
import { useParams } from 'react-router-dom';
import db from "./firebase";
import firebase from "firebase";
import { useStateProviderValue } from "./StateProvider";
import DeleteIcon from '@material-ui/icons/Delete';
import "emoji-mart/css/emoji-mart.css";
import { Picker } from 'emoji-mart'
import userName from "./Login"




function Chat() {
    //const [seed, setSeed]=useState("");
    const [input, setInput]=useState("");
    const{ roomId } =useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }] = useStateProviderValue();
    const [emoji, setEmoji] = useState(false);
      
    /*useEffect(()=>{
        setSeed(Math.floor(Math.random() * 5000));
    },[]);*/

    const addEmoji = (e) => {
      let emoji = e.native;
      setInput(input + emoji);
    };
    const checkEmojiClose = () => {
      if (emoji) {
        setEmoji(false);
      }
    };

    useEffect(() => {
        if (roomId) {
          db.collection("rooms")
            .doc(roomId)
            .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
    
          db.collection("rooms")
            .doc(roomId)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot) =>
              setMessages(snapshot.docs.map((doc) => doc.data()))
            );
        }
      }, [roomId]);
    

    const sendMessage=(e)=>{
        e.preventDefault();
        console.log('You typed >>>',input);
        db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .add({
            name: user.displayName,
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        setInput("");
    };

    const delMessage=()=>{
     db.collection("rooms")
     .doc(roomId)
        .collection("messages")
        .delete({
    
    });
  }

   

    


    return (
        <div className="chat">
            <div className="chat__header">
            <Avatar src={`https://avatars.dicebear.com/api/initials/${roomName}.svg?`}/>  
            <div className="chat__headerInfo">
                <h3>{roomName}</h3>
                <p> last seen{" "}
          {new Date(
              messages[messages.length - 1]?.
              timestamp?.toDate()
          ).toUTCString()}</p>
             </div>

            </div>
           
      <div className="chat__body">
      {messages.map((message) => (
          <p className={`chat__message ${message.name === user.displayName
           && "chat__reciever"}`}>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString().slice(17, 22)} 
              
            </span><IconButton>
              <DeleteIcon onClick={delMessage}/>
              </IconButton>
           
          </p>
        ))}
            </div>
            <div className="chat__footer">
            <IconButton>
            <InsertEmoticonIcon htmlColor="#00C4CB"
                className="yellow"
                onClick={() => setEmoji(!emoji)}
              />
              {emoji ? <Picker onSelect={addEmoji} /> : null}
            </IconButton>
            <form>
                <input value={input} onChange={(e) => setInput(e.target.value)}
                onClick={checkEmojiClose}
                placeholder="type Message..."
                type="text" autoComplete="on"
                />
                
           
            <button onClick={sendMessage} type="submit">
            Send 
            </button>  
            
                </form> 
            </div>

            
        </div>
    )
}

export default Chat

