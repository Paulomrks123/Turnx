import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Onboarding } from '../screens/Onboarding';
import { OnboardingStep2 } from '../screens/OnboardingStep2';
import { OnboardingStep3 } from '../screens/OnboardingStep3';
import { Auth } from '../screens/Auth';
import { Home } from '../screens/Home';
import { Agenda } from '../screens/Agenda';
import { OnlineEvents } from '../screens/OnlineEvents';
import { MastermindDetails } from '../screens/MastermindDetails';
import { Marketplace } from '../screens/Marketplace';
import { ServiceDetails } from '../screens/ServiceDetails';
import { MyServices } from '../screens/MyServices';
import { CreateService } from '../screens/CreateService';
import { CreateOpportunity } from '../screens/CreateOpportunity';
import { TurnXConnect } from '../screens/TurnXConnect';
import { Matchmaking } from '../screens/Matchmaking';
import { ContentLibrary } from '../screens/ContentLibrary';
import { ContentDetail } from '../screens/ContentDetail';
import { Profile } from '../screens/Profile';
import { EditProfile } from '../screens/EditProfile';
import { Settings } from '../screens/Settings';
import { Billing } from '../screens/Billing';
import { Messages } from '../screens/Messages';
import { ChatDetail } from '../screens/ChatDetail';
import { NotificationSettings } from '../screens/NotificationSettings';
import { Notifications } from '../screens/Notifications';
import { OpportunityDetails } from '../screens/opportunity/OpportunityDetails';
import { Ranking } from '../screens/Ranking';
import { AdminDashboard } from '../screens/AdminDashboard';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Layout } from '../components/Layout';

export function AppNavigator() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/onboarding-2" element={<OnboardingStep2 />} />
        <Route path="/onboarding-3" element={<OnboardingStep3 />} />
        <Route path="/auth" element={<Auth />} />
        
        {/* Private Routes */}
        <Route path="/home" element={<ProtectedRoute><Layout><Home /></Layout></ProtectedRoute>} />
        <Route path="/agenda" element={<ProtectedRoute><Layout><Agenda /></Layout></ProtectedRoute>} />
        <Route path="/online-events" element={<ProtectedRoute><Layout><OnlineEvents /></Layout></ProtectedRoute>} />
        <Route path="/mastermind-details" element={<ProtectedRoute><Layout><MastermindDetails /></Layout></ProtectedRoute>} />
        <Route path="/marketplace" element={<ProtectedRoute><Layout><Marketplace /></Layout></ProtectedRoute>} />
        <Route path="/service-details" element={<ProtectedRoute><Layout><ServiceDetails /></Layout></ProtectedRoute>} />
        <Route path="/my-services" element={<ProtectedRoute><Layout><MyServices /></Layout></ProtectedRoute>} />
        <Route path="/create-service" element={<ProtectedRoute><Layout><CreateService /></Layout></ProtectedRoute>} />
        <Route path="/create-opportunity" element={<ProtectedRoute><Layout><CreateOpportunity /></Layout></ProtectedRoute>} />
        <Route path="/turnx-connect" element={<ProtectedRoute><Layout><TurnXConnect /></Layout></ProtectedRoute>} />
        <Route path="/matchmaking" element={<ProtectedRoute><Layout><Matchmaking /></Layout></ProtectedRoute>} />
        <Route path="/content-library" element={<ProtectedRoute><Layout><ContentLibrary /></Layout></ProtectedRoute>} />
        <Route path="/content-detail" element={<ProtectedRoute><Layout><ContentDetail /></Layout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
        <Route path="/edit-profile" element={<ProtectedRoute><Layout><EditProfile /></Layout></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Layout><Settings /></Layout></ProtectedRoute>} />
        <Route path="/billing" element={<ProtectedRoute><Layout><Billing /></Layout></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute><Layout><Messages /></Layout></ProtectedRoute>} />
        <Route path="/chat/:id" element={<ProtectedRoute><Layout><ChatDetail /></Layout></ProtectedRoute>} />
        <Route path="/notification-settings" element={<ProtectedRoute><Layout><NotificationSettings /></Layout></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Layout><Notifications /></Layout></ProtectedRoute>} />
        <Route path="/opportunity-details" element={<ProtectedRoute><Layout><OpportunityDetails /></Layout></ProtectedRoute>} />
        <Route path="/ranking" element={<ProtectedRoute><Layout><Ranking /></Layout></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><Layout><AdminDashboard /></Layout></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
