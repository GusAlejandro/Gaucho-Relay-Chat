from pymongo import MongoClient

# file that handles database interaction

class ControllerDB:

    def __init__(self):
        self.mongoClient = MongoClient('mongodb://xxx:xxx@ds225608.mlab.com:25608/gaucho-relay-chat')
        self.database = self.mongoClient['gaucho-relay-chat']
        self.users = self.database.users
        self.channels = self.database.channels

    def register_user(self, username, password):
        user = (
            {
                'username':username,
                'password':password
            }
        )
        self.users.insert_one(user)

    def is_correct_password(self, username, password):
        # TODO: Handle case when the find_one function returns a none type, user['password'] retuns TypeError
        user = self.users.find_one({'username':username})
        if user['password'] == password:
            return True
        else:
            return False

    def username_not_used(self, username):
        # TODO: Handle case when the find_one function returns a none type, user['password'] retuns TypeError
        query = self.users.find({'username':username})
        if query.count() == 0:
            return True
        else:
            return False

    def create_channel(self, channel_name):
        channel = (
            {
                'name':channel_name
            }
        )

