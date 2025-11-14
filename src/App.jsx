import React, { useState } from 'react';
import {
  Users,
  Calendar,
  Zap,
  Dumbbell,
  MessageSquare,
  Trophy,
  Play,
  ClipboardList,
  User,
  LayoutDashboard,
  Bell,
  Monitor,
  CheckCircle,
  Clock,
  Search,
  Plus,
  Settings,
  Edit,
  Activity
} from 'lucide-react';

// --- FARBDEFINITIONEN ---
const patientColors = {
  bg: 'bg-emerald-900/40',
  border: 'border-emerald-600',
  icon: 'text-emerald-400',
  primary: 'text-emerald-500',
  button: 'bg-emerald-600 hover:bg-emerald-700',
  text: 'text-emerald-400',
  lightBg: 'bg-emerald-800/60'
};

const physioColors = {
  bg: 'bg-indigo-900/40',
  border: 'border-indigo-600',
  icon: 'text-indigo-400',
  primary: 'text-indigo-500',
  button: 'bg-indigo-600 hover:bg-indigo-700',
  text: 'text-indigo-400',
  lightBg: 'bg-indigo-800/60'
};

const aiColors = {
  bg: 'bg-gradient-to-br from-emerald-900 to-indigo-900',
  border: 'border-emerald-500', // Cosmetic border
  icon: 'text-white',
  primary: 'text-white',
  button: 'bg-white/10 hover:bg-white/20',
  text: 'text-gray-200',
  lightBg: 'bg-gray-700/50'
};
// --- ENDE FARBDEFINITIONEN ---


// Mock data (Simulierte Daten)
const mockPatientData = {
  name: "Mia Schmidt",
  nextExercise: "Kniebeugen (3 Sätze, 12 Wiederholungen)",
  progress: 75,
  reminders: ["Termin mit Therapeutin Müller um 14:00 Uhr"],
  recentAchievements: ["Level 5 erreicht", "30-Tage-Serie"],
  plan: [
    { day: 'Mo', exercises: ['Kniebeugen', 'Dehnung', 'Laufen'], status: 'completed' },
    { day: 'Di', exercises: ['Rückenstrecker', 'Plank'], status: 'missed' },
    { day: 'Mi', exercises: ['Ruhetag'], status: 'rest' },
    { day: 'Do', exercises: ['Kniebeugen', 'Dehnung'], status: 'pending' },
  ]
};

const mockPhysioData = {
  patients: [
    { id: 1, name: "Max Mustermann", lastLogin: "2 Stunden her", status: "Gut", compliance: "85%" },
    { id: 2, name: "Anna Beispiel", lastLogin: "Gestern", status: "Stabil", compliance: "60%" },
    { id: 3, name: "Tom Tester", lastLogin: "1 Woche her", status: "Verbesserung", compliance: "95%" },
  ],
  aiSummaries: [
    { id: 1, patient: "Max Mustermann", summary: "Verbesserte Mobilität im linken Knie um 15% seit letzter Woche. Schmerz-Score stabil.", date: "1 Std. her" },
    { id: 2, patient: "Anna Beispiel", summary: "Muss an Rumpfstabilität arbeiten. Trainingsintensität heute niedrig.", date: "Gestern" },
  ],
  exercises: [
    { id: 1, name: "Kniebeugen", focus: "Beine, Rumpf", level: "Mittel" },
    { id: 2, name: "Dehnung", focus: "Oberschenkel", level: "Leicht" },
  ]
};

