import { Bot } from "grammy";
import { config } from "../config.js";
import prisma from "../lib/prisma.js"; // Import the Prisma client to interact with the database
const bot = new Bot(config.TELEGRAM_BOT_TOKEN); // Initialize the Telegram bot with the token from the configuration

bot.command("start", (ctx) => {
  ctx.reply(
    "Hello! I'm Anton, your personal assistant bot. How can I assist you today?",
  ); // Respond to the /start command with a welcome message
});
bot.command("add", async (ctx) => {
  try {
    const description = ctx.match; // Extract the task description from the command arguments
    if (!description) {
      ctx.reply(
        "Please provide a task description. Usage: /add <task description>",
      ); // Prompt the user to provide a task description if it's missing
      return;
    }
    await prisma.task.create({
      data: {
        chatId: String(ctx.chat.id), // Store the chat ID to associate tasks with specific users
        description, // Store the task description provided by the user
      },
    });
    ctx.reply(`Task added: ${description}`);
  } catch (error) {
    console.log(`Error adding task: ${error}`);
  }
});
bot.command("list", async (ctx) => {
  try {
    const userTasks = await prisma.task.findMany({
      where: { chatId: String(ctx.chat.id) }, // Retrieve tasks associated with the user's chat ID
    });
    if (userTasks.length === 0) {
      ctx.reply("You have no tasks at the moment."); // Inform the user if they have no tasks
    } else {
      const taskList = userTasks
        .map(
          (task, index) =>
            `${index + 1}. ${task.description} ${task.done ? "(done)" : ""}`,
        )
        .join("\n"); // Format the list of tasks for display
      ctx.reply(`Your tasks:\n${taskList}`); // Send the list of tasks to the user
    }
  } catch (error) {
    console.log(`Error retrieving tasks: ${error}`);
  }
}); // Placeholder for the /list command to list all tasks
bot.command("done", async (ctx) => {
  try {
    const position = Number(ctx.match); // Extract the task ID from the command arguments
    if (!position) {
      ctx.reply(
        "Please provide the task ID to mark as done. Usage: /done <task ID>",
      ); // Prompt the user to provide a task ID if it's missing
      return;
    }
    const tasks = await prisma.task.findMany({
      where: { chatId: String(ctx.chat.id), done: false },
      orderBy: {
        createdAt: "asc",
      },
    }); // Retrieve tasks associated with the user's chat ID
    const task = tasks[position - 1]; // Get the task based on the provided position
    if (!task) {
      ctx.reply("Invalid task ID. Please provide a valid task ID."); // Inform the user if the provided task ID is invalid
      return;
    }
    await prisma.task.update({
      where: { id: task.id }, // Update the task to mark it as done
      data: { done: true },
    });
    ctx.reply(`Task marked as done: ${task.description}`); // Confirm to the user that the task has been marked as done
  } catch (error) {
    console.log(`Error marking task as done: ${error}`);
  }
});
bot.command("help", (ctx) => {
  ctx.reply(
    "Available commands:\n/add <task> — saves a task to the database\n/list — returns all active tasks\n/done <number> — marks a task as complete\n/help — lists available commands",
  ); // Respond to the /help command with a list of available commands
});
bot.start(); // Start the bot to listen for incoming messages and commands

export default bot; // Export the bot instance for use in other parts of the application
