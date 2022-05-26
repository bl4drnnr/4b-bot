import telebot
import time
from telebot import types
from decouple import config

from common import getMostPopularPairs, printPairResult, getAvailableCommands
from routes import getUserById, createUser, getPair, buyCrypto, sellCrypto, exchangeCrypto, generateVoucher, redeemVoucher, depositCrypto, withdrawalCrypto, getWallets

bot = telebot.TeleBot(config("BOT_API_KEY"))
bot.set_my_commands([
            telebot.types.BotCommand("/menu", "Get list of all commands"),
            telebot.types.BotCommand("/getpair", "Get crypto pair rate"),
            telebot.types.BotCommand("/buycrypto", "Buy crypto for USDT"),
            telebot.types.BotCommand("/sellcrypto", "Sell crypto for USDT"),
            telebot.types.BotCommand("/exchangecrypto", "Crypto-To-Crypto exchange"),
            telebot.types.BotCommand("/myvouchers", "Show all your vouchers"),
            telebot.types.BotCommand("/generatevoucher", "Generate voucher and send it to someone"),
            telebot.types.BotCommand("/redeemvoucher", "Redeem voucher and get crypto on your wallet"),
            telebot.types.BotCommand("/mywallets", "Get amounts of your balances"),
            telebot.types.BotCommand("/deposit", "Deposit crypto"),
            telebot.types.BotCommand("/withdrawal", "Withdrawal crypto")
        ])

commands = getAvailableCommands()


@bot.message_handler(commands=["help", "menu", "start"])
def menucmd(message):
    user = getUserById(message.chat.id)
    if user.get("status") is not None and user["status"] == 0:
        return startcmd(message)

    menuMessage = f"Welcome, <u>{message.chat.first_name}</u>, let's start!\n\n" \
                  f"What are we gonna do?\n\n" \
                  f"<b><i>Crypto</i></b>\n\n" \
                  f"<a>/getpair</a> - get crypto pair rate (<i>to USDT only, for now</i>)\n" \
                  f"<a>/buycrypto</a> - buy crypto for USDT\n" \
                  f"<a>/sellcrypto</a> - sell crypto for USDT\n" \
                  f"<a>/exchangecrypto</a> - Crypto-To-Crypto exchange\n\n" \
                  f"<b><i>Vouchers</i></b>\n\n" \
                  f"<a>/myvouchers</a> - show all your vouchers <b>!DELETE MESSAGE AFTER!</b>\n" \
                  f"<a>/generatevoucher</a> - generate voucher and send it to someone\n" \
                  f"<a>/redeemvoucher</a> - redeem voucher and get crypto on your wallet\n\n" \
                  f"<b><i>Wallets</i></b>\n\n" \
                  f"<a>/mywallets</a> - get amounts of your balances\n" \
                  f"<a>/deposit</a> - Deposit crypto\n" \
                  f"<a>/withdrawal</a> - Withdrawal crypto\n" \

    return bot.send_message(message.chat.id, menuMessage, parse_mode="html")


@bot.message_handler(commands=["getpair"])
def getpaircmd(message):
    getPairMessage = "Ok, what's pair you are looking for?\n\n" \
                     "Here is the list of most popular pairs.\n\n" \
                     "Haven't found? Just type crypto! (Only USDT pair are available)"

    markup = types.ReplyKeyboardMarkup()
    mostPopularPairs = getMostPopularPairs()
    i = 0
    while i != len(mostPopularPairs):
        markup.add(
            types.InlineKeyboardButton(mostPopularPairs[i]),
            types.InlineKeyboardButton(mostPopularPairs[i + 1])
        )
        i += 2
    markup.add(types.InlineKeyboardButton("- Menu"))

    return bot.send_message(message.chat.id, getPairMessage, reply_markup=markup, parse_mode="html")


@bot.message_handler(commands=["buycrypto"])
def buycryptocmd(message):
    buyCryptoMessage = "Buy cryptocurrencies for <i>USDT</i>\n\n"

    markup = types.ReplyKeyboardMarkup()
    return bot.send_message(message.chat.id, buyCryptoMessage, reply_markup=markup, parse_mode="html")


@bot.message_handler(commands=["sellcrypto"])
def sellcryptocmd(message):
    sellCryptoMessage = "Sell cryptocurrencies for <i>USDT</i>\n\n"

    markup = types.ReplyKeyboardMarkup()
    return bot.send_message(message.chat.id, sellCryptoMessage, reply_markup=markup, parse_mode="html")


@bot.message_handler(commands=["exchangecrypto"])
def exchangecryptocmd(message):
    exchangeCryptoMessage = "Pick pair to exchange cryptocurrencies\n\n"

    markup = types.ReplyKeyboardMarkup()
    return bot.send_message(message.chat.id, exchangeCryptoMessage, reply_markup=markup, parse_mode="html")


