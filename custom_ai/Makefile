##
## EPITECH PROJECT, 2020
## Untitled (Workspace)
## File description:
## Makefile
##

DIRSRC	=	./src

INCLUDE	=	./include

SRC	=	$(DIRSRC)/main.cpp	\
		$(DIRSRC)/Predict.cpp 	\
		$(DIRSRC)/Action.cpp	\
		$(DIRSRC)/Groundhog.cpp	\

OBJ = $(SRC:.cpp=.o)

XX = g++

CXXFLAGS += -std=c++11 -Wall -Wextra -I $(INCLUDE)

BIN = custom_ai

all:	$(BIN)

$(BIN):	$(OBJ)
	$(XX) -o $(BIN) $(OBJ)

clean:
	rm -f $(OBJ)

fclean: clean
	rm -f $(BIN)

re: fclean all
