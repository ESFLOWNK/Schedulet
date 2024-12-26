from threading import Thread
from time import sleep
from flask import Flask, render_template
from webbrowser import open

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

def openBrowser():
    sleep(2)
    open("http://127.0.0.1:5000/",2,True)

if __name__ == "__main__":
    bo = Thread(target=openBrowser)
    bo.start()

    app.run("127.0.0.1",5000)