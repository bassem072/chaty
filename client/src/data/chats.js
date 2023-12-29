let chats = [];

for (let i = 1; i <= 100; i++) {
  const chatType = i % 3 !== 0 ? "chats" : "groups";
  let users = [
    Math.floor(Math.random() * 10) + 1,
    Math.floor(Math.random() * 10) + 1,
  ]; // Random user IDs between 1 and 10

  const admins = chatType === "groups" ? [users[0], users[1]] : undefined;

  const name = chatType === "groups" ? "group " + i : undefined;

  chats.push({
    id: i,
    chatType,
    name,
    users,
    admins,
    latestMessage: {
      id: i, // Assume the latest message is the 100th message in the chat
      content: `This is message ${i}100.`,
      senderId: users[0], // Assume the first user sent the latest message
      chatId: i,
      createdDate: new Date().toISOString(), // Add the current date and time as the created date
    },
  });
}

export default chats;
