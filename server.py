from flask import Flask, render_template, request, jsonify, send_from_directory
import uuid, os

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


@app.route('/upload', methods=['POST'])
def file_upload():
    """
    Save image locally and generate a random uuid
    :return: uuid name given to the file
    """
    print("HERE")
    file = request.files['file']
    print("NEXT STE{")
    extens = ""
    for char in file.filename:
        if char == ".":
            extens = file.filename[file.filename.find(char):]
            break
    file.filename = str(uuid.uuid4()) + extens
    file.save('FILES/' + file.filename)
    data = {'file-code': file.filename}
    return jsonify(data)



@app.route('/get_file', methods=['GET'])
def file_download():
    """
    Retrieve file and delete it
    :return: Return the file given the uuid
    """
    print("JERE")
    # Need to add file deletion to this step
    args = request.args
    file_name = args['file']
    path = os.path.join(app.root_path, 'FILES')
    return send_from_directory(directory=path, filename=file_name)

@app.route('/')
def keys():
    return render_template('set_keys.html')



if __name__ == '__main__':
    app.run(host='169.231.178.10', port=5000)