// --- Komponente: Logo (PhysioGuide) ---
const LogoComponent = () => (
    <div className="flex items-center justify-center md:justify-start">
        {/* Shield Icon: Simplified inline SVG based on the uploaded logo's style */}
        <div className="relative w-8 h-8 mr-2 flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                {/* Shield Background (split in two colors using gradient for smooth transition in a single path) */}
                <path d="M12 2L4 5V11.5C4 17.02 7.8 21.72 12 23C16.2 21.72 20 17.02 20 11.5V5L12 2Z" fill="url(#logoGradient)" />
                <defs>
                    <linearGradient id="logoGradient" x1="4" y1="12.5" x2="20" y2="12.5" gradientUnits="userSpaceOnUse">
                        <stop offset="50%" stopColor="#4F46E5"/> {/* Indigo (Blue - Therapeut) */}
                        <stop offset="50%" stopColor="#10B981"/> {/* Emerald (Green - Patient) */}
                    </linearGradient>
                </defs>
                {/* Running Figure (white) - Simplified geometric representation */}
                <path d="M14 17.5L16 15.5L14 13.5L12 11.5L10 13.5L8 15.5L10 17.5L12 19.5L14 17.5Z" fill="white" />
                <circle cx="12" cy="7" r="2" fill="white" />
            </svg>
        </div>

        {/* Text Section (mimics logo text styling) */}
        <div className="hidden md:block leading-none">
            <h1 className="text-xl font-extrabold">
                <span className="text-indigo-400">Physio</span><span className="text-emerald-400">Guide</span>
            </h1>
            <p className="text-xs font-medium text-gray-400 mt-0.5 tracking-wider">DEIN DIGITALER PHYSIO-COACH.</p>
        </div>
        {/* Fallback for collapsed view (only the SVG icon is visible) */}
    </div>
);


// --- Komponente: Navigations-Button ---
const NavButton = ({ icon: Icon, title, isActive, onClick, activeColorClass }) => (
  <button
    className={`flex items-center w-full p-3 my-1 rounded-xl transition-all duration-200 ${
      isActive
        ? `text-white shadow-lg ${activeColorClass}`
        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
    }`}
    onClick={onClick}
  >
    <Icon className="w-5 h-5 mr-3" />
    <span className="font-medium text-sm hidden md:block">{title}</span>
  </button>
);

// --- Komponente: Dashboard-Karte ---
const DashboardCard = ({ title, content, icon: Icon, color }) => (
  <div className={`p-5 rounded-2xl shadow-xl border ${color.bg.includes('gradient') ? color.bg : `${color.bg} border-l-4 ${color.border}`} transition-shadow hover:shadow-2xl h-full`}>
    <div className="flex items-center mb-3">
      <Icon className={`w-6 h-6 mr-3 ${color.icon}`} />
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
    <div className="text-gray-300">
      {content}
    </div>
  </div>
);

// --- Patient: Trainingsplan Visualisierung (Card) ---
const TrainingPlanVisualization = ({ color }) => (
  <DashboardCard
    title="Trainingsplan Visualisierung"
    icon={Dumbbell}
    color={color}
    content={
      <>
        <div className="text-sm font-light text-white mb-1">Fortschritt diese Woche:</div>
        <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
          <div
            className={`${color.button.split(' ')[0]} h-3 rounded-full transition-all duration-500`}
            style={{ width: `${mockPatientData.progress}%` }}
          ></div>
        </div>
        <p className="text-3xl font-bold text-white mb-2">{mockPatientData.progress}% abgeschlossen</p>
        <div className="flex items-center text-gray-400">
          <Clock className="w-4 h-4 mr-2" />
          <span className="text-sm">Nächste Übung: {mockPatientData.nextExercise}</span>
        </div>
      </>
    }
  />
);

// --- Patient: Video Player / Trainingsmodus (Card) ---
const TrainingMode = ({ color }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <DashboardCard
      title="Trainingsmodus / Videoplayer"
      icon={Play}
      color={color}
      content={
        <div className="relative w-full aspect-video bg-black/70 rounded-xl flex items-center justify-center overflow-hidden">
          <span className="absolute top-2 left-3 text-xs text-white bg-black/50 p-1 rounded">Übung 1 von 5</span>
          <div className="text-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-4 ${color.button.split(' ')[0]}/80 hover:${color.button.split(' ')[0]} rounded-full transition-all shadow-xl`}
            >
              <Play className={`w-8 h-8 ${isPlaying ? 'opacity-0' : 'opacity-100'}`} fill="white" />
            </button>
            <p className="mt-2 text-sm text-gray-300">Klicken Sie, um die angeleitete Sitzung zu starten</p>
          </div>
          <div className={`absolute bottom-0 w-full h-2 ${color.button.split(' ')[0]}/50`}>
            <div className={`${color.button.split(' ')[0]} h-full`} style={{ width: '40%' }}></div>
          </div>
        </div>
      }
    />
  );
};

