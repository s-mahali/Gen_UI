import type { TimelineEvent } from "../types/types";

const AI_DATA: TimelineEvent[] =  [
      {
        "id": "ai_1956_dartmouth",
        "year": 1956,
        "title": "Dartmouth Workshop: Birth of AI",
        "description": "John McCarthy coined the term \"Artificial Intelligence\" and organized the Dartmouth Summer Research Project on Artificial Intelligence, marking the official inception of AI as a field of study.",
        "type": "historical",
        "sentiment": "positive",
        "impactScore": 85,
        "tags": [
          "foundational",
          "research",
          "early AI",
          "McCarthy"
        ],
        "imageUrl": {
          "url": "https://www.sciencesetavenir.fr/assets/img/2024/12/19/cover-r4x3w1200-676441b6b1dc0-7607-424533-k2-k1-1017918-jpg.jpg"
        },
        "marketValue": "Not applicable (early academic phase)"
      },
      {
        "id": "ai_1987_aiwinter",
        "year": 1987,
        "title": "Second AI Winter Begins",
        "description": "Following overhyped expectations and the collapse of the Lisp machine market, funding for AI research significantly declined, leading to a period known as the \"AI Winter\" where interest waned.",
        "type": "historical",
        "sentiment": "negative",
        "impactScore": 60,
        "tags": [
          "AI Winter",
          "funding cuts",
          "Lisp machines",
          "research slowdown",
          "overhype"
        ],
        "imageUrl": {
          "url": "https://aitoolsexplorer.com/wp-content/uploads/2024/12/AI-winter.webp"
        },
        "marketValue": "Decline in AI-related tech companies and investments"
      },
      {
        "id": "ai_1997_deepblue",
        "year": 1997,
        "title": "Deep Blue Defeats Garry Kasparov",
        "description": "IBM's Deep Blue chess computer defeated reigning world champion Garry Kasparov in a six-game match, a landmark moment demonstrating AI's ability to excel in complex strategic tasks against human experts.",
        "type": "historical",
        "sentiment": "positive",
        "impactScore": 90,
        "tags": [
          "chess",
          "IBM",
          "Deep Blue",
          "game AI",
          "Kasparov"
        ],
        "imageUrl": {
          "url": "https://cdnph.upi.com/svc/sv/upi/2321715373877/2024/1/6a0429fa1ada13e8ae7f5558b9deaf88/On-This-Day-IBMs-Deep-Blue-beats-chess-legend-Kasparov.jpg"
        },
        "marketValue": "Increased interest and investment in computational power for AI"
      },
      {
        "id": "ai_2012_imagenet",
        "year": 2012,
        "title": "ImageNet Moment: Deep Learning Breakthrough",
        "description": "AlexNet, a deep convolutional neural network, significantly outperformed traditional methods in the ImageNet Large Scale Visual Recognition Challenge (ILSVRC), sparking the modern deep learning revolution and renewed AI interest.",   
        "type": "historical",
        "sentiment": "positive",
        "impactScore": 95,
        "tags": [
          "deep learning",
          "computer vision",
          "neural networks",
          "AlexNet",
          "ImageNet"
        ],
        "imageUrl": {
          "url": "https://cdn.sanity.io/images/vr8gru94/production/511d51bd1d1ec3b7155250bf7e53cfa6cb52f215-1339x503.png"        
        },
        "marketValue": "Surge in AI research investment, particularly in deep learning"
      },
      {
        "id": "ai_2016_alphago",
        "year": 2016,
        "title": "AlphaGo Beats Lee Sedol in Go",
        "description": "Google DeepMind's AlphaGo defeated world champion Go player Lee Sedol, a feat previously thought to be decades away due to Go's immense complexity, showcasing advanced reinforcement learning.",
        "type": "historical",
        "sentiment": "positive",
        "impactScore": 92,
        "tags": [
          "Go",
          "DeepMind",
          "AlphaGo",
          "reinforcement learning",
          "Lee Sedol"
        ],
        "imageUrl": {
          "url": "https://c8.alamy.com/compit/2n0479f/south-korean-professional-go-player-lee-sedol-puts-the-first-stone-against-googles-artificial-intelligence-program-alphago-during-the-second-match-of-the-google-deepmind-challenge-match-in-seoul-south-korea-thursday-march-10-2016-googles-computer-program-alphago-defeated-its-human-opponent-south-korean-go-champion-lee-sedol-on-wednesday-in-the-first-face-off-of-a-historic-five-game-match-ap-photo-lee-jin-man-2n0479f.jpg"
        },
        "marketValue": "Increased valuation for AI companies, particularly Google DeepMind"
      },
      {
        "id": "ai_2022_chatgpt",
        "year": 2022,
        "title": "ChatGPT Public Launch",
        "description": "OpenAI's ChatGPT was released to the public, quickly becoming a global phenomenon and demonstrating the incredible capabilities of large language models (LLMs) for natural language generation and interaction, ushering in the generative AI era.",
        "type": "historical",
        "sentiment": "positive",
        "impactScore": 98,
        "tags": [
          "generative AI",
          "LLM",
          "ChatGPT",
          "OpenAI",
          "public adoption",
          "AI assistant"
        ],
        "imageUrl": {
          "url": "https://www.techradar.com/computing/artificial-intelligence/nothing-shows-how-far-chatgpts-images-have-come-than-two-pictures-generated-with-the-same-prompt-but-created-a-year-apart"
        },
        "marketValue": "Explosion in OpenAI valuation and massive investment in generative AI sector"
      },
      {
        "id": "ai_2030_ubiquitous",
        "year": 2030,
        "title": "Ubiquitous AI Integration",
        "description": "AI is expected to be deeply integrated into most aspects of daily life, from personalized health and education to autonomous vehicles and smart cities, driven by advancements in edge AI and specialized models, making it an invisible utility.",
        "type": "prediction",
        "sentiment": "positive",
        "impactScore": 90,
        "tags": [
          "future",
          "integration",
          "smart cities",
          "personalized AI",
          "autonomous systems"
        ],
        "imageUrl": {
          "url": "https://aiiot2023.org/images/2024/numbertracker/June/article_1_1.webp"
        },
        "marketValue": "Projected global AI market reaching several trillion dollars"
      },
      {
        "id": "ai_2035_ethics_regulation",
        "year": 2035,
        "title": "Global AI Ethics and Regulatory Frameworks",
        "description": "As AI becomes more powerful and pervasive, global efforts will intensify to establish robust ethical guidelines and regulatory frameworks to ensure responsible development, address bias, privacy, and accountability, and mitigate potential risks.",
        "type": "prediction",
        "sentiment": "neutral",
        "impactScore": 80,
        "tags": [
          "future",
          "ethics",
          "regulation",
          "governance",
          "responsible AI",
          "policy"
        ],
        "imageUrl": {
          "url": "https://websocialsoftware.com/wp-content/uploads/2024/04/global-ai-governance-an-in-depth-overview-of-artificial-intelligence-regulations-worldwide.png"
        },
        "marketValue": "Growth in AI governance and compliance solutions market"
      },
      {
        "id": "ai_2040_agi_progress",
        "year": 2040,
        "title": "Significant AGI Progress",
        "description": "While full Artificial General Intelligence (AGI) remains a complex goal, significant breakthroughs are anticipated, potentially leading to AI systems capable of learning and applying intelligence across a wide range of tasks comparable to human cognitive abilities, if not surpassing them in specific domains.",
        "type": "prediction",
        "sentiment": "neutral",
        "impactScore": 95,
        "tags": [
          "future",
          "AGI",
          "general intelligence",
          "transformative AI",
          "research frontier"
        ],
        "imageUrl": {
          "url": "https://img.freepik.com/premium-photo/futuristic-artificial-intelligence-concept-with-glowing-digital-brain-computer-chip-showcasing-advanced-neural-network-machine-learning-technology-hightech-environment_860237-2624.jpg?w=2000"
        },
        "marketValue": "Potential for an unfathomable economic shift and new industries"
      }
    
  

]

export { AI_DATA };
