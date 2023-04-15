from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    print(" hello workd")
    return {"status": 200}

if __name__ == '__main__':
    app.run(port=5000)

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
