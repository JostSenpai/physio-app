import React, { useState } from 'react';
import {
  Home,
  Users,
  Calendar,
  Zap,
  Dumbbell,
  MessageSquare,
  Trophy,
  Briefcase,
  Play,
  ClipboardList,
  User,
  LayoutDashboard,
  Bell,
  Monitor,
  CheckCircle,
  Clock
} from 'lucide-react';

// Mock data (Simulierte Daten)
const mockPatientData = {
  name: "Mia Schmidt",
  nextExercise: "Kniebeugen (3 Sätze, 12 Wiederholungen)",
  progress: 75,
  reminders: ["Termin mit Therapeutin Müller um 14:00 Uhr"],
  recentAchievements: ["Level 5 erreicht", "30-Tage-Serie"],
};

const mockPhysioData = {
  patients: [
    { id: 1, name: "Max Mustermann", lastLogin: "2 Stunden her" },
    { id: 2, name: "Anna Beispiel", lastLogin: "Gestern" },
    { id: 3, name: "Tom Tester", lastLogin: "1 Woche her" },
  ],
  aiSummaries: [
    { id: 1, patient: "Max Mustermann", summary: "Verbesserte Mobilität im linken Knie um 15% seit letzter Woche. Schmerz-Score stabil.", date: "1 Std. her" },
    { id: 2, patient: "Anna Beispiel", summary: "Muss an Rumpfstabilität arbeiten. Trainingsintensität heute niedrig.", date: "Gestern" },
  ],
};

// --- Komponente: Navigations-Button ---
const NavButton = ({ icon: Icon, title, isActive, onClick }) => (
  <button
    className={`flex items-center w-full p-3 my-1 rounded-xl transition-all duration-200 ${
      isActive
        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-700/50'
        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
    }`}
    onClick={onClick}
  >
    <Icon className="w-5 h-5 mr-3" />
    <span className="font-medium text-sm hidden md:block">{title}</span>
  </button>
);

// --- Komponente: Dashboard-Karte ---
const DashboardCard = ({ title, content, icon: Icon, colorClass = 'bg-gray-800' }) => (
  <div className={`p-5 rounded-2xl shadow-xl ${colorClass} transition-shadow hover:shadow-2xl h-full`}>
    <div className="flex items-center mb-3">
      <Icon className="w-6 h-6 text-emerald-400 mr-3" />
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
    <div className="text-gray-300">
      {content}
    </div>
  </div>
);

// --- Patient: Trainingsplan Visualisierung ---
const TrainingPlanVisualization = () => (
  <DashboardCard
    title="Trainingsplan Visualisierung"
    icon={Dumbbell}
    colorClass="bg-gray-900 border border-emerald-700/50"
    content={
      <>
        <div className="text-sm font-light text-emerald-400 mb-1">Fortschritt diese Woche:</div>
        <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
          <div
            className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
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

// --- Patient: Video Player / Trainingsmodus ---
const TrainingMode = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <DashboardCard
      title="Trainingsmodus / Videoplayer"
      icon={Play}
      colorClass="bg-gray-800"
      content={
        <div className="relative w-full aspect-video bg-black/70 rounded-xl flex items-center justify-center overflow-hidden">
          <span className="absolute top-2 left-3 text-xs text-emerald-400 bg-black/50 p-1 rounded">Übung 1 von 5</span>
          <div className="text-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-4 bg-emerald-500/80 hover:bg-emerald-500 rounded-full transition-all shadow-xl"
            >
              <Play className={`w-8 h-8 ${isPlaying ? 'opacity-0' : 'opacity-100'}`} fill="white" />
            </button>
            <p className="mt-2 text-sm text-gray-300">Klicken Sie, um die angeleitete Sitzung zu starten</p>
          </div>
          <div className="absolute bottom-0 w-full h-2 bg-emerald-600/50">
            <div className="bg-emerald-400 h-full" style={{ width: '40%' }}></div>
          </div>
        </div>
      }
    />
  );
};

// --- Patient: KI Chat Widget ---
const AIChatWidget = () => (
  <DashboardCard
    title="KI Chat (Fragen zur Übung)"
    icon={MessageSquare}
    colorClass="bg-gray-900"
    content={
      <>
        <div className="h-28 overflow-y-auto space-y-2 mb-3 p-2 bg-gray-700/50 rounded-lg text-sm">
          <div className="text-right">
            <span className="inline-block bg-emerald-700 text-white p-2 rounded-lg rounded-br-none max-w-xs">Tut mein Rücken weh?</span>
          </div>
          <div className="text-left">
            <span className="inline-block bg-gray-600 text-white p-2 rounded-lg rounded-tl-none max-w-xs">
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
          <button className="px-3 bg-emerald-600 rounded-r-lg hover:bg-emerald-700">
            <Zap className="w-5 h-5 text-white" />
          </button>
        </div>
      </>
    }
  />
);

