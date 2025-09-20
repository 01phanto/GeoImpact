import { useState, useEffect, useCallback, useRef } from 'react';

// Alert priority levels
export const ALERT_PRIORITIES = {
  CRITICAL: {
    level: 5,
    name: 'Critical',
    color: 'red',
    sound: 'critical-alert.mp3',
    description: 'Border conflicts, major diplomatic crisis'
  },
  HIGH: {
    level: 4,
    name: 'High',
    color: 'orange',
    sound: 'high-alert.mp3',
    description: 'Economic sanctions, military movements'
  },
  MEDIUM: {
    level: 3,
    name: 'Medium',
    color: 'yellow',
    sound: 'medium-alert.mp3',
    description: 'Trade disputes, diplomatic statements'
  },
  LOW: {
    level: 2,
    name: 'Low',
    color: 'blue',
    sound: 'low-alert.mp3',
    description: 'Regular diplomatic activities'
  },
  INFO: {
    level: 1,
    name: 'Info',
    color: 'gray',
    sound: null,
    description: 'General updates and news'
  }
};

// Alert trigger keywords with their priority levels
const ALERT_KEYWORDS = {
  // Critical Priority (Level 5)
  critical: [
    'border clash', 'military confrontation', 'ceasefire violation',
    'terrorist attack', 'nuclear', 'war declared', 'emergency declared',
    'diplomatic relations severed', 'ambassador recalled'
  ],
  
  // High Priority (Level 4)
  high: [
    'sanctions imposed', 'trade war escalates', 'military exercises',
    'LAC tension', 'cross-border firing', 'diplomatic crisis',
    'economic embargo', 'airspace violation', 'naval confrontation'
  ],
  
  // Medium Priority (Level 3)
  medium: [
    'bilateral talks', 'trade agreement', 'foreign minister meeting',
    'economic cooperation', 'border patrol', 'diplomatic visit',
    'energy deal', 'strategic partnership'
  ],
  
  // Low Priority (Level 2)
  low: [
    'cultural exchange', 'business delegation', 'academic cooperation',
    'tourism agreement', 'sports diplomacy'
  ]
};

// Sound alert system
class AlertSoundManager {
  constructor() {
    this.audioContext = null;
    this.sounds = new Map();
    this.isEnabled = true;
    this.volume = 0.7;
  }

  async initialize() {
    try {
      // Create audio context for better sound control
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create different alert sounds programmatically
      this.createAlertSounds();
    } catch (error) {
      console.warn('Audio context not available:', error);
    }
  }

  createAlertSounds() {
    // Create different frequency patterns for different alert levels
    const soundPatterns = {
      critical: { frequency: 800, pattern: [0.2, 0.1, 0.2, 0.1, 0.2] },
      high: { frequency: 600, pattern: [0.3, 0.2, 0.3] },
      medium: { frequency: 400, pattern: [0.4, 0.3] },
      low: { frequency: 300, pattern: [0.5] }
    };

    Object.entries(soundPatterns).forEach(([level, config]) => {
      this.sounds.set(level, config);
    });
  }

  async playAlert(priority) {
    if (!this.isEnabled || !this.audioContext) return;

    const priorityName = Object.keys(ALERT_PRIORITIES).find(
      key => ALERT_PRIORITIES[key].level === priority
    )?.toLowerCase();

    const soundConfig = this.sounds.get(priorityName);
    if (!soundConfig) return;

    try {
      // Resume audio context if suspended
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      // Play sound pattern
      let time = this.audioContext.currentTime;
      soundConfig.pattern.forEach((duration, index) => {
        if (index % 2 === 0) {
          // Play tone
          const oscillator = this.audioContext.createOscillator();
          const gainNode = this.audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(this.audioContext.destination);
          
          oscillator.frequency.value = soundConfig.frequency;
          oscillator.type = 'sine';
          
          gainNode.gain.setValueAtTime(0, time);
          gainNode.gain.linearRampToValueAtTime(this.volume, time + 0.01);
          gainNode.gain.linearRampToValueAtTime(0, time + duration);
          
          oscillator.start(time);
          oscillator.stop(time + duration);
        }
        time += duration;
      });
    } catch (error) {
      console.warn('Error playing alert sound:', error);
    }
  }

