import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Send,
  Package,
  CreditCard,
  RefreshCw,
  Clock,
  ShieldCheck,
  Heart,
  Bot,
  User,
  ArrowLeft
} from 'lucide-react';

const Customer = () => {
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      content: 'Hello! 👋 I\'m your virtual assistant. How can I help you today?', 
      time: new Date() 
    }
  ]);
  
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const topics = [
    {
      id: 1,
      question: "How do I track my order?",
      answer: "You can track your order by following these steps:\n\n1. Go to 'My Orders' in your account dashboard\n2. Click on your specific order\n3. View real-time status and tracking information\n\nYou'll receive email updates at each stage of delivery! 📦",
      icon: <Package className="w-5 h-5" />
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer: "We accept multiple payment methods for your convenience:\n\n• Credit/Debit Cards (Visa, MasterCard, Amex)\n• PayPal\n• Apple Pay\n• Google Pay\n\nAll payments are processed securely! 🔒",
      icon: <CreditCard className="w-5 h-5" />
    },
    {
      id: 3,
      question: "What is your return policy?",
      answer: "Our customer-friendly return policy includes:\n\n• 30-day return window\n• Free returns\n• Original packaging required\n• Full refund processed in 5-7 days\n\nNeed help with a return? Just let me know! 📦",
      icon: <RefreshCw className="w-5 h-5" />
    },
    {
      id: 4,
      question: "How can I change my order?",
      answer: "Order modifications are possible within 1 hour of placing your order:\n\n1. Go to 'My Orders'\n2. Select the order to modify\n3. Click 'Modify Order'\n\nAfter 1 hour, please contact our support team! ⏰",
      icon: <Clock className="w-5 h-5" />
    },
    {
      id: 5,
      question: "Is my data secure?",
      answer: "Your security is our top priority! We ensure:\n\n• End-to-end encryption\n• Secure payment processing\n• No storage of sensitive data\n• Regular security audits\n\nYour data is safe with us! 🛡️",
      icon: <ShieldCheck className="w-5 h-5" />
    },
    {
      id: 6,
      question: "What's your quality guarantee?",
      answer: "We stand behind our products with:\n\n• 100% satisfaction guarantee\n• 30-day money-back promise\n• Easy returns/replacements\n• Quality-checked products\n\nYour satisfaction is our priority! ⭐",
      icon: <Heart className="w-5 h-5" />
    }
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleTopicSelect = (topic) => {
    setMessages(prev => [
      ...prev,
      { type: 'user', content: topic.question, time: new Date() }
    ]);

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        { type: 'bot', content: topic.answer, time: new Date() }
      ]);
    }, 1500);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setMessages(prev => [
      ...prev,
      { type: 'user', content: userInput, time: new Date() }
    ]);

    setUserInput('');

    setIsTyping(true);

    const matchingTopic = topics.find(topic => 
      topic.question.toLowerCase().includes(userInput.toLowerCase()) ||
      userInput.toLowerCase().includes(topic.question.toLowerCase())
    );

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        { 
          type: 'bot', 
          content: matchingTopic 
            ? matchingTopic.answer 
            : "I'm not sure about that. Would you like to try one of the topics above or connect with a human agent?", 
          time: new Date() 
        }
      ]);
    }, 1500);
  };

  const resetChat = () => {
    setMessages([
      { 
        type: 'bot', 
        content: 'Hello! 👋 I\'m your virtual assistant. How can I help you today?', 
        time: new Date() 
      }
    ]);
    setUserInput('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-primary p-4 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bot className="w-7 h-7" />
              <div>
                <h2 className="text-lg font-semibold">Customer Support</h2>
                <p className="text-sm text-white/80">Always here to help</p>
              </div>
            </div>
            <button 
              onClick={resetChat}
              className="text-sm bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition-colors flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>New Chat</span>
            </button>
          </div>

          <div className="h-[500px] overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user' ? 'bg-primary' : 'bg-gray-100'
                    }`}>
                      {message.type === 'user' 
                        ? <User className="w-5 h-5 text-black" />
                        : <Bot className="w-5 h-5 text-black" />
                      }
                    </div>
                    <div className={`${
                      message.type === 'user' 
                        ? 'bg-primary text-black rounded-l-xl rounded-tr-xl' 
                        : 'bg-gray-100 text-gray-800 rounded-r-xl rounded-tl-xl'
                    } p-3 shadow-sm`}>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 rounded-full px-4 py-2">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </div>

          <div className="border-t border-gray-100 p-4 bg-gray-50">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Quick Topics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topics.map((topic) => (
                <motion.button
                  key={topic.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTopicSelect(topic)}
                  className="flex items-center space-x-2 p-3 rounded-lg bg-white border hover:border-primary hover:shadow-sm transition-all text-left"
                >
                  <div className="text-primary">{topic.icon}</div>
                  <span className="text-sm text-gray-700">{topic.question}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="border-t p-4">
            <form onSubmit={handleSendMessage} className="flex space-x-4">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                disabled={!userInput.trim()}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p>Need more help? Contact us directly:</p>
          <p className="mt-2">
            <span className="font-semibold">Email:</span> support@grocerystore.com |{" "}
            <span className="font-semibold">Phone:</span> 1-800-GROCERY
          </p>
        </div>
      </div>
    </div>
  );
};

export default Customer;