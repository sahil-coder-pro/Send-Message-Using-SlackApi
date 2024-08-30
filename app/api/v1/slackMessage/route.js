// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)

// import fs from "fs"
import { WebClient, LogLevel } from "@slack/web-api";
// WebClient instantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.

export async function POST(req) {

    const client = new WebClient(process.env.SLACK_API_TOKEN, {
    // LogLevel can be imported and used to make debugging simpler
    logLevel: LogLevel.DEBUG
    });

    const requestData = await req.json()

    let res ;

    try {
      const response = await sendMessageToChannel(client, requestData.channelName, requestData.message) ;

       // Return the response with a status of 200
        res = new Response(JSON.stringify(response), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    catch(error) {
        res = new Response(JSON.stringify({ msg: "Some error occurred", error: `${error} ,Failed to fetch conversations` }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    // console.log("FINAL RESPONSE", res) ;

    return res ;

    // sendMessageToChannel(client, requestData.channelName, requestData.message)
    // .then((response) => res.status(200).json(response))
    // .catch(error => res.status(500).json({msg:"some error occurred", error: `${error} ,Failed to fetch conversations` }))

}



// Find conversation ID using the conversations.list method
async function findPublicConversation(client, name) {
  try {
    // Call the conversations.list method using the built-in WebClient
    const result = await client.conversations.list({
      // The token you used to initialize your app+
      token: process.env.SLACK_API_TOKEN
    });

    // console.log("\n\nCHANNELS\n\n", result.channels) ;

    for (const channel of result.channels) {
      // console.log(channel.name) ;
      // console.log("Name", name) ;

      if (channel.name === name) {
        // console.log("Channel", channel.name) ;
        const conversationId = channel.id;

        // Print result
        // console.log("\nCHANNEL\n", channel) ;
        // console.log("\nFOUND CONVERSATION ID: \n" + conversationId);

        return conversationId ;
        
      }
    }
  }
  catch (error) {
    // console.log("ERR OCCURRED IN THE FIND CONVO")
    throw error ;
  }
}




// Post a message to a channel your app is in using ID and message text
export async function sendMessageToChannel(client, channelName, message) {
  try {
    // console.log("IN SEND MSG FUNC")
    
    // console.log("CHANNEL NAME REACHED SEND FUNC", channelName) ;

    const fetchedConversationId = await findPublicConversation(client, channelName) ;
    // console.log("\nCONVERSATION ID INSIDE FUNC\n", fetchedConversationId) ;
    

    // Call the chat.postMessage method using the built-in WebClient
    const result = await client.chat.postMessage({
      // The token you used to initialize your app
      token: process.env.SLACK_API_TOKEN,
      channel: fetchedConversationId,
      text: message
      // You could also use a blocks[] array to send richer content
    });

    // Print result, which includes information about the message (like TS)
    // console.log("\nMESSAGE SENT\n", result);
    return result ;
  }
  catch (error) {
    // console.log("ERR OCCURRED IN THE SEND MSG")
    throw error ;
  }
}


