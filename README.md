# HomeWork
<p align="center">
  <img src="/documentation/assets/logo.png" width="400">
</p>

## Was ist HomeWork?
HomeWork ist eine Plattform zur Verwaltung von Hausaufgaben.

Lehrer können Hausaufgaben erstellen, die eingereichten Lösungen ihrer Schüler einsehen und Feedback geben. Und was ist mit den Schülern?

Schüler werden über neue Hausaufgaben informiert, können ihre Aufgaben digital einreichen und einen Grund für eine verspätete Abgabe hinterlegen.

Welche Möglichkeiten haben Eltern / Verantwortliche? Sie können Abgabetermine einsehen und die Meldung des Verspätungsgrundes bestätigen.


## Prozesse

1. Ein Lehrere kann Dokumente für eine Klasse hochladen
2. Schüler bekommen eine Mail, wenn ein neues Dokument in ihrer Klasse
3. Texte und Bilder können abgelegt werden
4. Zusätzliche Dokumente können heruntergeladen/hochgeladen werden
5. Für jede Aufgabe gibt es ein Antwortfeld + eine Möglichkeit zusätzliche Dateien hochzuladen
6. Der Lehrer kann zu allen eingereichten Aufgaben den Schülern Feedback mitteilen
7. Die Schüler können sich das Feedback anschauen

## Login / Registrierung:

- https://flaviocopes.com/express-sessions/
- http://www.passportjs.org/docs/



## Entwicklung

### Backend


#### Docker

Das vollständige docker-compose setup erstellt ein node image und verwendet
ein fertiges mongodb image.
Es ist nicht notwendig das node image für die Entwicklung zu bauen.

Somit reicht aus für die Entwicklung die folgenden Kommandos auszuführen:

- `docker-compose up mongo` - Startet eine mongodb (auf port 27017).
- (Falls nicht bereits ausgeführt) `npm install` - Installiert die Abhängigkeiten.
- `node index.js 8080 localhost 27017` - Startet die Applikation.

#### Ohne Docker

Damit die mongodb gemockt wird, muss die Umgebungsvariable "DBMOCK" gesetzt
werden (der Wert ist egal).

#### Beispiel Daten

Das bash script `fill_example_data.sh` sendet über die REST API und curl erste
Beispieldaten in das Backend.

### Frontend

Installieren der Abhängigkeiten:
`npm install`

Starten des Frontends:
`npm start`

