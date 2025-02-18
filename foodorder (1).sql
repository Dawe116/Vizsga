-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Feb 11. 17:41
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `foodorder`
--
CREATE DATABASE IF NOT EXISTS `foodorder` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE `foodorder`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `address`
--

CREATE TABLE `address` (
  `Id` int(11) NOT NULL,
  `County_Id` int(11) NOT NULL,
  `Postal_code` int(4) NOT NULL,
  `City` varchar(100) NOT NULL,
  `Street` varchar(100) NOT NULL,
  `House_number` varchar(10) NOT NULL,
  `Floor` int(5) DEFAULT NULL,
  `Door` int(5) DEFAULT NULL,
  `User_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `address`
--

INSERT INTO `address` (`Id`, `County_Id`, `Postal_code`, `City`, `Street`, `House_number`, `Floor`, `Door`, `User_Id`) VALUES
(1, 4, 0, '', '', '', NULL, NULL, 17),
(4, 4, 3525, 'Miskolc', 'Palóczy utca', '3', NULL, NULL, 14);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `county`
--

CREATE TABLE `county` (
  `Id` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `county`
--

INSERT INTO `county` (`Id`, `Name`) VALUES
(1, 'Bács-Kiskun'),
(2, 'Baranya'),
(3, 'Békés'),
(4, 'Borsod-Abaúj-Zemplén'),
(5, 'Csongrád-Csanád'),
(6, 'Fejér'),
(7, 'Győr-Moson-Sopron'),
(8, 'Hajdú-Bihar'),
(9, 'Heves'),
(10, 'Jász-Nagykun-Szolnok'),
(11, 'Komárom-Esztergom'),
(12, 'Nógrád'),
(13, 'Pest'),
(14, 'Somogy'),
(15, 'Szabolcs-Szatmár-Bereg'),
(16, 'Tolna'),
(17, 'Vas'),
(18, 'Veszprém'),
(19, 'Zala');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `menu`
--

CREATE TABLE `menu` (
  `Id` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Picture` mediumblob NOT NULL,
  `restaurantId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `menu`
--

INSERT INTO `menu` (`Id`, `Name`, `Picture`, `restaurantId`) VALUES
(1, 'Sajtburger', '', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orders`
--

CREATE TABLE `orders` (
  `Id` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `permissions`
--

CREATE TABLE `permissions` (
  `Id` int(11) NOT NULL,
  `Szint` int(11) NOT NULL,
  `Név` varchar(20) NOT NULL,
  `Leírás` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `permissions`
--

INSERT INTO `permissions` (`Id`, `Szint`, `Név`, `Leírás`) VALUES
(1, 9, 'Admin', 'Full Access'),
(2, 1, 'User', 'Letezik igazabol'),
(3, 2, 'tesztmod', 'jujdejo');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `restaurant`
--

CREATE TABLE `restaurant` (
  `Id` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Description` varchar(50) NOT NULL,
  `Category` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `restaurant`
--

INSERT INTO `restaurant` (`Id`, `Name`, `Description`, `Category`) VALUES
(1, 'McDonald\'s', 'I\'m lovin\' it', ''),
(2, 'Burger King', 'Pont, ahogy szereted!', ''),
(3, 'KFC', 'A frissen készült étel a legfinomabb.', ''),
(4, 'Pizza Hut', 'No One Outpizzas the Hut!', ''),
(97, 'Hot City Diner', '…az egészséges választás.', ''),
(98, 'Döner King', '…az egészséges választás.', ''),
(99, 'Borsod Burger BBQ GasztroPub', '…az egészséges választás.', ''),
(100, 'Smokey Burger', 'Igényes street food megfizethető áron!', ''),
(101, 'Bitang Joe Burger Bar', '…az egészséges választás.', ''),
(102, 'Simon’s Burger', '…az egészséges választás.', ''),
(103, 'SMOKELAND Smoke & Grill', 'Amerika ízei helyben a Smokerből és házhoz Grillbő', ''),
(104, 'Fald fel Amerikát - Miskolc', 'Eredeti klasszikus, “nem újragondolt” amerikai íze', ''),
(105, 'Retró Ételbár', '…az egészséges választás.', ''),
(106, 'Bodega Bistro Miskolc', 'Igazi amerikai ízvilág a belváros szívében!', ''),
(107, 'A Vasaló Bisztró Borsodi Vasaltlángos', 'BORSODI VASALTLÁNGOSOK, GYROSOK, HAMBURGEREK,SAJTG', ''),
(108, 'Pizza Napoli', '…az egészséges választás.', ''),
(109, 'Pizza Tábor', 'Ne maradj kedvenc pizzád nélkül!', ''),
(110, 'Pizza Király - Miskolc', 'A pizza szerelmeseinek.', ''),
(111, 'Ciao Bella Pizzéria', '30 Féle Eredeti, Nápolyi Vékony Tésztás Pizza Közü', ''),
(112, 'Pizza Gábor Étterem', 'Friss, helyben készült ételek várják rendelésed.', ''),
(113, 'Babylon Pizzéria Vendégház', 'Kóstolja meg a Babyloni ízeket és érezze jól magát', ''),
(114, 'Pizza Me', '100% Italian', ''),
(115, 'Il Baffo', 'Egyedi óriás családi pizzák, olasz tésztakülönlege', ''),
(116, 'Pizza by Lingum', 'Íz, minőség és szenvedély minden szeletünkben!', ''),
(117, 'MENUZA', 'Frisseség, minőség Menuza', ''),
(118, 'Malom Étterem', 'Magyaros jellegű, mégis különleges étlap!', ''),
(119, 'Renomé Café & Bistro', 'Renomé Café & Bistro, ahol fontos vagy!', ''),
(120, 'Öreg Miskolcz Étterem', 'Rendeld házhoz kedvenc frissen sültjeid, hamburger', ''),
(121, 'Miskolczi Főzelékház', 'Gyorsan, olcsón, jót!', ''),
(122, 'Csak Magyarosan', 'Csak Magyarosan,de belekóstolunk a nemzetközi kony', ''),
(123, 'Malibu Étterem', 'Minőségi ételek, felejthetetlen pillanatok.', ''),
(124, 'Defincsi Sarok', 'Ha valami igazán fincsire vágysz!', ''),
(125, 'A Művész', 'Fedezzétek fel étlapukat, hagyományos jellegű e', ''),
(126, 'Lecsó Magyaros Gyorsétterem - Miskolc', 'Bőséges ételkínálattal, friss, magyaros ízekkel vá', ''),
(127, 'A Görög Faló Gyros Bár', 'Az igazi görög ízeket a Görög Falóban találod!', ''),
(128, 'Guszta Kebab', 'Boldogság minden falatban', ''),
(129, 'WOK’n GO', 'EGY GONDOLAT AZ ÉTELÉRT', ''),
(130, 'Kínai gyros büfé', 'Kínai ételeket, üdítőket àrulunk, vendegeinket min', ''),
(131, 'Ázsia Konyha', 'Ázsiai jellegű ételek', ''),
(132, 'Nagy Fal Kínai Étterem', 'Finom kínai ételeink várják rendelésed!', ''),
(133, 'Süt A Nap Vegán Bisztró', 'A felhők felett mindig süt a Nap.', ''),
(134, 'Bárka Étterem', 'Távol-Keleti tészta-, rizsételek és levesek, BAO, ', ''),
(135, 'Impresszó Club - Étterem', 'Miskolc belvárosában 18 éve a vendégek szolgálatáb', ''),
(136, 'Murphy’s Étterem', 'Válasszon minket, és felejthetetlen pillanatokkal ', ''),
(137, 'Kislábas Kifőzde', 'Házias ízek várják rendelésed', ''),
(138, 'Creppy PalacsintaHáz', 'Az ország legkülönlegesebb, prémium palacsintás ét', ''),
(139, 'Mandula Pont', '\"Tökéletes torták a tökéletes pillanatokra\"', ''),
(140, 'Balajti Cukrászda', 'Lehetetlen ellenállni...miért ne próbálná ki?', '');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `Id` int(11) NOT NULL,
  `LoginNev` varchar(16) NOT NULL,
  `HASH` varchar(64) NOT NULL,
  `SALT` varchar(64) NOT NULL,
  `Name` varchar(64) NOT NULL,
  `PermissionId` int(11) NOT NULL,
  `Active` tinyint(1) NOT NULL,
  `Email` varchar(64) NOT NULL,
  `ProfilePicturePath` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`Id`, `LoginNev`, `HASH`, `SALT`, `Name`, `PermissionId`, `Active`, `Email`, `ProfilePicturePath`) VALUES
(1, 'kerenyir', 'd5fe0e517520122f1ab363b6b7ee9ae616e7ad393693ef00d81a7f287a79931a', 'Gm63C4jiWnYvfZfiKUu2cu8AHPNDj8NoHhtQn88yiJhyOunBNSd7tRoWo5wwqg9X', 'Kerényi Róbert', 9, 1, 'kerenyir@kkszki.hu', '\\default.jpg'),
(12, 'balinthaha', '473287f8298dba7163a897908958f7c0eae733e25d2e027992ea2edc9bed2fa8', 'string', 'string', 1, 0, 'vargab@kkszki.hu', 'string'),
(14, 'zalanhahaha', '473287f8298dba7163a897908958f7c0eae733e25d2e027992ea2edc9bed2fa8', 'string', 'Zima Zalán', 1, 1, 'zimaz@kkszki.hu', 'string'),
(17, 'bela', 'd9f7d62a6095888101bcea83dc22d8d670581e693332373a238e0ea0ffd6a5b4', 'EwnSmWnuO2GFPpla6L9EMWt9F5VM8XS1cNuurIbyvK0RURl2AGGA84v6O4bQ8iSX', 'bela', 9, 1, 'bela', 'Nincs Kiválasztva');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `userorder`
--

CREATE TABLE `userorder` (
  `Id` int(11) NOT NULL,
  `ordersId` int(11) NOT NULL,
  `menuId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `User_Id` (`User_Id`),
  ADD KEY `County` (`County_Id`) USING BTREE,
  ADD KEY `Postal_code` (`Postal_code`) USING BTREE,
  ADD KEY `County_Id` (`County_Id`) USING BTREE;

--
-- A tábla indexei `county`
--
ALTER TABLE `county`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Name` (`Name`);

--
-- A tábla indexei `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Name` (`Name`),
  ADD KEY `restaurantId` (`restaurantId`);

--
-- A tábla indexei `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `userId` (`userId`);

--
-- A tábla indexei `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Szint` (`Szint`),
  ADD UNIQUE KEY `Nev` (`Név`);

--
-- A tábla indexei `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Name` (`Name`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `LoginNev` (`LoginNev`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `Jog` (`PermissionId`),
  ADD KEY `PermissionId` (`PermissionId`);

--
-- A tábla indexei `userorder`
--
ALTER TABLE `userorder`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `ordersId` (`ordersId`),
  ADD KEY `menuId` (`menuId`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `address`
--
ALTER TABLE `address`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `county`
--
ALTER TABLE `county`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT a táblához `menu`
--
ALTER TABLE `menu`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `orders`
--
ALTER TABLE `orders`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `permissions`
--
ALTER TABLE `permissions`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `restaurant`
--
ALTER TABLE `restaurant`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=141;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT a táblához `userorder`
--
ALTER TABLE `userorder`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_ibfk_2` FOREIGN KEY (`County_Id`) REFERENCES `county` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `address_ibfk_3` FOREIGN KEY (`User_Id`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `menu`
--
ALTER TABLE `menu`
  ADD CONSTRAINT `menu_ibfk_1` FOREIGN KEY (`restaurantId`) REFERENCES `restaurant` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`PermissionId`) REFERENCES `permissions` (`Szint`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `userorder`
--
ALTER TABLE `userorder`
  ADD CONSTRAINT `userorder_ibfk_1` FOREIGN KEY (`ordersId`) REFERENCES `orders` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userorder_ibfk_2` FOREIGN KEY (`menuId`) REFERENCES `menu` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
