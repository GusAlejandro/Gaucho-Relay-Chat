class Client:

    def __init__(self, websocket):
        self.logged_in = False
        self.socket = websocket
        self.username = None

    def set_registration(self):
        self.logged_in = True
