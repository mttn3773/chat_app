import React from "react";
import { useState } from "react";
import "./Rooms.scss";
interface RoomsProps {
  setRoom: (room: string) => void;
  room: string;
  setMessageToChannel: () => void;
}

export const Rooms: React.FC<RoomsProps> = ({
  setRoom,
  setMessageToChannel,
  room,
}) => {
  const CHANNELS = ["general", "channel 1", "channel 2", "channel 3"];
  const handleClick = (channelName: string, index: number) => {
    setMessageToChannel();
    setRoom(channelName);
  };
  const isActive = (roomName: string): string => {
    if (roomName === room) {
      return "active";
    }
    return "";
  };
  return (
    <div className="rooms-list">
      <h2>ROOMS</h2>
      {CHANNELS.map((room, index) => {
        return (
          <a
            key={index}
            onClick={() => handleClick(room, index)}
            className={isActive(room)}
          >
            {room.toCapitalize()}
          </a>
        );
      })}
    </div>
  );
};
