import type { ResearchCategory } from '@/lib/types';

/**
 * Research category data for the Research page.
 * Each entry represents a source category that informs the platform's AI coaching engine.
 */
export const researchCategories: ResearchCategory[] = [
  {
    icon: 'FileText',
    heading: 'Scientific Literature',
    description:
      'The platform draws from peer-reviewed journals and meta-analyses covering exercise physiology, biomechanics, and sports science. Research findings are systematically reviewed and integrated into coaching algorithms to ensure recommendations reflect current scientific consensus. This includes longitudinal studies on training adaptations, dose-response relationships for volume and intensity, and comparative analyses of programming methodologies.',
    visualType: 'icon',
  },
  {
    icon: 'File',
    heading: 'PDFs',
    description:
      'Research papers, textbooks, and educational materials in PDF format are processed and indexed for knowledge extraction. The system parses structured documents to identify key findings, training protocols, and evidence-based guidelines from authoritative sources. Future capabilities include automated document ingestion using retrieval-augmented generation (a technique that combines document search with AI responses) to surface relevant research during programming decisions.',
    visualType: 'widget',
  },
  {
    icon: 'Video',
    heading: 'YouTube Educational Content',
    description:
      'Video lectures and educational channels from researchers and practitioners provide supplementary training knowledge. Transcript ingestion (converting spoken content into searchable text) enables the platform to extract insights from presentations, conference talks, and expert discussions. This source category captures practical coaching wisdom and emerging research interpretations that may not yet appear in formal publications.',
    visualType: 'illustration',
  },
  {
    icon: 'Users',
    heading: 'Evidence-Based Coaching Methods',
    description:
      'Practical application of research findings by experienced coaches bridges the gap between laboratory science and real-world training outcomes. The platform synthesizes coaching methodologies that have been validated through both scientific study and applied practice with athletes. Embeddings (numerical representations of text meaning) allow the AI to identify connections between coaching approaches and underlying research, enabling context-aware programming recommendations.',
    visualType: 'icon',
  },
];
