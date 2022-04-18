import telebot
from telebot import types
from decouple import config

from services.common import getMostPopularPairs, printPairResult, getAvailableCommands
from api.bybitapi import getPairApi, setAlarmApi, getAllAlarms

bot = telebot.TeleBot(config('BOT_API_KEY'))

commands = getAvailableCommands()


@bot.message_handler(commands=['start', 'help', 'menu'])
def startcmd(message):
    welcomeMessage = f'Welcome, <u>{message.from_user.first_name}</u>, let\'s start!\n\n' \
                     f'What are we gonna do?\n\n' \
                     f'<b><i>Crypto</i></b>\n\n' \
                     f'<a>/getpair</a> - get crypto pair rate (<i>to USDT only, for now</i>)\n' \
                     f'<a>/setalarm</a> - set alarm and get notified when set price is hit\n' \
                     f'<a>/getalarm</a> - get all your alarms\n\n' \
                     f'<b><i>Positions</i></b>\n\n' \
                     f'<a>/commitposition</a> - commit your position to collect data\n' \
                     f'<a>/getpositions</a> - get all your committed positions\n'

    bot.send_message(message.chat.id, welcomeMessage, parse_mode='html')


@bot.message_handler(commands=['setalarm'])
def setalarmcmd(message):
    alarmMessage = "Let's start with setting up alarm.\n\n" \
                   "Provide the crypto you want to observe and price.\n\n" \
                   "Example of format - <b>btc 39165.45</b>"
    markup = types.InlineKeyboardMarkup()
    markup.add(types.InlineKeyboardButton("Menu", callback_data="/menu"))
    markup.add(types.InlineKeyboardButton("Set new alarm", callback_data="/setalarm"), types.InlineKeyboardButton("All alarms", callback_data="/getalarm"))

    bot.send_message(message.chat.id, alarmMessage, parse_mode='html', reply_markup=markup)


@bot.message_handler(commands=['commitposition'])
def commitpositioncmd(message):
    commitPositionMessage = ""
    bot.send_message(message.chat.id, commitPositionMessage)


@bot.message_handler(commands=['getpositions'])
def getpositionscmd(message):
    getPositionMessage = ""
    bot.send_message(message.chat.id, getPositionMessage)


@bot.message_handler(commands=['getalarm'])
def getalarmcmd(message):
    allAlarms = getAllAlarms(message.chat.id)
    allAlarmsMessage = ""
    for alarm in allAlarms:
        allAlarmsMessage += f"<b>Crypto</b> / <b>Price</b> / <i>Created at</i> - <b>{alarm[0]}</b> / <b>{alarm[1]}</b> / <i>{alarm[2]}</i>\n\n"
    bot.send_message(message.chat.id, allAlarmsMessage, parse_mode='html')


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

    bot.send_message(message.chat.id, getPairMessage, reply_markup=markup, parse_mode='html')


@bot.callback_query_handler(func=lambda call: True)
def getpairbtn(call):
    userMessage = call.data

    if userMessage[0] == '/':
        if userMessage == '/menu':
            return startcmd(call.message)
        elif userMessage == '/getpair':
            return getpaircmd(call.message)
        elif userMessage == '/setalarm':
            return setalarmcmd(call.message)
        elif userMessage == '/getalarm':
            return getalarmcmd(call.message)
    else:
        pair = getPairApi(str(userMessage) + str("USDT"))

        markup = types.InlineKeyboardMarkup()
        markup.add(types.InlineKeyboardButton("Menu", callback_data="/menu"), types.InlineKeyboardButton("Get new pair", callback_data="/getpair"))
        if not pair:
            return bot.send_message(call.message.chat.id, "We haven't found that crypto. :(", reply_markup=markup)

        pairMessage = printPairResult(pair)

        bot.send_message(call.message.chat.id, pairMessage, parse_mode='html', reply_markup=markup)


@bot.message_handler(content_types=['text'])
def getpairfuncmessage(message):
    userMessage = message.text.strip().upper()
    markup = types.InlineKeyboardMarkup()
    markup.add(types.InlineKeyboardButton("Menu", callback_data="/menu"))

    if userMessage[0] == '/':
        userMessage = userMessage.lower()
        if userMessage not in commands:
            return bot.send_message(message.chat.id, "Are you sure about this command?\n\nGo to menu to get all possible commands:", reply_markup=markup)

    if len(userMessage.split()) == 2:
        markup.add(types.InlineKeyboardButton("Set new alarm", callback_data="/setalarm"), types.InlineKeyboardButton("All alarms", callback_data="/getalarm"))
        try:
            crypto = str(userMessage.split()[0])
            price = float(userMessage.split()[1])
        except ValueError:
            return bot.send_message(message.chat.id, "Crypto should be a string, and price should be a number!", reply_markup=markup)
        pair = getPairApi(str(crypto) + str("USDT"))
        if not pair:
            return bot.send_message(message.chat.id, "We haven't found that crypto. :(", reply_markup=markup)
        setAlarmApi(pair['symbol'], price, message.chat.id)
        return bot.send_message(message.chat.id, f"Alarm has been set successfully!\n\nWhen <b>{pair['symbol']}</b> hits <b>{price} USDT</b>, we'll notify you.", parse_mode='html', reply_markup=markup)
    else:
        pair = getPairApi(str(userMessage) + str("USDT"))

        markup = types.InlineKeyboardMarkup()
        markup.add(types.InlineKeyboardButton("Menu", callback_data="/menu"), types.InlineKeyboardButton("Get new pair", callback_data="/getpair"))
        if not pair:
            return bot.send_message(message.chat.id, "We haven't found that crypto. :(", reply_markup=markup)

        pairMessage = printPairResult(pair)

        return bot.send_message(message.chat.id, pairMessage, parse_mode='html', reply_markup=markup)


bot.polling(none_stop=True)
