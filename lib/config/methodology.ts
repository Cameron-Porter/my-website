import type { MethodologyTopic } from '@/lib/types';

/**
 * Methodology topic data for the Methodology page.
 * Each entry represents a core training principle that underpins the platform's coaching approach.
 */
export const methodologyTopics: MethodologyTopic[] = [
  {
    icon: 'Dumbbell',
    heading: 'Hypertrophy Science',
    description:
      'Muscle growth is driven by mechanical tension, metabolic stress, and muscle damage acting as primary stimuli for adaptation. The platform applies these mechanisms through targeted programming that manipulates rep ranges, time under tension, and proximity to failure to maximize hypertrophic response.',
  },
  {
    icon: 'TrendingUp',
    heading: 'Progressive Overload',
    description:
      'Systematic increases in training stimulus over time are essential for continued adaptation. Progressive overload is applied through incremental adjustments to load, volume, frequency, and exercise complexity, ensuring the body is consistently challenged beyond its current capacity.',
  },
  {
    icon: 'Activity',
    heading: 'Fatigue Management',
    description:
      'Balancing training stress with recovery capacity is critical for sustained progress without overreaching. Fatigue is monitored across systemic and local dimensions, allowing the platform to modulate training load and prevent performance decrements from accumulated fatigue.',
  },
  {
    icon: 'SlidersHorizontal',
    heading: 'Autoregulation',
    description:
      'Training is adjusted based on daily readiness and real-time performance indicators rather than rigid pre-planned progressions. This approach accounts for day-to-day variability in recovery, sleep quality, and stress levels to optimize each training session.',
  },
  {
    icon: 'Moon',
    heading: 'Recovery Optimization',
    description:
      'Sleep, nutrition, and lifestyle factors directly influence the rate and quality of physiological adaptation. The platform integrates recovery metrics to provide actionable guidance on optimizing the conditions necessary for muscle repair and performance gains.',
  },
  {
    icon: 'GraduationCap',
    heading: 'Evidence-Based Coaching',
    description:
      'Programming decisions are informed by peer-reviewed research and validated training methodologies. Each coaching recommendation is traceable to scientific literature, ensuring that training protocols reflect current understanding of exercise physiology and sports science.',
  },
];
