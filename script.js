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

const AssignmentInfo = AssignmentGroup.assignments;
console.log(LearnerSubmissions.filter(item => item.learner_id === 125));

const learner_125 = LearnerSubmissions.filter(item => item.learner_id === 125);
const learner_132 = LearnerSubmissions.filter(item => item.learner_id === 132);
console.log(learner_132);

function matchCourseID(course, assignment) {
    try {
        if (course.id === assignment.course_id) {
            console.log("The assignment group belongs to this course.")
        } else {
            throw "Error: This course ID is invalid!";
        }
    } catch (error) {
        console.log(error);
    } finally {
        console.log("Course ID: " + course.id + ".");
    }
} 
//console.log(matchCourseID(CourseInfo, AssignmentGroup));

function dueDate(assignment, learner) {
    const date = new Date();
    for (let i = 0; i < learner.length; i++) {
        if (assignment[i].due_at > date.toISOString().substr(0, 10)) {
            learner.splice(i, 1);
            return learner;
        }
    }
}

function duePass(assignment, learner, counts) {
    let isPassDue = true;
    if (assignment.id === learner.saaignment_id) {
        if (assignment[counts].due_at < learner[counts].submission.submitted_at) {
            isPassDue = true;
        } else if (assignment[counts].due_at >= learner[counts].submission.submitted_at) {
            isPassDue = false;
        } 
        return isPassDue;
    } 
}

dueDate(AssignmentInfo, learner_125);
dueDate(AssignmentInfo, learner_132);

function getLearnerData(assignment, learner) {
    let count = 0;
    let learnerTotal = 0;
    let scores = 0;
    let average = 0;
    let grade = [];
    let result = [];

    while(count < learner.length) {
        let possiblePoints = assignment[count].points_possible;
        let submissionPoints = learner[count].submission.score;
        if (duePass(assignment, learner, count) === true) {
            grade[count] = (submissionPoints - (0.1 * possiblePoints)) / possiblePoints;
            scores += submissionPoints - (0.1 * possiblePoints);
            learnerTotal += possiblePoints;
            count++;
        } else if (duePass(assignment, learner, count) === false) {
            grade[count] = submissionPoints / possiblePoints;
            scores += submissionPoints;
            learnerTotal += possiblePoints;
            count++;
        }   
    }
    average = scores / learnerTotal; 
    result = {id: learner[0].learner_id, avg: average, 1: grade[0], 2: grade[1]  };
    return result;
}

console.log(getLearnerData(AssignmentInfo, learner_125)); // { '1': 0.94, '2': 1, id: 125, avg: 0.985 }
console.log(getLearnerData(AssignmentInfo, learner_132)); // { '1': 0.78, '2': 0.8333333333333334, id: 132, avg: 0.82 }
console.log(learner_125);

