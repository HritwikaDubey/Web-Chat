import React, { useState ,useEffect} from 'react'
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import "./Sidebar.css";
import db from "./firebase";


import { useStateProviderValue } from "./StateProvider";

import SidebarChat from "./SidebarChat";

function Sidebar() {
    const [rooms, setRooms]=useState([]);
    const [{ user }, dispatch] = useStateProviderValue();
    const [logout, setLogout] = useState(false);

    useEffect(()=>{
      

        const unsubscribe = db.collection('rooms').onSnapshot((snapshot)=>
        setRooms(
            snapshot.docs.map((doc)=>({
                id: doc.id,
              data: doc.data(),

            }))
            )
        );
        return()=>{
            unsubscribe();
        }
        
    },[])

    const exitApp = () => {
        localStorage.removeItem("uid");
        window.location.reload();
        setLogout(true);
      };


    return (
        <div className="sidebar">
            <div className="sidebar__header">
              <div className="sidebar__userProfile">
            <Avatar src={user?.photoURL}/>
            </div>
                <div className="sidebar__headerRight">
                <IconButton>
                  <div onClick={exitApp}>
                    <ExitToAppIcon htmlColor="#3D3D3D" fontSize="large"/>
                  </div>
                </IconButton>

            </div>
            </div>
            <div className="sidebar__search">
            <div className="sidebar__searchContainer">
            <IconButton>
            <SearchOutlinedIcon htmlColor="#f5f3ef"/>
            </IconButton>
              <input placeholder="Search or start new chat" type="text" htmlColor="#fADD7DE" />
            </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat addNewChat/>
                {rooms.map((room)=>(
                    <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                    ))}
               </div>
            </div>
    )
}

export default Sidebar
