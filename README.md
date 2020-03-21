# TeachAtHome

## Login / Registrierung:
- https://flaviocopes.com/express-sessions/
- http://www.passportjs.org/docs/

## Vision
Lehrer können auf einer Plattform Hausaufgaben anmelden, die ab Freigabe durch den Lehrer bis zu einem definierten End-Zeitpunkt eingereicht werden können. Dabei ist der Zugang auf die Schüler seiner Klasse beschränkt. Die Schüler wiederum können online die Hausaufgaben machen (direkt in der Plattform Aufgaben lösen oder Aufsätze schreiben). Der Lehrer hat immer eine Übersicht, welche Schüler ~~wann~~ die Hausaufgaben eingereicht haben. Die Schüler können angeben, wenn sie ihre Hausaufgaben nicht machen und warum (krank mit Attest einreichen, krank - Attest wird physisch eingereicht, Hausaufgabe wird physisch eingereicht). Dem Lehrer und Schüler wird abhängig vom Endzeitpunkt visualisiert ob es noch fehlende Einreichungen gibt.

## Prozesse
1. Ein Lehrere kann Dokumente für eine Klasse hochladen
2. Schüler bekommen eine Mail, wenn ein neues Dokument in ihrer Klasse
3. Texte und Bilder können abgelegt werden
4. Zusätzliche Dokumente können heruntergeladen/hochgeladen werden
5. Für jede Aufgabe gibt es ein Antwortfeld + eine Möglichkeit zusätzliche Dateien hochzuladen
6. Der Lehrer kann zu allen eingereichten Aufgaben ~~benoten und~~ den Schülern ~~zusätzliche Informationen~~ Feedback mitteilen
7. Die Schüler können sich ~~benotete Aufgaben~~ das Feedback anschauen ~~und die Informationen dazu lesen~~

## Entwicklung

### Docker
Das vollständige docker-compose setup erstellt ein node image und verwendet
ein fertiges mongodb image.
Es ist nicht notwendig das node image für die Entwicklung zu bauen.

Somit reicht aus für die Entwicklung die folgenden Kommandos auszuführen:
* `docker-compose up mongo` - Startet eine mongodb (auf port 27017).
* (Falls nicht bereits ausgeführt) `npm install` - Installiert die Abhängigkeiten.
* `node app.js 8080 localhost 27017` - Startet die Applikation.
