from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit, join_room, leave_room

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'
socketio = SocketIO(app)


@socketio.on('register')
def handle_registration(username):
    print(username)
    #need to register username to IP address somehow
    emit('register', {'data': 'You are now registered as user: ' + username, 'username': username}, broadcast=False)

@socketio.on('connected')
def handle_connection(data):
    emit('message','Welcome to Gaucho Relay Chat, register your username please with: /register [username]', broadcast=False)

@socketio.on('message')
def handle_message_event(msg):
    print(msg)
    print(type(msg))
    emit('message', msg['username'] + ": " + msg['data'], broadcast=True)

@socketio.on('join')
def on_join(data):
    pass

@app.route('/chat')
def index():
    return render_template('client.html')


if __name__ == '__main__':
    socketio.run(app, host='169.231.179.109', port=5000)
    app.run(host='169.231.179.109', port=5000)