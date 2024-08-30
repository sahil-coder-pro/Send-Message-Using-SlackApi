"use client" 

import { sendMessageToChannel } from "@/utils/findPublicConversation";
import axios from "axios";
import { useState } from "react";

export default function Home() {

  const [messageBoxText, setMessageBoxText] = useState("") ;
  const [isSendingMessage, setIsSendingMessage] = useState(false) ;
  
  
  const handleSubmit = async (e) => {
    setIsSendingMessage(true) ;
    
    try {
      const response = await axios.post("api/v1/slackMessage", {
        channelName : "tester-public" ,
        message: messageBoxText
      })

      console.log("FRONTEND RESPONSE", response.data) ;

    } catch (error) {
      console.error(error) ;
    }


    
    setIsSendingMessage(false) ;
  }


  return (
    <>
      <div className="h-screen overflow-y-auto w-full bg-black/90">

        {/* this is navbar */}
        
        <div className="bg-white/5 flex justify-center items-center  py-3 text-center relative ">
          <p className="invisible sm:visible text-white text-2xl absolute left-28 ">Sg</p>
          <a className="text-white hover:cursor-pointer ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>


          </a>
        </div>
        
        {/* for heading, textarea and submit button */}

        <div className=" box-border  p-2 justify-center gap-10 flex flex-col items-center">


          {/* this is the heading  */}

          <h1 className=" text-center bg-gradient-to-t from-white/80 via-white/60 to-white/50 p-2 text-transparent bg-clip-text text-4xl sm:text-6xl my-10 font-semibold">Send Message To <span className="bg-gradient-to-r from-purple-700 via-pink-600 to-orange-600 text-transparent bg-clip-text font-bold text-5xl sm:text-7xl">Slack</span></h1>


          {/* input area for the message  */}
          <textarea value={messageBoxText} onChange={(e) => setMessageBoxText(e.target.value)} className="text-white/70 resize-none p-4 bg-neutral-800 rounded-lg w-[80%] sm:w-1/2 text-lg sm:text-xl focus:outline-white/10 placeholder:text-white/30" rows = {6} placeholder="Enter your message..."></textarea>

          
          
          {/* submit button */}
          <button disabled = {isSendingMessage} onClick={handleSubmit} className="bg-orange-500 px-4 sm:px-0 text-lg sm:text-xl text-white sm:w-1/6 py-4 rounded-lg">{isSendingMessage ? "Sending Message..." : "Send To Slack"}</button>

        </div>
      </div>
    </>
  );
}
