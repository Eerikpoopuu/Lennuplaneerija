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

   
