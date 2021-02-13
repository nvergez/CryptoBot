/*
** EPITECH PROJECT, 2020
** Tek2
** File description:
** CustomIndicator
*/

#include "CustomIndicator.hpp"

CustomIndicator::CustomIndicator()
{
    _trend = UNDEFINED;
}

CustomIndicator::~CustomIndicator()
{
}

void CustomIndicator::resetData(std::vector<long double> data)
{
    _data = data;
}

bool CustomIndicator::compute(int period)
{
    long double act = (_data[_data.size() - 1] / _data[_data.size() - period - 1]) * 100;
    long double prev = (_data[_data.size() - 2] / _data[_data.size() - period - 2]) * 100;
    long double prev2 = (_data[_data.size() - 3] / _data[_data.size() - period - 3]) * 100;
    long double prev3 = (_data[_data.size() - 4] / _data[_data.size() - period - 4]) * 100;

    if (abs(act + prev) != abs(act) + abs(prev)) {
        if (abs(prev + prev2) == abs(prev) + abs(prev2) && abs(prev2 + prev3) == abs(prev2) + abs(prev3)) {
            int count = 0;
            for (std::size_t i = _data.size() - period; i < _data.size(); i++) {
                if (_data[i] > _data[_data.size() - 1] || _data[i] > _data[_data.size() - period - 1]) {
                    count++;
                }
            }
            if (count <= period * 0.2)
                return true;
        }
    }
    return false;
}

bool CustomIndicator::computeReverse(int period)
{
    long double act = (_data[_data.size() - 1] / _data[_data.size() - period - 1]) * 100;
    long double prev = (_data[_data.size() - 2] / _data[_data.size() - period - 2]) * 100;

    if (abs(act + prev) != abs(act) + abs(prev)) {
        int count = 0;
        for (std::size_t i = _data.size() - period; i < _data.size(); i++) {
            if (_data[i] < _data[_data.size() - 1] || _data[i] < _data[_data.size() - period - 1]) {
                count++;
            }
        }
        if (count <= period * 0.2)
            return true;
    }
    return false;
}
