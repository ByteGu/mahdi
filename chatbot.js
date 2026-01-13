// AI Chatbot for Mahdi Doualeh's Portfolio
// Knowledge-based chatbot that answers questions about skills, experience, and background

class PortfolioChatbot {
    constructor() {
        this.knowledgeBase = this.buildKnowledgeBase();
        this.conversationHistory = [];
        this.isOpen = false;
        this.init();
    }

    buildKnowledgeBase() {
        return {
            about: {
                keywords: ['about', 'who', 'background', 'introduce', 'yourself', 'bio', 'story'],
                response: "I'm Mahdi Doualeh, an IT student with a Bachelor's degree in Computer Science and an Associate Degree in Information Technology. I have hands-on experience in financial data analytics, SQL querying, Excel reporting, and IT support. I'm bilingual in Somali and French and passionate about building a strong career in information technology and data analysis."
            },
            skills: {
                keywords: ['skills', 'technical', 'technologies', 'programming', 'tools', 'know', 'languages'],
                response: "My technical skills include:\n\n💾 **Data & Analytics**: SQL, Financial Data Analysis, Microsoft Excel, Pivot Tables\n\n💻 **Programming**: Python, PowerShell Scripting, Data Structures, Algorithm Design\n\n🛠️ **IT Support**: Help Desk, Hardware Troubleshooting, Software Configuration, Device Deployment\n\n🌐 **Networking**: TCP/IP, DNS, DHCP, Cisco CCNA Fundamentals"
            },
            sql: {
                keywords: ['sql', 'database', 'query', 'queries'],
                response: "Yes! I have strong SQL skills. At Boston Housing Authority, I query utility and financial databases using SQL to extract and analyze data. I'm experienced in database querying and working with financial data."
            },
            python: {
                keywords: ['python', 'programming language', 'code'],
                response: "I'm proficient in Python programming! My skills include data structures, algorithm design, and general programming. Python is one of my core technical competencies."
            },
            experience: {
                keywords: ['experience', 'work', 'job', 'position', 'role', 'working', 'career'],
                response: "I'm currently an **IT / Financial Data Intern at Boston Housing Authority** (September 2024 - Present) where I:\n• Query utility and financial databases using SQL\n• Create Excel reports and pivot tables\n• Configure and deploy IT devices\n• Provide technical support to end users\n\nPreviously, I worked as a Valet Assistant at VPNE Parking Solutions (December 2020 - March 2022)."
            },
            education: {
                keywords: ['education', 'degree', 'school', 'college', 'university', 'study', 'studied'],
                response: "I have two degrees:\n\n🎓 **Associate Degree in Information Technology** from Bunker Hill Community College (2021-2024)\n\n🎓 **Bachelor of Computer Science** from Djibouti University (2016-2019)"
            },
            certifications: {
                keywords: ['certification', 'certified', 'certificate', 'certs'],
                response: "I hold the following certifications:\n\n📜 **CCNA: Introduction to Networks** - Cisco Networking Academy (2022)\n\n📜 **Microsoft Excel & Word** - Pearson (2021)"
            },
            contact: {
                keywords: ['contact', 'email', 'reach', 'connect', 'location', 'where', 'hire', 'available'],
                response: "I'm actively seeking opportunities in IT and data analytics! You can reach me at:\n\n📧 **Email**: Mdoualeh94@gmail.com\n📍 **Location**: Malden, MA\n\nFeel free to get in touch!"
            },
            languages: {
                keywords: ['language', 'speak', 'bilingual', 'french', 'somali'],
                response: "I'm bilingual! I speak Somali and French fluently, in addition to English."
            },
            location: {
                keywords: ['live', 'based', 'located'],
                response: "I'm based in Malden, MA and currently working at the Boston Housing Authority in Boston, MA."
            },
            excel: {
                keywords: ['excel', 'spreadsheet'],
                response: "I'm highly proficient in Microsoft Excel! I create reports and pivot tables to support financial decision-making at Boston Housing Authority. I also hold a Microsoft Excel certification from Pearson (2021)."
            },
            networking: {
                keywords: ['network', 'cisco', 'ccna', 'tcp', 'ip'],
                response: "I have networking expertise including TCP/IP protocols, DNS, DHCP, and network configuration. I've completed the CCNA: Introduction to Networks certification from Cisco Networking Academy."
            }
        };
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
        } else {
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        const toggleBtn = document.getElementById('chatbot-toggle');
        const closeBtn = document.getElementById('chatbot-close');
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');

        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleChat());
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeChat());
        }

        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
        }

        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }

        // Add welcome message
        setTimeout(() => this.addBotMessage("Hi! 👋 I'm Mahdi's AI assistant. Ask me anything about his skills, experience, education, or how to get in touch!"), 500);
    }

    toggleChat() {
        const chatWindow = document.getElementById('chatbot-window');
        const toggleBtn = document.getElementById('chatbot-toggle');

        if (this.isOpen) {
            this.closeChat();
        } else {
            this.isOpen = true;
            chatWindow.classList.add('open');
            toggleBtn.classList.add('hidden');
            document.getElementById('chatbot-input').focus();
        }
    }

    closeChat() {
        const chatWindow = document.getElementById('chatbot-window');
        const toggleBtn = document.getElementById('chatbot-toggle');

        this.isOpen = false;
        chatWindow.classList.remove('open');
        toggleBtn.classList.remove('hidden');
    }

    sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();

        if (!message) return;

        // Add user message
        this.addUserMessage(message);
        input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Generate and add bot response after a delay
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addBotMessage(response);
        }, 800 + Math.random() * 400); // Random delay for more natural feel
    }

    addUserMessage(message) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message user-message';
        messageDiv.innerHTML = `
            <div class="message-content">${this.escapeHtml(message)}</div>
            <div class="message-time">${this.getCurrentTime()}</div>
        `;
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    addBotMessage(message) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message bot-message';
        messageDiv.innerHTML = `
            <div class="message-content">${this.formatMessage(message)}</div>
            <div class="message-time">${this.getCurrentTime()}</div>
        `;
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    generateResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();

        // Check for greetings
        if (this.matchesPattern(lowerMessage, ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon'])) {
            return "Hello! 👋 How can I help you learn more about Mahdi's skills and experience?";
        }

        // Check for thanks
        if (this.matchesPattern(lowerMessage, ['thank', 'thanks', 'appreciate'])) {
            return "You're welcome! Feel free to ask anything else about Mahdi's background or experience. 😊";
        }

        // Check for help
        if (this.matchesPattern(lowerMessage, ['help', 'what can you', 'how do'])) {
            return "I can tell you about:\n• Mahdi's technical skills and expertise\n• Work experience and current role\n• Education and certifications\n• Contact information\n\nJust ask me anything!";
        }

        // Search through knowledge base
        let bestMatch = null;
        let bestScore = 0;

        for (const [topic, data] of Object.entries(this.knowledgeBase)) {
            const score = this.calculateMatchScore(lowerMessage, data.keywords);
            if (score > bestScore) {
                bestScore = score;
                bestMatch = data.response;
            }
        }

        // If we found a good match, return it
        if (bestScore > 0) {
            return bestMatch;
        }

        // Default response for unmatched questions
        return "I'm not sure about that specific question. I can help you with information about:\n• Skills & Technologies\n• Work Experience\n• Education & Certifications\n• Contact Information\n\nWhat would you like to know?";
    }

    matchesPattern(message, patterns) {
        return patterns.some(pattern => message.includes(pattern));
    }

    calculateMatchScore(message, keywords) {
        let score = 0;
        keywords.forEach(keyword => {
            if (message.includes(keyword)) {
                score += 1;
            }
        });
        return score;
    }

    formatMessage(message) {
        // Convert markdown-style bold to HTML
        message = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Convert newlines to <br>
        message = message.replace(/\n/g, '<br>');
        return message;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Initialize chatbot when script loads
const chatbot = new PortfolioChatbot();
