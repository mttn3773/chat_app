import React from "react";
import { useState } from "react";
import "./Rooms.scss";
interface RoomsProps {
  setRoom: (room: string) => void;
  room: string;
}

export const Rooms: React.FC<RoomsProps> = ({ setRoom, room }) => {
  const [active, setActive] = useState<number>(0);
  const CHANNELS = ["general", "channel 1", "channel 2", "channel 3"];
  const handleClick = (channelName: string, index: number) => {
    setRoom(channelName);
    setActive(index);
  };
  return (
    <div className="rooms-list">
      <h2>ROOMS</h2>
      {CHANNELS.map((room, index) => {
        return (
          <a
            key={index}
            onClick={() => handleClick(room, index)}
            className={`${index === active ? "active" : ""}`}
          >
            {room.toCapitalize()}
          </a>
        );
      })}
    </div>
  );
};
