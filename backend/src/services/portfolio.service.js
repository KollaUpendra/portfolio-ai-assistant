const portfolio = {
    personal: {
        name: "Upendra",
        role: "Computer Science Engineering Student",
        college: "VNR VJIET",
    },

    skills: [
        "C",
        "C++",
        "Python",
        "Java",
        "React",
        "Node.js",
        "MongoDB",
    ],

    projects: [
        {
            name: "EduSphere",
            description:
                "An AI-powered academic collaboration platform.",
        },
        {
            name: "AI Textbook to Notebook Notes Generator",
            description:
                "A project that uses AI to generate structured notes from textbooks.",
        },
    ],
};

export const getPortfolioContext = () => {
    return portfolio;
};