@bot.message_handler(commands=["generatevoucher"])
def generatevouchercmd(message):
    generateVoucherMessage = ""
    
    markup = types.ReplyKeyboardMarkup()
    return bot.send_message(message.chat.id, generateVoucherMessage, reply_markup=markup, parse_mode="html")


@bot.message_handler(commands=["redeemvoucher"])
def redeemvouchercmd(message):
    redeemVoucherMessage = ""

    markup = types.ReplyKeyboardMarkup()
    return bot.send_message(message.chat.id, redeemVoucherMessage, reply_markup=markup, parse_mode="html")


@bot.message_handler(commands=["myvouchers"])
def myvoucherscmd(message):
    myVouchersMessage = ""

    markup = types.ReplyKeyboardMarkup()
    return bot.send_message(message.chat.id, myVouchersMessage, reply_markup=markup, parse_mode="html")


@bot.message_handler(commands=["mywallets"])
def mywalletscmd(message):
    myWalletsMessage = ""
    wallets = getWallets(message.chat.id)

    for wallet in wallets:
        myWalletsMessage += f"{wallet['wallet']} - {wallet['amount']}\n"

    markup = types.ReplyKeyboardMarkup()
    return bot.send_message(message.chat.id, myWalletsMessage, reply_markup=markup, parse_mode="html")


@bot.message_handler(commands=["deposit"])
def depositcmd(message):
    depositMessage = ""

    markup = types.ReplyKeyboardMarkup()
    return bot.send_message(message.chat.id, depositMessage, reply_markup=markup, parse_mode="html")


@bot.message_handler(commands=["withdrawal"])
def withdrawalcmd(message):
    withdrawalMessage = ""

    markup = types.ReplyKeyboardMarkup()
    return bot.send_message(message.chat.id, withdrawalMessage, reply_markup=markup, parse_mode="html")


@bot.callback_query_handler(func=lambda call: True)
def commandshandlebtn(call):
    userMessage = call.data

    # Commands by buttons click
    if len(userMessage.split()) == 2 and userMessage.split()[1] == "create":
        # Creating new user
        createdUser = createUser({"userid": userMessage.split()[0]})
        if createdUser["status"] == 1:
            return menucmd(call.message)
        else:
            return defaulterrormessage(call.message)


@bot.message_handler(content_types=["text"])
def manualhandlermessage(message):
    userMessage = message.text.strip().upper()
    markup = types.ReplyKeyboardMarkup()
    markup.add(types.InlineKeyboardButton("- Menu"))

    if userMessage[0] == "/":
        # Manual commands handler
        userMessage = userMessage.lower()
        if userMessage not in commands:
            userMessage = "/menu"
            return bot.send_message(message.chat.id, "Are you sure about this command?\n\nSee menu to get all possible commands", reply_markup=markup)
    elif userMessage[0] == "-":
        executecommand(message)
    else:
        # Looking for pair
        pair = getPair(str(userMessage) + str("USDT"))

        markup = types.ReplyKeyboardMarkup()
        markup.add(types.InlineKeyboardButton("- Menu"), types.InlineKeyboardButton("- Get pair"))
        if pair.get("status") is not None:
            return bot.send_message(message.chat.id, "We haven't found that crypto. :(", reply_markup=markup)

        pairMessage = printPairResult(pair)

        return bot.send_message(message.chat.id, pairMessage, parse_mode="html", reply_markup=markup)


def startcmd(message):
    # New user start message
    startMessage = f"Hello there, <b><i>{message.from_user.first_name}</i></b>!\n" \
                   f"Welcome to PCM - P2P cryptoexchange in your pocket.\n\n" \
                   f"+ No KYC/AML. Absolutely anonymous!\n" \
                   f"+ Availability of buying and selling crypto for USDT \n" \
                   f"+ State fee for all operations (0,00004 BTC)"

    initData = f"{str(message.from_user.id)} create"

    markup = types.InlineKeyboardMarkup()
    markup.add(types.InlineKeyboardButton("Let's start", callback_data=initData))
    return bot.send_message(message.chat.id, startMessage, parse_mode="html", reply_markup=markup)


def defaulterrormessage(chatid):
    errorMessage = "<b><i>Something went wrong! Maybe you should try again?</i></b>"
    markup = types.ReplyKeyboardMarkup()
    markup.add(types.InlineKeyboardButton("- Menu"))
    return bot.send_message(chatid, errorMessage, parse_mode="html")


def executecommand(message):
    if message.text.lower().split("- ")[1] == "get pair":
        return getpaircmd(message)
    elif message.text.lower().split("- ")[1] == "menu":
        return menucmd(message)
    else:
        return menucmd(message)    


if __name__ == "__main__":
    try:
        bot.polling(none_stop=True)
    except Exception as e:
        print(e)
        time.sleep(15)
