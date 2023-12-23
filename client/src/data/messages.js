let messages = [];
let statusOptions = ["sent", "received", "seen"];
let startDate = new Date("2023-05-22T00:00:00"); // 22 May 2023 12 AM
let endDate = new Date("2023-05-24T00:00:00"); // 25 May 2023 12 AM

// Ensure each user ID from 1 to 2 has at least two consecutive messages
for (let userId = 1; userId <= 2; userId++) {
  for (let i = 0; i < 2; i++) {
    let randomDate = new Date(
      startDate.getTime() +
        Math.random() * (endDate.getTime() - startDate.getTime())
    );
    let status =
      statusOptions[Math.floor(Math.random() * statusOptions.length)];

    messages.push({
      id: messages.length + 1,
      userId: userId,
      content: `Message content ${messages.length + 1}`,
      status: status,
      date: randomDate.toISOString(),
    });
  }
}

// Generate the rest of the messages
while (messages.length < 100) {
  let randomDate = new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
  );
  let userId = Math.floor(Math.random() * 2) + 1; // Random user ID between 1 and 2
  let status = statusOptions[Math.floor(Math.random() * statusOptions.length)];

  messages.push({
    id: messages.length + 1,
    userId: userId,
    content: `Message content ${messages.length + 1}`,
    status: status,
    date: randomDate.toISOString(),
  });
}

// Sort the messages by date
messages.sort((a, b) => new Date(a.date) - new Date(b.date));

export default messages;