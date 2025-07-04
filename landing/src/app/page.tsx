import Image from "next/image";
import { ChevronRightIcon, MapPinIcon, TrophyIcon, UsersIcon, SparklesIcon, StarIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import { PlayIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/solid';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg animate-pulse-glow">
                  J
                </div>
                <span className="ml-3 text-2xl font-bold text-white">JourneyFlux</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6">
                <a href="#features" className="text-white/80 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105">
                  ✨ Features
                </a>
                <a href="#how-it-works" className="text-white/80 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105">
                  🎯 Come Funziona
                </a>
                <a href="#testimonials" className="text-white/80 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105">
                  💬 Testimonials
                </a>
                <a href="#pricing" className="text-white/80 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105">
                  💎 Piani
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                🚀 Inizia Ora
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white font-medium text-sm backdrop-blur-sm border border-white/20">
                🚀 MVP Live - Inizia da Napoli!
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-8 leading-tight">
              Trasforma ogni viaggio in una
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient">
                AVVENTURA EPICA
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
              🎮 Gamifica la tua esperienza di viaggio con sfide geolocalizzate, 
              <br className="hidden sm:block" />
              badge collezionabili e contenuti creati dalla community
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-5 rounded-full font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-2xl hover:shadow-purple-500/30 transform hover:scale-105 flex items-center">
                <PlayIcon className="mr-3 w-6 h-6 group-hover:scale-110 transition-transform" />
                Guarda Demo
              </button>
              <button className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center">
                <DevicePhoneMobileIcon className="mr-3 w-6 h-6 group-hover:scale-110 transition-transform" />
                Scarica Beta
              </button>
            </div>
            
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">Beta</div>
                <div className="text-white/70 text-sm">Testing Phase</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">5+</div>
                <div className="text-white/70 text-sm">Città Italiane</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">100+</div>
                <div className="text-white/70 text-sm">Sfide Disponibili</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">🚀</div>
                <div className="text-white/70 text-sm">In Sviluppo</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-32 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-pink-50 to-red-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Perché tutti parlano di 
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> JourneyFlux?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              La prima app al mondo che trasforma il turismo in un'esperienza gaming immersiva
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="group bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-purple-100 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
                <MapPinIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🎯 Sfide Geolocalizzate</h3>
              <p className="text-gray-600 mb-4">
                Esplora le città attraverso missioni GPS. Ogni location ha sfide culturali, gastronomiche e fotografiche verificate.
              </p>
              <div className="flex items-center justify-center text-sm text-purple-600 font-medium">
                <span>� Tecnologia GPS + Foto</span>
              </div>
            </div>
            
            <div className="group bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-orange-100 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
                <TrophyIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">💎 Badge Collezionabili</h3>
              <p className="text-gray-600 mb-4">
                Guadagna badge digitali unici per ogni città visitata. Scala le classifiche e diventa un esploratore leggendario!
              </p>
              <div className="flex items-center justify-center text-sm text-orange-600 font-medium">
                <span>🏆 Classifiche locali</span>
              </div>
            </div>
            
            <div className="group bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-green-100 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
                <UsersIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🌟 Community Driven</h3>
              <p className="text-gray-600 mb-4">
                Crea e condividi le tue sfide personalizzate. Tutti i contenuti sono moderati dalla community per qualità garantita.
              </p>
              <div className="flex items-center justify-center text-sm text-green-600 font-medium">
                <span>� Contenuti user-generated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 sm:py-32 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-pink-900/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Come funziona la 
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">magia</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Tre passi per diventare un esploratore leggendario
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">🎯 Scopri & Scegli</h3>
              <p className="text-gray-300 text-lg">
                Apri l'app, scegli la tua città preferita e scopri decine di sfide GPS personalizzate per te.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">📸 Esplora & Completa</h3>
              <p className="text-gray-300 text-lg">
                Raggiungi le location, scatta le foto richieste e completa le missioni per guadagnare punti e badge.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">🏆 Colleziona & Condividi</h3>
              <p className="text-gray-300 text-lg">
                Scala le classifiche locali, colleziona badge esclusivi e condividi le tue avventure con la community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-teal-600 mb-2">20+</div>
              <div className="text-gray-600">Città Italiane</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-600 mb-2">500+</div>
              <div className="text-gray-600">Sfide Disponibili</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-600 mb-2">50+</div>
              <div className="text-gray-600">Badge Collezionabili</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-600 mb-2">10k+</div>
              <div className="text-gray-600">Beta Tester in Lista</div>
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
              La nostra roadmap
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Scopri cosa abbiamo in serbo per rendere JourneyFlux ancora più incredibile.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-green-600">Q1 2024</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">MVP Release</h3>
              <ul className="text-gray-600 space-y-2 text-center">
                <li>• App iOS e Android</li>
                <li>• 5 città italiane</li>
                <li>• Sistema di sfide base</li>
                <li>• Badge e punti</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-yellow-600">Q2 2024</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Espansione</h3>
              <ul className="text-gray-600 space-y-2 text-center">
                <li>• 15 nuove città</li>
                <li>• Contenuti UGC</li>
                <li>• Sistema di moderazione</li>
                <li>• Tour tematici</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-blue-600">Q3 2024</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Funzionalità Avanzate</h3>
              <ul className="text-gray-600 space-y-2 text-center">
                <li>• Realtà Aumentata</li>
                <li>• Social features</li>
                <li>• Partnership locali</li>
                <li>• Espansione Europea</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <div id="pricing">
        <Pricing />
      </div>

      {/* Roadmap Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-r from-gray-50 to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Il futuro di 
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">JourneyFlux</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Scopri cosa stiamo sviluppando per rendere la tua esperienza ancora più incredibile
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-green-200">
              <div className="flex items-center mb-6">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm font-bold text-green-600">✅ ATTIVO ORA</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🚀 MVP Base</h3>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  App iOS e Android funzionante
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  5 città italiane disponibili
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Sfide GPS + foto verification
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Sistema badge e punti
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Contenuti user-generated
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-yellow-200">
              <div className="flex items-center mb-6">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-sm font-bold text-yellow-600">🔨 IN SVILUPPO</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">📱 Espansione</h3>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-center">
                  <span className="text-yellow-500 mr-2">⏳</span>
                  15 nuove città italiane
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-500 mr-2">⏳</span>
                  Tour tematici avanzati
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-500 mr-2">⏳</span>
                  Sistema di moderazione IA
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-500 mr-2">⏳</span>
                  Classifiche globali
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-500 mr-2">⏳</span>
                  Partnership con locali
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-purple-200">
              <div className="flex items-center mb-6">
                <div className="w-4 h-4 bg-purple-500 rounded-full mr-3"></div>
                <span className="text-sm font-bold text-purple-600">🔮 FUTURO</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🌟 Next Level</h3>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-center">
                  <span className="text-purple-500 mr-2">🔮</span>
                  Integrazione Realtà Aumentata
                </li>
                <li className="flex items-center">
                  <span className="text-purple-500 mr-2">🔮</span>
                  Badge NFT collezionabili
                </li>
                <li className="flex items-center">
                  <span className="text-purple-500 mr-2">🔮</span>
                  Revenue sharing per creator
                </li>
                <li className="flex items-center">
                  <span className="text-purple-500 mr-2">🔮</span>
                  Espansione europea
                </li>
                <li className="flex items-center">
                  <span className="text-purple-500 mr-2">🔮</span>
                  Premi e rewards reali
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="mb-8">
            <div className="text-6xl mb-4">🚀</div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Pronto per diventare una 
            <br />
            <span className="text-yellow-300">LEGGENDA?</span>
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
            Unisciti ai primi esploratori che stanno testando l'app. 
            <br className="hidden sm:block" />
            Il tuo viaggio gamificato inizia con un click.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group bg-white text-purple-600 px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-white/30 transform hover:scale-105 flex items-center">
              <RocketLaunchIcon className="mr-3 w-6 h-6 group-hover:scale-110 transition-transform" />
              Diventa Beta Tester
            </button>
            <button className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center">
              <PlayIcon className="mr-3 w-6 h-6 group-hover:scale-110 transition-transform" />
              Guarda in Azione
            </button>
          </div>
          <div className="mt-12 flex justify-center items-center space-x-8 text-white/70">
            <div className="flex items-center">
              <span className="text-2xl mr-2">🧪</span>
              <span>Beta Testing</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-2">🆓</span>
              <span>100% Gratis</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-2">🇮🇹</span>
              <span>Made in Italy</span>
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
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  J
                </div>
                <span className="ml-3 text-2xl font-bold">JourneyFlux</span>
              </div>
              <p className="text-gray-400 mb-6">
                La prima app al mondo che trasforma il turismo in un'avventura gaming epica.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors cursor-pointer">
                  <span className="text-white font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors cursor-pointer">
                  <span className="text-white font-bold">ig</span>
                </div>
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
                  <span className="text-white font-bold">yt</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">🚀 Prodotto</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">✨ Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">🎯 Come Funziona</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">💬 Testimonials</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">💎 Piani</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">🏢 Azienda</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">👥 Team</a></li>
                <li><a href="#" className="hover:text-white transition-colors">💼 Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">📰 Press Kit</a></li>
                <li><a href="#" className="hover:text-white transition-colors">🤝 Partnership</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">📞 Contatti</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="mailto:hello@journeyflux.com" className="hover:text-white transition-colors">✉️ hello@journeyflux.com</a></li>
                <li><a href="#" className="hover:text-white transition-colors">🎧 Supporto 24/7</a></li>
                <li><a href="#" className="hover:text-white transition-colors">💬 Live Chat</a></li>
                <li><a href="#" className="hover:text-white transition-colors">📱 Social Media</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 JourneyFlux. Tutti i diritti riservati. Made with ❤️ in Italy 🇮🇹</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
