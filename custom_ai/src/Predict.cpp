/*
** EPITECH PROJECT, 2020
** Untitled (Workspace)
** File description:
** Predict
*/

#include <boost/algorithm/string.hpp>
#include "Predict.hpp"

Predict::Predict()
{
    rsi_usd_btc_status = 0;
    rsi_usd_eth_status = 0;
    _nbrPredict = 0;
    btcState = OK;
    ethState = OK;
}

Predict::~Predict()
{
}

void Predict::init_settings()
{
    if (line[0] != "settings")
        return;
    if (line[1] == "player_names") {
        _settings.player_name = line[2];
        return;
    }
    if (line[1] == "your_bot") {
        _settings.bot_name = line[2];
        return;
    }
    if (line[1] == "time_bank") {
        _settings.time_bank = std::stoi(line[2]);
        return;
    }
    if (line[1] == "time_per_move") {
        _settings.time_per_move = std::stoi(line[2]);
        return;
    }
    if (line[1] == "candle_interval") {
        _settings.candle_interval = std::stoi(line[2]);
        return;
    }
    if (line[1] == "candle_format") {
        _settings.candle_format = line[2];
        return;
    }
    if (line[1] == "candles_total") {
        _settings.candles_total = std::stoi(line[2]);
        return;
    }
    if (line[1] == "candles_given") {
        _settings.candles_given = std::stoi(line[2]);
        return;
    }
    if (line[1] == "initial_stack") {
        _settings.initial_stack = std::stoi(line[2]);
        return;
    }
    if (line[1] == "transaction_fee_percent") {
        _settings.transaction_fee_percent = std::stof(line[2]);
        return;
    }
}

void Predict::init_update_candles()
{
    std::vector<std::string> pairs;

    boost::split(pairs, line[3], boost::is_any_of(";"));
    for (std::string _pair:pairs) {
        std::vector<std::string> elements;
        boost::split(elements, _pair, boost::is_any_of(","));
        candle_t next_candle;
        next_candle.date = std::stol(elements[1]);
        next_candle.high = std::stold(elements[2]);
        next_candle.low = std::stold(elements[3]);
        next_candle.open = std::stold(elements[4]);
        next_candle.close = std::stold(elements[5]);
        next_candle.volume = std::stold(elements[6]);
        if (elements[0] == "BTC_ETH") {
            _update.BTC_ETH.push_back(next_candle);
        } else if (elements[0] == "USDT_ETH") {
            _update.USDT_ETH.push_back(next_candle);
        } else {
            _update.USDT_BTC.push_back(next_candle);
        }

    }
}

void Predict::init_update_stacks()
{
    std::vector<std::string> currency;

    boost::split(currency, line[3], boost::is_any_of(","));
    for (std::string current:currency) {
        std::vector<std::string> price;
        boost::split(price, current, boost::is_any_of(":"));
        if (price[0] == "BTC") {
            _update.BTC = std::stod(price[1]);
        } else if (price[0] == "ETH") {
            _update.ETH = std::stod(price[1]);
        } else {
            _update.USDT = std::stod(price[1]);
        }
    }
}

void Predict::update()
{
    if (line[2] == "next_candles") {
        init_update_candles();
    } else if (line[2] == "stacks") {
        init_update_stacks();
    }
}

std::vector<long double> Predict::getClosing(std::vector<candle_t> candles)
{
    std::vector<long double> closing;

    for (candle_t candle:candles) {
        closing.push_back(candle.close);
    }
    return closing;
}

