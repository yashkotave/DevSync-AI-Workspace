const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const User = require('./models/User');

dotenv.config({ path: path.join(__dirname, '.env') });

const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/devsync';

async function seed() {
  try {
    await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('[seed] connected to MongoDB');

    // Clear users
    await User.deleteMany({});

    const users = [
      { name: 'Alice Manager', email: 'manager@example.com', password: 'Manager123!', role: 'Manager' },
      { name: 'Dev One', email: 'dev1@example.com', password: 'Dev123!', role: 'Developer' },
      { name: 'Dev Two', email: 'dev2@example.com', password: 'Dev123!', role: 'Developer' },
      { name: 'Dev Three', email: 'dev3@example.com', password: 'Dev123!', role: 'Developer' }
    ];

    for (const u of users) {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(u.password, salt);
      await User.create({ name: u.name, email: u.email, password: hashed, role: u.role });
    }

    console.log('[seed] users created');
    process.exit(0);
  } catch (err) {
    console.error('[seed] error', err);
    process.exit(1);
  }
}

seed();
