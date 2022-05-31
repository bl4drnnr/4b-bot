def getMostPopularPairs():
    return ["BTC", "ETH", "LTC", "BNB"]


def printPairResult(pair):
    return f"Here you go with <b>{pair['symbol']}</b> pair:\n\n" \
           f"Mark price: <b>{pair['mark_price']}</b>\n" \
           f"Index price: <b>{pair['index_price']}</b>\n\n" \
           f"Purchase price: <b>{pair['bid_price']}</b>\n" \
           f"Selling price: <b>{pair['ask_price']}</b>\n\n" \
           f"The highest price in the last 24 hours: <b>{pair['high_price_24h']}</b>\n" \
           f"Lowest price in the last 24 hours: <b>{pair['low_price_24h']}</b>"


def getAvailableCommands():
    return [
        "/start",
        "/help", 
        "/menu", 
        "/getpair",
        "/buycrypto",
        "/sellcrypto",
        "/exchangecrypto",
        "/generatevoucher",
        "/redeemvoucher",
        "/mywallets",
        "/deposit",
        "/withdrawal",
        "/history"
        ]
