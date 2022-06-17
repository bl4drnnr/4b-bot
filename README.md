<h1 align="center">
    PCM - Pocket Crypto Market
</h1>

<h3 align="center">
    The whole crypto exchange in your pocket. No KYC/AML. Absolutely anonymous.
</h3>

<p align="center">
    <img src="./logo.png" width="350" hight="350" />
</p>

### ToolBox
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

### Technical description

Telegram bot that has been created using telegram API with Python - `pyTelegramBotAPI`. The communication beteen telegram bot and API has been implemented with `requests` package on bot side and `Express.js` HTTP server by server side (REST API). As database was used `postgresql` and `knex.js` as query builder (communication with database functionality was implemented with `JavaScript`, not `TypeScript`, as the rest of the project). 

### Functional description

There are a couple of functionalities that have been implemented and that allow user to own and manage his own crypto wallets:

- Deposit - user can just deposit crypto on generated wallets
- Withdrawal - user can make withdrawal from his internal wallet to external
- Swap (Exchange) - user can exchange crypto by current rates
- Voucher - user can generate voucher on provided amount with provided crypto and sent it to some other user, then, this voucher can be reedemed and receiver can get crypto on his internal wallet

Those functionalities have been implemented with 2 API's:
- `bybit` API - for getting crypto rates
- `blockchair` API - for updating wallets' amounts

**Bot is absolutely anonymous.**

Unique telegram user ID is crypted with AES256CBC. This function will be replaced with hash later if there is no use for it. In plans was to create alarms for prices, and after price hits trigger, user could receive notification, and for notifing user it was using telegram user ID (or chat ID).
