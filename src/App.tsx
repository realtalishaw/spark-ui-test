import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { Chat } from './components/Chat';
import { Dashboard } from './components/Dashboard';
import { Auth } from './components/Auth';
import { Message, ProjectStatus } from './types';
import { v4 as uuidv4 } from 'uuid';
import { questions } from './questions';
import { supabase } from './lib/supabase';
import { LoadingScreen } from './components/LoadingScreen';

function App() {
  const [started, setStarted] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [user, setUser] = useState<any>(null);
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [companyName, setCompanyName] = useState('New Project');

  const projectStatuses: ProjectStatus[] = [
    {
      name: 'Onboarding',
      description: 'Gather initial project requirements and client information',
      status: 'completed',
      progress: 100
    },
    {
      name: 'Research and Planning',
      description: 'Analyze market trends and competitor websites',
      status: 'in-progress',
      progress: 45
    },
    {
      name: 'Audience & Persona Development',
      description: 'Create detailed user personas',
      status: 'locked',
      progress: 0
    },
    {
      name: 'Creative Strategy',
      description: 'Develop a unique value proposition and brand messaging',
      status: 'locked',
      progress: 0
    },
    {
      name: 'Copywriting',
      description: 'Create compelling content for the landing page',
      status: 'locked',
      progress: 0
    },
    {
      name: 'Wireframing',
      description: 'Design the structure and layout of the landing page',
      status: 'locked',
      progress: 0
    },
    {
      name: 'Design & Development',
      description: 'Create the visual design and implement the landing page',
      status: 'locked',
      progress: 0
    },
    {
      name: 'Additional Services Setup',
      description: 'Configure analytics, integrations, and other services',
      status: 'locked',
      progress: 0
    },
    {
      name: 'Testing and Deployment',
      description: 'Perform QA and launch the landing page',
      status: 'locked',
      progress: 0
    },
    {
      name: 'Maintenance',
      description: 'Set up ongoing support and update schedules',
      status: 'locked',
      progress: 0
    }
  ];

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProject(session.user.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProject(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProject = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      
      if (data) {
        setProject(data);
        setCompanyName(data.company_name || 'New Project');
        if (data.current_status === 'Dashboard') {
          setShowAuth(false);
        }
      }
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  };

  const handleGetStarted = () => {
    setStarted(true);
    setShowAuth(true);
  };

  const handleAuthComplete = async () => {
    if (!user) return;
    
    try {
      let projectData = project;
      
      if (!project) {
        const { data, error } = await supabase
          .from('projects')
          .insert([
            {
              user_id: user.id,
              company_name: 'New Project',
              current_status: 'Onboarding'
            }
          ])
          .select()
          .single();

        if (error) throw error;
        projectData = data;
        setProject(data);
      }

      if (projectData.current_status === 'Dashboard') {
        setShowAuth(false);
      } else {
        startOnboarding();
      }
    } catch (error) {
      console.error('Error handling auth completion:', error);
    }
  };

  const startOnboarding = () => {
    setShowAuth(false);
    const firstQuestion = questions[0];
    setMessages([
      {
        id: uuidv4(),
        text: "Hi! I'm Spark, your AI cofounder. I'll help you build and grow your startup. Let's start with some questions to understand your business better.",
        sender: 'spark',
      },
      {
        id: uuidv4(),
        text: firstQuestion.question,
        sender: 'spark',
        options: firstQuestion.options,
        type: firstQuestion.type,
        note: firstQuestion.note,
      },
    ]);
  };

  const handleUpdateCompanyName = async (newName: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ company_name: newName })
        .eq('id', project.id);

      if (error) throw error;
      setCompanyName(newName);
    } catch (error) {
      console.error('Error updating company name:', error);
    }
  };

  const saveAnswer = async (questionIndex: number, answer: string) => {
    try {
      const { error } = await supabase
        .from('answers')
        .insert([
          {
            project_id: project.id,
            question_index: questionIndex,
            answer: answer
          }
        ]);

      if (error) throw error;
    } catch (error) {
      console.error('Error saving answer:', error);
    }
  };

  const handleSend = async (message: string) => {
    if (message.toLowerCase() === 'skip test') {
      try {
        const { error } = await supabase
          .from('projects')
          .update({ current_status: 'Dashboard' })
          .eq('id', project.id);

        if (error) throw error;
        setProject({ ...project, current_status: 'Dashboard' });
        return;
      } catch (error) {
        console.error('Error updating project status:', error);
      }
    }

    await saveAnswer(currentQuestion, message);
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: message
    }));

    setMessages(prev => [
      ...prev,
      {
        id: uuidv4(),
        text: message,
        sender: 'user',
      },
    ]);

    if (currentQuestion < questions.length - 1) {
      const nextQuestion = questions[currentQuestion + 1];
      const isNewSection = nextQuestion.section !== questions[currentQuestion].section;
      
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          ...(isNewSection ? [{
            id: uuidv4(),
            text: `Great! Let's move on to ${nextQuestion.section}.`,
            sender: 'spark',
          }] : []),
          {
            id: uuidv4(),
            text: nextQuestion.question,
            sender: 'spark',
            options: nextQuestion.options,
            type: nextQuestion.type,
            note: nextQuestion.note,
          },
        ]);
        setCurrentQuestion(prev => prev + 1);
      }, 500);
    } else {
      try {
        const { error } = await supabase
          .from('projects')
          .update({ current_status: 'Dashboard' })
          .eq('id', project.id);

        if (error) throw error;
        setProject({ ...project, current_status: 'Dashboard' });
      } catch (error) {
        console.error('Error updating project status:', error);
      }
    }
  };

  const handleOptionSelect = (option: string) => {
    handleSend(option);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!started) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (showAuth) {
    return <Auth onAuthComplete={handleAuthComplete} onBack={() => setStarted(false)} />;
  }

  if (project?.current_status === 'Dashboard') {
    return (
      <Dashboard
        companyName={companyName}
        projectStatuses={projectStatuses}
        deliverables={[]}
        onUpdateCompanyName={handleUpdateCompanyName}
      />
    );
  }

  return (
    <Chat
      messages={messages}
      onSend={handleSend}
      onOptionSelect={handleOptionSelect}
    />
  );
}

export default App;