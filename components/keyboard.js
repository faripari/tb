const kb = require('./keyboard_btn')

module.exports = {
    start: [
        [kb.start.bnb, kb.start.usdt],
        [kb.start.btc, kb.start.eth]
     ],
     buy_options: [
        [kb.buy_options.market_buy, kb.buy_options.quick_buy],
        [kb.buy_options.limit_buy],
        [kb.back]
     ],
     sell_option: [
        [kb.sel_option.sl_tp],
        [kb.sel_option.trailing_stop],
        [kb.back]
     ]
}