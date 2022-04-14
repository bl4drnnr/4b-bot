import telebot
from telebot import types
from decouple import config

bot = telebot.TeleBot(config('BOT_API_KEY'))


@bot.message_handler(commands=['start'])
def start(message):
    welcomeMessage = f'Your welcome, <u>{message.from_user.first_name}</u>, let\'s start!'
    bot.send_message(message.chat.id, welcomeMessage, parse_mode='html')


@bot.message_handler(commands=['helpme'])
def helpme(message):
    bot.send_message(message.chat.id, 'What happened? How can I help you?')


@bot.message_handler(commands=['getpair'])
def getpair(message):
    getPairMessage = 'Ok, what\'s pair you are looking for?\n\n' \
                     'Here is the list of most popular pairs.\n\n' \
                     'Haven\'t found? Just type pair! (example of format - BTCUSDC)'

    markup = types.ReplyKeyboardMarkup(resize_keyboard=True, row_width=1)
    btcusdt = types.KeyboardButton("BTCUSDT")
    ethusdt = types.KeyboardButton("ETHUSDT")
    ltcusdt = types.KeyboardButton("LTCUSDT")
    markup.add(btcusdt, ethusdt, ltcusdt)
    bot.send_message(message.chat.id, getPairMessage, reply_markup=markup)


bot.polling(none_stop=True)
