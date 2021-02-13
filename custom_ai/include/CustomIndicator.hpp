/*
** EPITECH PROJECT, 2020
** Tek2
** File description:
** CustomIndicator
*/

#ifndef CustomIndicator_HPP_
#define CustomIndicator_HPP_

#define PERIOD 6

#define RATIO 1

#include <vector>
#include <iostream>
#include <cmath>

enum Trend {
    BULL,
    BEAR,
    UNDEFINED
};

class CustomIndicator {
    public:
        CustomIndicator();
        ~CustomIndicator();

        void resetData(std::vector<long double> data);

        bool compute(int period);

        bool computeReverse(int period);

    protected:
    private:
        std::vector<long double> _data;
        Trend _trend;

};

#endif /* !CustomIndicator_HPP_ */
