"use client"
import { useSocketStore } from "@/store/store";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { cn, getUser } from "@/lib/utils";

export const Chat = () => {
  const { socket, room, chat, sendMessage, receiveMessage } = useSocketStore();

  const user = getUser(socket?.id!, room.users);
  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = e.currentTarget.message.value;
    if (message !== "") {
      const messageData: Message = {
        roomId: room.id!,
        username: user?.name,
        message,
        isServer: false,
      };
      console.log("Sending message", messageData)
      sendMessage(messageData);
      e.currentTarget.message.value = "";
    }
  };

  useEffect(() => {
    const handleReceiveMessage = (data: Message) => {
      console.log("Received message", data);
      receiveMessage(data);
    };

    socket?.on("receive_msg", handleReceiveMessage);

    return () => {
      socket?.off("receive_msg");
    };
  }, [socket, receiveMessage]);

  return (
    <section className="border rounded-lg h-full p-6 flex flex-col gap-3 justify-between bg-white">

      {/* Messages box */}
      <div className="flex-grow flex items-end">
        <div className="overflow-y-auto max-h-[280px] w-full">
          {chat.map(({ username, message, isServer }, i) => (
            <p key={i} className={cn(isServer && "text-gray-500", "text-sm")}>
              {!isServer && <span className="font-bold">{username}: </span>}{message}
            </p>
          ))}
        </div>
      </div>
      <hr />
      {/* Send message */}
      <form className="flex justify-between gap-2" onSubmit={handleSendMessage}>
        <Input className="" name="message" placeholder="Type your message..." />
        <Button className="mb-0" type="submit">Send</Button>
      </form>

    </section>
  );
};