long double Predict::Rsi(std::vector<candle_t> data)
{
    std::vector<long double> gain, loss, change, avgGain, avgLoss, RS, tmp, RSI;

    tmp = getClosing(data);

    if (tmp.size() > 250) {
        std::vector<long double> closePrices(tmp.end()-250,tmp.end());
        for (std::size_t i = 1; i < closePrices.size(); i++) {
            change.push_back(closePrices[i] - closePrices[i - 1]);
        }
    } else {
        std::vector<long double> closePrices(tmp.begin(),tmp.end());
        for (std::size_t i = 1; i < closePrices.size(); i++) {
            change.push_back(closePrices[i] - closePrices[i - 1]);
        }
    }

    double sumGain = 0, sumLoss = 0;

    for (std::size_t i = 0; i < change.size(); i++) {
        change[i] > 0 ? gain.push_back(change[i]) : gain.push_back(0);
        change[i] < 0 ? loss.push_back(change[i] - 2*change[i]) : loss.push_back(0);
        sumGain += gain[i];
        sumLoss += loss[i];
    }

    avgGain.push_back(sumGain/14);
    avgLoss.push_back(sumLoss/14);

    for (std::size_t i = 14, j = 1; i < gain.size(); i++) {
        avgGain.push_back(((avgGain[j-1] * 13)+ gain[i])/14);
        avgLoss.push_back(((avgLoss[j-1] * 13)+ loss[i])/14);
        j++;
    }

    for (std::size_t i = 0; i < avgGain.size(); i++) {
        RS.push_back(avgGain[i]/avgLoss[i]);
        RSI.push_back(100 - (100/(1+RS[i])));
    }
    return RSI[RSI.size() - 1];

}

void Predict::compute(int &rsi_status, long double rsi_value,
std::string cour, long double close)
{
    if (rsi_status == STABLE) {
        if (rsi_value >= OVER_VALUE)
            rsi_status = OVER;
        if (rsi_value <= UNDER_VALUE)
            rsi_status = UNDER;
    } else if (rsi_status == OVER) {
        if (rsi_value < OVER_VALUE) {
            rsi_status = STABLE;
        }
    } else if (rsi_status == UNDER) {
        if (rsi_value > UNDER_VALUE) {
            buy(PERCENT_FOR_ACTION, cour, close, DURATION_ACTION);
            rsi_status = STABLE;
        }
    }
}

void Predict::sell()
{
    for (auto it = _actions.begin(); it != _actions.end(); it++) {
        if ((*it)->isItTimeToSell() == true) {
            std::cerr << "NORMAL SELLING" << std::endl;
            if (response != "pass") {
                response = response + ";" + (*it)->sellAction();
            } else {
                response = (*it)->sellAction();
            }
            delete(*it);
            _actions.erase(it);
            it--;
        }
    }
}

void Predict::buy(double percent, std::string cours, long double cours_value, int duration)
{
    double value_in_usd = percent * _update.USDT;
    double value_to_buy = value_in_usd / cours_value;

    double currentStock = _update.USDT +
    _update.USDT_BTC[_update.USDT_BTC.size() - 1].close * _update.BTC +
    _update.USDT_ETH[_update.USDT_ETH.size() - 1].close * _update.ETH;

    std::cerr << "You have " << currentStock <<  "$. -> buy " <<
    value_to_buy << " of " << cours << " for " << value_in_usd <<
    " $US" << std::endl;

    Action *new_action = new Action(cours, duration, value_in_usd, value_to_buy,
    _settings.transaction_fee_percent);

    if (response != "pass") {
        response = response + ";" + new_action->buyAction();
    } else {
        response = new_action->buyAction();
    }
    _actions.push_back(new_action);
    _nbrPredict++;
}


void Predict::isGainning()
{
    std::vector<long double> closing = getClosing(_update.BTC_ETH);

    if (closing[closing.size() - 1] - closing[closing.size() - 2] > 0) {
        std::cerr << "1" << std::endl;
    } else {
        std::cerr << "0" << std::endl;
    }
}

void Predict::sellAllInScale(int scale, std::string cours)
{
    for (auto it = _actions.begin(); it != _actions.end(); it++) {
        if ((*it)->getTime() == scale && cours == (*it)->getCours()) {
            std::cerr << "SELLING " << (*it)->getLastingTime() << " BEFORE" << std::endl;
            if (response != "pass") {
                response = response + ";" + (*it)->sellAction();
            } else {
                response = (*it)->sellAction();
            }
            delete(*it);
            _actions.erase(it);
            it--;
        }
    }
}

