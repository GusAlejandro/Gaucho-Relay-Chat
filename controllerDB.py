from pymongo import MongoClient


class ControllerDB:

    def __init__(self):
        self.mongoClient = MongoClient('mongodb://xx:xx@ds225608.mlab.com:25608/gaucho-relay-chat')
        self.database = self.mongoClient['gaucho-relay-chat']
        self.users = self.database.users

    def register_user(self, username, password):
        user = (
            {
                'username':username,
                'password':password
            }
        )
        self.users.insert_one(user)

    def is_correct_password(self, username, password):
        user = self.users.find_one({'username':username})
        if user['password'] == password:
            return True
        else:
            return False

    def username_not_used(self, username):
        query = self.users.find({'username':username})
        if query.count() == 0:
            return True
        else:
            return False


