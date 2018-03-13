class Client:

    def __init__(self, websocket):
        self.logged_in = False
        self.socket = websocket
        self.username = None
        self.room = "General"
        self.public_key = None

    def set_registration(self):
        self.logged_in = True

    def set_channel(self, channel_name):
        self.room = channel_name

    def set_public_key(self, key):
        self.public_key = key