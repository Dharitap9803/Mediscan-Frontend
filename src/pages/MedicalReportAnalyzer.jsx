import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/medical_report_analyzer.css";
import heartbeat from "../../src/assets/images/heartbeat.gif";
import copywriting from "../../src/assets/images/copywriting.gif";
import checklist from "../../src/assets/images/checklist.gif";
import feature2 from "../../src/assets/images/feature-2.svg";
import feature3 from "../../src/assets/images/feature-3.svg";
import feature5 from "../../src/assets/images/feature-5.svg";
import feature6 from "../../src/assets/images/feature-6.svg";
import feature7 from "../../src/assets/images/feature-7.svg";
import HeroImg from "../../src/assets/images/backimg.jpeg";
import features1 from "../../src/assets/images/features1.svg";
import Home1 from '../../src/assets/images/Home1.png';
import Home2 from "../../src/assets/images/Home2.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Home = () => {
  const heroImages = [
    {
      src: HeroImg,
      text: '"Unlock the Secrets of Your Medical Report in One Click!"',
    },
    {
      src: Home1,
      text: "", // No text for second image
    },
    {
      src: Home2,
      text: "", // No text for third image
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroImages.length);
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, []);
  // State to handle toggle functionality
  const [expandedItem, setExpandedItem] = useState(null);
  // State to handle menu dropdown visibility
  const [menuOpen, setMenuOpen] = useState(false);

  // React Router navigate hook to programmatically navigate
  const navigate = useNavigate();

  const toggleContent = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu when clicking outside
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Function to handle navigation
  const handleNavigation = (target) => {
    closeMenu();

    // For external page navigation
    if (target === "/ReportAnalyzer" || target === "/analysis") {
      navigate(target);
      return;
    }

    // For internal section navigation
    if (target.startsWith("#")) {
      const element = document.getElementById(target.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If we're on a different page, navigate to homepage first, then to the section
      navigate("/", { state: { scrollTo: target.substring(1) } });
    }
  };

  // Effect to handle scrolling to section after navigation
  useEffect(() => {
    const handleInitialScroll = () => {
      // Get location state if any
      const state = window.history.state?.usr;
      if (state?.scrollTo) {
        setTimeout(() => {
          const element = document.getElementById(state.scrollTo);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    };

    handleInitialScroll();
  }, []);

  const features = [
    {
      icon: features1,
      title: "Fully Understand Your Lab Tests",
      description:
        "Understand everything you need to know about each marker and why your doctor likely ordered it.",
    },
    {
      icon: feature2,
      title: "Learn About Health Effects",
      description:
        "Learn about the health implications of each of your test results and what it means for you.",
    },
    {
      icon: feature3,
      title: "See Your Optimal Ranges",
      description:
        "We use the latest peer-reviewed research to identify the optimal ranges for your test results.",
    },
    {
      icon: feature5,
      title: "Track Your Results",
      description:
        "Implement the personalized suggestions and track your levels to see your improvements.",
    },
    {
      icon: feature6,
      title: "Analyze Over 500 Lab Markers",
      description:
        "Analyze any of our 500 available lab markers, with more being added all of the time.",
    },
    {
      icon: feature7,
      title: "Analyze Your Genes with SelfDecode at NO EXTRA COST!",
      description:
        "Use SelfDecode to confirm your findings and see how your lifestyle is affecting your health.",
    },
  ];

  const healthGoals = [
    {
      title: "Nutrient Levels",
      items: [
        "Vitamin A",
        "Vitamin C",
        "DHA",
        "Vitamin B1",
        "Complete Blood Count",
        "Vitamin B3 (nicotinamide and nicotinic acid)",
        "Vitamin B6",
        "Folate (whole blood and RBC)",
        "Biotin",
        "Vitamin B12",
        "Active Vitamin B12",
        "Vitamin D (1,25 and 25-OH)",
        "Vitamin E",
        "Zinc (blood and RBC)",
        "Magnesium",
        "Iron (serum, TIBC, and Ferritin)",
        "CoQ10",
      ],
    },
    {
      title: "Thyroid Health",
      items: [
        "Free T3",
        "Total T3",
        "Free T4",
        "Total T4",
        "Reverse T3",
        "TSH",
        "Thyroglobulin antibodies",
        "Thyroid receptor antibodies",
      ],
    },
    {
      title: "Energy Levels",
      items: [
        "Iron",
        "B12",
        "Vitamin D3",
        "CBC",
        "CMP",
        "Thyroid panel",
        "Inflammation Markers",
      ],
    },
    {
      title: "Toxic Exposure",
      items: [
        "Complete Blood Count",
        "Liver Enzymes (ALT, AST, ALP, GGT)",
        "CRP",
        "ox-LDL",
        "Blood sugar",
        "Uric Acid",
        "Bilirubin",
        "Thyroid Hormones",
        "8-hydroxydeoguanosine (8-OHdG)",
      ],
    },
    {
      title: "Heart Health",
      items: [
        "Blood sugar",
        "ApoB",
        "Cholesterol (HDL and LDL)",
        "Omega-3 (DHA, EPA, omega-3 index)",
        "Leptin",
        "CBC",
        "Lp(a)",
        "oxLDL",
        "Small LDL",
        "vLDL",
        "Triglycerides",
      ],
    },
    {
      title: "Methylation",
      items: ["Folate", "B12", "Active B12", "Homocysteine"],
    },
    {
      title: "Toxic Mold Illness",
      items: [
        "C4a",
        "ACTH",
        "Cortisol",
        "ADH",
        "Alpha-MSH",
        "VIP",
        "MMP-9",
        "TNF-alpha",
      ],
    },
    {
      title: "Stress",
      items: [
        "Salivary cortisol",
        "ACTH",
        "DHEA",
        "DHEA-S",
        "Pregnenolone",
        "Sex hormones (estrogen, progesterone, and testosterone)",
        "Magnesium (RBC and blood)",
      ],
    },
    {
      title: "Weight Loss",
      items: ["CMP", "D3", "Adiponectin", "Leptin"],
    },
    {
      title: "Hormone Balance & Fertility",
      items: [
        "Estrogens (E1, E2, E3, total)",
        "Progesterone",
        "Pregnenolone",
        "FSH",
        "LH",
        "Leptin",
        "Prolactin",
        "SHBG",
        "DHEA",
        "DHEA-S",
        "DHT",
        "Testosterone (free, bioavailable, total)",
        "Cortisol",
        "Thyroid panel",
      ],
    },
    {
      title: "Aging",
      items: [
        "Growth Hormone",
        "IGF-1",
        "Sex hormones",
        "Comprehensive metabolic panel",
        "Complete blood count",
        "Lipid panel",
        "Thyroid panel",
      ],
    },
    {
      title: "Gut Health",
      items: ["Zonulin", "Intestinal Permeability Test"],
    },
  ];

  return (
    <div className="landing-page">
      <section className="hero" id="home">
        <div className="hero-image">
          <img
            src={heroImages[currentSlide].src}
            alt={`Hero ${currentSlide + 1}`}
            className="carousel-img"
          />{" "}
          <div className="overlay">
            <div className="menu-container">
              <button className="hamburger-icon" onClick={toggleMenu}>
                ☰
              </button>
              {menuOpen && (
                <div className="menu-dropdown">
                  <a
                    href="#home"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation("#home");
                    }}
                  >
                    Home
                  </a>
                  <a
                    href="#how-it-works"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation("#how-it-works");
                    }}
                  >
                    How It Works
                  </a>
                  <a
                    href="#critical-info"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation("#critical-info");
                    }}
                  >
                    Critical Information
                  </a>
                  <a
                    href="#health-goals"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation("#health-goals");
                    }}
                  >
                    Health Goals
                  </a>
                </div>
              )}
              {menuOpen && (
                <div className="menu-overlay" onClick={closeMenu}></div>
              )}
            </div>
            {heroImages[currentSlide].text && (
              <div className="text">{heroImages[currentSlide].text}</div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <div className="howitworks" id="how-it-works">
        {/* Move the How it Works heading above the steps */}
        <div className="text-center">
          <h1>How it Works</h1>
          <hr className="divider" />
        </div>
        <div className="row how-it-work-content">
          <div className="col-lg-12 how-it-works-steps">
            <div className="row">
              <div className="col-md-4 how-it-works-step">
                <div className="how-it-works-step-header">
                  <div className="how-it-works-step-icon step-1">
                    <img
                      src={copywriting}
                      alt="Step 1"
                      className="step-image"
                    />
                  </div>
                </div>
                <h3 className="steps">Step 1:</h3>
                <p className="how-it-works-step-text">
                  Upload your lab test results.
                </p>
              </div>
              <div className="col-md-4 how-it-works-step">
                <div className="how-it-works-step-header">
                  <div className="how-it-works-step-icon step-2">
                    <img src={checklist} alt="Step 2" className="step-image" />
                  </div>
                </div>
                <h3 className="steps">Step 2:</h3>
                <p className="how-it-works-step-text">
                  Receive personalized reports and recommendations to optimize
                  your levels.
                </p>
              </div>
              <div className="col-md-4 how-it-works-step">
                <div className="how-it-works-step-header">
                  <div className="how-it-works-step-icon step-3">
                    <img src={heartbeat} alt="Step 3" className="step-image" />
                  </div>
                </div>
                <h3 className="steps">Step 3:</h3>
                <p className="how-it-works-step-text">
                  Implement suggestions, track your levels, and watch your
                  health improve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section (Critical Information) */}
      <section className="lab-test-analyzer" id="critical-info">
        <h2>Unlock critical information hidden in your test results</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <img
                src={feature.icon}
                alt={feature.title}
                className="feature-icon"
              />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Health Goals Section */}
      <section className="health-goals" id="health-goals">
        <p>Health Goals</p>
        <hr className="divider" />
        <div className="container">
          {healthGoals.map((goal, index) => (
            <div className="item" key={index}>
              <div className="item-header">
                {goal.title}
                <span
                  className="plus-sign"
                  onClick={() => toggleContent(index)}
                >
                  {expandedItem === index ? "-" : "+"}
                </span>
              </div>
              <div
                className="content"
                style={{ display: expandedItem === index ? "block" : "none" }}
              >
                <ul>
                  {goal.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
