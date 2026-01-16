// ========================================
// Quiz Data Structure
// ========================================

const quizData = [
    {
        id: 1,
        title: "JavaScript Fundamentals",
        description: "Test your knowledge of core JavaScript concepts and syntax",
        category: "Programming",
        difficulty: "easy",
        duration: 10, // minutes
        icon: "fa-code",
        questions: [
            {
                id: 1,
                question: "What is the correct syntax for referring to an external script called 'app.js'?",
                options: [
                    "<script src='app.js'>",
                    "<script href='app.js'>",
                    "<script name='app.js'>",
                    "<script file='app.js'>"
                ],
                correctAnswer: 0
            },
            {
                id: 2,
                question: "Which company developed JavaScript?",
                options: [
                    "Microsoft",
                    "Netscape",
                    "Oracle",
                    "Google"
                ],
                correctAnswer: 1
            },
            {
                id: 3,
                question: "Which of the following is NOT a JavaScript data type?",
                options: [
                    "String",
                    "Boolean",
                    "Float",
                    "Undefined"
                ],
                correctAnswer: 2
            },
            {
                id: 4,
                question: "How do you declare a JavaScript variable?",
                options: [
                    "variable carName;",
                    "var carName;",
                    "v carName;",
                    "declare carName;"
                ],
                correctAnswer: 1
            },
            {
                id: 5,
                question: "Which operator is used to assign a value to a variable?",
                options: [
                    "*",
                    "-",
                    "=",
                    "x"
                ],
                correctAnswer: 2
            },
            {
                id: 6,
                question: "What will the following code return: Boolean(10 > 9)?",
                options: [
                    "false",
                    "true",
                    "NaN",
                    "undefined"
                ],
                correctAnswer: 1
            },
            {
                id: 7,
                question: "How do you create a function in JavaScript?",
                options: [
                    "function:myFunction()",
                    "function myFunction()",
                    "function = myFunction()",
                    "create myFunction()"
                ],
                correctAnswer: 1
            },
            {
                id: 8,
                question: "How do you call a function named 'myFunction'?",
                options: [
                    "call myFunction()",
                    "myFunction()",
                    "call function myFunction()",
                    "execute myFunction()"
                ],
                correctAnswer: 1
            },
            {
                id: 9,
                question: "How do you write an IF statement in JavaScript?",
                options: [
                    "if i = 5 then",
                    "if i == 5 then",
                    "if (i == 5)",
                    "if i = 5"
                ],
                correctAnswer: 2
            },
            {
                id: 10,
                question: "How does a FOR loop start?",
                options: [
                    "for (i = 0; i <= 5)",
                    "for (i = 0; i <= 5; i++)",
                    "for i = 1 to 5",
                    "for (i <= 5; i++)"
                ],
                correctAnswer: 1
            }
        ]
    },
    {
        id: 2,
        title: "HTML5 Essentials",
        description: "Master the fundamentals of HTML5 markup and structure",
        category: "Web Development",
        difficulty: "easy",
        duration: 8,
        icon: "fa-html5",
        questions: [
            {
                id: 1,
                question: "What does HTML stand for?",
                options: [
                    "Hyper Text Markup Language",
                    "Home Tool Markup Language",
                    "Hyperlinks and Text Markup Language",
                    "Hyper Text Making Language"
                ],
                correctAnswer: 0
            },
            {
                id: 2,
                question: "Which HTML element is used for the largest heading?",
                options: [
                    "<heading>",
                    "<h6>",
                    "<h1>",
                    "<head>"
                ],
                correctAnswer: 2
            },
            {
                id: 3,
                question: "What is the correct HTML element for inserting a line break?",
                options: [
                    "<break>",
                    "<br>",
                    "<lb>",
                    "<newline>"
                ],
                correctAnswer: 1
            },
            {
                id: 4,
                question: "Which character is used to indicate an end tag?",
                options: [
                    "*",
                    "^",
                    "/",
                    "<"
                ],
                correctAnswer: 2
            },
            {
                id: 5,
                question: "How can you make a numbered list?",
                options: [
                    "<ul>",
                    "<ol>",
                    "<list>",
                    "<nl>"
                ],
                correctAnswer: 1
            },
            {
                id: 6,
                question: "What is the correct HTML for creating a hyperlink?",
                options: [
                    "<a url='http://example.com'>Example</a>",
                    "<a href='http://example.com'>Example</a>",
                    "<a>http://example.com</a>",
                    "<link>http://example.com</link>"
                ],
                correctAnswer: 1
            },
            {
                id: 7,
                question: "Which HTML attribute specifies an alternate text for an image?",
                options: [
                    "title",
                    "alt",
                    "src",
                    "longdesc"
                ],
                correctAnswer: 1
            },
            {
                id: 8,
                question: "Which HTML element defines the title of a document?",
                options: [
                    "<meta>",
                    "<title>",
                    "<head>",
                    "<header>"
                ],
                correctAnswer: 1
            }
        ]
    },
    {
        id: 3,
        title: "CSS Styling Mastery",
        description: "Test your CSS skills and styling techniques",
        category: "Web Development",
        difficulty: "medium",
        duration: 12,
        icon: "fa-css3",
        questions: [
            {
                id: 1,
                question: "What does CSS stand for?",
                options: [
                    "Creative Style Sheets",
                    "Cascading Style Sheets",
                    "Computer Style Sheets",
                    "Colorful Style Sheets"
                ],
                correctAnswer: 1
            },
            {
                id: 2,
                question: "Which HTML tag is used to define an internal style sheet?",
                options: [
                    "<style>",
                    "<css>",
                    "<script>",
                    "<link>"
                ],
                correctAnswer: 0
            },
            {
                id: 3,
                question: "Which property is used to change the background color?",
                options: [
                    "color",
                    "bgcolor",
                    "background-color",
                    "bg-color"
                ],
                correctAnswer: 2
            },
            {
                id: 4,
                question: "How do you add a background color for all <h1> elements?",
                options: [
                    "h1.all {background-color:#FFFFFF;}",
                    "h1 {background-color:#FFFFFF;}",
                    "all.h1 {background-color:#FFFFFF;}",
                    "#h1 {background-color:#FFFFFF;}"
                ],
                correctAnswer: 1
            },
            {
                id: 5,
                question: "Which CSS property controls the text size?",
                options: [
                    "text-style",
                    "font-size",
                    "text-size",
                    "font-style"
                ],
                correctAnswer: 1
            },
            {
                id: 6,
                question: "How do you make each word in a text start with a capital letter?",
                options: [
                    "text-transform:capitalize",
                    "text-transform:uppercase",
                    "text-style:capitalize",
                    "transform:capitalize"
                ],
                correctAnswer: 0
            },
            {
                id: 7,
                question: "Which property is used to change the font of an element?",
                options: [
                    "font-weight",
                    "font-style",
                    "font-family",
                    "font-type"
                ],
                correctAnswer: 2
            },
            {
                id: 8,
                question: "How do you display a border like this: The top border = 10 pixels, The bottom border = 5 pixels, The left border = 20 pixels, The right border = 1pixel?",
                options: [
                    "border-width:10px 1px 5px 20px;",
                    "border-width:10px 20px 5px 1px;",
                    "border-width:5px 20px 10px 1px;",
                    "border-width:10px 1px 20px 5px;"
                ],
                correctAnswer: 0
            },
            {
                id: 9,
                question: "Which property is used to change the left margin of an element?",
                options: [
                    "padding-left",
                    "margin-left",
                    "indent",
                    "text-indent"
                ],
                correctAnswer: 1
            },
            {
                id: 10,
                question: "How do you make a list that lists its items with squares?",
                options: [
                    "list-type: square;",
                    "list-style-type: square;",
                    "list: square;",
                    "type: square;"
                ],
                correctAnswer: 1
            }
        ]
    },
    {
        id: 4,
        title: "Python Programming Basics",
        description: "Evaluate your understanding of Python fundamentals",
        category: "Programming",
        difficulty: "medium",
        duration: 15,
        icon: "fa-python",
        questions: [
            {
                id: 1,
                question: "Which of the following is the correct extension of the Python file?",
                options: [
                    ".python",
                    ".pl",
                    ".py",
                    ".p"
                ],
                correctAnswer: 2
            },
            {
                id: 2,
                question: "What is the output of print(2**3)?",
                options: [
                    "6",
                    "8",
                    "9",
                    "5"
                ],
                correctAnswer: 1
            },
            {
                id: 3,
                question: "Which keyword is used for function in Python?",
                options: [
                    "function",
                    "def",
                    "fun",
                    "define"
                ],
                correctAnswer: 1
            },
            {
                id: 4,
                question: "Which of the following is used to define a block of code in Python?",
                options: [
                    "Brackets",
                    "Indentation",
                    "Key",
                    "None of these"
                ],
                correctAnswer: 1
            },
            {
                id: 5,
                question: "What is the output of print(type([]))?",
                options: [
                    "<class 'list'>",
                    "<class 'dict'>",
                    "<class 'tuple'>",
                    "<class 'set'>"
                ],
                correctAnswer: 0
            },
            {
                id: 6,
                question: "Which of the following is a mutable data type?",
                options: [
                    "Tuple",
                    "String",
                    "List",
                    "Integer"
                ],
                correctAnswer: 2
            },
            {
                id: 7,
                question: "What does the len() function do?",
                options: [
                    "Returns the length of an object",
                    "Returns the type of an object",
                    "Converts to integer",
                    "None of these"
                ],
                correctAnswer: 0
            },
            {
                id: 8,
                question: "Which operator is used for floor division in Python?",
                options: [
                    "/",
                    "//",
                    "%",
                    "**"
                ],
                correctAnswer: 1
            }
        ]
    },
    {
        id: 5,
        title: "Database Fundamentals",
        description: "Challenge yourself with SQL and database concepts",
        category: "Database",
        difficulty: "hard",
        duration: 20,
        icon: "fa-database",
        questions: [
            {
                id: 1,
                question: "What does SQL stand for?",
                options: [
                    "Structured Query Language",
                    "Simple Query Language",
                    "Strong Question Language",
                    "Structured Question Language"
                ],
                correctAnswer: 0
            },
            {
                id: 2,
                question: "Which SQL statement is used to extract data from a database?",
                options: [
                    "OPEN",
                    "GET",
                    "SELECT",
                    "EXTRACT"
                ],
                correctAnswer: 2
            },
            {
                id: 3,
                question: "Which SQL statement is used to update data in a database?",
                options: [
                    "SAVE AS",
                    "MODIFY",
                    "UPDATE",
                    "SAVE"
                ],
                correctAnswer: 2
            },
            {
                id: 4,
                question: "Which SQL statement is used to delete data from a database?",
                options: [
                    "REMOVE",
                    "DELETE",
                    "COLLAPSE",
                    "DROP"
                ],
                correctAnswer: 1
            },
            {
                id: 5,
                question: "Which SQL statement is used to insert new data in a database?",
                options: [
                    "ADD NEW",
                    "INSERT INTO",
                    "ADD RECORD",
                    "INSERT NEW"
                ],
                correctAnswer: 1
            },
            {
                id: 6,
                question: "With SQL, how do you select a column named 'FirstName' from a table named 'Persons'?",
                options: [
                    "SELECT Persons.FirstName",
                    "EXTRACT FirstName FROM Persons",
                    "SELECT FirstName FROM Persons",
                    "GET FirstName FROM Persons"
                ],
                correctAnswer: 2
            },
            {
                id: 7,
                question: "With SQL, how do you select all the records from a table named 'Persons' where the value of the column 'FirstName' is 'Peter'?",
                options: [
                    "SELECT * FROM Persons WHERE FirstName='Peter'",
                    "SELECT [all] FROM Persons WHERE FirstName='Peter'",
                    "SELECT * FROM Persons WHERE FirstName LIKE 'Peter'",
                    "SELECT FirstName='Peter' FROM Persons"
                ],
                correctAnswer: 0
            },
            {
                id: 8,
                question: "Which SQL keyword is used to sort the result-set?",
                options: [
                    "SORT",
                    "ORDER BY",
                    "SORT BY",
                    "ORDER"
                ],
                correctAnswer: 1
            },
            {
                id: 9,
                question: "What is a primary key?",
                options: [
                    "A key that can have duplicate values",
                    "A key that uniquely identifies each record",
                    "A key that can be null",
                    "None of these"
                ],
                correctAnswer: 1
            },
            {
                id: 10,
                question: "Which SQL clause is used to filter records?",
                options: [
                    "FILTER",
                    "WHERE",
                    "HAVING",
                    "Both B and C"
                ],
                correctAnswer: 3
            }
        ]
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = quizData;
}
