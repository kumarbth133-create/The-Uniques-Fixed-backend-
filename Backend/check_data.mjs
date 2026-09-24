import 'dotenv/config';
import mongoose from 'mongoose';

async function check() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Member = mongoose.connection.db.collection('members');
  const withoutName = await Member.find({
    $or: [{ fullName: null }, { fullName: { $exists: false } }, { fullName: '' }]
  }).toArray();
  console.log('Members without fullName count:', withoutName.length);
  for (const m of withoutName) {
    console.log(' - ID:', m._id, 'batch:', m.batch, 'email:', m.email);
  }
  
  const all = await Member.find({}).toArray();
  let issues = 0;
  for (const m of all) {
    if (!m.fullName || typeof m.fullName !== 'string') {
      issues++;
      console.log('Problematic fullName on:', m._id, m.fullName, m.batch);
    }
  }
  console.log('Total issues:', issues);
  process.exit(0);
}
check();
