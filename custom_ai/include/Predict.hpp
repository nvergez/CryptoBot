/*
** EPITECH PROJECT, 2020
** Untitled (Workspace)
** File description:
** Predict
*/

#ifndef Predict_HPP_
#define Predict_HPP_

#define OVER 1
#define UNDER -1
#define STABLE 0

#define OVER_VALUE 70
#define UNDER_VALUE 30

#define DURATION_ACTION 15
#define PERCENT_FOR_ACTION 0.20

#include <iostream>
#include <string>
#include <vector>
#include <cmath>

#include "Action.hpp"
#include "CustomIndicator.hpp"

typedef unsigned long date_t;
typedef long double volume_t;

typedef struct s_settings
{
    std::string player_name;
    std::string bot_name;
    int time_bank;
    int time_per_move;
    int candle_interval;
    std::string candle_format;
    int candles_total;
    int candles_given;
    int initial_stack;
    float transaction_fee_percent;
} settings_t;

typedef struct s_candle
{
    date_t date;
    long double high;
    long double low;
    long double open;
    long double close;
    volume_t volume;
} candle_t;

typedef struct s_update
{
    std::vector<candle_t> BTC_ETH;
    std::vector<candle_t> USDT_ETH;
    std::vector<candle_t> USDT_BTC;
    double BTC;
    double ETH;
    double USDT;
} update_t;

enum State {
    OK,
    KO
};

class Predict {
    public:
        Predict();
        ~Predict();

        void run(void);
        void init_settings(void);
        void init_update_candles();
        void init_update_stacks();
        void update();

        long double Rsi(std::vector<candle_t> data);

        void isGainning();

        void buy(double percent, std::string cours, long double cours_value, int duration);
        void sell();
        void sellAllInScale(int scale, std::string cours);
        void sellAll(std::string cours);

        void hub();

        void parse();

        void compute(int &rsi_status, long double rsi_value,
        std::string cour, long double close);

        std::vector<long double> getClosing(std::vector<candle_t>);

    protected:
    private:
        std::vector<std::string> line;
        settings_t _settings;
        update_t _update;
        long double rsi_usd_btc;
        long double rsi_usd_eth;
        int rsi_usd_btc_status;
        int rsi_usd_eth_status;
        std::string response;
        std::vector<Action *> _actions;
        CustomIndicator _gh;
        int _nbrPredict;
        State btcState;
        State ethState;

};

#endif /* !Predict_HPP_ */
