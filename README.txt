MANUAL FOR GAUCHO RELAY CHAT APPLICATION

BRIEF DESCRIPTION: This is a websocket-based IRC clone applciation for local network chat only. It supports multi-room chat, direct messaging via peer to peer communication and file transfer.

DIRECTORY AND FILE LAYOUT
* server.py - Python Flask server that serves Client UI, handles file uploads
* socketServer.py - Python Websocket Relay Server
* controllerDB.py - Class that handles interaction with the MongoDB database hosted on mLab
* Client.py - Simple class to handle client properties
* requirements.txt - list of pip requirements
* /FILES - Location where files are temporarily stored for file transfer function
* /static/js - Where all of the javascript client code is at
    * direct_messaging.js - Client logic for private messaging 2nd peer
    * direct_messaging_origin - Client logic for private messaging initiator 1st peer
    * peer.js - Client logic for main chat
* /templates
    * direct_messaging.html- Client layout for private messaging 2nd peer
    * direct_messaging_origin.html - Client layout for private messaging initiator 1st peer
    * peer.html - Client layout for main chat


INSTALLATION GUIDE
*For this deliverable there will be no install script, but I will try to detail all of the steps in this section*
*Contact me at gcornejo@ucsb.edu if there are any doubts or questions, thank you*

1. Virtual Environment - Python 3.6
    - For handling multiple projects and requirements effectively, I recommend you install and set up a virtual environemnt.
2. pip install -r requirements.txt
    - This command will install all necessary python packages for this project
3. Network Configuration for Server
    - Run an ifconfig to get the address for your machine that will run the server.
    - You will now need to replace the old IP address listed with your current one in a few different places. This step will be automated or less tedious on the final deliverable.
        - socketServer.py
            - on line 135 change the server address to your machine's
        - peer.js
            - on line 2 change the websocket connection address to your machine's IP address
            - line 24 replace the IP address with yours
            - line 35 replace the IP address with yours
       - server.py
            - line 55 replace the old IP with your machine's
       - direct_messaging_origin.js
            - line 31 replace the IP once again
       - direct_messaging.js
            - line 32 replace the IP with your machines
4. Running the application
    - With two separate terminal windows run two files as such:
        - python socketServer.py
        - python server.py
5. USER MANUAL
    - Once the websocket relay server and the flask server are running, open a browser (ONLY TESTED ON CHROME) and go to http://[yourip]:5000/chat
    - Once you're there, you'll see an input field and a button that says connect
    - type in GRC into the field and click connect, you will be greeted by instructions on how to register and log in
        - note: there are very few catch statements to catch incorrect commands at the moment, try to stick to the correct ones and refresh if you mess up
    - now login with some of the pre-made user login commands below (or make your own following the instructions on the page):
        - /login gustavo pass
        - /login james pass
    - Now that you're logged in, you're in the general lobby room. You now can join other channels, you will have to create them.
        - to create a channel do the following command, replacing channelname with your desired channel name: /createChannel channelname
        - once you create it, you can join with this command (replace channelname with the name of the channel you made: /join channelname
        - Now that you're in a room feel free to chat with by simply typing on the field and clicking send
    - Private Messaging
        - In order to use the private messaging feature you and the person you want to contact need to be in the same channel, excluding the general lobby.
        - In order to see a list of users in the current channel, use the command /list_users
        - To initiate the private messaging p2p protocol, use the command (replace user with the username of your contact): /pm user
        - The recipient will get an alert that says you wish to privately message him/her. You click ok and both the sender and the receiver get a new tab on chrome.
            - The sender and receiver get nearly identical private messaging windows, but the sender will have an extra button that says "connect" click it to connect the two peers
        - Once the two peers are connected each will get the file upload menu to show up in their private messaging window.
        - To simply send messages between the two peers, you simply write in the input text box and click send
    - File Transfer
        - Once you're in a peer to peer private messaging chat window (see Private Messaging for a how to),
          click on choose file, pick a file, then click submit. This will send the file to the other peer and immediately download it or open a window displaying the image/pdf.

6. COMMANDS
    - In the USER MANUAL section I detailed how to use the Gaucho Relay Chat app. Below I will outline all of the current available commands.
      wherever you see brackets [], simply replace the text and side with your text (without the brackets)
        a. /login [username] [password]
            - logs user in, use after connecting to GRC
        b. /register [username] [password]
            - creates a user account so user can now log in, use after connecting to GRC
        c. /createChannel [channel_name]
            - allows logged in user to create a channel in order to chat
        d. /join [channel_name]
            - allows logged in user to join a channel that has been created in order to chat
        e. /list_users
            - lists currently active users in the current room that is not the general lobby
        f. /pm [username]
            - initiates the private messaging protocol
        g. [messsage]
            - this is the bare message you can send without any command when in a channel or in a private messaging window
7. TROUBLESHOOTING & MISCELLANEOUS
    - If at any point it seems the application is not responding to your commands:
        - make sure you're using them correctly and in the right place
        - perhaps you inserted incorrectly causing an error thats not being caught, simply refresh the web page and connect & login again
    - If you want to see the database, contact me and I can give the username and password to my mLab account where it is hosted
    - For most up to date version of the code, the Github is here: https://github.com/Gustavo-Cornejo/Gaucho-Relay-Chat
    - In the peer to peer messaging you'll see a lot of random ids on the screen and in the console, ignore those. 

*IF THERE ARE ANY QUESTIONS OR IF ANYTHING IS UNCLEAR, PLEASE CONTACT ME AT gcornejo@ucsb.edu*









