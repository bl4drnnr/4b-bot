import telebot
from telebot import types
from decouple import config

from services.common import getMostPopularPairs, printPairResult, Alarm
from api.bybitapi import getPairApi

bot = telebot.TeleBot(config('BOT_API_KEY'))

alarm_dict = {}


@bot.message_handler(commands=['start', 'help', 'menu'])
def startcmd(message):
    welcomeMessage = f'Your welcome, <u>{message.from_user.first_name}</u>, let\'s start!\n\n' \
                     f'What are we gonna do?\n\n' \
                     f'<b><i>Crypto</i></b>\n\n' \
                     f'<a>/getpair</a> - get crypto pair rate (<i>to USDT only, for now</i>)\n' \
                     f'<a>/setalarm</a> - set alarm and get notified when set price is hit\n' \
                     f'<a>/getalarm</a> - get all your alarms\n\n' \
                     f'<b><i>Positions</i></b>\n\n' \
                     f'<a>/commitposition</a> - commit your position to collect data\n' \
                     f'<a>/getpositions</a> - get all your committed positions\n'
    # TODO Write everything to database but generate api tokens, to restore positions or smth.
    bot.send_message(message.chat.id, welcomeMessage, parse_mode='html')


@bot.message_handler(commands=['setalarm'])
def setalarmcmd(message):
    alarmMessage = "Let's start with setting up alarm.\n\n" \
                   "First of all, provide the pair you want to observe."
    msg = bot.send_message(message.chat.id, alarmMessage)
    bot.register_next_step_handler(msg, setalarmcryptopair)


def setalarmcryptopair(message):
    pair = getPairApi(message.text.strip().upper())

    if not pair:
        return bot.send_message(message.chat.id, "Crypto pair wasn't found, try something else.")

    alarm = Alarm(pair['symbol'])
    alarm_dict[message.chat.id] = alarm

    alarmMessage = f"Okay, looks like we've found <b>{pair['symbol']}</b> pair.\n\n" \
                   f"What about trigger price?"
    msg = bot.send_message(message.chat.id, alarmMessage, parse_mode='html')
    bot.register_next_step_handler(msg, setalarmprice)


def setalarmprice(message):
    try:
        price = float(message.text)
        alarm = alarm_dict[message.chat.id]
        alarm.price = price
    except ValueError:
        return bot.send_message(message.chat.id, "Does it really look like number? Don't think so!")


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
    getAlarmMessage = ""
    bot.send_message(message.chat.id, getAlarmMessage)


@bot.message_handler(commands=['getpair'])
def getpaircmd(message):
    getPairMessage = 'Ok, what\'s pair you are looking for?\n\n' \
                     'Here is the list of most popular pairs.\n\n' \
                     'Haven\'t found? Just type pair! (example of format - BTCUSDT)'

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
    pair = getPairApi(userMessage)

    markup = types.InlineKeyboardMarkup()
    markup.add(types.InlineKeyboardButton("Menu", callback_data="/menu"), types.InlineKeyboardButton("Get new pair", callback_data="/getpair"))
    if not pair:
        return bot.send_message(call.message.chat.id, "Nah, not that, try something else.", parse_mode='html', reply_markup=markup)

    pairMessage = printPairResult(pair)

    bot.send_message(call.message.chat.id, pairMessage, parse_mode='html', reply_markup=markup)


@bot.message_handler(content_types=['text'])
def getpairfuncmessage(message):
    userMessage = message.text.strip().upper()
    pair = getPairApi(userMessage)

    markup = types.InlineKeyboardMarkup()
    markup.add(types.InlineKeyboardButton("Menu", callback_data="/menu"), types.InlineKeyboardButton("Get new pair", callback_data="/getpair"))
    if not pair:
        return bot.send_message(message.chat.id, "Nah, not that, try something else.", parse_mode='html', reply_markup=markup)

    pairMessage = printPairResult(pair)

    bot.send_message(message.chat.id, pairMessage, parse_mode='html', reply_markup=markup)


bot.polling(none_stop=True)
