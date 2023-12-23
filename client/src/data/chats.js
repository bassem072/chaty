let chats = [];

for (let i = 1; i <= 50; i++) {
  let userIds = [
    Math.floor(Math.random() * 10) + 1,
    Math.floor(Math.random() * 10) + 1,
  ]; // Random user IDs between 1 and 10

  chats.push({
    id: i,
    name: `Chat ${i}`,
    users: userIds,
  });
}

export default chats;
