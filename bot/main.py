import telebot
import time
from telebot import types
from decouple import config

from common import getMostPopularPairs, printPairResult, getAvailableCommands
from routes import getUserAlarmsById, createAlarm, getUserById, createUser, getUserPositionsById, createPosition, getPair

bot = telebot.TeleBot(config('BOT_API_KEY'))

commands = getAvailableCommands()


@bot.message_handler(commands=['help', 'menu', 'start'])
def menucmd(message):
    user = getUserById(message.chat.id)
    if user.get('status') is not None and user['status'] == 0:
        return startcmd(message)

    menuMessage = f'Welcome, <u>{message.chat.first_name}</u>, let\'s start!\n\n' \
                  f'What are we gonna do?\n\n' \
                  f'<b><i>Crypto</i></b>\n\n' \
                  f'<a>/getpair</a> - get crypto pair rate (<i>to USDT only, for now</i>)\n' \
                  f'<a>/setalarm</a> - set alarm and get notified when set price is hit\n' \
                  f'<a>/getalarm</a> - get all your alarms\n\n' \
                  f'<b><i>Positions</i></b>\n\n' \
                  f'<a>/commitposition</a> - commit your position to collect data\n' \
                  f'<a>/getpositions</a> - get all your committed positions\n'

    return bot.send_message(message.chat.id, menuMessage, parse_mode='html')


@bot.message_handler(commands=['setalarm'])
def setalarmcmd(message):
    alarmMessage = "Let's start with setting up alarm.\n\n" \
                   "Provide the crypto you want to observe and price.\n\n" \
                   "Example of format - <b>btc 39165.45</b>"
    markup = types.InlineKeyboardMarkup()
    markup.add(types.InlineKeyboardButton("Menu", callback_data="/menu"))
    markup.add(types.InlineKeyboardButton("Set new alarm", callback_data="/setalarm"), types.InlineKeyboardButton("All alarms", callback_data="/getalarm"))

    return bot.send_message(message.chat.id, alarmMessage, parse_mode='html', reply_markup=markup)


@bot.message_handler(commands=['commitposition'])
def commitpositioncmd(message):
    commitPositionMessage = "Ready to commit your position?"
    return bot.send_message(message.chat.id, commitPositionMessage)


@bot.message_handler(commands=['getpositions'])
def getpositionscmd(message):
    allPositions = getUserPositionsById(message.chat.id)
    allPositionsMessage = ""

    markup = types.InlineKeyboardMarkup()
    markup.add(types.InlineKeyboardButton("Menu", callback_data="/menu"))

    for position in allPositions:
        allPositionsMessage += ""
    return bot.send_message(message.chat.id, allPositionsMessage, parse_mode='html', reply_markup=markup)


@bot.message_handler(commands=['getalarm'])
def getalarmcmd(message):
    markup = types.InlineKeyboardMarkup()
    markup.add(
        types.InlineKeyboardButton("Menu", callback_data="/menu"),
        types.InlineKeyboardButton("Set alarm", callback_data="/setalarm"),
    )

    allAlarms = getUserAlarmsById(message.chat.id)
    allAlarms = allAlarms['allAlarms']
    
    if len(allAlarms) == 0:
        return bot.send_message(message.chat.id, "<b>You have no alarms! Wanna set one?</b>", parse_mode='html', reply_markup=markup)
    allAlarmsMessage = ""

    for alarm in allAlarms:
        allAlarmsMessage += f"<b>Crypto</b> / <u>Price</u> / <i>Created at</i> - <b>{alarm['pair']}</b> / <u>{alarm['triggerprice']}</u> / <i>{alarm['createdat']}</i>\n\n"
    return bot.send_message(message.chat.id, allAlarmsMessage, parse_mode='html', reply_markup=markup)


@bot.message_handler(commands=['getpair'])
def getpaircmd(message):
    getPairMessage = 'Ok, what\'s pair you are looking for?\n\n' \
                     'Here is the list of most popular pairs.\n\n' \
                     'Haven\'t found? Just type crypto! (Only USDT pair are available)'

    markup = types.InlineKeyboardMarkup()
    mostPopularPairs = getMostPopularPairs()
    i = 0
    while i != len(mostPopularPairs):
        markup.add(
            types.InlineKeyboardButton(mostPopularPairs[i], callback_data=mostPopularPairs[i]),
            types.InlineKeyboardButton(mostPopularPairs[i + 1], callback_data=mostPopularPairs[i + 1])
        )
        i += 2
    markup.add(types.InlineKeyboardButton("Menu", callback_data="/menu"))

    return bot.send_message(message.chat.id, getPairMessage, reply_markup=markup, parse_mode='html')


