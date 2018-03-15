import asyncio
import websockets
from Client import Client
from controllerDB import ControllerDB
import uuid
from Security import Security
# TODO: At some point refactor to send messages of type event class for better handling on server and client


class Server:

    def __init__(self, address):
        self.address = address
        self.connected_clients = []
        self.loop = asyncio.get_event_loop()
        self.db = ControllerDB()
        self.rooms = {}
        self.sec = Security()

    def run_server(self):
        start_server = websockets.serve(self.user_registration_handler, self.address, 8765)
        self.loop.run_until_complete(start_server)
        self.loop.run_forever()

    async def registration_handler(self, message, client):
        if message == "/register gus":
            client.set_registration()
        else:
            pass

    async def user_registration_handler(self, websocket, path):
        # main command parser fore relay websocket server
        client = Client(websocket)
        response = "Welcome to Gaucho-Relay-Chat, please login with the command '/login [username] [password]' or if you dont have an account register with '/register [username] [password]'"
        response = self.sec.message_outbound(response, self.sec.general_symm_key)
        await websocket.send(response)
        while True:
            # loop that handles user login/registration/authentication
            if client.logged_in is not True:
                # TODO: Encrypt outbound and decrypt inbound messages
                message = await websocket.recv()
                message = self.sec.message_inbound(message, self.sec.general_symm_key)
                # parse to acknowledge commands
                message = message.split(' ')
                username = message[1]
                # TODO: Catch error if not enough arguments or if invalid command
                password = message[2]
                # print(message)
                if message[0] == '/register':
                    if self.db.username_not_used(username):
                        #username not used so we can register him/her
                        self.db.register_user(username, password)
                        response = "Congratulations, you are now registered as " + username + ". Please login with your new account."
                        response = self.sec.message_outbound(response, self.sec.general_symm_key)
                        await websocket.send(response)
                    else:
                        #username in use, pick another
                        response = "Username is in use, pick another"
                        response = self.sec.message_outbound(response, self.sec.general_symm_key)
                        await websocket.send(response)

                elif message[0] == '/login':
                    if self.db.is_correct_password(username, password):
                        response = "You are now logged in as " + username
                        response = self.sec.message_outbound(response, self.sec.general_symm_key)

                        client.set_registration()
                        client.username = username
                        self.connected_clients.append(client)
                        await websocket.send(response)
                    else:
                        response = "Incorrect password, try again"
                        response = self.sec.message_outbound(response, self.sec.general_symm_key)
                        await websocket.send(response)
                else:
                    response = "You have entered an invalid command, please use /login or /register"
                    response = self.sec.message_outbound(response, self.sec.general_symm_key)
                    await websocket.send(response)

            else:
                # TODO: Encrypt outboynd and decrypt inbound and do message auth check 
                # user is logged in so we can begin the session
                message = await websocket.recv()
                message = self.sec.message_inbound(message, self.sec.general_symm_key)
                if message == "Message has been corrupted":
                    await websocket.send(message)
                else:

                    command = message.split(' ')

                    # now we check the first part of message to see what the command is
                    # first doing the channel creation

                    if command[0] == '/createchannel':
                        # create channel
                        self.rooms[command[1]] = []
                        word = "You have just created the channel: " + command[1] + ". To join use /join [channel_name]"
                        word = self.sec.message_outbound(word, self.sec.general_symm_key)
                        await websocket.send(word)
                    elif command[0] == "/join":

                        try:
                            self.rooms[command[1]].append(client)
                            if client.room == "General":
                                self.connected_clients.remove(client)
                            else:

                                self.rooms[client.room].remove(client)

                            client.set_channel(command[1])
                            wo = "Welcome to the " + command[1] + " channel!"
                            wo = self.sec.message_outbound(wo, self.sec.general_symm_key)
                            await websocket.send(wo)
                        except KeyError:
                            # The room does not exist
                            palabra = "The room you are trying to join does not exist, create it with /createChannel [channel_name]"
                            palabra = self.sec.message_outbound(palabra, self.sec.general_symm_key)
                            await websocket.send(palabra)
                    elif command[0] == '/list_users':
                        # lists current online users of the current room
                        # TODO: users who disconnect are still in list, need way to catch their disconnect remove existence
                        if client.room != 'General':
                            # TODO: change iteration to be on the room's users list
                            users = ""
                            for peer in self.rooms[client.room]:
                                users = users + " " + peer.username
                            y = "Current Online Users in Room: "+ users
                            y = self.sec.message_outbound(y, self.sec.general_symm_key)
                            await websocket.send(y)
                    elif command[0] == "/pm":
                        # initiates private message protocol
                        target_user = command[1]
                        peer_id = str(uuid.uuid4().int)
                        if client.room != 'General':
                            for peer in self.rooms[client.room]:
                                #print(peer.username)
                                if peer.username == target_user:
                                    print("helllloooo")
                                    x = "pm-request" + " " + peer_id + " " + client.username + " is trying to PRIVATE MESSAGE YOU. Click confirm to accept"
                                    x = self.sec.message_outbound(x, self.sec.general_symm_key)
                                    await peer.socket.send(x)
                    elif command[0] == "/accept":
                        target_user = command[1]
                        id_to_connect_to = command[2]
                        peer_id = str(uuid.uuid4().int)
                        if client.room != 'General':
                            for peer in self.rooms[client.room]:
                                if peer.username == target_user:
                                    y = "pm-acceptance" + " " + id_to_connect_to + " " + client.username + " has accepted your request for direct message"
                                    y = self.sec.message_outbound(y, self.sec.general_symm_key)
                                    await peer.socket.send(y)
                    else:
                        # relays message to everyone connected to a given room
                        print(client.username + ": " + message)
                        if client.room == "General":
                            for peer in self.connected_clients:
                                print(peer.username)
                                x = client.username + ": " + message
                                x = self.sec.message_outbound(x, self.sec.general_symm_key)
                                await peer.socket.send(x)
                        else:
                            for peer in self.rooms[client.room]:
                                print(peer.username)
                                x = client.username + ": " + message
                                x = self.sec.message_outbound(x, self.sec.general_symm_key)
                                await  peer.socket.send(x)


server = Server('169.231.178.10')
server.run_server()










