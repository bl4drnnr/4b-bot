import telebot
from decouple import config

bot = telebot.TeleBot(config('BOT_API_KEY'))


@bot.message_handler(commands=['start'])
def start(message):
    welcomeMessage = f'<b>Your welcome, <u>{message.from_user.first_name}</u>, let\'s start!</b>'
    bot.send_message(message.chat.id, welcomeMessage, parse_mode='html')


@bot.message_handler(commands=['helpme'])
def helpme(message):
    bot.send_message(message.chat.id, 'What happened? How can I help you?')


@bot.message_handler(commands=['getpair'])
def getpair(message):
    bot.send_message(message.chat.id, 'Ok, what\'s pair you are looking for? (example of format - BTCUSDC)')


bot.polling(none_stop=True)
