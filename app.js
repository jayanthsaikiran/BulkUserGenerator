const admin = require('firebase-admin');
const serviceAccount = require('./serviceKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const createUser = async (user) => {
    try {
        const { email, password, firstName, lastName, name, docname, gender, age, mobileNumber, userId } = user;
    
        // Create the user in Firebase Authentication
        const userRecord = await admin.auth().createUser({
          email,
          password,
          uid: userId
        });
    
        // Set the custom claims for the user
        await admin.auth().setCustomUserClaims(userRecord.uid, {
          firstName,
          lastName,
          name,
          docname,
          gender,
          age,
          mobileNumber,
        });
    
        console.log('User created:', userRecord.uid);
      } catch (error) {
        console.error('Error creating user:', error);
      }
};


const deleteAllUsers = async () => {
    try {
        let listUsersResult = await admin.auth().listUsers();
        const users = listUsersResult.users;

        if (users.length === 0) {
            console.log('No users to delete.');
            return;
        }

        console.log(`Deleting ${users.length} users...`);

        for (const user of users) {
            await admin.auth().deleteUser(user.uid);
            console.log(`Deleted user: ${user.email}`);
        }

        console.log('All users deleted successfully.');
    } catch (error) {
        console.error('Error deleting users:', error);
    }
};


const createBulkUsers = async () => {
    try {
        const users = require('./users.json');
        for (const user of users) {
            await createUser(user);
        }
        console.log('Bulk user creation completed.');
    } catch (error) {
        console.error('Error creating bulk users:', error);
    }
};

async function getUserDetails() {
  try {
    const listUsersResult = await admin.auth().listUsers();
    listUsersResult.users.forEach((userRecord) => {
      console.log('User ID:', userRecord.uid);
      console.log('Email:', userRecord.email);
      console.log('First Name:', userRecord.customClaims.firstName);
      console.log('Last Name:', userRecord.customClaims.lastName);
      console.log('Name:', userRecord.customClaims.name);
      console.log('Doctor Name:', userRecord.customClaims.docname);
      console.log('Gender:', userRecord.customClaims.gender);
      console.log('Age:', userRecord.customClaims.age);
      console.log('Mobile Number:', userRecord.customClaims.mobileNumber);
      console.log('---');
    });
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

// Call the function to fetch and display the user details
getUserDetails();

// deleteAllUsers();
// createBulkUsers();