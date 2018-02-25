from flask import Flask, render_template
# from flask_socketio import SocketIO, send, emit, join_room, leave_room

app = Flask(__name__)


@app.route('/chat')
def index():
    return render_template('peer.html')


@app.route('/direct_message/<user_id>')
def pm(user_id):
    return render_template('direct_message.html', peerid=user_id)


@app.route("/direct_message_origin/<user_id>")
def pm_origin(user_id):
    return render_template('direct_message_origin.html', id_to_connect_to=user_id)

@app.route("/sample")
def sample():
    return render_template('sample.html')

if __name__ == '__main__':
    app.run(host='169.231.179.243', port=5000)
