#! /usr/bin/env node
import inquirer from "inquirer";
console.log("Welcome to AS School Management System");
class Student {
    name: string;
    age: any;
    constructor(name: string, age: number) {
        (this.name = name), (this.age = age);
    }
}

class SchoolManagementSystem {
    private students: Student[] = [];
    private total = 0;
    public condition: boolean = true;
    async start() {
        while (this.condition) {
            const ques = await inquirer.prompt([
                {
                    message: "What would you like to do",
                    name: "choices",
                    type: "list",
                    choices: ["Enroll", "View", "Delete", "Exit"],
                },
            ]);
            switch (ques.choices) {
                case "Enroll":
                    await this.EnrollPerson();
                    break;
                case "View":
                    this.View();
                    break;
                case "Exit":
                    this.Exit();
                    break;
                case "Delete":
                    await this.Delete();
                    break;
            }
        }
    }

    private async EnrollPerson() {
        const enroll = await inquirer.prompt([
            {
                message: "Enter the name of student",
                name: "name",
                type: "input",
            },
            {
                message: "Enter your age",
                type: "number",
                name: "age",
            },
        ]);
        let name = enroll.name;
        let age = enroll.age;
        if (
            this.students.some(
                (student) => student.name === name && student.age === age
            )
        ) {
            console.log("Student already exists");
        } else if (isNaN(age) || name === "" ||  age > 150) {
            console.log("Please enter a valid name and age");
        } else {
            this.students.push(new Student(name, age));
            this.total++;
        }
    }

    private View() {
        if (this.students.length === 0) {
            console.log("No students enrolled yet.");
        } else {
            console.log("Enrolled students:");
            this.students.forEach((student, index) => {
                console.log(`Student ${index + 1}:`);
                console.log(`Name: ${student.name.toUpperCase()}`);
                console.log(`Age: ${student.age}`);
            });
        }
    }

    private Exit() {
        this.condition = false;
        console.log(`${this.total} Students Enroll`);
    }

    private async Delete() {
        const personRemove = await inquirer.prompt([
            {
                message: "Enter the name of student which you wants to remove",
                name: "remove",
                type: "input",
            },
        ]);
        let remove = personRemove.remove.toLowerCase();
        let index = this.students.findIndex((ele) => ele.name.toLowerCase() === remove);
        if (index !== -1) {
            this.students.splice(index, 1);
            this.total--;
            console.log("Deleted successfully");
        } else {
            console.log("No user found");
        }
    }
}

let school = new SchoolManagementSystem();
school.start();
