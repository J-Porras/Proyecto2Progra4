-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: cursos_db
-- ------------------------------------------------------
-- Server version	8.0.21


drop database if exists cine;
create database cine;

use cine;

DROP TABLE IF EXISTS `peliculas`;

CREATE TABLE `peliculas` (
  `id` int  NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL ,
   `precio` double DEFAULT NULL,
   `cartelera` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;

DROP TABLE IF EXISTS `salas`;

CREATE TABLE `salas` (
  `id` int  NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL ,
  PRIMARY KEY (`id`)
) ;


DROP TABLE IF EXISTS `proyecciones`;

CREATE TABLE `proyecciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sala_id` int  NOT NULL ,
   `fecha` varchar(50) NOT NULL ,
    `hora` varchar(50) NOT NULL ,
  `pelicula_id` int,
   CONSTRAINT `sala_fk` FOREIGN KEY (`sala_id`) REFERENCES `peliculas` (`id`),
   CONSTRAINT `pelicula_fk` FOREIGN KEY (`pelicula_id`) REFERENCES `salas` (`id`),
  PRIMARY KEY (`id`,`pelicula_id`, `fecha`, `hora`, `sala_id`)
);

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `id` varchar(50)  NOT NULL,
  `nombre` varchar(50) NOT NULL ,
   `contrasenna` varchar(50) NOT NULL ,
   `rol` int NOT NULL ,
  PRIMARY KEY (`id`)
) ;


DROP TABLE IF EXISTS `tiquetesComprados`;

CREATE TABLE `tiquetesComprados` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_proyeccion` int DEFAULT NULL,
  `id_cliente` varchar(50) NOT NULL,
  `asiento` varchar(9) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id` ,`id_cliente`,`asiento`),
  CONSTRAINT `proyec_fk` FOREIGN KEY (`id_proyeccion`) REFERENCES `proyecciones` (`id`),
  CONSTRAINT `cliente_fk` FOREIGN KEY (`id_cliente`) REFERENCES `usuarios` (`id`)
);


insert into Usuarios (id,nombre,contrasenna,rol) values('1234', 'Pedro Admin','1234',0);
insert into Usuarios (id,nombre,contrasenna,rol) values('4321', 'Diana Prueba','1234',1);
select * from Usuarios;

insert into peliculas (nombre,precio,cartelera) values( 'Avengers',1500,TRUE);
select * from peliculas;
insert into salas (nombre) values( 'Sala 1');
select * from salas;
insert into proyecciones (sala_id,fecha,hora,pelicula_id) values( 1,'10/10/2021','2:00',1);
select * from proyecciones;
insert into tiquetesComprados (id_proyeccion,id_cliente,asiento) values( 1,'1234','A4');
select * from tiquetesComprados;