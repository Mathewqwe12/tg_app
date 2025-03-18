import os
from dotenv import load_dotenv

# Загружаем переменные окружения из .env файла
load_dotenv()

# Токен бота
BOT_TOKEN = os.getenv('BOT_TOKEN', '7364226532:AAH8YmUtoB-PmKLI1DcLUTRx2CRPakw7dzw')

# URL веб-приложения - ОБНОВИТЕ ЭТОТ URL НА НОВЫЙ ИЗ NGROK (см. http://127.0.0.1:4040)
WEBAPP_URL = os.getenv('WEBAPP_URL', 'https://6e92-84-17-55-151.ngrok-free.app/')

# Настройки сервера
HOST = os.getenv('HOST', '0.0.0.0')
PORT = int(os.getenv('PORT', 8443))

# Секретный ключ для Flask
SECRET_KEY = os.getenv('SECRET_KEY', 'ваш_секретный_ключ_здесь') 