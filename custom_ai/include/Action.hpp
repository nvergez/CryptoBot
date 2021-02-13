/*
** EPITECH PROJECT, 2020
** Tek2
** File description:
** Action
*/

#ifndef ACTION_HPP_
#define ACTION_HPP_

#include <string>
#include <sstream>
#include <iomanip>

class Action {
    public:
        Action(std::string cours, int time, double entry_price_usd,
        double value, double fee);
        ~Action();

        bool isItTimeToSell();

        std::string sellAction();

        std::string buyAction();

        void updateAction(double cours);

        inline std::string getCours() const {return _cours;}

        inline double getEntryPrice() const {return _entry_price_usd;}

        inline double getValue() const {return _value_after_fees;}

        inline int getTime() const {return _scale;}

        inline int getLastingTime() const {return _time;}

    protected:
    private:
        double _entry_price_usd;
        //double _action_value;
        int _time;
        double _value;
        double _value_after_fees;
        std::string _cours;
        double _fee;
        int _scale;
};

#endif /* !ACTION_HPP_ */
