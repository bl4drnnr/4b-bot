import telebot
from decouple import config

bot = telebot.TeleBot(config('BOT_API_KEY'))


@bot.message_handler(commands=['start'])
def start(message):
    bot.send_message(message.chat.id, '<b>Your welcome, let\'s start!</b>', parse_mode='html')


@bot.message_handler(commands=['helpme'])
def helpme(message):
    bot.send_message(message.chat.id, 'What happened? How can I help you?')


@bot.message_handler(commands=['getpair'])
def getpair(message):
    bot.send_message(message.chat.id, 'Ok, what\'s pair you are looking for? (example of format - BTCUSDC)')


bot.polling(none_stop=True)
