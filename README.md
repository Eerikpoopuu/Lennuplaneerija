# Lennuplaneerija
CGI proovikas

# Projekt: Lennureisija planeerimise rakendus

See projekt sisaldab kahte põhikomponenti: **Backend** (Spring Boot) ja **Frontend** (React). Järgmises õpetuses on selgitatud, kuidas neid komponente lokaalselt käivitada ja arendada.

## Eeldused

Enne alustamist veendu, et sul on järgmised tööriistad ja tarkvara paigaldatud:

- [Node.js](https://nodejs.org/en/) 
- [npm](https://www.npmjs.com/) 
- [Java](https://www.java.com/en/download/)
- [Spring Boot](https://spring.io/projects/spring-boot) 
- [Maven](https://maven.apache.org/) (Java sõltuvuste haldamiseks)

## Kuidas projekti käivitada

### 1. Backend (Spring Boot)

#### Samm 1: Kloneeri ja konfigureeri backend

1. Kloneeri  repostoorium oma masinasse:
   ```bash
   git clone https://github.com/Eerikpoopuu/Lennuplaneerija.git
   ```
2.**Intellijis** avada `LennujaamApplication.java` fail ja käivitada rakendus, klõpsates "Run" nuppu või käsurealt:

   ```bash
   ./mvnw spring-boot:run
   ```
 Kui kõik on õigesti konfigureeritud, peaks Spring Boot server käivituma aadressil `http://localhost:8080`
 
3. Frontend (React)

#### Samm 1: mine frontend-i repostoorium oma masinas:

   ```bash
   cd Lennuplaneerija/frontend/Lennuplaan

   ```

2. Paigalda vajalikud sõltuvused:

   ```bash
   npm install
   ```

#### Samm 2: Käivita frontend

1. Käivita arendusserver:

   ```bash
   npm start
   ```

2. React rakendus peaks olema saadaval aadressil `http://localhost:3000`.

## Kuidas ja Kaua tegin?

Backend : Kasutasin oma kooli tööd näidisena, muutes seda vastavalt projekti vajadustele. Töötlus kestis umbes 2 tundi, mille jooksul seadistasin Spring Boot'i rakenduse ja ühendasin vajalikud andmebaasi päringud.

Frontend (7 tundi): Kasutasin oma kooli tööd näidisena. Esiteks Homepage kohandasin selle vastavalt oma projekti vajadustele. Booking lehe kohavalimis pop-up akna loomine oli mulle huvitav väljakutse, mille puhul kasutasin ChatGPT-d, et leida lahendus ja integreerida see õigesti Reacti rakendusesse.

## Lisainfo
mõtlesin et panen rakenduse verceli püsti, et siis lihtsam ligipääs aga jäin hätta backendi lisamisega sinna külge.
Oleks rohkem aega olnud oleks lisa ülesanded lahendanud nii:
1. Erinevad istekohtade klassid (1. klass, äriklass, turistiklass). Selleks oleks teinud istekoha valimsel popup aknas jooned vahele, näiteks 1-5rida 1.klass,
 6-8rida äriklass jne.
2. Lennuandmete laadimine reaalse lennufirma API-st. Selle ülesande täitmiseks oleks saanud leida lennufirma API, mis pakub lennuandmete päringute tegemiseks teenuseid, näiteks Skyscanner API või Amadeus API.


   