void Predict::sellAll(std::string cours)
{
    std::cerr << "SELLING ALL OMGGGGGGGGG" << std::endl;
    for (auto it = _actions.begin(); it != _actions.end(); it++) {
        if (cours == (*it)->getCours()) {
            std::cerr << "SELLING " << (*it)->getLastingTime() << " BEFORE" << std::endl;
            if (response != "pass") {
                response = response + ";" + (*it)->sellAction();
            } else {
                response = (*it)->sellAction();
            }
            delete(*it);
            _actions.erase(it);
            it--;
        }
    }
}

void Predict::hub()
{
    bool check = false;

    sell();
    if (_update.USDT < 3) {
        parse();
        return;
    }
    std::cout << "hub" << std::endl;
    if (btcState == OK) {
        _gh.resetData(getClosing(_update.USDT_BTC));
        for (int i = 100; i > 30; i--) {
            if (_gh.computeReverse(i)) {
                sellAllInScale(i, "USDT_BTC");
            }
        }
        for (int i = 100; i > 30; i--) {
            if (_gh.compute(i)) {
                buy(i/200.f, "USDT_BTC",
                _update.USDT_BTC[_update.USDT_BTC.size() - 1].close, i);
                check = true;
                break;
            }
        }
    }
    if (ethState == OK) {
        _gh.resetData(getClosing(_update.USDT_ETH));
        for (int i = 100; i > 30; i--) {
            if (_gh.computeReverse(i)) {
                sellAllInScale(i, "USDT_ETH");
            }
        }
        for (int i = 100; i > 30; i--) {
            if (_gh.compute(i)) {
                buy(i/200.f, "USDT_ETH",
                _update.USDT_ETH[_update.USDT_ETH.size() - 1].close, i);
                check = true;
                break;
            }
        }
    }
    if (check == true) {
        parse();
        return;
    }
    parse();
}

void Predict::run()
{
    std::string buff;

    while (std::getline(std::cin, buff)) {
        boost::split(line, buff, boost::is_any_of(" "));
        if (line[0] == "action") {
            std::cout << "action" << std::endl;
            response = "pass";
            hub();
            std::cout << response << std::endl;
        } else if (line[0] == "settings") {
            init_settings();
        } else if (line[0] == "update") {
            update();
        }
    }
}

void Predict::parse()
{
    std::vector<std::string> tmp;
    long double stock_btc = 0;
    long double stock_eth = 0;

    if (response == "pass")
        return;
    boost::split(tmp, response, boost::is_any_of(";"));
    for (std::string token:tmp) {
        std::vector<std::string> tokens;
        boost::split(tokens, token, boost::is_any_of(" "));
        if (tokens[0] == "buy" && tokens[1] == "USDT_BTC") {
            stock_btc += std::stold(tokens[2]);
        }
        if (tokens[0] == "buy" && tokens[1] == "USDT_ETH") {
            stock_eth += std::stold(tokens[2]);
        }
        if (tokens[0] == "sell" && tokens[1] == "USDT_BTC") {
            stock_btc -= std::stold(tokens[2]);
        }
        if (tokens[0] == "sell" && tokens[1] == "USDT_ETH") {
            stock_eth -= std::stold(tokens[2]);
        }
    }
    response = "pass";
    if (stock_btc > 0) {
        std::ostringstream oss;
        oss << std::fixed;
        oss << std::setprecision(9);
        oss << stock_btc;
        response = "buy USDT_BTC " + oss.str();
    } else if (stock_btc < 0) {
        std::ostringstream oss;
        oss << std::fixed;
        oss << std::setprecision(9);
        oss << stock_btc - 2 * stock_btc;
        response = "sell USDT_BTC " + oss.str();
    }
    if (stock_eth > 0) {
        std::ostringstream oss;
        oss << std::fixed;
        oss << std::setprecision(9);
        oss << stock_eth;
        if (response == "pass")
            response = "buy USDT_ETH " + oss.str();
        else
            response = response + ";buy USDT_ETH " + oss.str();
    } else if (stock_eth < 0) {
        std::ostringstream oss;
        oss << std::fixed;
        oss << std::setprecision(9);
        oss << stock_eth - 2 * stock_eth;
        if (response == "pass")
            response = "sell USDT_ETH " + oss.str();
        else
            response = response + ";sell USDT_ETH " + oss.str();
    }
}