@bot.callback_query_handler(func=lambda call: True)
def commandshandlebtn(call):
    userMessage = call.data

    # Commands by buttons click
    if userMessage[0] == '/':
        if userMessage == '/menu':
            return menucmd(call.message)
        elif userMessage == '/getpair':
            return getpaircmd(call.message)
        elif userMessage == '/setalarm':
            return setalarmcmd(call.message)
        elif userMessage == '/getalarm':
            return getalarmcmd(call.message)
    elif len(userMessage.split()) == 2 and userMessage.split()[1] == "create":
        # Creating new user
        createdUser = createUser({'userid': userMessage.split()[0]})
        if createdUser['status'] == 1:
            return menucmd(call.message)
        else:
            return defaulterrormessage(call.message)
    else:
        # Looking for pair
        pair = getPair(str(userMessage) + str("USDT"))

        markup = types.InlineKeyboardMarkup()
        markup.add(types.InlineKeyboardButton("Menu", callback_data="/menu"), types.InlineKeyboardButton("Get new pair", callback_data="/getpair"))
        if not pair:
            return bot.send_message(call.message.chat.id, "We haven't found that crypto. :(", reply_markup=markup)

        pairMessage = printPairResult(pair)

        return bot.send_message(call.message.chat.id, pairMessage, parse_mode='html', reply_markup=markup)


@bot.message_handler(content_types=['text'])
def manualhandlermessage(message):
    userMessage = message.text.strip().upper()
    markup = types.InlineKeyboardMarkup()
    markup.add(types.InlineKeyboardButton("Menu", callback_data="/menu"))

    if userMessage[0] == '/':
        # Manual commands handler
        userMessage = userMessage.lower()
        if userMessage not in commands:
            return bot.send_message(message.chat.id, "Are you sure about this command?\n\nGo to menu to get all possible commands:", reply_markup=markup)

    if len(userMessage.split()) == 2:
        # Setting new alarms
        markup.add(types.InlineKeyboardButton("Set new alarm", callback_data="/setalarm"), types.InlineKeyboardButton("All alarms", callback_data="/getalarm"))
        try:
            crypto = str(userMessage.split()[0])
            # Trigger price
            triggerPrice = float(userMessage.split()[1])
        except ValueError:
            return bot.send_message(message.chat.id, "Crypto should be a string, and price should be a number!", reply_markup=markup)
        pair = getPair(str(crypto) + str("USDT"))
        if not pair:
            return bot.send_message(message.chat.id, "We haven't found that crypto. :(", reply_markup=markup)
        createdAlarm = createAlarm({
            'userid': message.chat.id,
            'pair': pair['symbol'],
            'triggerprice': triggerPrice,
            'indexprice': pair['index_price']
        })

        if createdAlarm['status'] == 1:
            return bot.send_message(message.chat.id, f"Alarm has been set successfully!\n\nWhen <b>{pair['symbol']}</b> hits <b>{triggerPrice} USDT</b>, we'll notify you.", parse_mode='html', reply_markup=markup)
        else:
            return defaulterrormessage(call.message)
    else:
        # Looking for pair
        pair = getPair(str(userMessage) + str("USDT"))

        markup = types.InlineKeyboardMarkup()
        markup.add(types.InlineKeyboardButton("Menu", callback_data="/menu"), types.InlineKeyboardButton("Get new pair", callback_data="/getpair"))
        if not pair:
            return bot.send_message(message.chat.id, "We haven't found that crypto. :(", reply_markup=markup)

        pairMessage = printPairResult(pair)

        return bot.send_message(message.chat.id, pairMessage, parse_mode='html', reply_markup=markup)


def startcmd(message):
    # New user start message
    startMessage = f"Hello, <b><i>{message.from_user.first_name}</i></b>, you are probably new one here?\n\n" \
                   f"Lemme explain what you can do with this bot and how it use. The idea of this bot is to become your personal crypto diary." \
                   f"Here you can find such functionality as <b>alarms</b>, <b>getting pairs</b> in one click and even personal <i><u>personal AI</u></i>.\n\n" \
                   f"About last one let's talk a little bit more... \n\n" \
                   f"If I was able to impress you, you know what to press!"

    initData = f"{str(message.from_user.id)} create"

    markup = types.InlineKeyboardMarkup()
    markup.add(types.InlineKeyboardButton("Let's start", callback_data=initData))
    return bot.send_message(message.chat.id, startMessage, parse_mode='html', reply_markup=markup)


def notifyuserwithtriggeredalarms(chatid, alarm):
    alarmMessage = "<b>Watch out!</b>\n\nYour alarm has been triggered!"
    return bot.send_message(chatid, alarmMessage, parse_mode='html')


def defaulterrormessage(chatid):
    errorMessage = "<b><i>Something went wrong! Maybe you should try again?</i></b>"
    markup = types.InlineKeyboardMarkup()
    markup.add(types.InlineKeyboardButton("Menu", callback_data='/menu'))
    return bot.send_message(chatid, errorMessage, parse_mode='html')


if __name__ == '__main__':
    try:
        bot.polling(none_stop=True)
    except Exception as e:
        print(e)
        time.sleep(15)
