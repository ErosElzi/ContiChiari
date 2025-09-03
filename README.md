# Gestione Spese Personali

Un'applicazione completa per la gestione e analisi delle spese personali, sviluppata con **C# ASP.NET Core Web API** per il backend e **Angular** con **Angular Material** per il frontend.

## 🚀 Caratteristiche

- **Dashboard interattiva** con grafici per l'analisi delle spese
- **Gestione categorie** predefinite (Alimentari, Trasporti, Casa, etc.)
- **Form intuitivo** per aggiungere nuove spese
- **Visualizzazione tabellare** delle spese con filtri
- **Grafici a torta** per distribuzione per categoria
- **Grafici a barre** per andamento mensile
- **Statistiche automatiche** (totale, media, conteggio)
- **Design responsivo** ottimizzato per mobile e desktop

## 🛠️ Tecnologie Utilizzate

### Backend
- **C# ASP.NET Core 8.0** - Framework web
- **Entity Framework Core** - ORM per database
- **SQL Server LocalDB** - Database
- **Swagger** - Documentazione API

### Frontend
- **Angular 15** - Framework frontend
- **Angular Material** - Libreria UI
- **Chart.js + ng2-charts** - Grafici interattivi
- **TypeScript** - Linguaggio tipizzato
- **RxJS** - Programmazione reattiva

## 📋 Prerequisiti

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 16+](https://nodejs.org/)
- [Angular CLI](https://cli.angular.io/) (`npm install -g @angular/cli`)
- SQL Server LocalDB (incluso in Visual Studio)

## ⚡ Avvio Rapido

### 1. Backend (ASP.NET Core API)

```bash
# Naviga nella cartella backend
cd Backend

# Ripristina i pacchetti
dotnet restore

# Applica le migrazioni del database
dotnet ef database update

# Avvia l'API
dotnet run
```

L'API sarà disponibile su: `https://localhost:7000`
Swagger UI: `https://localhost:7000/swagger`

### 2. Frontend (Angular)

```bash
# Naviga nella cartella frontend
cd Frontend/spese-personali-app

# Installa le dipendenze
npm install

# Avvia l'app Angular
ng serve
```

L'applicazione sarà disponibile su: `http://localhost:4200`

## 📁 Struttura del Progetto

```
ContiChiari/
├── Backend/                    # ASP.NET Core Web API
│   ├── Controllers/           # Controller API
│   ├── Models/               # Modelli dati
│   ├── Data/                 # DbContext e configurazioni
│   ├── Program.cs            # Configurazione app
│   └── appsettings.json      # Configurazioni
│
├── Frontend/spese-personali-app/  # Angular Application
│   ├── src/app/
│   │   ├── components/       # Componenti Angular
│   │   ├── models/          # Modelli TypeScript
│   │   ├── services/        # Servizi Angular
│   │   └── app.module.ts    # Modulo principale
│   └── package.json
│
└── README.md
```

## 🔧 Configurazione Database

Il progetto utilizza **SQL Server LocalDB** per semplicità. La stringa di connessione è configurata in `Backend/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=SpesePersonaliDB;Trusted_Connection=true;MultipleActiveResultSets=true"
  }
}
```

### Migrazioni Entity Framework

```bash
# Creare una nuova migrazione
dotnet ef migrations add NomeMigrazione

# Applicare le migrazioni
dotnet ef database update

# Rimuovere l'ultima migrazione
dotnet ef migrations remove
```

## 📊 API Endpoints

### Spese
- `GET /api/spese` - Lista tutte le spese
- `GET /api/spese/{id}` - Dettagli spesa specifica
- `POST /api/spese` - Crea nuova spesa
- `PUT /api/spese/{id}` - Aggiorna spesa
- `DELETE /api/spese/{id}` - Elimina spesa
- `GET /api/spese/per-categoria` - Statistiche per categoria
- `GET /api/spese/per-mese` - Statistiche mensili

### Categorie
- `GET /api/categorie` - Lista categorie
- `GET /api/categorie/{id}` - Dettagli categoria
- `POST /api/categorie` - Crea categoria
- `PUT /api/categorie/{id}` - Aggiorna categoria
- `DELETE /api/categorie/{id}` - Elimina categoria

## 🎨 Componenti Frontend

- **DashboardComponent** - Dashboard con grafici e statistiche
- **SpeseListComponent** - Tabella delle spese
- **SpesaFormComponent** - Form per aggiungere/modificare spese
- **SpeseService** - Servizio per chiamate API

## 🚀 Deploy

### Backend
```bash
# Build per produzione
dotnet publish -c Release -o ./publish

# L'app può essere deployata su Azure App Service, IIS, o Docker
```

### Frontend
```bash
# Build per produzione
ng build --prod

# I file saranno in dist/ e possono essere serviti da qualsiasi web server
```

## 🤝 Contribuire

1. Fork il progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit le modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📝 Licenza

Questo progetto è sotto licenza MIT - vedi il file [LICENSE](LICENSE) per i dettagli.

## ✨ Features Future

- [ ] Autenticazione e autorizzazione utenti
- [ ] Import/Export dati (CSV, Excel)
- [ ] Notifiche budget e obiettivi
- [ ] App mobile (Ionic/React Native)
- [ ] Integrazione con banche (Open Banking)
- [ ] Report PDF personalizzabili
- [ ] Dashboard avanzata con più grafici
- [ ] Gestione ricorrenze spese

---

💡 **Suggerimento**: Per una migliore esperienza di sviluppo, usa Visual Studio Code con le estensioni C# e Angular.