  setEnabled(enabled) {
    this.isEnabled = enabled;
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
  }
}

// Browser notification manager
class NotificationManager {
  constructor() {
    this.permission = 'default';
    this.isSupported = 'Notification' in window;
  }

  async requestPermission() {
    if (!this.isSupported) return false;

    try {
      this.permission = await Notification.requestPermission();
      return this.permission === 'granted';
    } catch (error) {
      console.warn('Notification permission error:', error);
      return false;
    }
  }

  async showNotification(title, options = {}) {
    if (!this.isSupported || this.permission !== 'granted') return;

    try {
      const notification = new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options
      });

      // Auto-close after 10 seconds
      setTimeout(() => {
        notification.close();
      }, 10000);

      return notification;
    } catch (error) {
      console.warn('Error showing notification:', error);
    }
  }
}

export const useAlertSystem = () => {
  const [alerts, setAlerts] = useState([]);
  const [preferences, setPreferences] = useState({
    enableNotifications: true,
    enableSounds: true,
    minPriority: 3, // Medium and above
    categories: ['Border Security', 'Diplomacy', 'Economic Impact', 'Energy Security']
  });
  const [isNotificationPermissionGranted, setIsNotificationPermissionGranted] = useState(false);

  const soundManagerRef = useRef(null);
  const notificationManagerRef = useRef(null);

  // Initialize managers
  useEffect(() => {
    soundManagerRef.current = new AlertSoundManager();
    notificationManagerRef.current = new NotificationManager();

    soundManagerRef.current.initialize();
    
    // Check initial notification permission
    if (notificationManagerRef.current.isSupported) {
      setIsNotificationPermissionGranted(Notification.permission === 'granted');
    }
  }, []);

  // Calculate alert priority based on content
  const calculateAlertPriority = useCallback((article) => {
    const text = `${article.title} ${article.description || ''}`.toLowerCase();
    
    // Check for critical keywords first
    for (const keyword of ALERT_KEYWORDS.critical) {
      if (text.includes(keyword)) {
        return ALERT_PRIORITIES.CRITICAL.level;
      }
    }

    // Check for high priority keywords
    for (const keyword of ALERT_KEYWORDS.high) {
      if (text.includes(keyword)) {
        return ALERT_PRIORITIES.HIGH.level;
      }
    }

    // Check for medium priority keywords
    for (const keyword of ALERT_KEYWORDS.medium) {
      if (text.includes(keyword)) {
        return ALERT_PRIORITIES.MEDIUM.level;
      }
    }

    // Check for low priority keywords
    for (const keyword of ALERT_KEYWORDS.low) {
      if (text.includes(keyword)) {
        return ALERT_PRIORITIES.LOW.level;
      }
    }

    // Use existing relevance score as fallback
    if (article.relevanceScore >= 8) return ALERT_PRIORITIES.HIGH.level;
    if (article.relevanceScore >= 6) return ALERT_PRIORITIES.MEDIUM.level;
    if (article.relevanceScore >= 4) return ALERT_PRIORITIES.LOW.level;
    
    return ALERT_PRIORITIES.INFO.level;
  }, []);

  // Process new articles for alerts
  const processNewsForAlerts = useCallback((newsArticles) => {
    if (!newsArticles || newsArticles.length === 0) return;

    const newAlerts = [];
    const now = new Date();

    newsArticles.forEach((article) => {
      const priority = calculateAlertPriority(article);
      const priorityInfo = Object.values(ALERT_PRIORITIES).find(p => p.level === priority);
      
      // Check if article is recent enough for alert (within last 2 hours)
      const articleTime = new Date(article.publishedAt);
      const hoursDiff = (now - articleTime) / (1000 * 60 * 60);
      
      if (hoursDiff <= 2 && priority >= preferences.minPriority) {
        // Check if we should alert based on category preference
        if (preferences.categories.includes(article.category)) {
          const alert = {
            id: `alert-${Date.now()}-${Math.random()}`,
            article,
            priority,
            priorityInfo,
            timestamp: now,
            acknowledged: false
          };
          
          newAlerts.push(alert);
        }
      }
    });

    if (newAlerts.length > 0) {
      setAlerts(prev => [...newAlerts, ...prev].slice(0, 50)); // Keep last 50 alerts
      
      // Trigger notifications and sounds for new alerts
      newAlerts.forEach(alert => {
        triggerAlert(alert);
      });
    }
  }, [preferences, calculateAlertPriority]);

  // Trigger alert notification and sound
  const triggerAlert = useCallback(async (alert) => {
    const { article, priorityInfo } = alert;

    // Play sound alert
    if (preferences.enableSounds && soundManagerRef.current) {
      await soundManagerRef.current.playAlert(alert.priority);
    }

    // Show browser notification
    if (preferences.enableNotifications && notificationManagerRef.current) {
      const title = `${priorityInfo.name} Alert: ${article.title}`;
      const options = {
        body: article.description?.substring(0, 120) + '...',
        tag: alert.id,
        data: { alertId: alert.id, articleUrl: article.url },
        requireInteraction: alert.priority >= ALERT_PRIORITIES.HIGH.level
      };

      await notificationManagerRef.current.showNotification(title, options);
    }
  }, [preferences]);

  // Request notification permission
  const requestNotificationPermission = useCallback(async () => {
    if (notificationManagerRef.current) {
      const granted = await notificationManagerRef.current.requestPermission();
      setIsNotificationPermissionGranted(granted);
      return granted;
    }
    return false;
  }, []);

  // Acknowledge alert
  const acknowledgeAlert = useCallback((alertId) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, acknowledged: true }
          : alert
      )
    );
  }, []);

  // Clear all alerts
  const clearAllAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  // Update preferences
  const updatePreferences = useCallback((newPreferences) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }));
    
    // Update sound manager settings
    if (soundManagerRef.current) {
      soundManagerRef.current.setEnabled(newPreferences.enableSounds ?? prev.enableSounds);
    }
  }, []);

  // Get unacknowledged alerts
  const getUnacknowledgedAlerts = useCallback(() => {
    return alerts.filter(alert => !alert.acknowledged);
  }, [alerts]);

  // Get alerts by priority
  const getAlertsByPriority = useCallback((minPriority = 1) => {
    return alerts.filter(alert => alert.priority >= minPriority);
  }, [alerts]);

  // Test alert system
  const testAlert = useCallback(async (priority = ALERT_PRIORITIES.MEDIUM.level) => {
    const testAlert = {
      id: `test-${Date.now()}`,
      article: {
        title: 'Test Alert: System Check',
        description: 'This is a test alert to verify the notification system is working correctly.',
        category: 'System Test',
        publishedAt: new Date().toISOString()
      },
      priority,
      priorityInfo: Object.values(ALERT_PRIORITIES).find(p => p.level === priority),
      timestamp: new Date(),
      acknowledged: false
    };

    setAlerts(prev => [testAlert, ...prev]);
    await triggerAlert(testAlert);
  }, [triggerAlert]);

  return {
    alerts,
    preferences,
    isNotificationPermissionGranted,
    processNewsForAlerts,
    requestNotificationPermission,
    acknowledgeAlert,
    clearAllAlerts,
    updatePreferences,
    getUnacknowledgedAlerts,
    getAlertsByPriority,
    testAlert,
    ALERT_PRIORITIES
  };
};
