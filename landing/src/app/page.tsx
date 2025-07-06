import { ChevronRightIcon, MapPinIcon, TrophyIcon, UsersIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import { PlayIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/solid';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  J
                </div>
                <span className="ml-3 text-xl font-bold text-gray-900">JourneyFlux</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                  Features
                </a>
                <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                  How it works
                </a>
                <a href="#testimonials" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                  Testimonials
                </a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                  Pricing
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-medium text-sm border border-blue-200">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                MVP Live • Mercato Italia
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Trasforma l&apos;Italia in{" "}
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                avventure narrative
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Scopri i segreti nascosti delle città italiane attraverso <strong>Percorsi Narrativi</strong>, 
              <strong>Itinerari Community</strong> e <strong>Partner Experiences</strong> che trasformano ogni viaggio in un&apos;avventura coinvolgente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg flex items-center">
                <PlayIcon className="mr-2 w-5 h-5" />
                Guarda la Demo
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-gray-400 transition-colors flex items-center">
                <DevicePhoneMobileIcon className="mr-2 w-5 h-5" />
                Richiedi Accesso Beta
              </button>
            </div>
            
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">Live</div>
                <div className="text-gray-500 text-sm">MVP 2.0</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">4</div>
                <div className="text-gray-500 text-sm">Città Attive</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">16</div>
                <div className="text-gray-500 text-sm">Esperienze Totali</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">21</div>
                <div className="text-gray-500 text-sm">Badge Collezionabili</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Tre tipologie di <span className="text-blue-600">esperienze narrative</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Percorsi curati, itinerari community e partner locali che svelano i segreti delle città italiane
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <MapPinIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">🎭 Percorsi Narrativi</h3>
              <p className="text-gray-600 mb-4">
                Mini-avventure curate che raccontano storie, leggende e misteri urbani. 
                Ogni percorso ha intro narrative, tappe GPS e foto-enigma finale con ricompense esclusive.
              </p>
              <div className="text-sm text-blue-600 font-medium">
                6 percorsi disponibili • Roma & Napoli
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <UsersIcon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">🗺️ Itinerari Community</h3>
              <p className="text-gray-600 mb-4">
                Esperienze create da local ambassador e tour operator professionali. 
                Sistema di rating, recensioni e timeline dettagliate con costi e prenotazioni.
              </p>
              <div className="text-sm text-purple-600 font-medium">
                5 itinerari • Community + Tour Operator
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <TrophyIcon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">🍷 Partner Experiences</h3>
              <p className="text-gray-600 mb-4">
                Offerte esclusive da bar, ristoranti e botteghe locali. 
                Sconti fino al 30%, degustazioni speciali e badge partner dedicati per collezionisti.
              </p>
              <div className="text-sm text-green-600 font-medium">
                5 partner • QR codes e riscatti
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Come funziona <span className="text-blue-600">l&apos;esperienza narrative</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dalla scoperta dei contenuti al passaporto digitale: il viaggio in 3 step
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Esplora & Scegli</h3>
              <p className="text-gray-600">
                Scopri Percorsi Narrativi, Itinerari Community e Partner Experiences. 
                Filtra per città (Milano, Roma, Napoli, Firenze) e trova l&apos;avventura perfetta per te.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Vivi l&apos;Avventura</h3>
              <p className="text-gray-600">
                Segui le storie coinvolgenti, completa le tappe GPS, risolvi foto-enigma 
                e scopri segreti nascosti che il 99% dei turisti non vedrà mai.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Colleziona & Condividi</h3>
              <p className="text-gray-600">
                Ottieni badge esclusivi per il tuo passaporto digitale. 
                21 badge con sistema di rarità: da Comune a Epico. Diventa un Maestro Esploratore!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">6</div>
              <div className="text-gray-600">Percorsi Narrativi</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
              <div className="text-gray-600">Itinerari Community</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
              <div className="text-gray-600">Partner Experiences</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">21</div>
              <div className="text-gray-600">Badge Collezionabili</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <div id="testimonials">
        <Testimonials />
      </div>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Roadmap di sviluppo
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fasi di sviluppo strategico per l&apos;espansione del mercato e l&apos;avanzamento tecnologico
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-green-600">Fase 1 - Completata</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">MVP & Validazione Mercato</h3>
              <ul className="text-gray-600 space-y-2 text-left">
                <li>• Applicazioni iOS e Android</li>
                <li>• 5 città italiane integrate</li>
                <li>• Sistema di sfide core</li>
                <li>• Sistema achievement e punti</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-blue-600">Fase 2 - Q2 2024</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Scala & Partnership</h3>
              <ul className="text-gray-600 space-y-2 text-left">
                <li>• 20+ nuove città</li>
                <li>• Partnership con enti turistici</li>
                <li>• Gestione contenuti avanzata</li>
                <li>• Modello revenue sharing</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-purple-600">Fase 3 - Q4 2024</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Funzionalità Avanzate</h3>
              <ul className="text-gray-600 space-y-2 text-left">
                <li>• Integrazione AR</li>
                <li>• Funzionalità social</li>
                <li>• Espansione europea</li>
                <li>• Partnership enterprise</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership & Investment Section */}
      <section id="partnership" className="py-20 sm:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/4 w-28 h-28 bg-purple-500/10 rounded-full blur-xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Partnership strategiche e
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                opportunità di investimento
              </span>
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Unisciti alla rivoluzione travel-tech. Stiamo costruendo l&apos;infrastruttura 
              per il futuro delle esperienze turistiche basate su localizzazione.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-white/80">
              <div className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span>MVP Funzionante</span>
              </div>
              <div className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span>Validazione Mercato</span>
              </div>
              <div className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span>Tecnologia Scalabile</span>
              </div>
              <div className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span>Opportunità Mercato €50B</span>
              </div>
            </div>
          </div>

          {/* Partnership Options Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Investment Opportunity */}
            <div className="group bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-500">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                  <RocketLaunchIcon className="w-8 h-8 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-white mb-1">Partnership di Investimento</h3>
                  <div className="flex items-center text-blue-400">
                    <span className="text-sm font-semibold">Target Serie A</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 text-white/90">
                <p className="text-lg">
                  <strong>Scala tecnologia provata attraverso i mercati europei.</strong> 
                  Unisciti a imprenditori esperti con product-market fit validato.
                </p>
                
                <div className="bg-white/10 rounded-xl p-4">
                  <h4 className="font-semibold text-white mb-2">Highlights Investimento</h4>
                  <ul className="text-sm space-y-1">
                    <li>• MVP funzionante con engagement utente provato</li>
                    <li>• Mercato indirizzabile €50B+ (turismo Italia)</li>
                    <li>• Piattaforma tecnologica scalabile</li>
                    <li>• Percorso chiaro verso monetizzazione</li>
                  </ul>
                </div>
                
                <div className="bg-white/10 rounded-xl p-4">
                  <h4 className="font-semibold text-white mb-2">Utilizzo Fondi</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Sviluppo prodotto ed espansione team</li>
                    <li>• Espansione mercato a 25+ città europee</li>
                    <li>• Sviluppo partnership con enti turistici</li>
                    <li>• Marketing e acquisizione utenti</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-4 border border-blue-400/30">
                  <h4 className="font-semibold text-blue-400 mb-2">Cosa Offriamo</h4>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Team esperto</strong> con background tech e turismo</li>
                    <li>• <strong>Tecnologia provata</strong> pronta per la scala</li>
                    <li>• <strong>Strategia di monetizzazione</strong> chiara</li>
                    <li>• <strong>Grande mercato indirizzabile</strong> con potenziale di crescita</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Partnership Opportunity */}
            <div className="group bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-500">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                  <UsersIcon className="w-8 h-8 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-white mb-1">Partnership Strategica</h3>
                  <div className="flex items-center text-green-400">
                    <span className="text-sm font-semibold">Turismo & Hospitality</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 text-white/90">
                <p className="text-lg">
                  <strong>Integrazione con infrastruttura turistica esistente.</strong> 
                  Sfrutta la nostra piattaforma per migliorare l&apos;engagement dei visitatori e raccogliere dati preziosi.
                </p>
                
                <div className="bg-white/10 rounded-xl p-4">
                  <h4 className="font-semibold text-white mb-2">Benefici Partnership</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Maggiore engagement e retention dei visitatori</li>
                    <li>• Dati turistici preziosi e analytics</li>
                    <li>• Trasformazione digitale del turismo tradizionale</li>
                    <li>• Opportunità di revenue sharing</li>
                  </ul>
                </div>
                
                <div className="bg-white/10 rounded-xl p-4">
                  <h4 className="font-semibold text-white mb-2">Partner Ideali</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Enti turistici e destination management</li>
                    <li>• Hotel, ristoranti e attrazioni</li>
                    <li>• Agenzie di viaggio e tour operator</li>
                    <li>• Aziende tecnologiche e mobilità</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-xl p-4 border border-green-400/30">
                  <h4 className="font-semibold text-green-400 mb-2">Valore Partnership</h4>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Maggiore tempo di permanenza</strong> e spesa dei visitatori</li>
                    <li>• <strong>Dati clienti ricchi</strong> per business intelligence</li>
                    <li>• <strong>Marketing digitale</strong> attraverso gamification</li>
                    <li>• <strong>Turismo sostenibile</strong> attraverso migliore distribuzione</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-8 mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">
                Pronto a discutere opportunità?
              </h3>
              <p className="text-white/90 text-lg mb-6">
                Pianifica un incontro per esplorare possibilità di investimento e partnership
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:partnerships@journeyflux.com?subject=Richiesta%20Investimento&body=Salve%20Team%20JourneyFlux,%0A%0ASono%20interessato%20a%20discutere%20opportunità%20di%20investimento%20per%20la%20vostra%20piattaforma.%0A%0AFornitemi%20per%20favore%20la%20vostra%20disponibilità%20per%20una%20chiamata%20o%20un%20incontro.%0A%0ADistinti%20saluti"
                  className="group bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
                >
                  Richiesta Investimento
                  <ChevronRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="mailto:partnerships@journeyflux.com?subject=Richiesta%20Partnership&body=Salve%20Team%20JourneyFlux,%0A%0ASono%20interessato%20a%20esplorare%20opportunità%20di%20partnership%20con%20la%20vostra%20piattaforma.%0A%0AFornitemi%20per%20favore%20la%20vostra%20disponibilità%20per%20una%20discussione.%0A%0ADistinti%20saluti"
                  className="group bg-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
                >
                  Richiesta Partnership
                  <ChevronRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 rounded-2xl p-6">
                <div className="text-2xl mb-2">⚡</div>
                <h4 className="font-semibold text-white mb-2">Risposta Rapida</h4>
                <p className="text-white/80 text-sm">
                  Risposta iniziale entro 24 ore. Presentazione completa disponibile su richiesta.
                </p>
              </div>
              <div className="bg-white/10 rounded-2xl p-6">
                <div className="text-2xl mb-2">🌍</div>
                <h4 className="font-semibold text-white mb-2">Focus Europeo</h4>
                <p className="text-white/80 text-sm">
                  Iniziando dall&apos;Italia, espansione verso i principali mercati turistici europei.
                </p>
              </div>
              <div className="bg-white/10 rounded-2xl p-6">
                <div className="text-2xl mb-2">📊</div>
                <h4 className="font-semibold text-white mb-2">Data-Driven</h4>
                <p className="text-white/80 text-sm">
                  Analytics comprensivi e reporting per tutti gli stakeholder.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <div id="pricing">
        <Pricing />
      </div>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/10 rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Pronto a trasformare il turismo?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
            Unisciti alla prossima generazione di tecnologia travel. 
            <br className="hidden sm:block" />
            Vivi il futuro dell&apos;engagement basato su localizzazione.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group bg-white text-blue-600 px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-white/30 transform hover:scale-105 flex items-center">
              <RocketLaunchIcon className="mr-3 w-6 h-6 group-hover:scale-110 transition-transform" />
              Richiedi Demo Piattaforma
            </button>
            <button className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center">
              <PlayIcon className="mr-3 w-6 h-6 group-hover:scale-110 transition-transform" />
              Guarda Panoramica Tecnologica
            </button>
          </div>
          <div className="mt-12 flex justify-center items-center space-x-8 text-white/70">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span>Piattaforma Live</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span>Tecnologia Provata</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span>Soluzione Scalabile</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  J
                </div>
                <span className="ml-3 text-2xl font-bold">JourneyFlux</span>
              </div>
              <p className="text-gray-400 mb-6">
                Piattaforma avanzata basata su localizzazione che trasforma il turismo attraverso gamification ed esperienze data-driven.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                  <span className="text-white font-bold text-sm">Li</span>
                </div>
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
                  <span className="text-white font-bold text-sm">Tw</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-white font-bold text-sm">Gh</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Piattaforma</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Funzionalità</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">Tecnologia</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Casi Studio</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Prezzi</a></li>
                <li><a href="#roadmap" className="hover:text-white transition-colors">Roadmap</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Business</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#partnership" className="hover:text-white transition-colors">Partnership</a></li>
                <li><a href="#partnership" className="hover:text-white transition-colors">Investimenti</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press Kit</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentazione</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Contatti</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="mailto:hello@journeyflux.com" className="hover:text-white transition-colors">hello@journeyflux.com</a></li>
                <li><a href="mailto:partnerships@journeyflux.com" className="hover:text-white transition-colors">partnerships@journeyflux.com</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentazione</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Supporto</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 JourneyFlux. Tutti i diritti riservati. Piattaforma avanzata di tecnologia travel.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
