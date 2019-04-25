const chalk       = require('chalk')
const ora         = require('ora')
const moment      = require('moment')
const _           = require('lodash')
const numeral     = require('numeral')
const clear       = require('clear')
const figlet      = require('figlet')
const Configstore = require('configstore')
const binance     = require('binance-api-node').default
const inquirer    = require("inquirer")
const setTitle    = require('node-bash-title')

let valid = false;

const TelegramBot = require('node-telegram-bot-api');
const keyboard = require('./components/keyboard')
const keyboard_btn = require('./components/keyboard_btn')

const APIK = 'yVqZ2tnXmDgkNLdegDkFbf2dYO29HOCoSDhNBPqx1lVMV0oZIFyc5n8sZCEziG2f'
const APIS = 'Ll7GjEMGmHhVXQKvThJQVNEjOkD9HFnlsD0q9H4MUJtOGnSSCUsFVJ4SYdnetrzi'


const report = ora(chalk.grey('Starting the trade...'))

let pnl = 0
let step = 0
let trade_count = 0
let order_id = 0
let buy_price = 0.00
let bid_price = 0.00
let ask_price = 0.00
let switch_price  = 0.00
let stop_price = 0.00
let loss_price = 0.00
let sell_price = 0.00
let buy_amount = 0.00
let stepSize = 0
let tickSize = 8
let tot_cancel = 0
let pair = ""
let buying_method = ""
let selling_method = ""
let init_buy_filled = false

const TOKEN = '749116727:AAHSyq91mnxBaPNVzZrIP1D_nR_H59rBQZA';
  
const bot = new TelegramBot(TOKEN, {polling: true})
const chat_id = '219450393';

const client = binance({apiKey: APIK, apiSecret: APIS, useServerTime: true})
const conf = new Configstore('b_conf')
let base_currency = conf.get('b_conf.base_currency')?conf.get('b_conf.base_currency'):"USDT"
let budget = conf.get('b_conf.budget')?parseFloat(conf.get('b_conf.budget')):10.10
let fixed_buy_price = conf.get('b_conf.fixed_buy_price')?parseFloat(conf.get('b_conf.fixed_buy_price')):0.00
let currency_to_buy = conf.get('b_conf.currency_to_buy')?conf.get('b_conf.currency_to_buy'):"BTC"
let profit_pourcent = conf.get('b_conf.profit_pourcent')?conf.get('b_conf.profit_pourcent'):0.80
let loss_pourcent = conf.get('b_conf.loss_pourcent')?conf.get('b_conf.loss_pourcent'):0.40
let trailing_pourcent = conf.get('b_conf.trailing_pourcent')?conf.get('b_conf.trailing_pourcent'):0.40

clear() 
console.log('')
console.log(chalk.gray(' - - - - - - - - - - - '))
console.log(chalk.green(`!Badrobo 🤖  Activated!`))
console.log(chalk.gray(' - - - - - - - - - - - '))
console.log('');

let buy_request = [
  {
  type: 'input',
  name: 'base_currency',
  message: 'Base-Currency (USDT, BTC, BNB, ETH)',
  default: base_currency, 
  validate: (value) => {
    let valid  = ((value.toUpperCase()==='BTC')||(value.toUpperCase()==='USDT')||(value.toUpperCase()==='ETH')||(value.toUpperCase()==='BNB'))
    // return valid || 'Currency not valid, please chose between USDT, BTC, BNB, ETH'
    return valid
    },
  },
  {
    type: 'input',
    name: 'budget',
    default: budget,
    message: 'Treade budget (in base currency)(total value. > 14 USDT)',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value)) && (value>0)
      return valid || 'Please enter a number superior than 0'
    },
    filter: Number
  },
  {
    type: 'input',
    name: 'currency_to_buy',
    message: 'What currency would you like to buy?',
    default: currency_to_buy,
  },
]

//1
bot.sendMessage(chat_id, buy_request[0].message, {
  reply_markup: {
    keyboard: keyboard.start
  }
})

bot.on('message', msg => {
  switch (buy_request[0].validate(msg.text)) {
    case true: 
      ask_pair_budget(msg.text)
      break
    case false: 
      const notValidate = 'Currency not valid, please chose between USDT, BTC, BNB, ETH'
      bot.sendMessage(chat_id, notValidate, {
        reply_markup: {
          keyboard: keyboard.start
        }
      })
  }
})

ask_pair_budget = (msgTxt) => {
  console.log(msgTxt)
  bot.sendMessage(chat_id, buy_request[1].message, {
    reply_markup: {
      hide_keyboard: true
    }
  })
  
  bot.on('message' )
    // pair = (answers.currency_to_buy + answers.base_currency).toUpperCase()
    // conf.set('nbt.base_currency', (answers.base_currency).toUpperCase())
    // conf.set('nbt.budget', answers.budget)
    // conf.set('nbt.currency_to_buy', (answers.currency_to_buy).toUpperCase())
    // base_currency = (answers.base_currency).toUpperCase()
    // currency_to_buy = (answers.currency_to_buy).toUpperCase()
    // budget = parseFloat(answers.budget)
    // buy_info_request[0].default  = base_currency
    // buy_info_request[1].default  = budget
    // buy_info_request[2].default  = currency_to_buy


}




