import asyncio
import websockets

async def hello():
    async with websockets.connect('ws://localhost:8765') as websocket:
        greeting = await websocket.recv()
        print("< {}".format(greeting))
        name = input(">")
        await websocket.send(name)
        # print("> {}".format(name))
        greeting = await websocket.recv()
        print("< {}".format(greeting))

        while True:
            name = input(">")
            await websocket.send(name)
            # first we need to register the user

            #print("> {}".format(name))
            greeting = await websocket.recv()
            print("< {}".format(greeting))




asyncio.get_event_loop().run_until_complete(hello())
