# 🛍️ Überblick über meine Webseite „KARAS“

![Build Status](https://img.shields.io/github/actions/workflow/status/Dana-Klesly/karas_chan/ci.yml?branch=main)
![Test Coverage](https://img.shields.io/badge/coverage-80%25-brightgreen)
![Node Version](https://img.shields.io/badge/node-20-blue)

Ich habe die Webseite „KARAS“ entwickelt, um meine personalisierten Gläser professionell und benutzerfreundlich zu präsentieren und den Bestellprozess zu vereinfachen. Kundinnen und Kunden können sich nun direkt auf der Seite über meine Produkte informieren, Preise einsehen und Bestellungen aufgeben – ohne die bisher zeitaufwendige Kommunikation über Instagram. Die Webseite bietet ein modernes, responsives Design, eine klare Produktdarstellung und ein integriertes Bestellformular für ein optimiertes Einkaufserlebnis auf allen Geräten.

## ✨ Funktionen

- Produktübersicht mit Bildern und Beschreibungen
- Preisangabe für jedes Produkt
- Responsives Design für alle Gerätetypen
- Datenbankanbindung zur Verwaltung von Produkten und Bestellungen

---

## 🧱 Technologie-Stack

- **Frontend:(karaschan)** Angular
- **Backend:(KarasChan-master)** Node.js mit Express.js
- **Datenbank:** PostgreSQL (verwaltet über Drizzle Studio)
- **Styling:** HTML, CSS, eigenes Grid-System

---

## ✅ Voraussetzungen

Bevor das Projekt gestartet werden kann, müssen folgende Programme auf dem System installiert sein:

- **Node.js** (empfohlene Version: 18 oder höher)
- **npm** (wird mit Node.js installiert)
- **Angular CLI** (global installieren mit `npm install -g @angular/cli`)
- **Drizzle Studio** (für die Datenbankverwaltung, lokal oder online)

---

## ⚙️ Backend – Startanleitung

1. `npm install`  
   Lädt alle benötigten Node-Module für das Backend-Projekt.

2. `npm run build`  
   Erstellt das `dist`-Verzeichnis, da TypeScript vor der Ausführung kompiliert werden muss.

3. `npm run start`  
   Startet das Backend im Entwicklungsmodus.

### Zusätzliche Befehle:

- `npm run db:studio`  
  Öffnet Drizzle Studio zur Ansicht und Verwaltung der Datenbankinhalte.

---

## 💻 Frontend – Startanleitung (Angular)

1. `npm install`  
   Installiert alle notwendigen Node-Module für das Angular-Frontend.

2. `npm run build`  
   Erstellt das `dist`-Verzeichnis, da TypeScript vor der Ausführung kompiliert werden muss.
   
3. `npm run start`  
   Startet das Angular-Frontend mit Proxy-Konfiguration, um API-Anfragen korrekt weiterzuleiten.

---

## 🔍 Hinweis zur Funktionalität

Einige Elemente der Webseite, wie z. B. „Passwort vergessen“ oder Zahlungsfunktionen, sind derzeit nur als visuelle Platzhalter umgesetzt. Diese Features waren nicht Teil der Projektanforderungen, sind aber für die zukünftige Nutzung der Webseite geplant und werden nach dem Projektabschluss vollständig implementiert.

---

## 💡 Einsatz von KI-Tools im Entwicklungsprozess

Während der Entwicklung der Webseite habe ich verschiedene KI-Tools wie ChatGPT und DeepSeek unterstützend eingesetzt.

Diese Tools wurden insbesondere in folgenden Bereichen verwendet:

- Zu Beginn bei Grundlagen in HTML und CSS, um erste Layouts zu strukturieren
- In der Frontend-Entwicklung mit Angular, um komplexere Funktionen besser zu verstehen
- Im Backend zur Klärung bestimmter Programmierlogik in Node.js und Express.js
- Bei der Integration von Frontend und Backend, insbesondere zur Lösung von Verbindungsproblemen zwischen den Komponenten