// --- Patient: KI Chat Widget (Card) ---
const AIChatWidget = ({ color }) => (
  <DashboardCard
    title="KI Chat (Fragen zur Übung)"
    icon={MessageSquare}
    color={color}
    content={
      <>
        <div className="h-28 overflow-y-auto space-y-2 mb-3 p-2 bg-gray-700/50 rounded-lg text-sm">
          <div className="text-right">
            <span className="inline-block bg-emerald-700 text-white p-2 rounded-lg rounded-br-none max-w-xs">Tut mein Rücken weh?</span>
          </div>
          <div className="text-left">
            <span className="inline-block bg-indigo-600 text-white p-2 rounded-lg rounded-tl-none max-w-xs">
              Bitte beschreiben Sie das Schmerzgefühl genauer...
            </span>
          </div>
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Ihre Nachricht..."
            className="w-full p-2 bg-gray-700 rounded-l-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
          <button className="px-3 bg-gradient-to-r from-emerald-600 to-indigo-600 rounded-r-lg hover:opacity-90">
            <Zap className="w-5 h-5 text-white" />
          </button>
        </div>
      </>
    }
  />
);

// --- Patient: Kalender & Terminerinnerung (Card) ---
const CalendarReminders = ({ color }) => (
  <DashboardCard
    title="Kalender & Terminerinnerung"
    icon={Calendar}
    color={color}
    content={
      <>
        <div className="text-3xl font-extrabold text-white mb-1">Freitag, 31. Okt</div>
        <p className={`${color.text} mb-4`}>Ihr Plan für heute: 5 Übungen</p>

        <div className="space-y-2">
          {mockPatientData.reminders.map((reminder, index) => (
            <div key={index} className="flex items-center p-3 bg-gray-700 rounded-xl border-l-4 border-yellow-500">
              <Bell className="w-5 h-5 text-yellow-500 mr-3" />
              <span className="text-sm">{reminder}</span>
            </div>
          ))}
          <div className="flex items-center p-3 bg-gray-700 rounded-xl border-l-4 border-emerald-500">
            <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
            <span className="text-sm">Abgeschlossen: 3 Übungen</span>
          </div>
        </div>
      </>
    }
  />
);

// --- Patient: Achievements & Skins (Card) ---
const GamificationWidget = ({ color }) => (
  <DashboardCard
    title="Erfolge & Skins"
    icon={Trophy}
    color={color}
    content={
      <>
        <div className="flex justify-between items-center mb-3">
          <p className="text-white font-semibold">Aktuelle Abzeichen:</p>
          <button className={`text-sm ${color.text} hover:text-white`}>Skins wählen</button>
        </div>
        <div className="flex space-x-3 mb-4">
          <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-lg shadow-md">🏅</div>
          <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-lg shadow-md">💪</div>
          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-lg shadow-md">✨</div>
        </div>
        <ul className="list-disc list-inside text-sm space-y-1">
          {mockPatientData.recentAchievements.map((ach, index) => (
            <li key={index} className="text-gray-400">{ach}</li>
          ))}
        </ul>
      </>
    }
  />
);

// --- Content: Patient Dashboard ---
const PatientDashboard = () => (
  <div className="p-4 sm:p-6 lg:p-8 space-y-6">
    <h2 className="text-3xl font-bold text-white mb-6">Willkommen zurück, {mockPatientData.name}!</h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <TrainingPlanVisualization color={patientColors} />
      <CalendarReminders color={patientColors} />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <TrainingMode color={patientColors} />
      </div>
      <AIChatWidget color={aiColors} />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GamificationWidget color={patientColors} />
        <DashboardCard title="Rangliste (Top 10)" icon={Users} color={patientColors} content={<p className="text-sm">Hier sehen Sie, wie Sie im Vergleich zu anderen in Ihrer Gruppe abschneiden.</p>} />
        <DashboardCard title="Community Hub" icon={Monitor} color={patientColors} content={<p className="text-sm">Aktuelle Beiträge, Tipps & Tricks und Diskussionsforen.</p>} />
    </div>
  </div>
);

