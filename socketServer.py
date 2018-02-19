import asyncio
import websockets
from Client import Client
from controllerDB import ControllerDB


class Server:

    def __init__(self, address):
        self.address = address
        self.connected_clients = []
        self.loop = asyncio.get_event_loop()
        self.db = ControllerDB()
        self.rooms = {}

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
        client = Client(websocket)
        response = "Welcome to Gaucho-Relay-Chat, please login with the command '/login [username] [password]' or if you dont have an account register with '/register [username] [password]'"
        await websocket.send(response)
        while True:
            if client.logged_in is not True:
                #means you are not logged in
                # response = "Welcome to Gaucho-Relay-Chat, please login with the command '/login [username] [password]' or if you dont have an account register with '/register [username] [password]'"

                message = await websocket.recv()
                # parse to acknowledge commands
                message = message.split(' ')
                username = message[1]
                password = message[2]
                # print(message)
                if message[0] == '/register':
                    if self.db.username_not_used(username):
                        #username not used so we can register him/her
                        self.db.register_user(username, password)
                        response = "Congratulations, you are now registered as " + username + ". Please login with your new account."
                        await websocket.send(response)
                    else:
                        #username in use, pick another
                        response = "Username is in use, pick another"
                        await websocket.send(response)

                elif message[0] == '/login':
                    if self.db.is_correct_password(username, password):
                        response = "You are now logged in as " + username
                        client.set_registration()
                        client.username = username
                        self.connected_clients.append(client)
                        await websocket.send(response)
                    else:
                        response = "Incorrect password, try again"
                        await websocket.send(response)
                else:
                    response = "You have entered an invalid command, please use /login or /register"
                    await websocket.send(response)

            else:
                # user is logged in so we can begin the session
                # TODO: develop command parser either at client or server
                message = await websocket.recv()
                command = message.split(' ')

                # now we check the first part of message to see what the command is
                # first doing the channel creation

                if command[0] == '/createChannel':
                    #create channel
                    self.rooms[command[1]] = []
                    await websocket.send("You have just created the channel: " + command[1] + ". To join use /join [channel_name]")
                elif command[0] == "/join":
                    try:
                        self.rooms[command[1]].append(client)
                        if client.room == "General":
                            self.connected_clients.remove(client)
                        else:
                            # TODO: Test this works
                            self.rooms[client.room].remove(client)
                        
                        client.set_channel(command[1])
                        await websocket.send("Welcome to the " + command[1] + " channel!")
                    except KeyError:
                        # The room does not exist
                        await websocket.send("The room you are trying to join does not exist, create it with /createChannel [channel_name]")
                else:
                    print(client.username + ": " + message)
                    if client.room == "General":
                        for peer in self.connected_clients:
                            print(peer.username)
                            await peer.socket.send(client.username + ": " + message)
                    else:
                        for peer in self.rooms[client.room]:
                            print(peer.username)
                            await  peer.socket.send(client.username + ": " + message)













        # while client.registered is False:
        #     message = await websocket.recv()
        #     print("< {}".format(message))
        #     await self.registration_handler(message, client)
        #
        #
        # greeting = "You are now registered"
        # await websocket.send(greeting)
        # print("> {}".format(greeting))





    async def parse(self):
        for i in range(1):
            await asyncio.sleep(5)


server = Server('localhost')
server.run_server()










