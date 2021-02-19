SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema CryptoBot_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `CryptoBot_db` DEFAULT CHARACTER SET utf8 ;
USE `CryptoBot_db` ;

-- -----------------------------------------------------
-- Table `CryptoBot_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CryptoBot_db`.`users` (
  `id_user` VARCHAR(36) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`id_user`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `id_user_UNIQUE` ON `CryptoBot_db`.`users` (`id_user` ASC) VISIBLE;

CREATE UNIQUE INDEX `email_UNIQUE` ON `CryptoBot_db`.`users` (`email` ASC) VISIBLE;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;