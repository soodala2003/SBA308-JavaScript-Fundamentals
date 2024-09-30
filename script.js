// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};
  
// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,  //assignment_id
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
        }
    ]
};
  
// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];
  
/* function getLearnerData(course, ag, submissions) {
    // here, we would process this data to achieve the desired result.
    const result = [
        {
            id: 125,
            avg: 0.985, // (47 + 150) / (50 + 150)
            1: 0.94, // 47 / 50
            2: 1.0 // 150 / 150
        },
        {
            id: 132,
            avg: 0.82, // (39 + 125) / (50 + 150)
            1: 0.78, // 39 / 50
            2: 0.833 // late: (140 - 15) / 150
        }
    ];
    return result;
} */
  
//const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
//console.log(result);
  
/* my codeing */
console.log(LearnerSubmissions[0].learner_id);  // id: 125
console.log(LearnerSubmissions[0].submission.score);  // 47
//console.log(AssignmentGroup.assignments[0].points_possible);       // 50
//console.log(AssignmentGroup.assignments[0]["points_possible"]);  // 50

// both are the same results
/* console.log("Accessing the Array using the forEach loop:");
AssignmentGroup.assignments.map((item) => {
    console.log(item);});
console.log("Accessing the Array using the forEach loop:");
AssignmentGroup.assignments.forEach(function (item) {
    console.log(item);
}); */

const AssignmentInfo = AssignmentGroup.assignments;
//console.log(AssignmentInfo);
console.log(AssignmentInfo[0].points_possible);  // 50

console.log("Using the filter method to access a specific value:");
const learner_125 = LearnerSubmissions.filter(item => item.learner_id === 125);
console.log(learner_125);
// console.log(learner_125[1].learner_id);        // 125
// console.log(learner_125[2].submission.score);  // 400
const learner_132 = LearnerSubmissions.filter(item => item.learner_id === 132);
//console.log(learner_132);
//console.log(AssignmentInfo[2].due_at);

const date = new Date();
//console.log(new Date());
//console.log(date.toISOString().substr(0, 10)); // 2024-09-30

function getLearnerData(learner, assignment) {
    let count = 0;
    let learnerTotal = 0;
    let scores = 0;
    let average = 0;
    let grade = [];
    let result = [];

    while(count < learner.length) {
        if (assignment[count].id === learner[count].assignment_id) {
            if (assignment[count].due_at > date.toISOString().substr(0, 10)) {
                scores = scores;
                learnerTotal = learnerTotal;
                count++;
            } else if (assignment[count].due_at < learner[count].submission.submitted_at) {
                let lateGrade = learner[count].submission.score - (0.1 * assignment[count].points_possible);
                grade[count] = lateGrade / assignment[count].points_possible;
                scores += lateGrade;
                learnerTotal += assignment[count].points_possible;
                count++;
            } else if (assignment[count].due_at >= learner[count].submission.submitted_at) {
                grade[count] = learner[count].submission.score / assignment[count].points_possible;
                scores += learner[count].submission.score;
                learnerTotal += assignment[count].points_possible;
                count++;
            } else {
                scores = scores;
                learnerTotal = learnerTotal;
                count++;
            }
        }
    }
    average = scores / learnerTotal; 
    result = {id: learner[0].learner_id, avg: average, 1: grade[0], 2: grade[1]  };
    return result;
}

console.log(getLearnerData(learner_125, AssignmentInfo)); // { '1': 0.94, '2': 1, id: 125, avg: 0.985 }
console.log(getLearnerData(learner_132, AssignmentInfo)); // { '1': 0.78, '2': 0.8333333333333334, id: 132, avg: 0.82 }