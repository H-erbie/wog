"use client";
import React, { useState, Suspense, useEffect, useRef } from "react";
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  writeBatch,
  updateDoc,
  getDocs,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import {
  Bell,
  Loader2,
  Clock,
  Check,
  Send,
  ChevronLeft,
  ShoppingCart,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { auth, db } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DateTime } from "luxon";

const Chat = ({ orders }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [otherUserId, setOtherUserId] = useState("");
  const [user] = useAuthState(auth);
  const [rooms, setRooms] = useState([]);
  const [currentRoomIndex, setCurrentRoomIndex] = useState("");
  const isUserDataStored = JSON.parse(sessionStorage.getItem("andamo-user"));

  const pathname = usePathname();

  const userOrders = orders
    .filter(
      (order) =>
        order.purchaser.id === user?.uid &&
        (order.isDelivered || order.isCancelled)
    )
    .map((order) => order.name);

  // console.log(userOrders);

  const filterRoomsByUserId = async (userId) => {
    try {
      const roomsCollection = collection(db, "rooms");
      const roomsQuery = query(
        roomsCollection,
        where("userIds", "array-contains", userId)
      );
      const roomsSnapshot = await getDocs(roomsQuery);

      const filteredRoomIds = [];
      roomsSnapshot.forEach((doc) => {
        // if (!userOrders.includes(doc.id)){
        filteredRoomIds.push(doc.id);
        setRooms([...rooms, doc.id]);
        // }
      });
      // console.log(filteredRoomIds);
      return filteredRoomIds;
    } catch (error) {
      console.error("Error filtering rooms by user ID:", error);
      return [];
    }
  };

  const getMessagesByRoomId = async (roomId) => {
    try {
      const messageCollectionRef = collection(db, `rooms/${roomId}/messages`);
      const messageQuery = query(
        messageCollectionRef,
        orderBy("timestamp", "asc")
      ); // Order by timestamp descending
      const messageSnapshot = await getDocs(messageQuery);

      const roomMessages = [];
      messageSnapshot.forEach((doc) => {
        roomMessages.push(doc.data());
      });
      roomMessages.sort(
        (message1, message2) => message2.timestamp - message1.timestamp
      );
      return roomMessages;
    } catch (error) {
      console.error("Error getting messages by room ID:", error);
      return [];
    }
  };

  const subscribeToMessages = async (roomId) => {
    const messageCollectionRef = collection(db, `rooms/${roomId}/messages`);
    const messageQuery = query(
      messageCollectionRef,
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(messageQuery, (querySnapshot) => {
      const roomMessages = [];
      querySnapshot.forEach((doc) => {
        roomMessages.push(doc.data());
      });
      setMessages((prevMessages) => ({
        ...prevMessages,
        [roomId]: roomMessages.sort(
          (message1, message2) => message1.timestamp - message2.timestamp
        ),
      }));
    });
    return unsubscribe;
  };
  const chatContainerRef = useRef(null);
  useEffect(() => {
    let unsubscribe;

    const fetchData = async () => {
      if (!user) return;

      const roomIds = await filterRoomsByUserId(user.uid);
      const roomMessages = {};
      for (const roomId of roomIds) {
        roomMessages[roomId] = await getMessagesByRoomId(roomId);
      }

      // Sort room messages by the latest message timestamp (descending)
      const sortedRoomMessages = Object.entries(roomMessages).sort(
        ([roomId1, messages1], [roomId2, messages2]) =>
          messages2[0].timestamp - messages1[0].timestamp // Sort by latest message timestamp
      );

      setMessages(Object.fromEntries(sortedRoomMessages));
    };

    fetchData();

    return () => unsubscribe && unsubscribe();
  }, [messages]);
  const [scrolled, setScrolled] = useState(false);
  const sendMessage = async (roomId, orderId, index) => {
    setIsSending(true);
    try {
      const messageCollectionRef = collection(db, `rooms/${roomId}/messages`);
      const messageData = {
        content: newMessage,
        roomId,
        orderId,
        user: user.displayName || user.email, // Use display name or email
        timestamp: Date.now(),
        userId: user.uid,
        id: uuidv4(), // Generate unique message ID
        seen: false, // Set seen to false for new messages
      };
      await addDoc(messageCollectionRef, messageData);

      const updatedMessages = {
        ...messages,
        [roomId]: [...messages[roomId], messageData], // Add sent message to room messages
      };
      setMessages(updatedMessages);
      setNewMessage(""); // Clear message input after sending
      // setScrolled(true)

      // setCurrentRoomIndex(roomId);
      setScrolled(true);
      // if (chatContainerRef.current) {
      //     chatContainerRef.current.scrollTo({
      //       top: chatContainerRef.current.scrollHeight,
      //       behavior: "smooth",
      //     });

      //   }
      //   if (chatContainerRef.current) {
      //     chatContainerRef.current.scrollTo({
      //       top: chatContainerRef.current.scrollHeight,
      //       behavior: "smooth",
      //     });

      //   }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current && scrolled) {
      const container = chatContainerRef.current;
      if (container.scrollHeight > container.clientHeight) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      }
      setScrolled(false);
    }
  }, [currentRoomIndex, scrolled, messages]);
  const handleRoomClick = async (roomId) => {
    setCurrentRoomIndex(roomId); // Find the index of the clicked room
    setScrolled(true);

    const unreadMessages = messages[roomId].filter(
      (message) => !message.seen && message.userId !== user.uid
    );

    // Update "seen" field for unread messages (if any)
    if (unreadMessages.length > 0) {
      // Option 1: Update state locally (for immediate UI update)
      const updatedMessages = {
        ...messages,
        [roomId]: messages[roomId].map((message) =>
          unreadMessages.includes(message)
            ? { ...message, seen: true } // Update seen for unread messages
            : message
        ),
      };
      setMessages(updatedMessages);

      const messageCollectionRef = collection(db, `rooms/${roomId}/messages`);
      // const batch = writeBatch(db);
      const q = query(messageCollectionRef, where("roomId", "==", roomId));
      const querySnapshot = await getDocs(q);
      // console.log(querySnapshot)
      // if (querySnapshot.length > 0) {
      querySnapshot.forEach((doc) => {
        updateDoc(doc.ref, { seen: true });
      });
      // }
    }
  };
  // console.log(messages)
  const activeOrders = Object.entries(messages).filter(
    ([roomId, roomMessages], index) =>
      !userOrders.includes(roomMessages[0].orderId)
  );
  // console.log(activeOrders);

  const makeDate = (timestamp) => {
    const parsedDateTime = DateTime.fromMillis(timestamp);
    let userTimeZone = null;
    if (userTimeZone) {
      return parsedDateTime.setZone(userTimeZone).toLocaleString({
        weekday: "long",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // Adjust for 12-hour format (optional)
      });
    } else {
      return parsedDateTime.toLocaleString({
        weekday: "long",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // Adjust for 12-hour format (optional)
      });
    }
  };

  return (
    <div
      className={`min-h-screen ${
        pathname.startsWith("/admin-dashboard") ? "pt-4 sm:pb-32" : "pt-0"
      } `}
    >
      <section className="flex overflow-hidden chat-height">
        {rooms.length > 0 && activeOrders.length > 0 ? (
          <>
            <div
              className={` ${
                currentRoomIndex !== ""
                  ? "hidden sm:block w-full sm:w-[30%]"
                  : "block w-full sm:w-[30%]"
              } relative ${
                pathname.startsWith("/admin-dashboard") ? "pt-0" : "pt-[62px]"
              }  no-scroll overflow-y-scroll h-full border-r  border-gray-200 dark:border-zinc-600`}
            >
              <h1 className="text-3xl border-r w-full sm:w-[30%] dark:bg-[#26272B] bg-white fixed top-0 z-20 left-0 font-bold text-center border-b border-gray-200 dark:border-zinc-600 pb-3">
                Chats ({activeOrders.length})
              </h1>
              {messages.length === 0 ? (
                <div className="w-[30%] h-full flex  text-sm items-center justify-center">
                  <Loader2 className="animate-spin" />
                </div>
              ) : (
                Object.entries(messages).map(
                  ([roomId, roomMessages], index) => {
                    const unreadCount = roomMessages.filter(
                      (message) => !message.seen && message.userId !== user.uid
                    ).length;
                    if (!userOrders.includes(roomMessages[0].orderId))
                      return (
                        <p
                          onClick={() => handleRoomClick(roomId)}
                          key={roomId}
                          className={`${
                            roomId === currentRoomIndex
                              ? " border-y border-black  hover:opacity-80  text-white dark:text-black bg-[#292e36] dark:bg-white "
                              : " border-y border-gray-200 hover:opacity-80  dark:border-zinc-600  "
                          }  font-semibold relative flex gap-x-2 items-center cursor-pointer p-5`}
                        >
                          {unreadCount > 0 && ( // Show unread count only if there are unread messages
                            <span className="bg-yellow-500 absolute top-8 right-1 text-white px-2  flex rounded-[100%] mr-2">
                              {unreadCount}
                            </span>
                          )}
                          <div className="p-3 rounded-[100%] dark:bg-zinc-600 bg-gray-200">
                            {" "}
                            <ShoppingCart className="text-black dark:text-white" />
                          </div>{" "}
                          {roomMessages[0].orderId}&apos;s chat
                        </p>
                      );
                  }
                )
              )}
            </div>
            {messages.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center">
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              <>
                {currentRoomIndex !== "" ? (
                  Object.entries(messages).map(
                    ([roomId, roomMessages], index) => {
                      if (
                        !userOrders.includes(roomMessages[0].orderId) &&
                        roomId === currentRoomIndex
                      )
                        return (
                          <div
                            key={roomId}
                            className="sm:w-[70%] w-full relative h-full "
                          >
                            <ul
                              ref={chatContainerRef}
                              className={`relative overflow-y-scroll no-scroll pb-16 pt-10  h-full px-4 sm:pr-14`}
                            >
                              <p className="text-center text-sm my-4 text-gray-400 dark:text-gray-500  ">
                                This chat room will disappear after your order
                                is delivered or cancelled.
                              </p>
                              {roomMessages
                                .sort(
                                  (message1, message2) =>
                                    message1.timestamp - message2.timestamp
                                ) // Sort messages by timestamp (ascending)
                                .map((message, index) => (
                                  <>
                                    <div
                                      className={`sm:w-[70%] w-full flex border-b p-3 bg-white border-gray-200 items-center dark:border-zinc-600 text-center dark:bg-[#26272B] fixed ${
                                        pathname.startsWith("/admin-dashboard")
                                          ? "top-[61px]"
                                          : " top-[64px]"
                                      }  right-0 justify-between`}
                                    >
                                      <div
                                        className="p-3 cursor-pointerhover:bg-gray-300 dark:hover:bg-zinc-500 rounded-[100%] sm:hidden dark:bg-zinc-600 bg-gray-200"
                                        onClick={() => setCurrentRoomIndex("")}
                                      >
                                        {" "}
                                        <ChevronLeft />
                                      </div>
                                      {isUserDataStored?.you !==
                                        "VHzq5s2t+vEV6uwcukPyaxzLq42/jxy4spIrHSyXsZY=" && (
                                        <Link
                                          href={`/orders/${message.orderId}`}
                                          className="text-yellow-500 sm:mr-0 mr-[40%] hover:underline"
                                        >
                                          Track this order
                                        </Link>
                                      )}
                                    </div>

                                    <li className="w-full my-4">
                                      <div
                                        key={message.id}
                                        className={`w-max max-w-[90%] sm:max-w-[60%] rounded-3xl p-3  ${
                                          message.userId === user.uid
                                            ? "ml-auto dark:bg-[#3c3d3f] bg-yellow-100"
                                            : "mr-auto dark:bg-gray-600 bg-gray-200"
                                        }`}
                                      >
                                        {message.userId === user.uid ? ( // Check if current user's message
                                          <p className="text-[15px] text-yellow-500">
                                            You{" "}
                                          </p>
                                        ) : (
                                          <p className="text-[15px] text-yellow-500">
                                            {isUserDataStored?.you ===
                                            "VHzq5s2t+vEV6uwcukPyaxzLq42/jxy4spIrHSyXsZY="
                                              ? message.user
                                              : "Andamo Team"}
                                          </p>
                                        )}
                                        <p className="text-[15px] break-words  w-full my-2">
                                          {message.content}
                                        </p>
                                        <p className="text-[12px] flex justify-between text-gray-400">
                                          {makeDate(message.timestamp)}
                                          {/* {new Date(
                                          message.timestamp
                                        ).toLocaleTimeString()} */}
                                           
                                          {/* {isSending && (
                                          <Clock
                                            className={
                                              index === roomMessages.length - 1
                                                ? "w-4 h-4"
                                                : "hidden"
                                            }
                                          />
                                        )}
                                        {!isSending && (
                                          <Check className="w-4 h-4" />
                                        )} */}
                                        </p>
                                      </div>
                                      {message.userId === user.uid && (
                                        <p className="ml-auto italic text-sm w-max">
                                          {message.seen ? "seen" : "deliverred"}
                                        </p>
                                      )}
                                    </li>
                                  </>
                                ))}
                            </ul>
                            <div className="flex sm:pr-20 dark:bg-[#1F1F1F] bg-white fixed sm:sticky w-full bottom-[70px] sm:bottom-0 items-center p-2 border-t border-gray-200 dark:border-zinc-600">
                              <input
                                className="w-full px-3 py-2 rounded-lg focus:outline-none dark:bg-[#3c3d3f]"
                                placeholder="Type your message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                disabled={isSending}
                                onKeyDown={(event) => {
                                  if (
                                    event.key === "Enter" &&
                                    newMessage.trim() !== ""
                                  ) {
                                    sendMessage(
                                      roomId,
                                      roomMessages[0].orderId,
                                      index
                                    );
                                  }
                                }}
                              />
                              <button
                                className="ml-2 py-2 px-3 border rounded-lg flex gap-x-2 items-center bg-yellow-500 dark:hover:bg-yellow-500 dark:bg-yellow-600  hover:bg-yellow-400 disabled:opacity-50"
                                onClick={() =>
                                  sendMessage(
                                    roomId,
                                    roomMessages[0].orderId,
                                    index
                                  )
                                }
                                disabled={isSending || newMessage.trim() === ""} // Disable if sending or empty message
                              >
                                {isSending ? (
                                  <Loader2 className="animate-spin" />
                                ) : (
                                  <>
                                    Send
                                    <Send />{" "}
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        );
                    }
                  )
                ) : (
                  <div
                    className={`w-[70%] ${
                      currentRoomIndex === "" ? "hidden sm:flex" : "flex"
                    } items-center relative h-full `}
                  >
                    <h2 className="text-gray-400 w-full dark:text-zinc-600 text-center text-3xl">
                      👈Select a chat room
                    </h2>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <div className="w-full flex items-center relative h-full ">
            <h2 className="text-gray-400 w-full dark:text-zinc-600 text-center text-3xl">
              You have no messages😕
            </h2>
          </div>
        )}
      </section>{" "}
    </div>
  );
};

export default Chat;
