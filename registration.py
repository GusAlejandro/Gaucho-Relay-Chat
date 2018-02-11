from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return "hello"


if __name__ == '__main__':
    app.run(host='169.231.179.109', port=5000)