import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { interest } = await req.json();

  const data: any = {
    "Web Development": {
      role: "Frontend Web Developer",
      roadmap: [
        "Learn HTML, CSS, JavaScript",
        "Learn React & Tailwind CSS",
        "Build real-world projects"
      ],
      resources: [
        {
          title: "freeCodeCamp – Web Development",
          url: "https://www.freecodecamp.org"
        },
        {
          title: "MDN Web Docs",
          url: "https://developer.mozilla.org"
        },
        {
          title: "CodeWithHarry (YouTube)",
          url: "https://www.youtube.com/@CodeWithHarry"
        }
      ]
    },

    "AI & ML": {
      role: "AI / ML Engineer",
      roadmap: [
        "Learn Python Basics",
        "Understand Machine Learning",
        "Learn Deep Learning & Build Projects"
      ],
      resources: [
        {
          title: "Google ML Crash Course",
          url: "https://developers.google.com/machine-learning/crash-course"
        },
        {
          title: "Kaggle Learn",
          url: "https://www.kaggle.com/learn"
        },
        {
          title: "Krish Naik (YouTube)",
          url: "https://www.youtube.com/@krishnaik06"
        }
      ]
    },

    "Cyber Security": {
      role: "Cyber Security Analyst",
      roadmap: [
        "Learn Networking Basics",
        "Understand Linux & Operating Systems",
        "Learn Cyber Security fundamentals",
        "Practice using labs & CTFs"
      ],
      resources: [
        {
          title: "TryHackMe",
          url: "https://tryhackme.com"
        },
        {
          title: "Cybrary",
          url: "https://www.cybrary.it"
        },
        {
          title: "HackerSploit (YouTube)",
          url: "https://www.youtube.com/@HackerSploit"
        }
      ]
    },

    "Data Science": {
      role: "Data Scientist",
      roadmap: [
        "Learn Python & Statistics",
        "Data Analysis with Pandas & NumPy",
        "Data Visualization",
        "Build Data Projects"
      ],
      resources: [
        {
          title: "Kaggle Learn",
          url: "https://www.kaggle.com/learn"
        },
        {
          title: "freeCodeCamp – Data Analysis",
          url: "https://www.freecodecamp.org/learn/data-analysis-with-python/"
        },
        {
          title: "StatQuest (YouTube)",
          url: "https://www.youtube.com/@statquest"
        }
      ]
    },

    "Cloud Computing": {
      role: "Cloud Engineer",
      roadmap: [
        "Learn Linux & Networking",
        "Understand Cloud Basics (IaaS, PaaS, SaaS)",
        "Learn AWS / Azure Fundamentals",
        "Deploy Cloud Projects"
      ],
      resources: [
        {
          title: "AWS Cloud Practitioner Essentials",
          url: "https://www.aws.training/Details/Curriculum?id=20685"
        },
        {
          title: "Google Cloud Skills Boost",
          url: "https://www.cloudskillsboost.google"
        },
        {
          title: "freeCodeCamp – Cloud Computing",
          url: "https://www.freecodecamp.org/news/cloud-computing-for-beginners/"
        }
      ]
    },

    "DevOps": {
      role: "DevOps Engineer",
      roadmap: [
        "Learn Linux & Git",
        "Understand CI/CD",
        "Learn Docker & Kubernetes",
        "Automate Deployments"
      ],
      resources: [
        {
          title: "Docker Getting Started",
          url: "https://docs.docker.com/get-started/"
        },
        {
          title: "Kubernetes Basics",
          url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/"
        },
        {
          title: "TechWorld with Nana (YouTube)",
          url: "https://www.youtube.com/@TechWorldwithNana"
        }
      ]
    },

    "Mobile App Development": {
      role: "Mobile App Developer",
      roadmap: [
        "Learn Programming Basics",
        "Choose Android (Kotlin) or Flutter",
        "Build Mobile Apps",
        "Publish Apps"
      ],
      resources: [
        {
          title: "Android Developer Courses",
          url: "https://developer.android.com/courses"
        },
        {
          title: "Flutter Documentation",
          url: "https://docs.flutter.dev"
        },
        {
          title: "freeCodeCamp – Mobile Development",
          url: "https://www.freecodecamp.org/news/tag/mobile-development/"
        }
      ]
    },

    "Game Development": {
      role: "Game Developer",
      roadmap: [
        "Learn C# or C++",
        "Understand Game Mechanics",
        "Learn Unity or Unreal Engine",
        "Build Small Games"
      ],
      resources: [
        {
          title: "Unity Learn",
          url: "https://learn.unity.com"
        },
        {
          title: "Unreal Engine Learning",
          url: "https://dev.epicgames.com/community/learning"
        },
        {
          title: "Brackeys (YouTube)",
          url: "https://www.youtube.com/@Brackeys"
        }
      ]
    },

    "UI / UX Design": {
      role: "UI / UX Designer",
      roadmap: [
        "Learn Design Principles",
        "User Research & Wireframing",
        "Learn Figma",
        "Create Portfolio"
      ],
      resources: [
        {
          title: "Google UX Design (Coursera – Free Audit)",
          url: "https://www.coursera.org/professional-certificates/google-ux-design"
        },
        {
          title: "Figma Learn",
          url: "https://help.figma.com"
        },
        {
          title: "DesignCourse (YouTube)",
          url: "https://www.youtube.com/@DesignCourse"
        }
      ]
    }
  };

  return NextResponse.json(
    data[interest] || {
      role: "Technology Student",
      roadmap: [
        "Explore basic technologies",
        "Choose a domain",
        "Practice with projects"
      ],
      resources: []
    }
  );
}
