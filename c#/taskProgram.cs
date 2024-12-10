// Source: Microsoft Foundation of Coding Back-End on Coursera

using System;

public class TaskManager
{
    public static void Main() 
    {
        string task1 = "";
        string task2 = "";
        string task3 = "";
        
        bool task1Completed = false;
        bool task2Completed = false;
        bool task3Completed = false;

        // Add a task
        Console.WriteLine("Enter your task: ");
        string newTask = Console.ReadLine();

        if (string.IsNullOrEmpty(task1)) 
        {
            task1 = newTask;
        }
        else if (string.IsNullOrEmpty(task2)) 
        {
            task2 = newTask;
        }
        else if (string.IsNullOrEmpty(task3)) 
        {
            task3 = newTask;
        }
        else 
        {
            Console.WriteLine("Your task list is full.");
        }

        // Mark a task as completed
        Console.WriteLine("Which task would you like to mark as completed (1, 2, or 3)?");
        int taskToComplete = int.Parse(Console.ReadLine());

        if (taskToComplete == 1 && !string.IsNullOrEmpty(task1)) 
        {
            task1Completed = true;
            Console.WriteLine("Task 1 marked as completed.");
        }
        else if (taskToComplete == 2 && !string.IsNullOrEmpty(task2)) 
        {
            task2Completed = true;
            Console.WriteLine("Task 2 marked as completed.");
        }
        else if (taskToComplete == 3 && !string.IsNullOrEmpty(task3)) 
        {
            task3Completed = true;
            Console.WriteLine("Task 3 marked as completed.");
        }
        else 
        {
            Console.WriteLine("Invalid task selection.");
        }

        // Display tasks
        Console.WriteLine("Your Tasks:");
        if (!string.IsNullOrEmpty(task1)) 
        {
            Console.WriteLine(task1Completed ? "Task 1: " + task1 + " [Completed]" : "Task 1: " + task1 + " [Pending]");
        }
        if (!string.IsNullOrEmpty(task2)) 
        {
            Console.WriteLine(task2Completed ? "Task 2: " + task2 + " [Completed]" : "Task 2: " + task2 + " [Pending]");
        }
        if (!string.IsNullOrEmpty(task3)) 
        {
            Console.WriteLine(task3Completed ? "Task 3: " + task3 + " [Completed]" : "Task 3: " + task3 + " [Pending]");
        }
    }
}