// --- Physio: KI Zusammenfassungen (Card) ---
const AISummariesList = ({ color }) => (
  <DashboardCard
    title="KI-Zusammenfassungen"
    icon={MessageSquare}
    color={color}
    content={
      <div className="space-y-3 h-72 overflow-y-auto pr-2">
        {mockPhysioData.aiSummaries.map(s => (
          <div key={s.id} className="p-3 bg-gray-700 rounded-lg shadow">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-semibold text-white">{s.patient}</span>
              <span className="text-gray-400">{s.date}</span>
            </div>
            <p className="text-sm text-gray-300 line-clamp-2">{s.summary}</p>
          </div>
        ))}
        <button className={`w-full p-2 rounded-xl text-sm font-semibold mt-4 ${aiColors.button} ${aiColors.text}`}>
            Alle Berichte anzeigen
        </button>
      </div>
    }
  />
);

// --- Physio: Übungen Zuweisen (Card) ---
const ExerciseAssignment = ({ color }) => {
    const [selectedPatient, setSelectedPatient] = useState(mockPhysioData.patients[0].id);
    return (
      <DashboardCard
        title="Übungen einfach zuweisen (Übungsverwaltung)"
        icon={ClipboardList}
        color={color}
        content={
          <div className="space-y-4">
            <select
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(parseInt(e.target.value))}
              className="w-full p-2 bg-gray-700 rounded-lg text-white focus:ring-indigo-500 focus:border-indigo-500"
            >
              {mockPhysioData.patients.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <textarea
              placeholder="Übungsdetails (z.B. '3x15, 3x pro Woche, 15 Grad Flexion')"
              className="w-full p-3 bg-gray-700 rounded-lg text-white h-24 resize-none focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
            <button className={`w-full p-3 rounded-xl text-white font-bold transition-colors ${color.button}`}>
              Zuweisung speichern
            </button>
          </div>
        }
      />
    );
};

