from flask import Flask, request

app = Flask(__name__)

@app.route('', methods=['POST'])
def updateCryptocurrencyRates(data):
    return