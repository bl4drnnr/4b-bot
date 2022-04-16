import telebot
from telebot import types
from decouple import config

from common import getMostPopularPairs, printPairResult
from bybitapi import getPairApi, setAlarmApi

bot = telebot.TeleBot(config('BOT_API_KEY'))


@bot.message_handler(commands=['start', 'help', 'menu'])
def startcmd(message):
    welcomeMessage = f'Your welcome, <u>{message.from_user.first_name}</u>, let\'s start!\n\n' \
                     f'What are we gonna do?\n\n' \
                     f'<b><i>Crypto</i></b>\n\n' \
                     f'<a>/getpair</a> - get crypto pair rate (<i>to USDT only, for now</i>)\n' \
                     f'<a>/setalarm</a> - set alarm and get notified when set price is hit\n\n' \
                     f'<b><i>Positions</i></b>\n\n' \
                     f'<a>/commitposition</a> - commit your position to collect data\n'
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

    alarmMessage = f"Okay, looks like we've found <b>{pair['symbol']}</b> pair.\n\n" \
                   f"What about trigger price?"
    msg = bot.send_message(message.chat.id, alarmMessage, parse_mode='html')
    bot.register_next_step_handler(msg, setalarmprice)


def setalarmprice(message):
    try:
        price = float(message.text)
    except ValueError:
        return bot.send_message(message.chat.id, "Does it look like number? Really?")


@bot.message_handler(commands=['commitposition'])
def commitpositioncmd(message):
    bot.send_message(message.chat.id, "")


@bot.message_handler(commands=['getpair'])
def getpaircmd(message):
    getPairMessage = 'Ok, what\'s pair you are looking for?\n\n' \
                     'Here is the list of most popular pairs.\n\n' \
                     'Haven\'t found? Just type pair! (example of format - BTCUSDT)\n\n' \
                     '<a>/menu</a>'

    markup = types.InlineKeyboardMarkup()
    mostPopularPairs = getMostPopularPairs()
    i = 0
    while i != len(mostPopularPairs):
        markup.add(
            types.InlineKeyboardButton(mostPopularPairs[i], callback_data=mostPopularPairs[i]),
            types.InlineKeyboardButton(mostPopularPairs[i + 1], callback_data=mostPopularPairs[i + 1])
        )
        i += 2

    bot.send_message(message.chat.id, getPairMessage, reply_markup=markup, parse_mode='html')


@bot.callback_query_handler(func=lambda call: True)
def getpairbtn(call):
    userMessage = call.data
    pair = getPairApi(userMessage)
    if not pair:
        return bot.send_message(call.message.chat.id, "Nah, not that, try something else.\n\n"
                                                      "<a>/menu</a>", parse_mode='html')

    pairResult = printPairResult(pair)

    bot.send_message(call.message.chat.id, pairResult, parse_mode='html')


@bot.message_handler(content_types=['text'])
def getpairfuncmessage(message):
    userMessage = message.text.strip().upper()
    pair = getPairApi(userMessage)
    if not pair:
        return bot.send_message(message.chat.id, "Nah, not that, try something else.\n\n"
                                                 "<a>/menu</a>", parse_mode='html')

    pairResult = printPairResult(pair)

    bot.send_message(message.chat.id, pairResult, parse_mode='html')


bot.polling(none_stop=True)
