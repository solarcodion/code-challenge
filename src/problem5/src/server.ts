import app from "./app";
import { connectDB } from "./config/db";

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running in on port ${PORT}`);
});
