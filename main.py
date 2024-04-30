from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/play")
def play():
    m3u8 = request.args.get("m3u8")
    m3u8_2 = request.args.get("m3u8_2")
    # poster = request.args.get("poster")
    return render_template("player.html", m3u8 = m3u8, m3u8_2 = m3u8_2)

if __name__ == "__main__":
    app.run(debug = True, host="0.0.0.0", port=8500)