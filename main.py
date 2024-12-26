import asyncio
from flask import Flask, render_template
from webbrowser import open

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

async def server_run():
    await asyncio.to_thread(app.run, "127.0.0.1", 5000)

async def openBrowser():
    await asyncio.sleep(2)
    open("http://127.0.0.1:5000/",2,True)

async def main():
    await asyncio.gather(
        server_run(),
        openBrowser()
    )

if __name__ == "__main__":
    asyncio.run(main())