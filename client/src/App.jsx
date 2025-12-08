import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import CommunityPage from './pages/CommunityPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';
import LearningPage from './pages/LearningPage';
import LectureDetailPage from './pages/LectureDetailPage';
import QuizCategoryPage from './pages/QuizCategoryPage';
import QuizListPage from './pages/QuizListPage';
import QuizPage from './pages/QuizPage';
import PronunciationPage from './pages/PronunciationPage';
import HospitalDetailPage from './pages/HospitalDetailPage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import PostCreatePage from './pages/PostCreatePage';
import PostDetailPage from './pages/PostDetailPage';
import ChatListPage from './pages/ChatListPage';
import ChatRoomPage from './pages/ChatRoomPage';
import PrivateRoute from './components/PrivateRoute';
import GlobalStyles from './styles/GlobalStyles';

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<PrivateRoute><MainPage /></PrivateRoute>} />
        <Route path="/community" element={<PrivateRoute><CommunityPage /></PrivateRoute>} />
        <Route path="/community/create" element={<PrivateRoute><PostCreatePage /></PrivateRoute>} />
        <Route path="/community/post/:id" element={<PrivateRoute><PostDetailPage /></PrivateRoute>} />
        <Route path="/chat" element={<PrivateRoute><ChatListPage /></PrivateRoute>} />
        <Route path="/chat/:id" element={<PrivateRoute><ChatRoomPage /></PrivateRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/mypage" element={<PrivateRoute><MyPage /></PrivateRoute>} />
        <Route path="/profile-settings" element={<PrivateRoute><ProfileSettingsPage /></PrivateRoute>} />
        <Route path="/learning" element={<PrivateRoute><LearningPage /></PrivateRoute>} />
        <Route path="/learning/:id" element={<PrivateRoute><LectureDetailPage /></PrivateRoute>} />
        <Route path="/quiz" element={<PrivateRoute><QuizCategoryPage /></PrivateRoute>} />
        <Route path="/quiz/:category" element={<PrivateRoute><QuizListPage /></PrivateRoute>} />
        <Route path="/quiz/:category/:id" element={<PrivateRoute><QuizPage /></PrivateRoute>} />
        <Route path="/pronunciation" element={<PrivateRoute><PronunciationPage /></PrivateRoute>} />
        <Route path="/hospital/:id" element={<PrivateRoute><HospitalDetailPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
