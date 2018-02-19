class Client:

    def __init__(self, websocket):
        self.logged_in = False
        self.socket = websocket
        self.username = None
        self.room = "General"

    def set_registration(self):
        self.logged_in = True

    def set_channel(self, channel_name):
        self.room = channel_name