// --- Patient: Kalender & Terminerinnerung ---
const CalendarReminders = () => (
  <DashboardCard
    title="Kalender & Terminerinnerung"
    icon={Calendar}
    colorClass="bg-gray-800"
    content={
      <>
        <div className="text-3xl font-extrabold text-white mb-1">Freitag, 31. Okt</div>
        <p className="text-emerald-400 mb-4">Ihr Plan für heute: 5 Übungen</p>

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

// --- Patient: Achievements & Skins (Gamification) ---
const GamificationWidget = () => (
  <DashboardCard
    title="Erfolge & Skins"
    icon={Trophy}
    colorClass="bg-gray-900"
    content={
      <>
        <div className="flex justify-between items-center mb-3">
          <p className="text-white font-semibold">Aktuelle Abzeichen:</p>
          <button className="text-sm text-emerald-400 hover:text-emerald-300">Skins wählen</button>
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

    {/* Erste Reihe: Visualisierung & Kalender */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <TrainingPlanVisualization />
      <CalendarReminders />
    </div>

    {/* Zweite Reihe: Training & KI */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <TrainingMode />
      </div>
      <AIChatWidget />
    </div>

    {/* Dritte Reihe: Gamification */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GamificationWidget />
        <DashboardCard title="Rangliste (Top 10)" icon={Users} content={<p className="text-sm">Hier sehen Sie, wie Sie im Vergleich zu anderen in Ihrer Gruppe abschneiden. (Lade...)</p>} />
        <DashboardCard title="Community Hub" icon={Monitor} content={<p className="text-sm">Aktuelle Beiträge, Tipps & Tricks und Diskussionsforen. (Lade...)</p>} />
    </div>
  </div>
);

// --- Physio: KI Zusammenfassungen ---
const AISummariesList = () => (
  <DashboardCard
    title="KI-Zusammenfassungen"
    icon={MessageSquare}
    colorClass="bg-gray-800"
    content={
      <div className="space-y-3 h-72 overflow-y-auto pr-2">
        {mockPhysioData.aiSummaries.map(s => (
          <div key={s.id} className="p-3 bg-gray-700 rounded-lg shadow">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-semibold text-emerald-400">{s.patient}</span>
              <span className="text-gray-400">{s.date}</span>
            </div>
            <p className="text-sm text-gray-300 line-clamp-2">{s.summary}</p>
          </div>
        ))}
      </div>
    }
  />
);

// --- Physio: Übungen Zuweisen ---
const ExerciseAssignment = () => {
    const [selectedPatient, setSelectedPatient] = useState(mockPhysioData.patients[0].id);
    return (
      <DashboardCard
        title="Übungen einfach zuweisen (Übungsverwaltung)"
        icon={ClipboardList}
        colorClass="bg-gray-900 border border-emerald-700/50"
        content={
          <div className="space-y-4">
            <select
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(parseInt(e.target.value))}
              className="w-full p-2 bg-gray-700 rounded-lg text-white focus:ring-emerald-500 focus:border-emerald-500"
            >
              {mockPhysioData.patients.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <textarea
              placeholder="Übungsdetails (z.B. '3x15, 3x pro Woche, 15 Grad Flexion')"
              className="w-full p-3 bg-gray-700 rounded-lg text-white h-24 resize-none focus:ring-emerald-500 focus:border-emerald-500"
            ></textarea>
            <button className="w-full p-3 bg-emerald-600 rounded-xl text-white font-bold hover:bg-emerald-700 transition-colors">
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

        {/* Erste Reihe: Zuweisung & KI-Zusammenfassungen */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ExerciseAssignment />
            <AISummariesList />
        </div>

        {/* Zweite Reihe: Patientenübersicht */}
        <DashboardCard
          title="Patientenübersicht & Status"
          icon={Users}
          colorClass="bg-gray-800"
          content={
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-400">
                <thead className="text-xs uppercase bg-gray-700/50 text-gray-300">
                  <tr>
                    <th scope="col" className="px-6 py-3">Patient</th>
                    <th scope="col" className="px-6 py-3">Letzte Aktivität</th>
                    <th scope="col" className="px-6 py-3">Aktion</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPhysioData.patients.map(p => (
                    <tr key={p.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                        {p.name}
                      </th>
                      <td className="px-6 py-4">{p.lastLogin}</td>
                      <td className="px-6 py-4">
                        <button className="text-emerald-400 hover:text-emerald-300 text-xs font-semibold">
                            Details / Plan bearbeiten
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


// --- Content: Generischer Feature-Platzhalter ---
const FeaturePlaceholder = ({ title, icon: Icon, description }) => (
    <div className="p-8 bg-gray-800 rounded-2xl shadow-2xl text-center">
        <Icon className="w-16 h-16 text-emerald-500 mx-auto mb-4 p-2 bg-gray-900 rounded-full" />
        <h2 className="text-2xl font-bold text-white mb-3">{title}</h2>
        <p className="text-gray-400">{description}</p>
        <div className="mt-6 p-4 bg-gray-700 rounded-xl text-sm text-gray-300">
            {title} wird hier im Detail angezeigt.
        </div>
    </div>
);


// --- HAUPTKOMPONENTE: App ---
const App = () => {
  // state: 'patient' oder 'therapist'
  const [role, setRole] = useState('patient');
  // state: Aktuelle Ansicht (wird durch die Sidebar gesetzt)
  const [view, setView] = useState('dashboard'); // 'dashboard', 'plan', 'calendar', 'community', 'leaderboard', 'achievements'

  // Navigationslinks basierend auf der Rolle
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

  // Render Content based on view and role
  const renderContent = () => {
    if (role === 'patient') {
      switch (view) {
        case 'dashboard':
          return <PatientDashboard />;
        case 'plan':
          return <FeaturePlaceholder title="Trainingsplan Visualisierung" icon={ClipboardList} description="Hier sehen Sie Ihren vollständigen, visualisierten Trainingsplan, detailliert nach Tagen und Übungen." />;
        case 'calendar':
          return <FeaturePlaceholder title="Kalender" icon={Calendar} description="Ihr persönlicher Kalender mit Trainingseinheiten, Terminerinnerungen und Meilensteinen." />;
        case 'ai_chat':
          return <FeaturePlaceholder title="AI Chat" icon={MessageSquare} description="Stellen Sie der KI Fragen zu Übungen, Schmerzen oder Ihrem Trainingsplan." />;
        case 'leaderboard':
            return <FeaturePlaceholder title="Rangliste" icon={Trophy} description="Verfolgen Sie Ihre Fortschritte und treten Sie in freundlichem Wettbewerb mit der Community an." />;
        case 'community':
            return <FeaturePlaceholder title="Community Hub" icon={Users} description="Ein Forum für Austausch, Motivation und Tipps mit anderen Nutzern und Experten." />;
        case 'achievements':
            return <FeaturePlaceholder title="Erfolge, Abzeichen & Skins" icon={Zap} description="Passen Sie Ihr Profil mit Skins an und schalten Sie Abzeichen durch das Erreichen von Zielen frei." />;
        default:
          return <PatientDashboard />;
      }
    } else { // 'therapist'
      switch (view) {
        case 'dashboard':
          return <PhysioDashboard />;
        case 'exercise_mgmt':
          return <FeaturePlaceholder title="Übungsverwaltung" icon={ClipboardList} description="Erstellen, bearbeiten und organisieren Sie Übungen. Hier können Sie Übungen einfach den Patienten zuweisen." />;
        case 'patient_mgmt':
          return <FeaturePlaceholder title="Patientenmanagement" icon={Users} description="Verwalten Sie alle Ihre Patienten, deren Pläne und deren Fortschritte." />;
        case 'ai_summary':
          return <FeaturePlaceholder title="KI-Zusammenfassungen" icon={MessageSquare} description="Überblicken Sie auf KI-Basis die wichtigsten Fortschritte und Problembereiche Ihrer Patienten." />;
        default:
          return <PhysioDashboard />;
      }
    }
  };


  return (
    <div className="min-h-screen bg-gray-900 font-sans text-gray-100 flex">
      {/* 1. Sidebar (Navigation) */}
      <aside className="w-16 md:w-64 flex-shrink-0 bg-gray-800 p-4 border-r border-gray-700 shadow-2xl transition-all duration-300">
        <div className="flex flex-col h-full">
          {/* Logo/App Name */}
          <div className="mb-8 flex items-center justify-center md:justify-start">
            <Dumbbell className="w-8 h-8 text-emerald-500 mr-2" />
            <h1 className="text-xl font-extrabold text-white hidden md:block">PhysioConnect</h1>
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
                  role === 'therapist' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-600'
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
