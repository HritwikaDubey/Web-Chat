import React, {useEffect,useState} from 'react';
import { Avatar, IconButton } from "@material-ui/core";
import "./SidebarChat.css";
import AddIcon from '@material-ui/icons/Add';
import db from './firebase';
import {Link} from "react-router-dom";
function SidebarChat( {id, name, addNewChat} ) {
 const [messages, setMessages]= useState("");
 //const [seed, setSeed]=useState("");

 useEffect(()=>{
 if(id){
 db.collection("rooms")
 .doc(id)
 .collection('messages')
 .orderBy('timestamp','desc')
 .onSnapshot(snapshot => (
 setMessages(snapshot.docs.map((doc) => doc.data()))
 ))
 }
 }, [id]);
 const createChat = () => {
 const roomName=prompt("Please enter name");
 if (roomName){
 db.collection('rooms').add({
 name: roomName,
 })
 }
 };
 return !addNewChat ? (
 <Link to={`/rooms/${id}`}>
 <div className="sidebarChat">
 <Avatar src={`https://avatars.dicebear.com/api/initials/${name}.svg?`}/> 
 <div className ="sidebarChat__info">
 <h3>{name}</h3>
 <p>{messages[0]?.message}</p>
 </div>
 </div>
 </Link>
 ):(
 <div onClick={createChat}
 className="sidebarChat__addnew">
 <AddIcon html htmlColor="#00C4CB" > Add new Chat</AddIcon>
 <h3>Add new Chat</h3>
 </div>
 );
}
export default SidebarChat