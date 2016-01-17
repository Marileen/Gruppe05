

Semesterprojekt Selbstorganisierte Eventplanung
======

## Installation
- Vorraussetzung: Node.js und Grunt müsssen installiert sein
- Datenbank muss vohanden sein (siehe Exportdatei) -> in der config.php kann man die Einstellungen zur DB machen
- Es muss ein php Server laufen
- Im Verzeichnis wo das Gruntfile liegt, einfach "npm install" ausführen
- dann "grunt" ausführen (hbs und less werden compiliert) (Es wird ein lokaler Server gestartet, das ist nur für Entwicklung)
- Hat man den grunt einmal gestartet und die Dateien kompiliert, dann kann man "grunt copy" ausführen
- Dadurch liegen nun ALLE benötigten Dateien im .tmp Verzeichnis, so wie sie auf den PHP Server geladen und dort ausgeführt werden können
