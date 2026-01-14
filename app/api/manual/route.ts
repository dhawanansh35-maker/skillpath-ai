import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { interest, level } = await req.json();

    const dataLibrary: any = {
      "Web Development": {
        "Beginner": {
          role: "Junior Frontend Developer",
          roadmap: ["HTML & CSS Fundamentals", "JavaScript Basics (Variables, Loops)", "Introduction to Git & GitHub"],
          resources: [{ title: "freeCodeCamp Responsive Web Design", url: "https://www.freecodecamp.org" }, { title: "MDN Web Docs", url: "https://developer.mozilla.org" }, { title: "The Odin Project Foundations", url: "https://www.theodinproject.com" }]
        },
        "Intermediate": {
          role: "Frontend React Engineer",
          roadmap: ["React Hooks, Props & State", "Tailwind CSS Layouts", "Consuming REST APIs with Fetch/Axios"],
          resources: [{ title: "React.dev Official Docs", url: "https://react.dev" }, { title: "Scrimba Learn React", url: "https://scrimba.com/learn/learnreact" }, { title: "Full Stack Open", url: "https://fullstackopen.com/en/" }]
        },
        "Advanced": {
          role: "Senior Full-stack Architect",
          roadmap: ["Next.js App Router & Server Actions", "TypeScript for Enterprise Apps", "SQL & NoSQL Database Design"],
          resources: [{ title: "Next.js Learn Path", url: "https://nextjs.org/learn" }, { title: "Prisma Documentation", url: "https://www.prisma.io/docs" }, { title: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" }]
        }
      },
      "AI & ML": {
        "Beginner": {
          role: "Data Science Aspirant",
          roadmap: ["Python for Data Analysis", "Basic Statistics & Probability", "Numpy & Pandas Fundamentals"],
          resources: [{ title: "Kaggle Python Course", url: "https://www.kaggle.com/learn/python" }, { title: "Google ML Crash Course", url: "https://developers.google.com/machine-learning/crash-course" }, { title: "3Blue1Brown Neural Networks", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi" }]
        },
        "Intermediate": {
          role: "Machine Learning Engineer",
          roadmap: ["Supervised & Unsupervised Learning", "Scikit-Learn Feature Engineering", "Deep Learning with Neural Networks"],
          resources: [{ title: "Fast.ai Practical Deep Learning", url: "https://www.fast.ai" }, { title: "Andrew Ng ML Specialization", url: "https://www.coursera.org/specializations/machine-learning-introduction" }, { title: "PyTorch Official Tutorials", url: "https://pytorch.org/tutorials" }]
        },
        "Advanced": {
          role: "AI Research Scientist",
          roadmap: ["Transformer Architectures", "Fine-tuning LLMs & RAG", "MLOps & Model Deployment"],
          resources: [{ title: "Hugging Face Course", url: "https://huggingface.co/learn" }, { title: "DeepLearning.AI Short Courses", url: "https://www.deeplearning.ai/short-courses/" }, { title: "Stanford CS224N (NLP)", url: "https://web.stanford.edu/class/cs224n/" }]
        }
      },
      "Cyber Security": {
        "Beginner": {
          role: "Security Technician",
          roadmap: ["Network Protocols (TCP/IP)", "Linux Command Line Basics", "Intro to Hacking Ethics"],
          resources: [{ title: "TryHackMe Pre-Security", url: "https://tryhackme.com" }, { title: "Cisco Skills For All", url: "https://skillsforall.com" }, { title: "OverTheWire Wargames", url: "https://overthewire.org" }]
        },
        "Intermediate": {
          role: "SOC Analyst / Pentester",
          roadmap: ["Web Application Penetration Testing", "Network Traffic Analysis", "Incident Response Basics"],
          resources: [{ title: "PortSwigger Web Academy", url: "https://portswigger.net/web-security" }, { title: "Hack The Box Academy", url: "https://academy.hackthebox.com" }, { title: "OWASP Top 10 Guides", url: "https://owasp.org" }]
        },
        "Advanced": {
          role: "Security Architect",
          roadmap: ["Cloud Security Mastery", "Advanced Malware Analysis", "Compliance & Risk Management"],
          resources: [{ title: "SANS Cyber Aces", url: "https://www.cyberaces.org" }, { title: "Metasploit Unleashed", url: "https://www.offsec.com/metasploit-unleashed/" }, { title: "MIT Security Course", url: "https://ocw.mit.edu/courses/6-858-computer-systems-security-fall-2014/" }]
        }
      },
      "Data Science": {
        "Beginner": {
          role: "Junior Data Analyst",
          roadmap: ["Excel & SQL Basics", "Data Cleaning with Python", "Descriptive Statistics"],
          resources: [{ title: "SQLZoo Interactive", url: "https://sqlzoo.net" }, { title: "Mode SQL Tutorial", url: "https://mode.com/sql-tutorial/" }, { title: "Pandas Intro", url: "https://pandas.pydata.org/docs/" }]
        },
        "Intermediate": {
          role: "Data Scientist",
          roadmap: ["Exploratory Data Analysis (EDA)", "Inferential Statistics", "Data Visualization (Seaborn)"],
          resources: [{ title: "Harvard CS109 Data Science", url: "http://cs109.github.io/2015/" }, { title: "Kaggle Data Vis", url: "https://www.kaggle.com/learn/data-visualization" }, { title: "StatQuest YouTube", url: "https://www.youtube.com/@statquest" }]
        },
        "Advanced": {
          role: "Lead Data Scientist",
          roadmap: ["Big Data Tools (Spark)", "Time Series Forecasting", "ML Pipeline Automation"],
          resources: [{ title: "Spark by Examples", url: "https://sparkbyexamples.com" }, { title: "JHU Data Science (Audit)", url: "https://www.coursera.org/specializations/jhu-data-science" }, { title: "Airbnb Tech Blog", url: "https://medium.com/airbnb-engineering" }]
        }
      },
      "Cloud Computing": {
        "Beginner": {
          role: "Cloud Associate",
          roadmap: ["Cloud Service Models (IaaS, PaaS)", "Basic Networking (DNS, DHCP)", "Linux Server Administration"],
          resources: [{ title: "AWS Cloud Practitioner", url: "https://explore.skillbuilder.aws/" }, { title: "Google Cloud Skills Boost", url: "https://www.cloudskillsboost.google" }, { title: "Azure Fundamentals", url: "https://learn.microsoft.com/en-us/training/paths/az-900-power-platform-fundamentals/" }]
        },
        "Intermediate": {
          role: "Cloud Engineer",
          roadmap: ["Compute & Storage (EC2, S3)", "Virtual Private Clouds (VPC)", "Serverless Basics (Lambda)"],
          resources: [{ title: "FreeCodeCamp AWS Solution Architect", url: "https://www.youtube.com/watch?v=Ia-UEYYR44s" }, { title: "Azure Docs", url: "https://learn.microsoft.com/en-us/azure/" }, { title: "Cloud Guru (Free Tier)", url: "https://www.pluralsight.com/cloud-guru" }]
        },
        "Advanced": {
          role: "Solutions Architect",
          roadmap: ["Infrastructure as Code (Terraform)", "Multi-Cloud Strategy", "High Availability & Scalability"],
          resources: [{ title: "Terraform Tutorials", url: "https://developer.hashicorp.com/terraform/tutorials" }, { title: "CNCF Landscape", url: "https://www.cncf.io" }, { title: "AWS Architecture Center", url: "https://aws.amazon.com/architecture/" }]
        }
      },
      "DevOps": {
        "Beginner": {
          role: "Junior DevOps",
          roadmap: ["Git & Version Control", "Linux Systems Admin", "Scripting with Bash/Python"],
          resources: [{ title: "Linux Journey", url: "https://linuxjourney.com" }, { title: "Git Immersion", url: "https://gitimmersion.com" }, { title: "DevOps Roadmap", url: "https://roadmap.sh/devops" }]
        },
        "Intermediate": {
          role: "SRE (Site Reliability Engineer)",
          roadmap: ["Docker & Containerization", "CI/CD Pipelines (Jenkins/GitHub Actions)", "Monitoring & Logging (ELK)"],
          resources: [{ title: "Docker Labs", url: "https://training.play-with-docker.com" }, { title: "Kubernetes Tutorials", url: "https://kubernetes.io/docs/tutorials/" }, { title: "TechWorld with Nana", url: "https://www.youtube.com/@TechWorldwithNana" }]
        },
        "Advanced": {
          role: "DevOps Architect",
          roadmap: ["Kubernetes Management", "DevSecOps Integration", "Automated Scalability Patterns"],
          resources: [{ title: "Google SRE Book", url: "https://sre.google/sre-book/table-of-contents/" }, { title: "ArgoCD Docs", url: "https://argo-cd.readthedocs.io" }, { title: "Chaos Engineering Guide", url: "https://www.gremlin.com/community/tutorials/chaos-engineering-the-full-guide/" }]
        }
      },
      "Mobile App Development": {
        "Beginner": {
          role: "Junior Mobile Developer",
          roadmap: ["UI Design Basics", "Programming Logic (Dart/Kotlin)", "Building Basic Screens"],
          resources: [{ title: "Android Basics (Kotlin)", url: "https://developer.android.com/courses/android-basics-kotlin/course" }, { title: "Flutter Foundations", url: "https://docs.flutter.dev/get-started/learn-more" }, { title: "Swift Playgrounds", url: "https://www.apple.com/swift/playgrounds/" }]
        },
        "Intermediate": {
          role: "Mobile App Engineer",
          roadmap: ["State Management (Bloc/Provider)", "REST API Consumption", "Local Data Persistence (SQLite)"],
          resources: [{ title: "Flutter Codelabs", url: "https://codelabs.developers.google.com/?cat=Flutter" }, { title: "React Native Docs", url: "https://reactnative.dev/docs/getting-started" }, { title: "Firebase for Mobile", url: "https://firebase.google.com/docs/mobile/android" }]
        },
        "Advanced": {
          role: "Senior Mobile Architect",
          roadmap: ["Native Platform Integration", "CI/CD for Mobile", "Performance Optimization"],
          resources: [{ title: "Mobile DevOps (Bitrise)", url: "https://blog.bitrise.io" }, { title: "Point-Free Swift", url: "https://www.pointfree.co" }, { title: "Dart Design Patterns", url: "https://dart-design-patterns.com" }]
        }
      },
      "Game Development": {
        "Beginner": {
          role: "Junior Game Dev",
          roadmap: ["C# Programming for Unity", "2D Physics & Movement", "Game Loop Fundamentals"],
          resources: [{ title: "Unity Learn", url: "https://learn.unity.com" }, { title: "Brackeys Archive", url: "https://www.youtube.com/@Brackeys" }, { title: "GDQuest Godot", url: "https://www.gdquest.com" }]
        },
        "Intermediate": {
          role: "Game Programmer",
          roadmap: ["3D Math & Shaders", "AI & Pathfinding", "Optimization for PC/Mobile"],
          resources: [{ title: "Unreal Learning", url: "https://dev.epicgames.com/community/learning" }, { title: "Catlike Coding", url: "https://catlikecoding.com/unity/tutorials/" }, { title: "The Book of Shaders", url: "https://thebookofshaders.com" }]
        },
        "Advanced": {
          role: "Technical Artist / Lead Dev",
          roadmap: ["Multiplayer Networking", "Procedural Generation", "Advanced Graphics Pipelines"],
          resources: [{ title: "Inigo Quilez Graphics", url: "https://www.iquilezles.org/" }, { title: "Valve Developer Wiki", url: "https://developer.valvesoftware.com/wiki/Main_Page" }, { title: "Unity Architecture Patterns", url: "https://github.com/Habrador/Unity-Programming-Patterns" }]
        }
      },
      "UI / UX Design": {
        "Beginner": {
          role: "Junior UX Designer",
          roadmap: ["Design Principles (Color/Type)", "Intro to Figma", "User Research Basics"],
          resources: [{ title: "Google UX Cert (Audit)", url: "https://www.coursera.org/professional-certificates/google-ux-design" }, { title: "Figma Beginners Guide", url: "https://help.figma.com/hc/en-us/sections/360002051613-Learn-Figma" }, { title: "UX Collective", url: "https://uxdesign.cc" }]
        },
        "Intermediate": {
          role: "Product Designer",
          roadmap: ["High-Fidelity Prototyping", "Design Systems", "Usability Testing Methods"],
          resources: [{ title: "Laws of UX", url: "https://lawsofux.com" }, { title: "DesignCourse YouTube", url: "https://www.youtube.com/@DesignCourse" }, { title: "Interaction Design Foundation", url: "https://www.interaction-design.org/" }]
        },
        "Advanced": {
          role: "Lead Product Designer",
          roadmap: ["UX Strategy & Business", "Advanced Micro-interactions", "Design Leadership"],
          resources: [{ title: "NN/g Articles", url: "https://www.nngroup.com/articles/" }, { title: "Case Study Club", url: "https://www.casestudy.club" }, { title: "InVision Design Engineering", url: "https://www.invisionapp.com/inside-design/design-engineering/" }]
        }
      }
    };

    const categoryData = dataLibrary[interest];
    const finalData = categoryData ? categoryData[level] : null;

    if (finalData) {
      return NextResponse.json(finalData);
    }

    return NextResponse.json({
      role: `${level} ${interest || "Technology"} Specialist`,
      roadmap: ["Master the fundamentals", "Build hands-on projects", "Stay updated with industry trends"],
      resources: [{ title: "General Learning (Class Central)", url: "https://www.classcentral.com" }]
    });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}