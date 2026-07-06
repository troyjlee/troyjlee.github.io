// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "Publications in reversed chronological order.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-teaching",
          title: "teaching",
          description: "Courses I teach, with lecture notes and course materials.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "nav-notes",
          title: "notes",
          description: "Series of informative pages on topics I find interesting.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/notes/";
          },
        },{id: "notes-example-note-replace-me",
          title: 'Example note (replace me)',
          description: "A placeholder showing how the notes collection works.",
          section: "Notes",handler: () => {
              window.location.href = "/notes/example-topic/";
            },},{id: "teachings-advanced-algorithms",
          title: 'Advanced Algorithms',
          description: "Advanced algorithm design and analysis.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/advanced-algorithms-spring-2026/";
            },},{id: "teachings-data-structures-and-algorithms",
          title: 'Data Structures and Algorithms',
          description: "Fundamental data structures and algorithms.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/data-structures-and-algorithms-fall-2026/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%74%72%6F%79%6A%6C%65%65@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/troyjlee", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=iSjOah4AAAAJ", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0000-0001-6912-2338", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
