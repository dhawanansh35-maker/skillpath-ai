import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { interest, level } = await req.json();

    const dataLibrary: any = {
      "Web Development": {
        "Beginner": {
          role: "Junior Frontend Developer",
          roadmap: ["HTML5 & CSS3 Fundamentals", "JavaScript Basics (DOM, ES6)", "Git & GitHub Basics"],
          resources: [
            { title: "freeCodeCamp Responsive Web Design", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/" },
            { title: "JavaScript.info - The Modern Tutorial", url: "https://javascript.info/" },
            { title: "The Odin Project Foundations", url: "https://www.theodinproject.com/paths/foundations/courses/foundations" }
          ]
        },
        "Intermediate": {
          role: "Frontend React Engineer",
          roadmap: ["React Hooks & Router", "Tailwind CSS & Shadcn UI", "State Management (Zustand/Redux)"],
          resources: [
            { title: "React.dev Official Docs", url: "https://react.dev/" },
            { title: "Scrimba - Learn React for Free", url: "https://scrimba.com/learn/learnreact" },
            { title: "Tailwind CSS Components Guide", url: "https://tailwindcss.com/docs/installation" }
          ]
        },
        "Advanced": {
          role: "Fullstack Next.js Architect",
          roadmap: ["Next.js App Router & Server Actions", "PostgreSQL & Prisma ORM", "System Design & Scalability"],
          resources: [
            { title: "Next.js Dashboard Tutorial", url: "https://nextjs.org/learn" },
            { title: "Full Stack Open (Helsinki University)", url: "https://fullstackopen.com/en/" },
            { title: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" }
          ]
        }
      },
      "AI & ML": {
        "Beginner": {
          role: "AI Aspirant",
          roadmap: ["Python for Data Science", "Linear Algebra & Statistics", "NumPy & Pandas"],
          resources: [
            { title: "Kaggle - Python for Data Science", url: "https://www.kaggle.com/learn/python" },
            { title: "3Blue1Brown - Essence of Linear Algebra", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab" },
            { title: "Pandas Documentation Tutorials", url: "https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html" }
          ]
        },
        "Intermediate": {
          role: "Machine Learning Engineer",
          roadmap: ["Supervised & Unsupervised Learning", "Neural Network Fundamentals", "Scikit-Learn Projects"],
          resources: [
            { title: "Andrew Ng - Machine Learning (Coursera Audit)", url: "https://www.coursera.org/specializations/machine-learning-introduction" },
            { title: "Google ML Crash Course", url: "https://developers.google.com/machine-learning/crash-course" },
            { title: "Fast.ai - Practical Deep Learning", url: "https://www.fast.ai/" }
          ]
        },
        "Advanced": {
          role: "Deep Learning Specialist",
          roadmap: ["Transformers & LLMs", "Fine-tuning Models", "MLOps Pipelines"],
          resources: [
            { title: "Hugging Face Course", url: "https://huggingface.co/learn" },
            { title: "DeepLearning.AI Short Courses", url: "https://www.deeplearning.ai/short-courses/" },
            { title: "PyTorch Official Tutorials", url: "https://pytorch.org/tutorials/" }
          ]
        }
      },
      "Cyber Security": {
        "Beginner": {
          role: "Security Technician",
          roadmap: ["Networking Basics (TCP/IP)", "Linux CLI Basics", "Security Principles"],
          resources: [
            { title: "Cisco Networking Academy (Free)", url: "https://www.skillsforall.com/" },
            { title: "Linux Journey", url: "https://linuxjourney.com/" },
            { title: "TryHackMe Pre-Security Path", url: "https://tryhackme.com/path/outline/presecurity" }
          ]
        },
        "Intermediate": {
          role: "Pentester / SOC Analyst",
          roadmap: ["Web App Security (OWASP)", "Network Traffic Analysis", "Metasploit Fundamentals"],
          resources: [
            { title: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security" },
            { title: "Hack The Box Academy", url: "https://academy.hackthebox.com/" },
            { title: "OWASP Top Ten Project", url: "https://owasp.org/www-project-top-ten/" }
          ]
        },
        "Advanced": {
          role: "Security Architect",
          roadmap: ["Cloud Security Mastery", "Advanced Malware Analysis", "Incident Response"],
          resources: [
            { title: "SANS Cyber Aces Online", url: "https://www.cyberaces.org/" },
            { title: "Metasploit Unleashed", url: "https://www.offsec.com/metasploit-unleashed/" },
            { title: "MIT Computer Systems Security", url: "https://ocw.mit.edu/courses/6-858-computer-systems-security-fall-2014/" }
          ]
        }
      },
      "Data Science": {
        "Beginner": {
          role: "Junior Data Analyst",
          roadmap: ["Excel & SQL Basics", "Data Cleaning with Python", "Descriptive Statistics"],
          resources: [
            { title: "SQLZoo Interactive SQL", url: "https://sqlzoo.net/" },
            { title: "Mode Analytics SQL Tutorial", url: "https://mode.com/sql-tutorial/" },
            { title: "DataCamp Free Intro Courses", url: "https://www.datacamp.com/courses/free-introduction-to-r" }
          ]
        },
        "Intermediate": {
          role: "Data Scientist",
          roadmap: ["Exploratory Data Analysis", "Inferential Statistics", "Data Visualization"],
          resources: [
            { title: "Harvard CS109 Data Science", url: "http://cs109.github.io/2015/" },
            { title: "Kaggle - Data Visualization Course", url: "https://www.kaggle.com/learn/data-visualization" },
            { title: "StatQuest - Statistics Fundamentals", url: "https://www.youtube.com/@statquest" }
          ]
        },
        "Advanced": {
          role: "Senior Data Scientist",
          roadmap: ["Big Data (Spark)", "Time Series Analysis", "Automated Pipelines"],
          resources: [
            { title: "Spark by Examples", url: "https://sparkbyexamples.com/" },
            { title: "JHU Data Science (Coursera Audit)", url: "https://www.coursera.org/specializations/jhu-data-science" },
            { title: "Airbnb Data Engineering Blog", url: "https://medium.com/airbnb-engineering" }
          ]
        }
      },
      "Cloud Computing": {
        "Beginner": {
          role: "Cloud Associate",
          roadmap: ["Cloud Service Models", "Basic Virtualization", "Linux Admin"],
          resources: [
            { title: "AWS Cloud Practitioner Essentials", url: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials" },
            { title: "Azure Fundamentals (AZ-900)", url: "https://learn.microsoft.com/en-us/training/paths/az-900-power-platform-fundamentals/" },
            { title: "Google Cloud Skills Boost", url: "https://www.cloudskillsboost.google/" }
          ]
        },
        "Intermediate": {
          role: "Cloud Engineer",
          roadmap: ["EC2, S3, & VPC Basics", "Identity & Access (IAM)", "Serverless Intro"],
          resources: [
            { title: "FreeCodeCamp - AWS Solutions Architect", url: "https://www.youtube.com/watch?v=Ia-UEYYR44s" },
            { title: "A Cloud Guru (Free Tier)", url: "https://www.pluralsight.com/cloud-guru" },
            { title: "DigitalOcean Community Tutorials", url: "https://www.digitalocean.com/community/tutorials" }
          ]
        },
        "Advanced": {
          role: "Cloud Solutions Architect",
          roadmap: ["Infrastructure as Code (Terraform)", "Multi-Cloud Strategy", "Disaster Recovery"],
          resources: [
            { title: "Terraform Official Tutorials", url: "https://developer.hashicorp.com/terraform/tutorials" },
            { title: "CNCF Cloud Native Landscape", url: "https://landscape.cncf.io/" },
            { title: "AWS Architecture Center", url: "https://aws.amazon.com/architecture/" }
          ]
        }
      },
      "DevOps": {
        "Beginner": {
          role: "Junior DevOps",
          roadmap: ["Linux Systems & Shell", "Git Workflow", "Networking Basics"],
          resources: [
            { title: "Linux Journey - Command Line", url: "https://linuxjourney.com/" },
            { title: "Git Immersion", url: "https://gitimmersion.com/" },
            { title: "DevOps Roadmap Visual Guide", url: "https://roadmap.sh/devops" }
          ]
        },
        "Intermediate": {
          role: "SRE / DevOps Engineer",
          roadmap: ["Docker Containerization", "CI/CD Pipelines", "Monitoring & Logging"],
          resources: [
            { title: "Docker Play-with-Docker Labs", url: "https://training.play-with-docker.com/" },
            { title: "TechWorld with Nana (YouTube)", url: "https://www.youtube.com/@TechWorldwithNana" },
            { title: "Jenkins User Documentation", url: "https://www.jenkins.io/doc/" }
          ]
        },
        "Advanced": {
          role: "DevOps Architect",
          roadmap: ["Kubernetes Management", "Infrastructure as Code", "DevSecOps"],
          resources: [
            { title: "Kubernetes Interactive Tutorials", url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/" },
            { title: "Google SRE Books (Free)", url: "https://sre.google/sre-book/table-of-contents/" },
            { title: "Chaos Engineering Guide", url: "https://www.gremlin.com/community/tutorials/chaos-engineering-the-full-guide/" }
          ]
        }
      },
      "Mobile App Development": {
        "Beginner": {
          role: "Junior Mobile Dev",
          roadmap: ["Logic (Dart/Kotlin)", "UI Layout Basics", "Build First Screen"],
          resources: [
            { title: "Flutter Get Started Docs", url: "https://docs.flutter.dev/get-started/learn-more" },
            { title: "Android Basics in Kotlin", url: "https://developer.android.com/courses/android-basics-kotlin/course" },
            { title: "Swift Playgrounds", url: "https://www.apple.com/swift/playgrounds/" }
          ]
        },
        "Intermediate": {
          role: "Mobile App Engineer",
          roadmap: ["State Management", "API Consumption", "Local Storage (SQLite)"],
          resources: [
            { title: "React Native Official Docs", url: "https://reactnative.dev/docs/getting-started" },
            { title: "Firebase for Mobile (Codelabs)", url: "https://firebase.google.com/codelabs/firebase-android" },
            { title: "Flutter Codelabs (Google Builders)", url: "https://codelabs.developers.google.com/?cat=Flutter" }
          ]
        },
        "Advanced": {
          role: "Senior Mobile Architect",
          roadmap: ["Native Platform Integration", "CI/CD for Mobile", "Performance Tuning"],
          resources: [
            { title: "Bitrise Mobile DevOps Blog", url: "https://blog.bitrise.io/" },
            { title: "Point-Free - Advanced Swift", url: "https://www.pointfree.co/" },
            { title: "Dart Advanced Design Patterns", url: "https://dart-design-patterns.com/" }
          ]
        }
      },
      "Game Development": {
        "Beginner": {
          role: "Junior Game Dev",
          roadmap: ["C# for Unity", "2D Physics & Movement", "Game Loop Fundamentals"],
          resources: [
            { title: "Unity Learn - Junior Programmer", url: "https://learn.unity.com/pathway/junior-programmer" },
            { title: "Brackeys Game Dev Archive", url: "https://www.youtube.com/@Brackeys" },
            { title: "GDQuest - Godot Engine Intro", url: "https://www.gdquest.com/tutorial/godot/learning-paths/getting-started-2021/" }
          ]
        },
        "Intermediate": {
          role: "Game Programmer",
          roadmap: ["3D Math & Shaders", "AI Pathfinding", "Mobile Optimization"],
          resources: [
            { title: "Unreal Engine Learning Path", url: "https://dev.epicgames.com/community/learning" },
            { title: "Catlike Coding - C# Tutorials", url: "https://catlikecoding.com/unity/tutorials/" },
            { title: "Unity 3D Game Design Tutorials", url: "https://learn.unity.com/pathway/unity-essentials" }
          ]
        },
        "Advanced": {
          role: "Lead Game Developer",
          roadmap: ["Multiplayer Networking", "Procedural Generation", "Graphics Pipeline"],
          resources: [
            { title: "Inigo Quilez - Computer Graphics", url: "https://www.iquilezles.org/www/index.htm" },
            { title: "The Book of Shaders", url: "https://thebookofshaders.com/" },
            { title: "Unity Programming Patterns", url: "https://github.com/Habrador/Unity-Programming-Patterns" }
          ]
        }
      },
      "UI / UX Design": {
        "Beginner": {
          role: "Junior Designer",
          roadmap: ["Design Principles", "Figma Basics", "User Research Intro"],
          resources: [
            { title: "Google UX Design Professional Cert (Audit)", url: "https://www.coursera.org/professional-certificates/google-ux-design" },
            { title: "Figma for Beginners Tutorials", url: "https://help.figma.com/hc/en-us/categories/360002051613-Learn-Figma" },
            { title: "UX Collective - Design Principles", url: "https://uxdesign.cc/" }
          ]
        },
        "Intermediate": {
          role: "Product Designer",
          roadmap: ["High-Fidelity Prototyping", "Design Systems", "Usability Testing"],
          resources: [
            { title: "Laws of UX", url: "https://lawsofux.com/" },
            { title: "DesignCourse - UI Design Mastery", url: "https://www.youtube.com/@DesignCourse" },
            { title: "Interaction Design Foundation (Free Articles)", url: "https://www.interaction-design.org/literature" }
          ]
        },
        "Advanced": {
          role: "Lead Product Designer",
          roadmap: ["UX Strategy", "Micro-interactions", "Design Leadership"],
          resources: [
            { title: "NN/g - Nielsen Norman Articles", url: "https://www.nngroup.com/articles/" },
            { title: "Case Study Club", url: "https://www.casestudy.club/" },
            { title: "InVision Design Engineering", url: "https://www.invisionapp.com/inside-design/design-engineering/" }
          ]
        }
      }
    };

    const categoryData = dataLibrary[interest];
    const finalData = categoryData ? categoryData[level] : null;

    if (finalData) {
      return NextResponse.json(finalData);
    }

    return NextResponse.json({
      role: `${level} ${interest || "Tech"} Specialist`,
      roadmap: ["Master the fundamentals", "Build hands-on projects", "Connect with industry mentors"],
      resources: [{ title: "General Learning (Class Central)", url: "https://www.classcentral.com/" }]
    });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}