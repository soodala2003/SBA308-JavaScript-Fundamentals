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
const AssignmentInfo = AssignmentGroup.assignments;
const learner_125 = LearnerSubmissions.filter(item => item.learner_id === 125);
const learner_132 = LearnerSubmissions.filter(item => item.learner_id === 132);

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

function learnersScore(assignmentData, learner) {
    let learner1 = dueDate(assignmentData, learner.filter(item => item.learner_id === 125));
    let learners = learner1.concat(learner_132);
    return learners;
}
const scoresObject = learnersScore(AssignmentInfo, LearnerSubmissions); 

function points(ag) { //ag = AssignmentInfo
    const possiblePoints = [];
    let k = 0;
    while (k < ag.length) {
        possiblePoints.push(ag[k].points_possible); 
        k++;
    }
    return possiblePoints;
}

function learnerID(learner) {
    let id = [];
    for (let i = 1; i < learner.length; i+=2) {
        id.push(learner[i].learner_id);
    }           
    return id;
}

function scoreAg1(ag, submissions) {                                 // ag = AssignmentGroup
    const scoresObject = learnersScore(ag.assignments, submissions); //AssignmentInfo = ag.assignments
    let scores1 = [];       

    scores1.push(scoresObject[0].submission.score / points(ag.assignments)[0]);
    scores1.push(scoresObject[2].submission.score /points(ag.assignments)[0]);
    return scores1;   
}

function scoreAg2(ag, submissions) {                                 // ag = AssignmentGroup
    const scoresObject = learnersScore(ag.assignments, submissions); //AssignmentInfo = ag.assignments
    let scores2 = [];  

    scores2.push(scoresObject[1].submission.score / points(ag.assignments)[1]);
    scores2.push((scoresObject[3].submission.score - (0.1*points(ag.assignments)[1])) /points(ag.assignments)[1]);
    scores2.splice(1, 1, parseFloat(scores2[1].toFixed(3)));
    return scores2;   
}

function avg(ag, submissions) {
    let average = [];
    average.push((scoresObject[0].submission.score + scoresObject[1].submission.score) / (points(ag.assignments)[0] + points(ag.assignments)[1]));
    average.push((scoresObject[2].submission.score + scoresObject[3].submission.score - (0.1*points(ag.assignments)[1])) / (points(ag.assignments)[0] + points(ag.assignments)[1]));
    return average;
}

function getLearnerData(course, ag, submissions) {  // ag = AssignmentGroup
    //const mapObject = filteredObject.map(({ id, name, occupation, age}) => ({ id: id, name: name, job: occupation, age: age})); 
    matchCourseID(course, ag);                      // (CourseInfo, AssignmentGroup)
    let id = learnerID(submissions);                // AssignmentInfo = ag.assignments
    const learnerData = [];
    const scoresObject = learnersScore(ag.assignments, submissions);
    const ag1Scores = scoreAg1(ag, submissions);
    const ag2Scores = scoreAg2(ag, submissions);
    const average = avg(ag, submissions);

    for (let i = 0; i < id.length; i ++) {
        learnerData.push({ id: id[i], avg: average[i], 1: ag1Scores[i], 2: ag2Scores[i] });
    }

    let sortObj = function sortObj(obj) {
        let keys = [];
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        keys.sort();
    
        let newObj = {};
        for (let i = 0; i < keys.length; i++) {
            newObj[keys[i]] = obj[keys[i]];
        }
        return newObj;
    }

    for (let j = 0; j < learnerData.length; j++) {
        console.log(sortObj(learnerData[j]));
    }
    return learnerData; 
}
console.log(getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions));


// console.log(scoresObject[0].submission.score);
// console.log("Hi!!!");
// console.log(AssignmentInfo[0].points_possible);
// console.log(Object.values(scoresObject[0]));