// --- Content: Physio Dashboard ---
const PhysioDashboard = () => (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <h2 className="text-3xl font-bold text-white mb-6">Physio-Dashboard (Therapeut)</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ExerciseAssignment color={physioColors} />
            <AISummariesList color={aiColors} />
        </div>
        <DashboardCard
          title="Patientenübersicht & Status"
          icon={Users}
          color={physioColors}
          content={
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-400">
                <thead className="text-xs uppercase bg-indigo-700/50 text-gray-300">
                  <tr>
                    <th scope="col" className="px-6 py-3">Patient</th>
                    <th scope="col" className="px-6 py-3">Compliance</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                    <th scope="col" className="px-6 py-3">Aktion</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPhysioData.patients.map(p => (
                    <tr key={p.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                        {p.name}
                      </th>
                      <td className="px-6 py-4">{p.compliance}</td>
                      <td className="px-6 py-4">{p.status}</td>
                      <td className="px-6 py-4">
                        <button className={`${physioColors.text} hover:text-white text-xs font-semibold flex items-center`}>
                            <Edit className="w-3 h-3 mr-1" /> Plan bearbeiten
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
        />
    </div>
);

// --- DEDIZIERTE PATIENTEN-ANSICHTEN ---

const PlanView = ({ color }) => (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <h2 className="text-3xl font-bold text-white mb-6">Ihr detaillierter Trainingsplan</h2>
        <DashboardCard
          title="Wochenübersicht"
          icon={Calendar}
          color={color}
          content={
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {mockPatientData.plan.map((item, index) => (
                <div key={index} className={`p-4 rounded-xl shadow-lg border ${item.status === 'completed' ? 'bg-emerald-700/50 border-emerald-500' : item.status === 'pending' ? 'bg-gray-700 border-gray-500' : 'bg-red-700/50 border-red-500'}`}>
                  <p className="text-lg font-bold text-white mb-1">{item.day}</p>
                  <ul className="text-sm space-y-1">
                    {item.exercises.map((e, i) => <li key={i} className="text-gray-200">{e}</li>)}
                  </ul>
                  <span className="mt-2 block text-xs font-semibold uppercase">
                    {item.status === 'completed' ? 'Abgeschlossen' : item.status === 'pending' ? 'Ausstehend' : 'Verpasst/Ruhetag'}
                  </span>
                </div>
              ))}
            </div>
          }
        />
        <button className={`p-3 rounded-xl text-white font-bold transition-colors ${color.button}`}>
            <Play className="w-5 h-5 mr-2 inline" /> Training für heute starten
        </button>
    </div>
);

const CalendarView = ({ color }) => (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <h2 className="text-3xl font-bold text-white mb-6">Kalender & Termine</h2>
        <DashboardCard
          title="Monatsansicht"
          icon={Calendar}
          color={color}
          content={
            <div className="bg-gray-700 p-4 rounded-xl aspect-[4/3] text-center flex items-center justify-center">
              <p className="text-gray-400">Hier würde ein interaktiver Kalender mit Terminen und Trainingssessions geladen.</p>
            </div>
          }
        />
        <DashboardCard
          title="Terminerinnerungen"
          icon={Bell}
          color={color}
          content={
            <ul className="space-y-3">
              <li className="p-3 bg-gray-700 rounded-xl flex justify-between items-center border-l-4 border-yellow-500">
                <span>Physio-Termin mit Dr. Müller, 14:00 Uhr</span>
                <span className="text-xs text-yellow-400">Heute</span>
              </li>
              <li className="p-3 bg-gray-700 rounded-xl flex justify-between items-center border-l-4 border-emerald-500">
                <span>Trainingseinheit 'Beine & Rumpf'</span>
                <span className="text-xs text-emerald-400">Morgen</span>
              </li>
            </ul>
          }
        />
    </div>
);

const AIChatView = ({ color }) => (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <h2 className="text-3xl font-bold text-white mb-6">KI Chat mit Ihrem persönlichen Physio-Assistenten</h2>
        <DashboardCard
          title="KI Konversation"
          icon={MessageSquare}
          color={color}
          content={
            <div className="flex flex-col h-[500px]">
                <div className="flex-grow overflow-y-auto space-y-4 p-4">
                    <div className="flex justify-start">
                        <span className="inline-block bg-indigo-700 text-white p-3 rounded-xl rounded-tl-none max-w-xs shadow-lg">Willkommen Mia! Wie fühlen Sie sich heute?</span>
                    </div>
                    <div className="flex justify-end">
                        <span className="inline-block bg-emerald-700 text-white p-3 rounded-xl rounded-br-none max-w-xs shadow-lg">Ich habe leichte Schmerzen im rechten Knie nach den Kniebeugen. Ist das normal?</span>
                    </div>
                </div>
                <div className="flex mt-4">
                  <input
                    type="text"
                    placeholder="Frage eingeben oder Symptome beschreiben..."
                    className="flex-grow p-3 bg-gray-700 rounded-l-xl text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <button className={`px-5 rounded-r-xl text-white font-bold transition-colors bg-gradient-to-r from-emerald-600 to-indigo-600 hover:opacity-90`}>
                    <Zap className="w-6 h-6" />
                  </button>
                </div>
            </div>
          }
        />
    </div>
);

const LeaderboardView = ({ color }) => (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <h2 className="text-3xl font-bold text-white mb-6">Rangliste & Wettbewerb</h2>
        <DashboardCard
          title="Top 10 Physiokrieger"
          icon={Trophy}
          color={color}
          content={
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-400">
                <thead className="text-xs uppercase bg-emerald-700/50 text-gray-300">
                  <tr>
                    <th scope="col" className="px-6 py-3">Rang</th>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">Punkte</th>
                    <th scope="col" className="px-6 py-3">Abzeichen</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { rank: 1, name: "Max Mustermann", points: 4500, badge: '🏅' },
                    { rank: 2, name: mockPatientData.name, points: 3980, badge: '💪' },
                    { rank: 3, name: "Lena Huber", points: 3100, badge: '✨' },
                  ].map((p) => (
                    <tr key={p.rank} className={`border-b border-gray-700 ${p.rank === 2 ? 'bg-emerald-800/50 text-white font-bold' : 'bg-gray-800 hover:bg-gray-700'}`}>
                      <td className="px-6 py-4">{p.rank}</td>
                      <td className="px-6 py-4">{p.name}</td>
                      <td className="px-6 py-4">{p.points}</td>
                      <td className="px-6 py-4 text-lg">{p.badge}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
        />
    </div>
);

const CommunityView = ({ color }) => (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <h2 className="text-3xl font-bold text-white mb-6">Community Hub</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
                <DashboardCard
                    title="Neuer Beitrag erstellen"
                    icon={Plus}
                    color={color}
                    content={
                        <>
                            <textarea placeholder="Was möchten Sie teilen?" className="w-full p-3 bg-gray-700 rounded-lg text-white h-16 resize-none focus:ring-emerald-500 focus:border-emerald-500 mb-2"></textarea>
                            <button className={`p-2 rounded-xl text-white font-bold transition-colors ${color.button} text-sm`}>
                                Beitrag posten
                            </button>
                        </>
                    }
                />
                <DashboardCard
                    title="Aktuelle Diskussionen"
                    icon={Monitor}
                    color={color}
                    content={
                        <ul className="space-y-3 text-sm">
                            <li className="p-3 bg-gray-700 rounded-xl hover:bg-gray-600 transition-colors cursor-pointer">
                                <p className="font-semibold text-white">Tipps zur Motivation beim Heimtraining</p>
                                <p className="text-gray-400 text-xs">Von: User XYZ | 5 Kommentare</p>
                            </li>
                            <li className="p-3 bg-gray-700 rounded-xl hover:bg-gray-600 transition-colors cursor-pointer">
                                <p className="font-semibold text-white">Welche Dehnübungen helfen bei Ischias?</p>
                                <p className="text-gray-400 text-xs">Von: Therapeut Müller | 12 Kommentare</p>
                            </li>
                        </ul>
                    }
                />
            </div>
            <DashboardCard
                title="Top-Poster"
                icon={Trophy}
                color={color}
                content={
                    <ul className="space-y-2 text-sm">
                        <li>1. Peter S. (25 Beiträge)</li>
                        <li>2. Dr. Schmidt (18 Beiträge)</li>
                    </ul>
                }
            />
        </div>
    </div>
);

const AchievementsView = ({ color }) => (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <h2 className="text-3xl font-bold text-white mb-6">Erfolge, Abzeichen & Skins</h2>

        {/* Skins Bereich */}
        <DashboardCard
            title="Profil-Skins"
            icon={Settings}
            color={color}
            content={
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Klassisch (Aktiv)', 'Dunkel-Mode', 'Neon-Style', 'Holz-Optik'].map((skin, index) => (
                        <div key={index} className={`p-4 rounded-xl text-center cursor-pointer ${index === 0 ? 'bg-emerald-700 border-2 border-white' : 'bg-gray-700 hover:bg-gray-600'}`}>
                            <div className="text-3xl mb-2">🎨</div>
                            <p className="text-sm font-semibold">{skin}</p>
                        </div>
                    ))}
                </div>
            }
        />

        {/* Achievements Bereich */}
        <DashboardCard
            title="Freigeschaltete Abzeichen"
            icon={Trophy}
            color={color}
            content={
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                    {[{ symbol: '🏅', name: 'Level 5', active: true }, { symbol: '💪', name: '30 Tage Serie', active: true }, { symbol: '✨', name: 'Perfekte Woche', active: true }, { symbol: '🥇', name: 'Top 10', active: false }].map((badge, index) => (
                        <div key={index} className={`p-4 rounded-xl text-center ${badge.active ? 'bg-yellow-500/20 border border-yellow-500' : 'bg-gray-700 opacity-50'}`}>
                            <div className="text-4xl mb-2">{badge.symbol}</div>
                            <p className="text-xs font-semibold">{badge.name}</p>
                        </div>
                    ))}
                </div>
            }
        />
    </div>
);


// --- DEDIZIERTE THERAPEUTEN-ANSICHTEN ---

const ExerciseMgmtView = ({ color }) => (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <h2 className="text-3xl font-bold text-white mb-6">Übungsverwaltung & Bibliothek</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <DashboardCard
                    title="Neue Übung erstellen"
                    icon={Plus}
                    color={color}
                    content={
                        <form className="space-y-3">
                            <input type="text" placeholder="Übungsname (z.B. Schulterrotation)" className="w-full p-2 bg-gray-700 rounded-lg text-white focus:ring-indigo-500 focus:border-indigo-500" />
                            <textarea placeholder="Anweisungen und Details" className="w-full p-2 bg-gray-700 rounded-lg text-white h-20 resize-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                            <div className="grid grid-cols-2 gap-3">
                                <select className="p-2 bg-gray-700 rounded-lg text-white focus:ring-indigo-500">
                                    <option>Fokusbereich</option>
                                </select>
                                <select className="p-2 bg-gray-700 rounded-lg text-white focus:ring-indigo-500">
                                    <option>Schwierigkeit</option>
                                </select>
                            </div>
                            <button className={`w-full p-3 rounded-xl text-white font-bold transition-colors ${color.button}`}>
                                Übung speichern
                            </button>
                        </form>
                    }
                />
            </div>
            <DashboardCard
                title="Existierende Übungen"
                icon={ClipboardList}
                color={color}
                content={
                    <div className="space-y-2 h-72 overflow-y-auto">
                        {mockPhysioData.exercises.map(e => (
                            <div key={e.id} className="p-3 bg-gray-700 rounded-lg flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-white">{e.name}</p>
                                    <p className="text-xs text-gray-400">{e.focus} ({e.level})</p>
                                </div>
                                <button className={`${color.text} hover:text-white text-sm`}>
                                    <Edit className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                }
            />
        </div>
    </div>
);

const PatientMgmtView = ({ color }) => (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <h2 className="text-3xl font-bold text-white mb-6">Patientenmanagement</h2>
        <div className="flex mb-4 space-x-3">
            <input type="text" placeholder="Patienten suchen..." className="flex-grow p-2 bg-gray-700 rounded-xl text-white focus:ring-indigo-500 focus:border-indigo-500" />
            <button className={`p-2 rounded-xl text-white font-bold transition-colors ${color.button}`}>
                <Search className="w-6 h-6" />
            </button>
            <button className={`p-2 rounded-xl text-white font-bold transition-colors ${color.button}`}>
                <Plus className="w-6 h-6" />
            </button>
        </div>
        <DashboardCard
          title="Alle Patienten"
          icon={Users}
          color={color}
          content={
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-400">
                <thead className="text-xs uppercase bg-indigo-700/50 text-gray-300">
                  <tr>
                    <th scope="col" className="px-6 py-3">Patient</th>
                    <th scope="col" className="px-6 py-3">Compliance</th>
                    <th scope="col" className="px-6 py-3">Zuletzt aktiv</th>
                    <th scope="col" className="px-6 py-3">Aktion</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPhysioData.patients.map(p => (
                    <tr key={p.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                        {p.name}
                      </th>
                      <td className="px-6 py-4">{p.compliance}</td>
                      <td className="px-6 py-4">{p.lastLogin}</td>
                      <td className="px-6 py-4">
                        <button className={`${color.text} hover:text-white text-xs font-semibold flex items-center`}>
                            <Activity className="w-3 h-3 mr-1" /> Plan bearbeiten
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
        />
    </div>
);

const AISummaryView = ({ color }) => (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <h2 className="text-3xl font-bold text-white mb-6">Detaillierte KI-Zusammenfassungen</h2>
        <div className="flex mb-4 space-x-3">
            <input type="text" placeholder="Patienten oder Stichwort suchen..." className="flex-grow p-2 bg-gray-700 rounded-xl text-white focus:ring-indigo-500 focus:border-indigo-500" />
            <button className={`p-2 rounded-xl text-white font-bold transition-colors ${aiColors.button}`}>
                <Search className="w-6 h-6" />
            </button>
        </div>
        <DashboardCard
          title="Alle Berichte"
          icon={MessageSquare}
          color={color}
          content={
            <div className="space-y-4">
              {mockPhysioData.aiSummaries.map(s => (
                <div key={s.id} className="p-4 bg-gray-700 rounded-xl shadow-lg border-l-4 border-white/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-lg text-white">{s.patient}</span>
                    <span className="text-xs text-gray-400">{s.date}</span>
                  </div>
                  <p className="text-gray-300">{s.summary}</p>
                  <button className="mt-3 text-sm text-white font-semibold bg-white/10 p-1.5 rounded-lg hover:bg-white/20 transition-colors">
                      Voller Bericht anzeigen
                  </button>
                </div>
              ))}
            </div>
          }
        />
    </div>
);


// --- HAUPTKOMPONENTE: App ---
const App = () => {
  const [role, setRole] = useState('patient');
  const [view, setView] = useState('dashboard');

  const patientNav = [
    { name: 'Übersicht', icon: LayoutDashboard, view: 'dashboard' },
    { name: 'Trainingsplan', icon: ClipboardList, view: 'plan' },
    { name: 'Kalender & Termine', icon: Calendar, view: 'calendar' },
    { name: 'KI Chat', icon: MessageSquare, view: 'ai_chat' },
    { name: 'Rangliste', icon: Trophy, view: 'leaderboard' },
    { name: 'Community Hub', icon: Users, view: 'community' },
    { name: 'Erfolge & Skins', icon: Zap, view: 'achievements' },
  ];

  const physioNav = [
    { name: 'Physio-Dashboard', icon: LayoutDashboard, view: 'dashboard' },
    { name: 'Übungsverwaltung', icon: ClipboardList, view: 'exercise_mgmt' },
    { name: 'Patientenmanagement', icon: Users, view: 'patient_mgmt' },
    { name: 'KI-Zusammenfassungen', icon: MessageSquare, view: 'ai_summary' },
  ];

  const currentNav = role === 'patient' ? patientNav : physioNav;
  const activeColorClass = role === 'patient' ? 'bg-emerald-600 shadow-emerald-700/50' : 'bg-indigo-600 shadow-indigo-700/50';

  const renderContent = () => {
    if (role === 'patient') {
      switch (view) {
        case 'dashboard': return <PatientDashboard />;
        case 'plan': return <PlanView color={patientColors} />;
        case 'calendar': return <CalendarView color={patientColors} />;
        case 'ai_chat': return <AIChatView color={aiColors} />;
        case 'leaderboard': return <LeaderboardView color={patientColors} />;
        case 'community': return <CommunityView color={patientColors} />;
        case 'achievements': return <AchievementsView color={patientColors} />;
        default: return <PatientDashboard />;
      }
    } else { // 'therapist'
      switch (view) {
        case 'dashboard': return <PhysioDashboard />;
        case 'exercise_mgmt': return <ExerciseMgmtView color={physioColors} />;
        case 'patient_mgmt': return <PatientMgmtView color={physioColors} />;
        case 'ai_summary': return <AISummaryView color={aiColors} />;
        default: return <PhysioDashboard />;
      }
    }
  };


  return (
    <div className="min-h-screen bg-gray-900 font-sans text-gray-100 flex">
      {/* 1. Sidebar (Navigation) */}
      <aside className="w-16 md:w-64 flex-shrink-0 bg-gray-800 p-4 border-r border-gray-700 shadow-2xl transition-all duration-300">
        <div className="flex flex-col h-full">
          {/* Logo/App Name */}
          <div className="mb-8">
            <LogoComponent />
          </div>

          {/* Navigation Links */}
          <nav className="flex-grow space-y-2">
            {currentNav.map((item) => (
              <NavButton
                key={item.view}
                icon={item.icon}
                title={item.name}
                isActive={view === item.view}
                onClick={() => setView(item.view)}
                activeColorClass={activeColorClass}
              />
            ))}
          </nav>

          {/* User/Settings Placeholder */}
          <div className="mt-8 pt-4 border-t border-gray-700">
            <button className="flex items-center w-full p-3 rounded-xl text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
              <User className="w-5 h-5 mr-3" />
              <span className="font-medium text-sm hidden md:block">{role === 'patient' ? mockPatientData.name : 'Dr. Müller'}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-grow overflow-y-auto">
        {/* Header (Role Switch & Title) */}
        <header className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm p-4 sm:p-6 border-b border-gray-700 flex justify-between items-center shadow-lg">
          <h2 className="text-2xl font-bold text-white hidden md:block">{currentNav.find(n => n.view === view)?.name}</h2>
          <h2 className="text-xl font-bold text-white md:hidden">{role === 'patient' ? 'Patient' : 'Therapeut'}</h2>

          {/* Rollenwechsel (Mehrere Rollen) */}
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-400 hidden sm:block">Aktive Rolle:</span>
            <div className="flex bg-gray-700 p-1 rounded-full text-sm">
              <button
                className={`py-2 px-4 rounded-full transition-colors font-medium ${
                  role === 'patient' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => { setRole('patient'); setView('dashboard'); }}
              >
                Patient
              </button>
              <button
                className={`py-2 px-4 rounded-full transition-colors font-medium ${
                  role === 'therapist' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => { setRole('therapist'); setView('dashboard'); }}
              >
                Therapeut
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        {renderContent()}

      </main>
    </div>
  );
};

export default App;