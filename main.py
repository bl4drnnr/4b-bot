import telebot
from decouple import config

bot = telebot.TeleBot(config('BOT_API_KEY'))
