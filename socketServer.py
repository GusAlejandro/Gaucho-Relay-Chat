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
                # await websocket.send(response)
                message = await websocket.recv()
                # parse to acknowledge commands
                message = message.split(' ')
                username = message[1]
                password = message[2]
                print(message)
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
                #user is logged in so we can begin the session
                message = await websocket.recv()
                print(client.username + ": " + message)
                for peer in self.connected_clients:
                    print(peer.username)
                    await peer.socket.send(message)









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










