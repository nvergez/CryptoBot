/*
** EPITECH PROJECT, 2020
** Tek2
** File description:
** Action
*/

#include "Action.hpp"

Action::Action(std::string cours, int time, double entry_price_usd,
double value, double fee)
{
    _entry_price_usd = entry_price_usd;
    _time = time;
    _value = value;
    _cours = cours;
    _fee = fee;
    _value_after_fees = _value * (1 - (_fee / 100));
    _scale = _time;
}

Action::~Action()
{
}

void Action::updateAction(double cours)
{
    (void)cours;
}

bool Action::isItTimeToSell()
{
    _time = _time - 1;
    if (_time <= 0) {
        return true;
    } else {
        return false;
    }
}

std::string Action::sellAction()
{
    std::ostringstream oss;

    oss << std::fixed;
    oss << std::setprecision(9);
    oss << _value_after_fees;
    std::string result = "sell " + _cours + " " + oss.str();
    return result;
}

std::string Action::buyAction()
{
    std::ostringstream oss;

    oss << std::fixed;
    oss << std::setprecision(9);
    oss << _value;
    std::string result = "buy " + _cours + " " + oss.str();
    return result;
}
