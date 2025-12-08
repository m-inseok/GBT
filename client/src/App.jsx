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
import GlobalStyles from './styles/GlobalStyles';

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/community/create" element={<PostCreatePage />} />
        <Route path="/community/post/:id" element={<PostDetailPage />} /> {/* Added PostDetailPage route */}
        <Route path="/chat" element={<ChatListPage />} />
        <Route path="/chat/:id" element={<ChatRoomPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/profile-settings" element={<ProfileSettingsPage />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/learning/:id" element={<LectureDetailPage />} />
        <Route path="/quiz" element={<QuizCategoryPage />} />
        <Route path="/quiz/:category" element={<QuizListPage />} />
        <Route path="/quiz/:category/:id" element={<QuizPage />} />
        <Route path="/pronunciation" element={<PronunciationPage />} />
        <Route path="/hospital/:id" element={<HospitalDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
