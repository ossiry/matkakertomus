DROP DATABASE IF EXISTS matkakertomus;
-- MySQL Workbench Forward Engineering

CREATE DATABASE IF NOT EXISTS `matkakertomus` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `matkakertomus`;

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema matkakertomus
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema matkakertomus
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS matkakertomus DEFAULT CHARACTER SET utf8 ;
USE `matkakertomus`;

-- -----------------------------------------------------
-- Table `matkakertomus`.`matkaaja`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `matkakertomus`.`matkaaja` (
  `idmatkaaja` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `etunimi` VARCHAR(45) NOT NULL,
  `sukunimi` VARCHAR(45) NOT NULL,
  `nimimerkki` VARCHAR(45) NOT NULL,
  `paikkakunta` VARCHAR(45) NULL DEFAULT NULL,
  `esittely` VARCHAR(5000) NULL DEFAULT NULL,
  `kuva` VARCHAR(5000) NULL DEFAULT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(70) NOT NULL,
  PRIMARY KEY (`idmatkaaja`),
  UNIQUE INDEX `nimimerkki_UNIQUE` (`nimimerkki` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 44
DEFAULT CHARACTER SET = utf8mb3;

-- -----------------------------------------------------
-- Table `matkakertomus`.`matka`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `matkakertomus`.`matka` (
  `idmatkaaja` INT UNSIGNED NOT NULL,
  `alkupvm` DATE NULL DEFAULT NULL,
  `loppupvm` DATE NULL DEFAULT NULL,
  `yksityinen` TINYINT NULL DEFAULT NULL,
  `idmatka` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idmatka`),
  INDEX `fk_matkaaja_has_matkakohde_matkaaja_idx` (`idmatkaaja` ASC) VISIBLE,
  CONSTRAINT `fk_matkaaja_has_matkakohde_matkaaja`
    FOREIGN KEY (`idmatkaaja`)
    REFERENCES `matkakertomus`.`matkaaja` (`idmatkaaja`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

-- -----------------------------------------------------
-- Table `matkakertomus`.`matkakohde`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `matkakertomus`.`matkakohde` (
  `idmatkakohde` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `kohdenimi` VARCHAR(45) NOT NULL,
  `maa` VARCHAR(45) NOT NULL,
  `paikkakunta` VARCHAR(45) NULL DEFAULT 'N/A',
  `kuvausteksti` LONGTEXT NULL DEFAULT NULL,
  `kuva` LONGTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`idmatkakohde`),
  UNIQUE INDEX `kohdenimi_UNIQUE` (`kohdenimi` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb3;

-- -----------------------------------------------------
-- Table `matkakertomus`.`tarina`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `matkakertomus`.`tarina` (
  `idmatkakohde` INT UNSIGNED NOT NULL,
  `pvm` DATE NOT NULL,
  `teksti` LONGTEXT NULL DEFAULT NULL,
  `idmatka` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idmatkakohde`, `idmatka`),
  INDEX `fk_tarina_matkakohde1_idx` (`idmatkakohde` ASC) VISIBLE,
  INDEX `fk_tarina_matka1_idx` (`idmatka` ASC) VISIBLE,
  CONSTRAINT `fk_tarina_matka1`
    FOREIGN KEY (`idmatka`)
    REFERENCES `matkakertomus`.`matka` (`idmatka`),
  CONSTRAINT `fk_tarina_matkakohde1`
    FOREIGN KEY (`idmatkakohde`)
    REFERENCES `matkakertomus`.`matkakohde` (`idmatkakohde`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

-- -----------------------------------------------------
-- Table `matkakertomus`.`kuva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `matkakertomus`.`kuva` (
  `idkuva` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `kuva` LONGTEXT NULL DEFAULT NULL,
  `idmatkakohde` INT UNSIGNED NOT NULL,
  `idmatka` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idkuva`),
  INDEX `fk_kuva_tarina1_idx` (`idmatkakohde` ASC, `idmatka` ASC) VISIBLE,
  CONSTRAINT `fk_kuva_tarina1`
    FOREIGN KEY (`idmatkakohde` , `idmatka`)
    REFERENCES `matkakertomus`.`tarina` (`idmatkakohde` , `idmatka`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;